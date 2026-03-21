---
workflowType: sprint-change-proposal
preparedDate: '2026-03-21'
project: alecsg77-portal
status: approved-implemented
executionMode: incremental
changeScope: moderate
triggerType: portal-data-boundary-realignment
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
approvalStatus: approved-and-applied-2026-03-21
---

# Sprint Change Proposal - Engine and Portal Data Boundary Realignment

## 1. Issue Summary

### Trigger

The current PRD and Architecture still described parts of the system using a generic public/private framing and, in some sections, still treated a repository-backed private setup as the implied operational baseline.

The required model is narrower and more reusable: the project governs the public engine and the data boundary, while user data persistence, versioning, and recovery remain outside project scope.

### Issue Type

- requirement clarification from stakeholder direction
- operating-model simplification before implementation
- terminology correction to prevent future decomposition drift

### Problem Statement

The planning set needed to be corrected so that it consistently states:

1. the project boundary is `public engine + portal data boundary`, not generic public/private language
2. the project consumes an externally managed `PORTAL_DATA_ROOT`
3. the project does not prescribe or govern how user data are versioned, persisted, or recovered
4. the public repository must remain runnable with sanitized fixtures even when real portal data are unavailable

## 2. Checklist Status

### Section 1 - Understand the Trigger and Context

- 1.1 Triggering story: N/A. Epics and stories do not exist yet.
- 1.2 Core problem precisely defined: Done.
- 1.3 Initial impact and evidence gathered: Done.

### Section 2 - Epic Impact Assessment

- 2.1 Current epic impact: N/A. No epics exist yet.
- 2.2 Required epic-level changes: N/A before decomposition.
- 2.3 Remaining epic review: N/A.
- 2.4 Future epic invalidation or new epic need: None identified.
- 2.5 Epic order or priority change: N/A.

### Section 3 - Artifact Conflict and Impact Analysis

- 3.1 PRD conflict check: Done. Targeted updates applied.
- 3.2 Architecture conflict check: Done. Targeted updates applied.
- 3.3 UX conflict check: Done. Minimal framing update applied.
- 3.4 Other artifact impact: Done. Existing historical proposals preserved; new proposal added for this realignment.

### Section 4 - Path Forward Evaluation

- 4.1 Direct adjustment: Viable.
- 4.2 Potential rollback: Not viable.
- 4.3 PRD MVP review: Not required. MVP direction remains valid.
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
- 6.3 Explicit user approval: Done through incremental review and proceed instruction.
- 6.4 Update sprint-status artifact: N/A. No sprint-status artifact exists yet.

## 3. Impact Analysis

### PRD Impact

The PRD required terminology and operating-model corrections in order to:

1. replace generic private-domain language with portal-data boundary language
2. replace older private-pipeline wording with portal-data wording where appropriate
3. introduce `PORTAL_DATA_ROOT` as the explicit external configuration root
4. remove assumptions about repository-backed private baselines

### Architecture Impact

The Architecture required stronger correction because it still embedded now-rejected assumptions:

1. private repository as persistence and recovery baseline
2. older private-workspace and private-data-root wording
3. security and deployment language tied to private-repository governance
4. implementation-governance bullets that still framed `site-data` and canonical artifacts as private by architectural principle rather than as governed data inside the external root

### UX Impact

The UX impact is minimal.

The public experience remains unchanged. Only the internal framing of the author-administrator role was updated so that the UX document no longer depends on the older private-pipeline language.

### Technical Impact

The technical model is now clearer and more reusable:

1. anyone can clone the public repository and work with sanitized fixtures
2. real data are supplied through an external `PORTAL_DATA_ROOT`
3. the project remains agnostic about whether the user versions those data, how they store them, or whether they co-manage them with other materials
4. `site-data` remains a non-authoritative generated projection within the external data root

## 4. Recommended Approach

### Selected Path

Direct adjustment of the active planning artifacts.

### Rationale

This path is preferred because it:

1. fixes the root semantic issue without changing MVP scope
2. removes governance assumptions that do not belong to the product
3. keeps the project reusable by third parties
4. preserves the existing canonical class model while relocating it into a user-managed data space instead of a project-governed private domain abstraction

Effort: Medium.
Risk: Low.

## 5. Detailed Change Proposals

### Proposal A - PRD Terminology Realignment

Applied updates:

1. older pipeline wording -> `data pipeline` or `portal-data` wording where architectural privacy was not the intended point
2. older engine/data split wording -> `engine / portal data split`
3. older data-root wording -> `PORTAL_DATA_ROOT`
4. removal of repository-local workspace assumptions

### Proposal B - Architecture Boundary Realignment

Applied updates:

1. private repository baseline removed from infrastructure and governance sections
2. architecture now refers to an externally managed `PORTAL_DATA_ROOT`
3. persistence, versioning, and recovery of portal data are explicitly out of project scope
4. residual private-domain terminology removed from data architecture and implementation governance

### Proposal C - UX Framing Alignment

Applied updates:

1. `private offline-first content pipeline` -> `offline-first portal data pipeline`
2. `private content pipeline` -> `portal data pipeline`

## 6. Implementation Handoff

### Scope Classification

Moderate.

The changes are planning-level and cross-artifact, but they do not require MVP redesign.

### Handoff Recipients

1. Product / planning owner: use the updated wording as the canonical baseline for future decomposition.
2. Architecture / implementation planning: use `PORTAL_DATA_ROOT` as the only supported design-time data-root concept.
3. UX / frontend planning: continue treating `site-data` as generated projection input, with no change to the public interaction model.

### Success Criteria

This realignment is successful if future implementation and decomposition consistently assume that:

1. the public repository contains reusable engine code only
2. real portal data live outside the public repository tree
3. `PORTAL_DATA_ROOT` is the only canonical runtime configuration concept for real data
4. the project does not prescribe how users persist or version their data

## 7. Closure

This change proposal has been implemented through updates to:

1. [_bmad-output/planning-artifacts/prd.md](_bmad-output/planning-artifacts/prd.md)
2. [_bmad-output/planning-artifacts/architecture.md](_bmad-output/planning-artifacts/architecture.md)
3. [_bmad-output/planning-artifacts/ux-design-specification.md](_bmad-output/planning-artifacts/ux-design-specification.md)

The issue is closed unless additional artifacts need to be realigned to the same boundary model.