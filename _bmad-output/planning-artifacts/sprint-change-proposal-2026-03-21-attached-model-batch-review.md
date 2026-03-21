---
workflowType: sprint-change-proposal
preparedDate: '2026-03-21'
project: alecsg77-portal
status: completed
executionMode: batch
changeScope: minor
triggerType: attached-model-post-alignment-review
inputDocuments:
  - attached private-pipeline-definition.md
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/portal-data-canonical-model.md
  - _bmad-output/planning-artifacts/portal-data-canonical-crosswalk-2026-03-21.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
approvalStatus: approved-completed-2026-03-21
---

# Sprint Change Proposal - Attached Portal Data Model Batch Review

## 1. Issue Summary

### Trigger

The attached `private-pipeline-definition.md` was reviewed against the current canonical planning set after the March 21 canonical realignment.

The purpose of this batch review is not to reopen model discovery from zero, but to determine whether the attached source still reveals missing or weakened planning rules in the current canonicals.

### Problem Statement

The current planning set must be checked for one specific risk:

1. the March 21 realignment may have corrected the main terminology and lifecycle structure but still left residual semantic detail outside the canonicals
2. future epic and story decomposition could still drift if those residual rules remain only in crosswalk notes or in the attached source

### High-Level Finding

The current canonical planning set already absorbs the large majority of the attached model.

No major PRD rewrite, architecture rewrite, or UX rewrite is required.

The only residual clarification opportunities were concentrated in the companion canonical artifact rather than in the PRD or the main Architecture document.

Those two micro-clarifications have now been applied. This sprint-change request is therefore closed as completed.

## 2. Checklist Status

### Section 1 - Understand the Trigger and Context

- 1.1 Triggering story: N/A. Epics and stories do not exist yet.
- 1.2 Core problem precisely defined: Done.
- 1.3 Current canonical set loaded and reviewed: Done.

### Section 2 - Epic Impact Assessment

- 2.1 Current epic impact: N/A. No epics exist yet.
- 2.2 Required epic-level changes: None at this stage beyond preserving the already corrected canonical baseline.
- 2.3 Remaining epic review: N/A.
- 2.4 Future epic invalidation or new epic need: Not triggered by this review alone.
- 2.5 Epic order or priority change: N/A before first decomposition.
- 2.6 Closure dependency on epic existence: None. Completion of this sprint-change request does not require epics to exist.

### Section 3 - Artifact Conflict and Impact Analysis

- 3.1 PRD conflict check: Done. No primary conflict found.
- 3.2 Architecture conflict check: Done. No primary conflict found.
- 3.3 UX conflict check: Done. No change needed.
- 3.4 Companion artifact check: Done. Minor clarification opportunities found and applied.

### Section 4 - Path Forward Evaluation

- 4.1 Direct adjustment: Viable, but only as a minor companion-artifact clarification pass.
- 4.2 Potential rollback: Not applicable.
- 4.3 PRD MVP review: Not required.
- 4.4 Selected approach: Keep current canonical realignment and apply the narrow companion-artifact clarification pass.

## 3. Impact Analysis

### Epic Impact

No current epic is affected because epics do not yet exist.

The impact is preventive only: preserve the corrected canonical baseline so that future decomposition continues to inherit the right class model, transition model, review semantics, and projection boundary.

### Story Impact

No current stories are affected because stories do not yet exist.

The value of this review is to confirm that future stories should decompose from the already corrected canonical set rather than from the attached source directly.

### Artifact Findings

#### PRD

The PRD is already aligned with the attached model at the planning level.

It now correctly expresses:

1. `knowledge-base-candidate` as the governed review-entry layer
2. `knowledge-base` as the unified governed center with `current` and `deprecated` partitions
3. `hypercv-base`, `hypercv-refinement`, and `hypercv-final` as the canonical HyperCV lifecycle
4. `site-data` as a generated projection inside the portal data root rather than an authoring layer
5. planning-level roles for `user-persona`, `patch-grammar`, `hypercv-docs-spec`, and `hypercv-distillation-profile`
6. the explicit transition chain from `raw` to deployed static site

No material PRD gap remains relative to the attached source at planning density.

#### Architecture

The Architecture document is already aligned with the attached model at the structural and operational level.

It now correctly expresses:

1. the corrected class sequence
2. the shared validation taxonomy
3. transition-local validation subordinate to full target-class validity
4. reviewability of candidate, base, refinement, and final
5. the role of `knowledge-base-deprecated` as a downstream guardrail
6. the projection-only role of `site-data`

No material Architecture conflict remains relative to the attached source.

#### UX Design Specification

No UX contradiction was found.

The UX document remains correctly downstream of the semantic model and does not need to encode the dense portal-data rules.

#### Companion Canonical Artifact

The companion artifact already preserves most of the attached model's dense normative rules.

Residual clarification opportunities are minor and localized:

1. the `deep-knowledge` section preserves optionality and append-only semantics, but the source document's explicit `deep-knowledge-current` / `deep-knowledge-archived` subclass wording is only partially surfaced today
2. the crosswalk keeps `projection integrity` explicitly transition-first and source-comparative, but that exact phrasing could be restated inside the companion artifact itself for stronger self-sufficiency

These are precision improvements, not structural planning gaps.

Update:

Both precision improvements have been applied to the companion canonical artifact. No further artifact change is recommended from this review.

## 4. Recommended Approach

### Option 1 - No Canonical Rewrite

Viable and preferred.

Treat the March 21 canonical realignment as successful and continue using the current PRD, Architecture, and companion artifact as the canonical planning baseline.

Effort: Low.
Risk: Low.

### Option 2 - Minor Companion Clarification Pass

Also viable.

Keep PRD, Architecture, and UX unchanged. Apply only a narrow clarification pass to the companion artifact so that two residual details become explicit inside the canonical model itself instead of remaining reconstructable only through the crosswalk or the attached source.

Effort: Low.
Risk: Low.

### Option 3 - Reopen Broad Canonical Editing

Not recommended.

The evidence does not support a major reopen of PRD or Architecture. Doing so would create churn without reducing meaningful planning risk.

Effort: Medium.
Risk: Medium.

### Selected Path

Option 2 was selected and completed. The change is now closed as completed.

Operationally, this means:

1. keep the current PRD unchanged
2. keep the current Architecture unchanged
3. keep the current UX unchanged
4. tighten two lines in the companion canonical artifact and treat the review as complete

## 5. Detailed Change Proposals

### Proposal A - PRD

Status: No change required.

Rationale:

The PRD now carries the correct planning-level boundary, class, transition, and dependency-interface rules. Additional density from the attached source would overload the PRD rather than improve decomposition safety.

### Proposal B - Architecture

Status: No change required.

Rationale:

The Architecture document already absorbs the structural and operational model expected from the attached source. Reopening it would duplicate semantics already correctly placed in the companion artifact.

### Proposal C - UX Design Specification

Status: No change required.

Rationale:

The attached source concerns portal-data semantics and governance, not the public interaction model. The UX document is still correctly aligned as long as the frontend remains projection-only.

### Proposal D - Companion Canonical Artifact Clarification

Status: Applied.

#### Change D1 - Explicit `deep-knowledge` subclass note

Add a short rule clarifying that when the optional `deep-knowledge` layer is operationally split, `deep-knowledge-current` represents material still awaiting candidate generation and `deep-knowledge-archived` represents material already processed and retained for traceability.

Rationale:

The attached source states this explicitly. The current companion artifact preserves optionality and transition semantics, but the subclass names are not yet equally explicit in the class section.

#### Change D2 - Explicit projection-integrity wording

Add a short rule clarifying that `projection integrity` is transition-first and source-comparative, and remains a class-level concern only where a layer is defined by persisted, verifiable dependence on a source artifact.

Rationale:

The current crosswalk preserves this nuance, but the companion artifact would be more self-contained if it stated the rule directly.

## 6. Recommended Next Steps

1. treat the current canonical set as the authoritative baseline for future epic creation
2. use the updated companion artifact as the self-sufficient dense normative reference
3. consider this review closed unless a new external source reveals a materially new rule domain
4. before future epic decomposition, use the current canonical set plus the companion artifact rather than the attached source as the planning input

## 7. Closure Note

This review is closed as completed with micro-clarifications applied.

Closure does not depend on epic or story existence because this request only required canonical alignment review, companion-artifact clarification, and explicit confirmation that current epic/story impact is N/A until decomposition begins.

Applied clarifications:

1. explicit `deep-knowledge-current` / `deep-knowledge-archived` operational note
2. explicit `projection integrity` wording as transition-first and source-comparative

## 8. Implementation Handoff

### Scope Classification

Minor.

### Handoff Recipients

- Product Manager / Architect for closure decision
- Future Scrum Master workflow for decomposition input selection

### Deliverables

1. this batch review proposal
2. the current canonical planning set already in force
3. applied micro-clarifications in the companion canonical artifact
4. explicit closure decision recorded independently from future epic creation

### Success Criteria

This change is considered successfully handled if all of the following remain true:

1. future epics decompose from the corrected canonical planning set, not from superseded terminology
2. PRD and Architecture are not reopened unnecessarily
3. any remaining precision edits are confined to the companion artifact only
4. projection, review, and validation semantics remain reconstructable without returning to the attached source as an authoritative planning dependency