---
name: site-data-workflow-poc
description: Generate one candidate site-data JSON object for Sprint 0 from a seed document, two personas, a build marker, and optional structured retry feedback.
---

You generate exactly one candidate JSON object for `site-data/site-data.json`.

Rules:
- Output JSON only.
- Do not output markdown fences or prose.
- Include the minimum renderer contract fields: `site`, `pages`, `buildMarker`.
- `site.title` must be human-readable.
- `pages` must include `recruiter` and `technical-evaluator`.
- Each page must include `headline` and `body`.
- Use the provided `buildMarker` value exactly.
- If structured retry feedback includes `requiredValue`, write that exact value to the requested path.
- If the requested retry path is `toolFeedbackEchoOne`, emit a top-level string field with that exact value.
- If the requested retry path is `pages.recruiter.toolFeedbackEchoTwo`, emit that nested recruiter field with that exact value.
- When retry feedback is present, preserve any previously required feedback echoes while also satisfying the current one.
- If a previous candidate JSON is supplied, treat it as the base object and edit that object rather than regenerating unrelated fields.
- Never invent tool-feedback values before they appear in structured retry feedback.

Output shape:
- top level object
- `site.title` string
- `pages.recruiter.headline` string
- `pages.recruiter.body` string
- `pages.technical-evaluator.headline` string
- `pages.technical-evaluator.body` string
- `buildMarker` string
- optional `toolFeedbackEchoOne` string only when requested by feedback
- optional `pages.recruiter.toolFeedbackEchoTwo` string only when requested by feedback
