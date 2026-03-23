import { access, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { parseMinimumSiteDataFile } from "./contracts/site-data.js";

function buildMissingPathError(pathLabel: string, targetPath: string) {
  return new Error(
    `${pathLabel} is missing or unreadable: ${targetPath}. Run yarn dry-run first and export a valid PORTAL_DATA_ROOT.`
  );
}

async function ensurePreparedPortalDataPaths(paths: PortalDataPaths) {
  const requiredPaths = [
    ["PORTAL_DATA_ROOT", paths.portalDataRoot],
    ["site-data directory", paths.siteDataDir],
    ["site-data file", paths.siteDataFile]
  ] as const;

  for (const [pathLabel, targetPath] of requiredPaths) {
    try {
      await access(targetPath);
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        (error as NodeJS.ErrnoException).code === "ENOENT"
      ) {
        throw buildMissingPathError(pathLabel, targetPath);
      }

      throw error;
    }
  }
}

export interface PortalDataPaths {
  portalDataRoot: string;
  workflowInputsDir: string;
  sourceInputFile: string;
  personasDir: string;
  recruiterPersonaFile: string;
  technicalEvaluatorPersonaFile: string;
  siteDataDir: string;
  siteDataFile: string;
  challengeFile: string;
}

export const repositoryRoot = path.resolve(
  fileURLToPath(new URL("../../", import.meta.url))
);

export const committedSamplesRoot = path.join(repositoryRoot, "samples-data");

export function getPortalDataPaths(portalDataRoot: string): PortalDataPaths {
  return {
    portalDataRoot,
    workflowInputsDir: path.join(portalDataRoot, "workflow-inputs"),
    sourceInputFile: path.join(
      portalDataRoot,
      "workflow-inputs",
      "source",
      "case-001.md"
    ),
    personasDir: path.join(portalDataRoot, "workflow-inputs", "personas"),
    recruiterPersonaFile: path.join(
      portalDataRoot,
      "workflow-inputs",
      "personas",
      "recruiter.json"
    ),
    technicalEvaluatorPersonaFile: path.join(
      portalDataRoot,
      "workflow-inputs",
      "personas",
      "technical-evaluator.json"
    ),
    siteDataDir: path.join(portalDataRoot, "site-data"),
    siteDataFile: path.join(portalDataRoot, "site-data", "site-data.json"),
    challengeFile: path.join(
      portalDataRoot,
      "site-data",
      "validation-challenge.json"
    )
  };
}

export async function ensureDirectoryIsEmptyOrMissing(
  targetDirectory: string
): Promise<void> {
  try {
    const entries = await readdir(targetDirectory);
    if (entries.length > 0) {
      throw new Error(`Target directory must be empty: ${targetDirectory}`);
    }
  } catch (error) {
    if (
      !(error instanceof Error) ||
      !("code" in error) ||
      (error as NodeJS.ErrnoException).code !== "ENOENT"
    ) {
      throw error;
    }
  }
}

export async function ensureCommittedSamplesData(): Promise<void> {
  const requiredFiles = [
    path.join(committedSamplesRoot, "source", "case-001.md"),
    path.join(committedSamplesRoot, "personas", "recruiter.json"),
    path.join(committedSamplesRoot, "personas", "technical-evaluator.json")
  ];

  for (const filePath of requiredFiles) {
    await access(filePath);
  }
}

export function resolvePortalDataRootFromEnv(
  environment: NodeJS.ProcessEnv = process.env
): PortalDataPaths {
  const portalDataRoot = environment.PORTAL_DATA_ROOT;

  if (!portalDataRoot) {
    throw new Error(
      "PORTAL_DATA_ROOT is required. Run yarn dry-run first and export the emitted value."
    );
  }

  return getPortalDataPaths(path.resolve(portalDataRoot));
}

export async function loadSiteDataFromEnvironment(
  environment: NodeJS.ProcessEnv = process.env
) {
  const paths = resolvePortalDataRootFromEnv(environment);
  await ensurePreparedPortalDataPaths(paths);
  return parseMinimumSiteDataFile(paths.siteDataFile);
}

export async function assertPreparedPortalDataRoot(
  environment: NodeJS.ProcessEnv = process.env
): Promise<PortalDataPaths> {
  const paths = resolvePortalDataRootFromEnv(environment);
  await ensurePreparedPortalDataPaths(paths);
  await parseMinimumSiteDataFile(paths.siteDataFile);
  return paths;
}
