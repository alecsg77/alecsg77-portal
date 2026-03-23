import { mkdtemp, mkdir, readFile, rm, writeFile, copyFile, access } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";

import {
  committedSamplesRoot,
  ensureCommittedSamplesData,
  ensureDirectoryIsEmptyOrMissing,
  getPortalDataPaths
} from "../src/lib/config.js";
import { BUILD_MARKER } from "../src/lib/build-marker.js";
import { runSiteDataWorkflow, createFakeWorkflowRunner } from "./run-site-data-workflow.js";

const SUPPORTED_WORKFLOW_RUNNER_MODES = ["live", "fake"] as const;

type WorkflowRunnerMode = (typeof SUPPORTED_WORKFLOW_RUNNER_MODES)[number];

function parseWorkflowRunnerMode(argv: string[]): WorkflowRunnerMode {
  const explicit = argv.find((value) => value.startsWith("--workflow-runner="));
  const requestedMode = explicit?.split("=")[1] ?? process.env.WORKFLOW_RUNNER_MODE ?? "live";

  if (
    SUPPORTED_WORKFLOW_RUNNER_MODES.includes(
      requestedMode as WorkflowRunnerMode
    )
  ) {
    return requestedMode as WorkflowRunnerMode;
  }

  throw new Error(
    `Unsupported workflow runner mode: ${requestedMode}. Supported modes: ${SUPPORTED_WORKFLOW_RUNNER_MODES.join(", ")}.`
  );
}

async function scaffoldPreparedRoot(portalDataRoot: string) {
  await ensureDirectoryIsEmptyOrMissing(portalDataRoot);
  const paths = getPortalDataPaths(portalDataRoot);

  await mkdir(path.dirname(paths.sourceInputFile), { recursive: true });
  await mkdir(paths.personasDir, { recursive: true });
  await mkdir(paths.siteDataDir, { recursive: true });

  await copyFile(
    path.join(committedSamplesRoot, "source", "case-001.md"),
    paths.sourceInputFile
  );
  await copyFile(
    path.join(committedSamplesRoot, "personas", "recruiter.json"),
    paths.recruiterPersonaFile
  );
  await copyFile(
    path.join(committedSamplesRoot, "personas", "technical-evaluator.json"),
    paths.technicalEvaluatorPersonaFile
  );

  await writeFile(
    paths.challengeFile,
    `${JSON.stringify(
      {
        tokenOne: crypto.randomUUID(),
        tokenTwo: crypto.randomUUID()
      },
      null,
      2
    )}\n`,
    "utf8"
  );

  return paths;
}

async function assertPreparedRoot(paths: ReturnType<typeof getPortalDataPaths>) {
  await Promise.all([
    access(paths.sourceInputFile),
    access(paths.recruiterPersonaFile),
    access(paths.technicalEvaluatorPersonaFile),
    access(paths.challengeFile),
    access(paths.siteDataFile)
  ]);
}

async function main() {
  await ensureCommittedSamplesData();

  const workflowRunnerMode = parseWorkflowRunnerMode(process.argv.slice(2));
  const portalDataRoot = await mkdtemp(path.join(os.tmpdir(), "alecsg77-portal-"));
  let success = false;

  try {
    const paths = await scaffoldPreparedRoot(portalDataRoot);
    const [seedSource, recruiterPersona, technicalEvaluatorPersona] = await Promise.all([
      readFile(paths.sourceInputFile, "utf8"),
      readFile(paths.recruiterPersonaFile, "utf8"),
      readFile(paths.technicalEvaluatorPersonaFile, "utf8")
    ]);

    await runSiteDataWorkflow({
      seedSource,
      recruiterPersona,
      technicalEvaluatorPersona,
      buildMarker: BUILD_MARKER,
      siteDataFile: paths.siteDataFile,
      challengeFile: paths.challengeFile,
      runner: workflowRunnerMode === "fake" ? createFakeWorkflowRunner() : undefined
    });

    await assertPreparedRoot(paths);
    success = true;
    process.stdout.write(`PORTAL_DATA_ROOT=${portalDataRoot}\n`);
  } finally {
    if (!success) {
      await rm(portalDataRoot, { recursive: true, force: true });
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Dry run failed.");
  process.exitCode = 1;
});