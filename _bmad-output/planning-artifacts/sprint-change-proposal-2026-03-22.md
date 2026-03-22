---
workflowType: sprint-change-proposal
preparedDate: '2026-03-22'
project: alecsg77-portal
status: approved-implemented
executionMode: batch
changeScope: moderate
triggerType: stack-and-pipeline-canonical-realignment
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/epics.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
approvalStatus: approved-and-applied-2026-03-22
---

# Sprint Change Proposal - LLM-Centered Portal Data Pipeline Alignment

## 1. Issue Summary

### Trigger

The current canonical planning set already converges on a portal-data-centered operating model, but the architecture still under-specifies several implementation choices that are now important for execution discipline:

1. obsolete or underspecified pipeline wording still hides the fact that the portal data pipeline is the core execution model
2. LLM usage is currently described as a supporting mechanism rather than the central orchestration mode
3. the current docs do not explicitly state that the practical MVP execution surface is GitHub Copilot skills/agents running in VS Code Chat or Copilot CLI
4. deterministic helper implementation language is too narrowly framed around TypeScript and does not clearly allow JavaScript for isolated sub-operations
5. governed file-format and refinement-patch guidance is still too abstract for LLM readability and human review
6. hosting and CI/CD scope are still more provider-agnostic and platform-generic than the current preferred operational model
7. repository-structure guidance is intentionally deferred, but now needs a minimal canonical direction before implementation begins

### Issue Type

- misunderstanding of original implementation posture
- architectural clarification before implementation
- stack concretization without changing MVP goals

### Problem Statement

The planning artifacts need a minimal but explicit realignment so that implementation proceeds against the correct stack model:

1. use `portal data pipeline` or `data pipeline` terminology consistently instead of older residual phrasing
2. treat LLM-driven orchestration as the center of MVP authoring and generation workflows
3. state that the current supported orchestration surfaces are GitHub Copilot skills/agents executed from VS Code Chat or Copilot CLI
4. keep strict TypeScript for shared schemas, validators, frontend contracts, and reusable engine code, while allowing isolated deterministic helper scripts in Node.js JavaScript when compilation overhead is not justified
5. constrain governed artifact and refinement formats toward diffable, text-first, LLM-readable, human-reviewable representations
6. prefer GitHub Pages for the public static package, with Cloudflare as fallback rather than the inverse
7. limit repository CI/CD scope to engine development, validation, and publication-package checks rather than portal-data persistence or user-managed production workflows

### Evidence

The current canonical documents already show the partial alignment and the remaining gap:

1. the PRD already states that portal-data transformations are LLM-assisted by default, but does not name the concrete MVP orchestration surfaces
2. the architecture currently says that LLM usage is "an implementation mechanism inside the data pipeline," which understates the intended centrality
3. the architecture currently mandates strict TypeScript broadly, but does not leave room for JavaScript helper scripts
4. the architecture leaves concrete release-evidence template format open and keeps refinement-format guidance at the `patch-grammar` abstraction level only
5. the architecture stays provider-agnostic on hosting, while the current preferred direction is GitHub Pages first and Cloudflare fallback
6. the UX document is already consistent with an offline-first portal data pipeline and does not require behavioral redesign

## 2. Checklist Status

### Section 1 - Understand the Trigger and Context

- 1.1 Triggering story: N/A. This was identified during stack consolidation before implementation starts.
- 1.2 Core problem precisely defined: Done.
- 1.3 Initial impact and evidence gathered: Done.

### Section 2 - Epic Impact Assessment

- 2.1 Current epic impact: Done. Existing epics remain valid.
- 2.2 Required epic-level changes: Action-needed only for one wording alignment in technical additional requirements.
- 2.3 Remaining epic review: Done. No epic invalidation found.
- 2.4 Future epic invalidation or new epic need: None identified.
- 2.5 Epic order or priority change: Not required.

### Section 3 - Artifact Conflict and Impact Analysis

- 3.1 PRD conflict check: Done. Minimal wording updates recommended.
- 3.2 Architecture conflict check: Done. Primary artifact requiring targeted updates.
- 3.3 UX conflict check: Done. No canonical change required.
- 3.4 Other artifact impact: Done. Epics wording alignment recommended; no implementation artifacts need revision yet.

### Section 4 - Path Forward Evaluation

- 4.1 Direct adjustment: Viable.
- 4.2 Potential rollback: Not viable.
- 4.3 PRD MVP review: Not required. MVP remains intact.
- 4.4 Selected approach: Option 1, direct adjustment.

### Section 5 - Proposal Components

- 5.1 Issue summary: Done.
- 5.2 Epic impact and artifact adjustment needs: Done.
- 5.3 Recommended path forward with rationale: Done.
- 5.4 MVP impact and high-level action plan: Done.
- 5.5 Agent handoff plan: Done.

### Section 6 - Final Review and Handoff

- 6.1 Checklist completion review: Done.
- 6.2 Proposal accuracy review: Done.
- 6.3 Explicit user approval: Done through batch review and continue instruction.
- 6.4 Update sprint-status artifact: N/A. No sprint-status artifact exists yet.

## 3. Impact Analysis

### Epic Impact

The epic set remains structurally correct.

No epic split, reorder, deletion, or new epic is required because the change does not alter user value, scope, or story sequencing. The impact is implementation-guidance alignment:

1. Epic 1 remains the correct place for starter-template, workspace, and workflow setup
2. Epic 2 remains the correct place for refinement semantics and final materialization
3. Epic 5 remains the correct place for publication, evidence, and hosting decisions
4. only the technical-additional-requirements wording should be softened to allow JavaScript helper scripts where justified

### PRD Impact

The PRD is already close to the intended model.

It needs only minimal clarification so that the canonical product description no longer stops at "LLM-assisted" and instead records the current MVP execution posture more concretely:

1. the portal data pipeline is LLM-centered in practice
2. GitHub Copilot skills/agents are the current orchestration mechanism
3. deterministic sub-operations may be implemented in Node.js TypeScript or JavaScript
4. no MVP scope expansion is required

### Architecture Impact

The architecture document carries almost all of the required change.

It needs explicit updates in the following areas:

1. decision bullets that currently frame TypeScript and LLM posture too narrowly
2. API and communication section where LLM centrality is understated
3. infrastructure and deployment section where hosting preference and CI/CD scope must be clarified
4. data-architecture / dependency guidance where file formats and refinement patch readability need explicit criteria
5. implementation-governance section where repository layout guidance should become minimally directional rather than fully deferred

### UX Impact

No UX redesign is needed.

The UX document already uses coherent wording around an offline-first portal data pipeline and a public static publishing surface. Any edit here would be cosmetic rather than corrective.

### Technical Impact

This proposal changes implementation guidance, not product scope.

The practical effects are:

1. implementation work can be organized around Copilot-mediated workflows instead of generic orchestration abstractions
2. helper tooling can be chosen pragmatically without violating the canonical architecture
3. governed artifact formats can be selected with LLM readability and manual review as first-class constraints
4. hosting evaluation can start from GitHub Pages rather than a provider-neutral blank slate
5. repository automation can stay focused on the public engine and publishable package, leaving production portal-data operations outside public CI/CD

## 4. Recommended Approach

### Selected Path

Direct adjustment of canonical planning artifacts, centered on the Architecture document.

### Rationale

This is the correct path because it:

1. fixes the mismatch at the documentation root rather than compensating later in implementation
2. keeps all five epics valid and avoids backlog churn
3. preserves the MVP boundary and public experience exactly as already planned
4. makes the stack operationally actionable without prematurely freezing low-level field schemas
5. keeps future implementation consistent with the current practical toolchain centered on GitHub Copilot workflows

Effort: Medium.

Risk: Low to Medium.

Timeline impact: Low if applied before story implementation begins.

### Option Review

**Option 1 - Direct Adjustment:** Viable. Minimal document edits resolve the issue without changing MVP scope or epic structure.

**Option 2 - Potential Rollback:** Not viable. No implemented software or committed backlog structure needs to be undone.

**Option 3 - PRD MVP Review:** Not required. The MVP itself is still the right one; only implementation framing needs correction.

## 5. Detailed Change Proposals

### A. Architecture - Centralize the LLM Execution Model

**Section:** Core Architectural Decisions / API & Communication Patterns

**OLD:**

"Treat TypeScript orchestration plus portal-data LLM-assisted transformations as the default MVP implementation posture for extraction, synthesis, normalization, and drafting, while keeping validators, schemas, and review gates deterministic and explicit."

"Within that boundary, execution may combine deterministic TypeScript transforms and LLM-assisted steps. LLM usage is an implementation mechanism inside the data pipeline, not a replacement for canonical class transitions, explicit materialization, validation, or human approval."

**NEW:**

"Treat the portal data pipeline as LLM-centered by default for extraction, synthesis, normalization, drafting, and guided editorial operations, currently mediated through GitHub Copilot skills and agents. Deterministic validators, schemas, class transitions, and review gates remain explicit and authoritative."

"Within that boundary, the supported MVP orchestration surfaces are VS Code Chat and Copilot CLI. LLM orchestration is the primary execution mode for authoring and generation workflows, while deterministic transforms remain responsible for validation, replayability, materialization, and publish-safety enforcement."

**Rationale:**

This change records the actual intended operating model without weakening governance boundaries.

### B. Architecture - Relax Helper-Script Language Choice Without Weakening Contracts

**Section:** Core Architectural Decisions

**OLD:**

"Use TypeScript in strict mode across content utilities, validation logic, and frontend code."

**NEW:**

"Use TypeScript in strict mode for shared schemas, validators, frontend code, and reusable engine utilities. Isolated deterministic helper scripts may use Node.js JavaScript when compilation overhead is not justified, provided they preserve the same contracts, inputs, outputs, and reviewability."

**Rationale:**

This preserves strong typing where it matters while allowing pragmatic scripting for narrow deterministic helpers.

### C. Architecture - Add Format Criteria for Governed Artifacts and Refinement Deltas

**Section:** Data Architecture / Architecture Readiness Summary

**OLD:**

"`hypercv-refinement` as the replayable editorial delta layer, with no-new-knowledge semantics and only the current patch normative"

"`patch-grammar` defines admissible replayable editorial operations for `hypercv-refinement`"

"The remaining open points are narrower implementation details rather than unresolved operating-model decisions: exact field-level schema details for governed artifacts in `PORTAL_DATA_ROOT`, and the concrete shape of release evidence templates."

**NEW:**

"`hypercv-refinement` remains the replayable editorial delta layer, but its concrete representation must be text-first, diffable, LLM-readable, and easy to review manually. The current patch remains the only normative refinement source."

"`patch-grammar` defines admissible replayable editorial operations for `hypercv-refinement`; its concrete encoding should prefer human-reviewable textual forms such as structured Markdown, YAML, JSON, or equivalent line-oriented representations rather than opaque or tool-only formats."

"The remaining open implementation details are exact field-level schema shapes, concrete release-evidence templates, and the final selection of text-first governed artifact and refinement encodings consistent with replayability, LLM readability, and manual review."

**Rationale:**

This change does not over-freeze formats, but it adds the right decision criteria before implementation picks a concrete representation.

### D. Architecture - Make Hosting Preference Explicit

**Section:** Infrastructure & Deployment

**OLD:**

"Use static CDN deployment with atomic builds, preview environments, and simple rollback capability. Stay provider-agnostic unless a platform introduces a concrete implementation advantage."

**NEW:**

"Use static hosting for the approved public package with atomic deploys and simple rollback capability. Prefer GitHub Pages for V1 when its constraints remain compatible with the required static-output model; keep Cloudflare as the fallback provider if Pages introduces blocking limitations."

**Rationale:**

This preserves optionality while reflecting the current provider preference instead of restarting provider selection during implementation.

### E. Architecture - Narrow Public CI/CD Scope

**Section:** Infrastructure & Deployment

**OLD:**

"CI/CD must verify more than build success:"

**NEW:**

"Repository CI/CD must verify more than build success, but its scope is limited to the public engine, shared validators, dedicated mock datasets, and the publishable static package. Production portal-data persistence, versioning, and operator-run promotion workflows remain outside repository CI/CD scope."

**Rationale:**

This avoids conflating public automation with user-managed production data operations.

### F. Architecture - Add Minimal Repository Structure Direction

**Section:** Implementation Governance Summary

**OLD:**

"the canonical class baseline is `raw`, `deep-knowledge`, `knowledge-base-candidate`, `knowledge-base`, `hypercv-base`, `hypercv-refinement`, `hypercv-final`, `site-data`, and the deployed static site; concrete folder layout remains implementation-phase detail so long as these semantic boundaries remain explicit"

**NEW:**

"the canonical class baseline is `raw`, `deep-knowledge`, `knowledge-base-candidate`, `knowledge-base`, `hypercv-base`, `hypercv-refinement`, `hypercv-final`, `site-data`, and the deployed static site; repository layout should explicitly separate public engine code, dedicated mock datasets, and optional local orchestration helpers from the external `PORTAL_DATA_ROOT`, while exact folder names remain implementation-phase detail"

**Rationale:**

This gives implementation a usable structure rule without prematurely hard-coding directory names.

### G. PRD - Clarify MVP Orchestration Posture

**Section:** MVP - Minimum Viable Product

**OLD:**

"Portal-data transformations are expected to be LLM-assisted by default where they improve extraction, synthesis, normalization, and drafting quality, while remaining governed by explicit schemas, validators, revision rules, and human review."

**NEW:**

"Portal-data workflows are expected to be LLM-centered by default for extraction, synthesis, normalization, drafting, and editorial assistance, currently using GitHub Copilot skills and agents through VS Code Chat or Copilot CLI. These workflows remain governed by explicit schemas, validators, revision rules, and human review."

**Rationale:**

The PRD should reflect the current MVP execution reality without altering product scope.

### H. PRD - Clarify Generator Implementation Allowances

**Section:** FR6

**OLD:**

"TypeScript orchestration, deterministic transforms, and LLM-assisted generation are all acceptable implementation choices so long as canonical contracts, provenance, and review obligations remain intact."

**NEW:**

"GitHub Copilot-mediated LLM orchestration is the default MVP generation posture. Deterministic transforms may be implemented in Node.js TypeScript or JavaScript where appropriate, so long as canonical contracts, provenance, replayability, and review obligations remain intact."

**Rationale:**

This keeps FR6 aligned with the corrected architecture while remaining implementation-flexible.

### I. Epics - Align One Technical Requirement With the Revised Runtime Posture

**Section:** Additional Requirements

**OLD:**

"Enforce shared schema validation and strict TypeScript across ingestion, transformation, review, release checks, and frontend-facing contracts."

**NEW:**

"Enforce shared schema validation and strict TypeScript for shared schemas, validators, reusable engine code, and frontend-facing contracts, while allowing isolated Node.js JavaScript helper scripts where compilation overhead is not justified."

**Rationale:**

The epic set remains correct, but this wording should match the corrected architecture before implementation starts.

### J. UX - No Change Proposed

**Section:** UX Design Specification

**Proposal:** No canonical change.

**Rationale:**

The UX document already uses the right operating framing and does not block implementation.

## 6. MVP Impact and High-Level Action Plan

### MVP Impact

The MVP is unchanged.

No feature is added, removed, or deferred. The proposal only sharpens implementation guidance and operational boundaries.

### High-Level Action Plan

1. update `architecture.md` first, because it is the canonical source of most affected implementation decisions
2. apply the two PRD wording changes so product and architecture remain consistent
3. apply the one epics wording alignment so story implementation guidance does not drift
4. leave `ux-design-specification.md` unchanged
5. after approval, use the updated architecture wording as the source of truth for story implementation and any future quick specs

### Dependencies and Sequencing

1. Architecture update before implementation kickoff
2. PRD and epics alignment immediately after architecture update
3. no backlog resequencing needed
4. no story rewrite needed unless implementation later exposes a stronger need for format-specific acceptance criteria

## 7. Implementation Handoff

### Scope Classification

Moderate.

The change crosses multiple canonical planning artifacts, but it does not require MVP redesign, epic restructuring, or backlog rollback.

### Handoff Recipients

1. Product Owner / Scrum Master: approve the cross-artifact wording realignment and keep backlog decomposition anchored to the updated architecture
2. Architect: apply the architecture corrections and preserve the distinction between LLM-centered orchestration and deterministic governance
3. Development planning: use the updated architecture to choose helper runtimes, governed formats, and hosting bootstrap order

### Success Criteria

This proposal is successful if the canonical planning set makes the following points unambiguous:

1. the portal data pipeline is the semantic and operational center of the MVP
2. GitHub Copilot skills/agents in VS Code Chat or Copilot CLI are the current orchestration surfaces
3. TypeScript remains the default for shared engine contracts, but JavaScript helpers are allowed in narrow deterministic cases
4. governed artifact and refinement formats are selected using replayability, diffability, LLM readability, and manual reviewability as explicit criteria
5. GitHub Pages is the preferred V1 public host, with Cloudflare fallback
6. repository CI/CD governs engine and publishable-package quality, not user-managed production portal-data persistence

## 8. Closure

This batch proposal recommends targeted updates to:

1. [_bmad-output/planning-artifacts/architecture.md](_bmad-output/planning-artifacts/architecture.md)
2. [_bmad-output/planning-artifacts/prd.md](_bmad-output/planning-artifacts/prd.md)
3. [_bmad-output/planning-artifacts/epics.md](_bmad-output/planning-artifacts/epics.md)

No update is recommended for:

1. [_bmad-output/planning-artifacts/ux-design-specification.md](_bmad-output/planning-artifacts/ux-design-specification.md)

The proposal has been approved and applied to the canonical planning artifacts.