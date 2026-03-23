import { readFile } from "node:fs/promises";

import {
  fakeValidatorResultSchema,
  parseJsonText,
  parseValidationChallengeFile
} from "../src/lib/contracts/site-data.js";

interface ValidateSiteDataOptions {
  siteDataFile: string;
  challengeFile: string;
}

export async function runFakeValidator({
  siteDataFile,
  challengeFile
}: ValidateSiteDataOptions) {
  try {
    const challenge = await parseValidationChallengeFile(challengeFile);
    const siteData = parseJsonText(await readFile(siteDataFile, "utf8")) as Record<
      string,
      unknown
    >;

    if (siteData.toolFeedbackEchoOne !== challenge.tokenOne) {
      return fakeValidatorResultSchema.parse({
        ok: false,
        code: "MISSING_TOOL_FEEDBACK_ONE",
        path: "toolFeedbackEchoOne",
        requiredValue: challenge.tokenOne,
        message:
          "site-data must echo the first validator token at toolFeedbackEchoOne."
      });
    }

    const recruiter = (siteData.pages as Record<string, unknown> | undefined)?.recruiter as
      | Record<string, unknown>
      | undefined;

    if (recruiter?.toolFeedbackEchoTwo !== challenge.tokenTwo) {
      return fakeValidatorResultSchema.parse({
        ok: false,
        code: "MISSING_TOOL_FEEDBACK_TWO",
        path: "pages.recruiter.toolFeedbackEchoTwo",
        requiredValue: challenge.tokenTwo,
        message:
          "site-data must echo the second validator token at pages.recruiter.toolFeedbackEchoTwo."
      });
    }

    return fakeValidatorResultSchema.parse({
      ok: true,
      code: "OK",
      message: "site-data passed the deterministic fake validator."
    });
  } catch (error) {
    return fakeValidatorResultSchema.parse({
      ok: false,
      code: "VALIDATOR_OPERATIONAL_ERROR",
      message: error instanceof Error ? error.message : "Unknown validator error."
    });
  }
}

function parseArguments(argv: string[]) {
  const siteDataIndex = argv.indexOf("--site-data-file");
  const challengeIndex = argv.indexOf("--challenge-file");

  if (siteDataIndex === -1 || challengeIndex === -1) {
    throw new Error(
      "Usage: tsx scripts/validate-site-data.ts --site-data-file <absolute-path> --challenge-file <absolute-path>"
    );
  }

  return {
    siteDataFile: argv[siteDataIndex + 1],
    challengeFile: argv[challengeIndex + 1]
  };
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const result = await runFakeValidator(options);
  process.stdout.write(`${JSON.stringify(result)}\n`);

  if (result.ok) {
    process.exitCode = 0;
    return;
  }

  process.exitCode = result.code === "VALIDATOR_OPERATIONAL_ERROR" ? 1 : 2;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    const result = {
      ok: false,
      code: "VALIDATOR_OPERATIONAL_ERROR",
      message: error instanceof Error ? error.message : "Unknown validator error."
    };

    process.stdout.write(`${JSON.stringify(result)}\n`);
    process.exitCode = 1;
  });
}
