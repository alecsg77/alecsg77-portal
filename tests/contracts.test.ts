import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  assertPreparedPortalDataRoot,
  getPortalDataPaths,
  resolvePortalDataRootFromEnv
} from "../src/lib/config.js";
import {
  minimumSiteDataSchema,
  completedWorkflowSiteDataSchema
} from "../src/lib/contracts/site-data.js";
import { BUILD_MARKER } from "../src/lib/build-marker.js";

describe("site-data contracts", () => {
  it("accepts the minimum renderer contract", () => {
    const parsed = minimumSiteDataSchema.parse({
      site: { title: "Sprint 0 Portal" },
      pages: {
        recruiter: { headline: "Recruiter", body: "Summary" },
        "technical-evaluator": { headline: "Technical", body: "Details" }
      },
      buildMarker: BUILD_MARKER
    });

    expect(parsed.site.title).toBe("Sprint 0 Portal");
  });

  it("requires both workflow echoes for the completed workflow schema", () => {
    expect(() =>
      completedWorkflowSiteDataSchema.parse({
        site: { title: "Sprint 0 Portal" },
        pages: {
          recruiter: { headline: "Recruiter", body: "Summary" },
          "technical-evaluator": { headline: "Technical", body: "Details" }
        },
        buildMarker: BUILD_MARKER
      })
    ).toThrow();
  });
});

describe("portal data config", () => {
  it("fails fast when PORTAL_DATA_ROOT is missing", () => {
    expect(() => resolvePortalDataRootFromEnv({})).toThrow(/PORTAL_DATA_ROOT/);
  });

  it("validates a prepared root with generated site-data", async () => {
    const portalDataRoot = await mkdtemp(path.join(os.tmpdir(), "portal-config-"));
    const paths = getPortalDataPaths(portalDataRoot);

    try {
      await mkdir(paths.siteDataDir, { recursive: true });
      await writeFile(
        paths.siteDataFile,
        `${JSON.stringify(
          {
            site: { title: "Sprint 0 Portal" },
            pages: {
              recruiter: { headline: "Recruiter", body: "Summary" },
              "technical-evaluator": {
                headline: "Technical",
                body: "Details"
              }
            },
            buildMarker: BUILD_MARKER
          },
          null,
          2
        )}\n`
      );

      const resolved = await assertPreparedPortalDataRoot({
        PORTAL_DATA_ROOT: portalDataRoot
      });

      expect(resolved.siteDataFile).toBe(paths.siteDataFile);
    } finally {
      await rm(portalDataRoot, { recursive: true, force: true });
    }
  });
});
