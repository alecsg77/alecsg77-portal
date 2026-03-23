import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { ZodError } from "zod";

import { repositoryRoot } from "../src/lib/config.js";
import {
  completedWorkflowSiteDataSchema,
  formatZodIssues,
  minimumSiteDataSchema,
  parseJsonText,
  parseValidationChallengeFile
} from "../src/lib/contracts/site-data.js";
import type {
  CompletedWorkflowSiteData,
  FakeValidatorResult
} from "../src/lib/contracts/site-data.js";

const execFileAsync = promisify(execFile);

function parseValidatorResult(stdout: string): FakeValidatorResult {
  if (!stdout.trim()) {
    return {
      ok: false,
      code: "VALIDATOR_OPERATIONAL_ERROR",
      message: "Validator exited without emitting machine-readable JSON."
    };
  }

  try {
    return JSON.parse(stdout) as FakeValidatorResult;
  } catch {
    return {
      ok: false,
      code: "VALIDATOR_OPERATIONAL_ERROR",
      message: `Validator emitted invalid JSON: ${stdout.trim()}`
    };
  }
}

export type WorkflowRunner = (prompt: string) => Promise<string>;

export interface WorkflowRunOptions {
  seedSource: string;
  recruiterPersona: string;
  technicalEvaluatorPersona: string;
  buildMarker: string;
  siteDataFile: string;
  challengeFile: string;
  runner?: WorkflowRunner;
  validateCandidate?: (args: {
    siteDataFile: string;
    challengeFile: string;
  }) => Promise<{ exitCode: number; result: FakeValidatorResult }>;
  skillFilePath?: string;
}

export interface WorkflowRunResult {
  attempts: number;
  siteData: CompletedWorkflowSiteData;
}

function buildWorkflowPrompt(input: {
  attempt: number;
  seedSource: string;
  recruiterPersona: string;
  technicalEvaluatorPersona: string;
  buildMarker: string;
  skillPath: string;
  skillInstructions: string;
  feedback?: Record<string, unknown>;
  previousCandidate?: unknown;
}) {
  const feedbackSummary =
    input.feedback &&
    typeof input.feedback.path === "string" &&
    typeof input.feedback.requiredValue === "string"
      ? [
          "Retry correction requirements:",
          `- write the exact string ${JSON.stringify(input.feedback.requiredValue)} at ${input.feedback.path}`,
          "- keep the full payload valid for the minimum renderer contract",
          "- return the complete JSON object, not a patch"
        ].join("\n")
      : "Retry correction requirements:\n- no retry correction is currently required";

  return [
    "Follow exactly one repository-local skill and return only a single JSON object on stdout.",
    "Return plain JSON only. No explanation, no markdown, no code fences.",
    "The JSON must always contain site.title, pages.recruiter.headline, pages.recruiter.body, pages.technical-evaluator.headline, pages.technical-evaluator.body, and buildMarker.",
    `Skill path: ${input.skillPath}`,
    "Skill instructions:",
    input.skillInstructions,
    `Attempt: ${input.attempt}`,
    `Build marker: ${input.buildMarker}`,
    "Seed source document:",
    input.seedSource,
    "Recruiter persona JSON:",
    input.recruiterPersona,
    "Technical evaluator persona JSON:",
    input.technicalEvaluatorPersona,
    input.previousCandidate
      ? `Previous candidate JSON to preserve and edit:\n${JSON.stringify(input.previousCandidate, null, 2)}`
      : "Previous candidate JSON to preserve and edit:\nnull",
    feedbackSummary,
    input.feedback
      ? `Structured retry feedback JSON (single line): ${JSON.stringify(input.feedback)}`
      : "Structured retry feedback JSON (single line): null"
  ].join("\n\n");
}

export function createFakeWorkflowRunner(): WorkflowRunner {
  let firstToken: string | undefined;
  let secondToken: string | undefined;

  return async (prompt: string) => {
    const buildMarkerMatch = prompt.match(/^Build marker: (.+)$/m);
    const attemptMatch = prompt.match(/^Attempt: (\d+)$/m);
    const feedbackMatch = prompt.match(
      /^Structured retry feedback JSON \(single line\): (.+)$/m
    );

    if (!buildMarkerMatch || !attemptMatch) {
      throw new Error("Fake workflow runner received an invalid prompt.");
    }

    const attempt = Number(attemptMatch[1]);
    const feedback =
      feedbackMatch && feedbackMatch[1] !== "null"
        ? (JSON.parse(feedbackMatch[1]) as {
            path?: string;
            requiredValue?: string;
          })
        : undefined;

    if (feedback?.path === "toolFeedbackEchoOne" && feedback.requiredValue) {
      firstToken = feedback.requiredValue;
    }

    if (
      feedback?.path === "pages.recruiter.toolFeedbackEchoTwo" &&
      feedback.requiredValue
    ) {
      secondToken = feedback.requiredValue;
    }

    const candidate: Record<string, unknown> = {
      site: {
        title: "Sprint 0 Portal Dry Run"
      },
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
      buildMarker: buildMarkerMatch[1]
    };

    if (attempt >= 2 && firstToken) {
      candidate.toolFeedbackEchoOne = firstToken;
    }

    if (attempt >= 3 && firstToken && secondToken) {
      candidate.toolFeedbackEchoOne = firstToken;
      (candidate.pages as Record<string, Record<string, unknown>>).recruiter.toolFeedbackEchoTwo =
        secondToken;
    }

    return JSON.stringify(candidate);
  };
}

export async function runFakeValidatorProcess(args: {
  siteDataFile: string;
  challengeFile: string;
}): Promise<{ exitCode: number; result: FakeValidatorResult }> {
  try {
    const { stdout } = await execFileAsync(
      "tsx",
      [
        path.join(repositoryRoot, "scripts", "validate-site-data.ts"),
        "--site-data-file",
        args.siteDataFile,
        "--challenge-file",
        args.challengeFile
      ],
      {
        cwd: repositoryRoot
      }
    );

    return {
      exitCode: 0,
      result: parseValidatorResult(stdout)
    };
  } catch (error) {
    const executionError = error as NodeJS.ErrnoException & {
      code?: number;
      stdout?: string;
    };
    const stdout = executionError.stdout ?? "";

    return {
      exitCode: typeof executionError.code === "number" ? executionError.code : 1,
      result: parseValidatorResult(stdout)
    };
  }
}

export async function createLiveWorkflowRunner(
  skillFilePath: string
): Promise<WorkflowRunner> {
  const skillInstructions = await readFile(skillFilePath, "utf8");

  return async (prompt: string) => {
    const composedPrompt = [
      "Read and obey this repository-local skill only.",
      `Skill path: ${skillFilePath}`,
      skillInstructions,
      prompt
    ].join("\n\n");

    const { stdout } = await execFileAsync(
      "copilot",
      [
        "-p",
        composedPrompt,
        "--silent",
        "--allow-all-tools",
        "--allow-all-paths",
        "--no-custom-instructions",
        "--add-dir",
        repositoryRoot
      ],
      {
        cwd: repositoryRoot,
        env: process.env
      }
    );

    return stdout.trim();
  };
}

export async function runSiteDataWorkflow({
  seedSource,
  recruiterPersona,
  technicalEvaluatorPersona,
  buildMarker,
  siteDataFile,
  challengeFile,
  runner,
  validateCandidate = runFakeValidatorProcess,
  skillFilePath = path.join(
    repositoryRoot,
    ".github",
    "skills",
    "site-data-workflow-poc",
    "SKILL.md"
  )
}: WorkflowRunOptions): Promise<WorkflowRunResult> {
  const resolvedRunner = runner ?? (await createLiveWorkflowRunner(skillFilePath));
  const skillInstructions = await readFile(skillFilePath, "utf8");
  let feedback: Record<string, unknown> | undefined;
  let previousCandidate: unknown;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const prompt = buildWorkflowPrompt({
      attempt,
      seedSource,
      recruiterPersona,
      technicalEvaluatorPersona,
      buildMarker,
      skillPath: skillFilePath,
      skillInstructions,
      feedback,
      previousCandidate
    });

    const rawCandidate = await resolvedRunner(prompt);
    const parsedCandidate = parseJsonText(rawCandidate);
    previousCandidate = parsedCandidate;
    await writeFile(siteDataFile, `${JSON.stringify(parsedCandidate, null, 2)}\n`, "utf8");

    try {
      const minimumSiteData = await minimumSiteDataSchema.parseAsync(parsedCandidate);
      await writeFile(siteDataFile, `${JSON.stringify(minimumSiteData, null, 2)}\n`, "utf8");
    } catch (error) {
      if (!(error instanceof ZodError)) {
        throw error;
      }

      feedback = {
        step: "zod-contract-check",
        issues: formatZodIssues(error)
      };
      continue;
    }

    const validation = await validateCandidate({ siteDataFile, challengeFile });

    if (validation.exitCode === 1) {
      throw new Error(validation.result.message);
    }

    if (validation.result.ok) {
      const challenge = await parseValidationChallengeFile(challengeFile);
      const completed = await completedWorkflowSiteDataSchema.parseAsync(
        parseJsonText(await readFile(siteDataFile, "utf8"))
      );

      if (
        completed.toolFeedbackEchoOne !== challenge.tokenOne ||
        completed.pages.recruiter.toolFeedbackEchoTwo !== challenge.tokenTwo
      ) {
        throw new Error("Workflow reported success without writing the required validator echoes.");
      }

      return {
        attempts: attempt,
        siteData: completed
      };
    }

    feedback = {
      step: "fake-validator",
      ...validation.result
    };
  }

  throw new Error("Workflow failed to produce valid site-data within three attempts.");
}
