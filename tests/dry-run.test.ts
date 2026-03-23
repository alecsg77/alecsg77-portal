import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterAll, describe, expect, it } from "vitest";

import { BUILD_MARKER } from "../src/lib/build-marker.js";
import { repositoryRoot } from "../src/lib/config.js";
import { runSiteDataWorkflow } from "../scripts/run-site-data-workflow.js";

const execFileAsync = promisify(execFile);
const rootsToCleanup = new Set<string>();
const scratchDirsToCleanup = new Set<string>();

async function createScratchFilePath(prefix: string, fileName: string) {
  const scratchDir = await mkdtemp(path.join(os.tmpdir(), prefix));
  scratchDirsToCleanup.add(scratchDir);
  return path.join(scratchDir, fileName);
}

async function runDryRunCommand() {
  const { stdout } = await execFileAsync(
    "yarn",
    ["dry-run", "--workflow-runner=fake"],
    {
      cwd: repositoryRoot,
      env: process.env
    }
  );

  const lines = stdout.trim().split(/\r?\n/);
  const lastLine = lines.at(-1) ?? "";
  const portalDataRoot = lastLine.replace(/^PORTAL_DATA_ROOT=/, "");
  rootsToCleanup.add(portalDataRoot);

  return { stdout, portalDataRoot };
}

afterAll(async () => {
  await Promise.all(
    Array.from(rootsToCleanup, (root) => rm(root, { recursive: true, force: true }))
  );
  await Promise.all(
    Array.from(scratchDirsToCleanup, (root) => rm(root, { recursive: true, force: true }))
  );
  await rm(path.join(repositoryRoot, "dist"), { recursive: true, force: true });
});

describe("workflow bridge", () => {
  it("does not invoke the fake validator when zod parsing fails", async () => {
    let validatorCalls = 0;
    const siteDataFile = await createScratchFilePath("portal-invalid-site-data-", "site-data.json");
    const challengeFile = await createScratchFilePath(
      "portal-invalid-challenge-",
      "validation-challenge.json"
    );

    await expect(
      runSiteDataWorkflow({
        seedSource: "seed",
        recruiterPersona: '{"id":"recruiter"}',
        technicalEvaluatorPersona: '{"id":"technical-evaluator"}',
        buildMarker: BUILD_MARKER,
        siteDataFile,
        challengeFile,
        runner: async () => JSON.stringify({ invalid: true }),
        validateCandidate: async () => {
          validatorCalls += 1;
          return {
            exitCode: 0,
            result: { ok: true, code: "OK", message: "unexpected" }
          };
        }
      })
    ).rejects.toThrow(/three attempts/);

    expect(validatorCalls).toBe(0);
  });

  it("includes structured retry feedback and the previous candidate in later prompts", async () => {
    const prompts: string[] = [];
    let validationCalls = 0;

    const siteDataFile = await createScratchFilePath("portal-prompt-site-data-", "site-data.json");
    const challengeFile = await createScratchFilePath(
      "portal-prompt-challenge-",
      "validation-challenge.json"
    );

    await writeFile(
      challengeFile,
      `${JSON.stringify({ tokenOne: "token-one", tokenTwo: "token-two" }, null, 2)}\n`
    );

    const candidateOne = {
      site: { title: "Sprint 0 Portal Dry Run" },
      pages: {
        recruiter: {
          headline: "Recruiter-ready portal summary",
          body: "Highlights concise outcomes, commercial scope, and delivery confidence."
        },
        "technical-evaluator": {
          headline: "Technical evaluator deep dive",
          body: "Surfaces architecture choices, workflow boundaries, and validation evidence."
        }
      },
      buildMarker: BUILD_MARKER
    };

    const candidateTwo = {
      ...candidateOne,
      toolFeedbackEchoOne: "token-one"
    };

    const candidateThree = {
      ...candidateTwo,
      pages: {
        ...candidateTwo.pages,
        recruiter: {
          ...candidateTwo.pages.recruiter,
          toolFeedbackEchoTwo: "token-two"
        }
      }
    };

    await runSiteDataWorkflow({
      seedSource: "seed",
      recruiterPersona: '{"id":"recruiter"}',
      technicalEvaluatorPersona: '{"id":"technical-evaluator"}',
      buildMarker: BUILD_MARKER,
      siteDataFile,
      challengeFile,
      runner: async (prompt) => {
        prompts.push(prompt);

        if (prompts.length === 1) {
          return JSON.stringify(candidateOne);
        }

        if (prompts.length === 2) {
          return JSON.stringify(candidateTwo);
        }

        return JSON.stringify(candidateThree);
      },
      validateCandidate: async () => {
        validationCalls += 1;

        if (validationCalls === 1) {
          return {
            exitCode: 2,
            result: {
              ok: false,
              code: "MISSING_TOOL_FEEDBACK_ONE",
              path: "toolFeedbackEchoOne",
              requiredValue: "token-one",
              message: "missing first token"
            }
          };
        }

        if (validationCalls === 2) {
          return {
            exitCode: 2,
            result: {
              ok: false,
              code: "MISSING_TOOL_FEEDBACK_TWO",
              path: "pages.recruiter.toolFeedbackEchoTwo",
              requiredValue: "token-two",
              message: "missing second token"
            }
          };
        }

        return {
          exitCode: 0,
          result: {
            ok: true,
            code: "OK",
            message: "site-data passed"
          }
        };
      },
      skillFilePath: path.join(
        repositoryRoot,
        ".github",
        "skills",
        "site-data-workflow-poc",
        "SKILL.md"
      )
    });

    expect(prompts).toHaveLength(3);
    expect(prompts[0]).toContain("Previous candidate JSON to preserve and edit:\nnull");
    expect(prompts[1]).toContain("Structured retry feedback JSON (single line): {\"step\":\"fake-validator\"");
    expect(prompts[1]).toContain("\"path\":\"toolFeedbackEchoOne\"");
    expect(prompts[1]).toContain("\"requiredValue\":\"token-one\"");
    expect(prompts[1]).toContain('"buildMarker": "sprint-0-build-marker"');
    expect(prompts[2]).toContain("\"path\":\"pages.recruiter.toolFeedbackEchoTwo\"");
    expect(prompts[2]).toContain("\"requiredValue\":\"token-two\"");
    expect(prompts[2]).toContain('"toolFeedbackEchoOne": "token-one"');
  });

  it("succeeds in three attempts with the deterministic fake runner", async () => {
    const { portalDataRoot } = await runDryRunCommand();
    const siteDataJson = JSON.parse(
      await readFile(path.join(portalDataRoot, "site-data", "site-data.json"), "utf8")
    );
    const challengeJson = JSON.parse(
      await readFile(
        path.join(portalDataRoot, "site-data", "validation-challenge.json"),
        "utf8"
      )
    );

    expect(siteDataJson.buildMarker).toBe(BUILD_MARKER);
    expect(siteDataJson.toolFeedbackEchoOne).toBe(challengeJson.tokenOne);
    expect(siteDataJson.pages.recruiter.toolFeedbackEchoTwo).toBe(
      challengeJson.tokenTwo
    );
  });
});

describe("dry-run and build smoke", () => {
  it("emits the exact final handoff line and creates the prepared root", async () => {
    const { stdout, portalDataRoot } = await runDryRunCommand();
    const lines = stdout.trim().split(/\r?\n/);

    expect(lines.at(-1)).toBe(`PORTAL_DATA_ROOT=${portalDataRoot}`);
    await expect(
      readFile(path.join(portalDataRoot, "workflow-inputs", "source", "case-001.md"), "utf8")
    ).resolves.toContain("Case 001");
  });

  it("creates a new unique prepared root on each successful run", async () => {
    const first = await runDryRunCommand();
    const second = await runDryRunCommand();

    expect(first.portalDataRoot).not.toBe(second.portalDataRoot);
  });

  it("builds the Astro site from the prepared PORTAL_DATA_ROOT only", async () => {
    const { portalDataRoot } = await runDryRunCommand();

    await execFileAsync("yarn", ["build"], {
      cwd: repositoryRoot,
      env: {
        ...process.env,
        PORTAL_DATA_ROOT: portalDataRoot
      }
    });

    const indexHtml = await readFile(path.join(repositoryRoot, "dist", "index.html"), "utf8");
    const recruiterHtml = await readFile(
      path.join(repositoryRoot, "dist", "recruiter", "index.html"),
      "utf8"
    );
    const technicalHtml = await readFile(
      path.join(repositoryRoot, "dist", "technical-evaluator", "index.html"),
      "utf8"
    );

    expect(indexHtml).toContain(BUILD_MARKER);
    expect(recruiterHtml).toContain("Recruiter-ready portal summary");
    expect(technicalHtml).toContain("Technical evaluator deep dive");
  });

  it("fails build fast when PORTAL_DATA_ROOT is missing", async () => {
    await expect(
      execFileAsync("yarn", ["build"], {
        cwd: repositoryRoot,
        env: {
          ...process.env,
          PORTAL_DATA_ROOT: ""
        }
      })
    ).rejects.toThrow(/PORTAL_DATA_ROOT/);
  });

  it("fails build fast with a clear validation error when PORTAL_DATA_ROOT is invalid", async () => {
    const missingRoot = path.join(os.tmpdir(), "portal-missing-root");

    await expect(
      execFileAsync("yarn", ["build"], {
        cwd: repositoryRoot,
        env: {
          ...process.env,
          PORTAL_DATA_ROOT: missingRoot
        }
      })
    ).rejects.toThrow(/site-data file is missing or unreadable|site-data directory is missing or unreadable|PORTAL_DATA_ROOT is missing or unreadable/);
  });

  it("fails dry-run fast on an unsupported workflow runner mode", async () => {
    await expect(
      execFileAsync("yarn", ["dry-run", "--workflow-runner=bogus"], {
        cwd: repositoryRoot,
        env: process.env
      })
    ).rejects.toThrow(/Unsupported workflow runner mode/);
  });
});

describe("validator process handling", () => {
  it("converts empty validator stdout into an operational error result", async () => {
    const siteDataFile = await createScratchFilePath("portal-empty-validator-", "site-data.json");
    const challengeFile = await createScratchFilePath(
      "portal-empty-validator-challenge-",
      "validation-challenge.json"
    );

    await writeFile(siteDataFile, "{}\n");
    await writeFile(challengeFile, "{}\n");

    await expect(
      runSiteDataWorkflow({
        seedSource: "seed",
        recruiterPersona: '{"id":"recruiter"}',
        technicalEvaluatorPersona: '{"id":"technical-evaluator"}',
        buildMarker: BUILD_MARKER,
        siteDataFile,
        challengeFile,
        runner: async () =>
          JSON.stringify({
            site: { title: "Sprint 0 Portal" },
            pages: {
              recruiter: { headline: "Recruiter", body: "Summary" },
              "technical-evaluator": { headline: "Technical", body: "Details" }
            },
            buildMarker: BUILD_MARKER
          }),
        validateCandidate: async () => ({
          exitCode: 1,
          result: {
            ok: false,
            code: "VALIDATOR_OPERATIONAL_ERROR",
            message: "Validator exited without emitting machine-readable JSON."
          }
        })
      })
    ).rejects.toThrow(/Validator exited without emitting machine-readable JSON/);
  });
});
