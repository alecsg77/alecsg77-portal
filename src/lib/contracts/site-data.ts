import { readFile } from "node:fs/promises";
import { z } from "zod";

export const PERSONA_KEYS = ["recruiter", "technical-evaluator"] as const;

export type PersonaKey = (typeof PERSONA_KEYS)[number];

export const sitePageSchema = z
  .object({
    headline: z.string().min(1),
    body: z.string().min(1)
  })
  .passthrough();

export const minimumSiteDataSchema = z
  .object({
    site: z
      .object({
        title: z.string().min(1)
      })
      .passthrough(),
    pages: z
      .object({
        recruiter: sitePageSchema,
        "technical-evaluator": sitePageSchema
      })
      .passthrough(),
    buildMarker: z.string().min(1)
  })
  .passthrough();

export const completedWorkflowSiteDataSchema = minimumSiteDataSchema.extend({
  toolFeedbackEchoOne: z.string().min(1),
  pages: z
    .object({
      recruiter: sitePageSchema
        .extend({
          toolFeedbackEchoTwo: z.string().min(1)
        })
        .passthrough(),
      "technical-evaluator": sitePageSchema
    })
    .passthrough()
});

export const validationChallengeSchema = z.object({
  tokenOne: z.string().min(1),
  tokenTwo: z.string().min(1)
});

export const fakeValidatorResultSchema = z.object({
  ok: z.boolean(),
  code: z.string(),
  message: z.string(),
  path: z.string().optional(),
  requiredValue: z.string().optional()
});

export type MinimumSiteData = z.infer<typeof minimumSiteDataSchema>;
export type CompletedWorkflowSiteData = z.infer<
  typeof completedWorkflowSiteDataSchema
>;
export type ValidationChallenge = z.infer<typeof validationChallengeSchema>;
export type FakeValidatorResult = z.infer<typeof fakeValidatorResultSchema>;

export function parseJsonText(input: string): unknown {
  return JSON.parse(input);
}

export async function readJsonFile(filePath: string): Promise<unknown> {
  return parseJsonText(await readFile(filePath, "utf8"));
}

export async function parseMinimumSiteDataFile(
  filePath: string
): Promise<MinimumSiteData> {
  return minimumSiteDataSchema.parseAsync(await readJsonFile(filePath));
}

export async function parseCompletedWorkflowSiteDataFile(
  filePath: string
): Promise<CompletedWorkflowSiteData> {
  return completedWorkflowSiteDataSchema.parseAsync(await readJsonFile(filePath));
}

export async function parseValidationChallengeFile(
  filePath: string
): Promise<ValidationChallenge> {
  return validationChallengeSchema.parseAsync(await readJsonFile(filePath));
}

export function formatZodIssues(error: z.ZodError): Array<Record<string, string>> {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    code: issue.code,
    message: issue.message
  }));
}
