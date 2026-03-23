import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { runFakeValidator } from "../scripts/validate-site-data.js";
import { BUILD_MARKER } from "../src/lib/build-marker.js";

async function createFixtureFiles(siteData: Record<string, unknown>) {
  const root = await mkdtemp(path.join(os.tmpdir(), "validator-fixture-"));
  const siteDataFile = path.join(root, "site-data.json");
  const challengeFile = path.join(root, "validation-challenge.json");

  await mkdir(root, { recursive: true });
  await writeFile(
    challengeFile,
    `${JSON.stringify({ tokenOne: "token-one", tokenTwo: "token-two" }, null, 2)}\n`
  );
  await writeFile(siteDataFile, `${JSON.stringify(siteData, null, 2)}\n`);

  return { root, siteDataFile, challengeFile };
}

describe("fake validator", () => {
  it("emits the first prescribed validation error first", async () => {
    const fixture = await createFixtureFiles({
      site: { title: "Sprint 0 Portal" },
      pages: {
        recruiter: { headline: "Recruiter", body: "Summary" },
        "technical-evaluator": { headline: "Technical", body: "Details" }
      },
      buildMarker: BUILD_MARKER
    });

    try {
      const result = await runFakeValidator(fixture);
      expect(result.ok).toBe(false);
      expect(result.code).toBe("MISSING_TOOL_FEEDBACK_ONE");
      expect(result.path).toBe("toolFeedbackEchoOne");
      expect(result.requiredValue).toBe("token-one");
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("emits the second prescribed validation error after the first is fixed", async () => {
    const fixture = await createFixtureFiles({
      site: { title: "Sprint 0 Portal" },
      pages: {
        recruiter: { headline: "Recruiter", body: "Summary" },
        "technical-evaluator": { headline: "Technical", body: "Details" }
      },
      buildMarker: BUILD_MARKER,
      toolFeedbackEchoOne: "token-one"
    });

    try {
      const result = await runFakeValidator(fixture);
      expect(result.ok).toBe(false);
      expect(result.code).toBe("MISSING_TOOL_FEEDBACK_TWO");
      expect(result.path).toBe("pages.recruiter.toolFeedbackEchoTwo");
      expect(result.requiredValue).toBe("token-two");
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("succeeds only when both required corrections are present", async () => {
    const fixture = await createFixtureFiles({
      site: { title: "Sprint 0 Portal" },
      pages: {
        recruiter: {
          headline: "Recruiter",
          body: "Summary",
          toolFeedbackEchoTwo: "token-two"
        },
        "technical-evaluator": { headline: "Technical", body: "Details" }
      },
      buildMarker: BUILD_MARKER,
      toolFeedbackEchoOne: "token-one"
    });

    try {
      const result = await runFakeValidator(fixture);
      expect(result.ok).toBe(true);
      expect(result.code).toBe("OK");
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("returns a machine-readable operational error when inputs are missing", async () => {
    const result = await runFakeValidator({
      siteDataFile: "/tmp/does-not-exist.json",
      challengeFile: "/tmp/does-not-exist-challenge.json"
    });

    expect(result.ok).toBe(false);
    expect(result.code).toBe("VALIDATOR_OPERATIONAL_ERROR");
  });
});
