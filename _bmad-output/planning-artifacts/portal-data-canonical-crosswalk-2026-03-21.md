---
workflowType: planning-change-crosswalk
preparedDate: '2026-03-21'
project: alecsg77-portal
status: complete
purpose: map-portal-data-model-absorption-into-canonical-planning-set
sourceBrief: _bmad-archive/planning-artifacts/private-pipeline-canonical-change-proposal-2026-03-21.md
targetArtifacts:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/portal-data-canonical-model.md
---

# Portal Data Canonical Absorption Crosswalk

Absorption status: complete. The mapped responsibilities in this crosswalk are now reflected in the active canonical planning set.

## 1. Purpose

This crosswalk translates the March 21 delta brief into explicit canonical destinations.

It exists to answer four execution questions without reopening model discovery:

1. which source-information domains must survive
2. where each domain must land
3. which terminology conflicts must be resolved rather than accumulated
4. which dense rules belong in the companion canonical artifact instead of being flattened into PRD or Architecture

## 2. Terminology Resolutions

| Conflict Area | Current Canonical Tension | Required Resolution | Primary Destination |
| --- | --- | --- | --- |
| HyperCV intermediates | `hypercv-draft` and `hypercv-composition` still appear as the primary intermediate model | realign canonicals around `hypercv-base`, `hypercv-refinement`, and `hypercv-final`; keep older terms only if explicitly declassified or mapped | PRD + Architecture + companion artifact |
| Knowledge-base modeling | current canonicals still imply derived/manual subclasses as the main split | promote `knowledge-base-candidate` as review-entry layer and treat `knowledge-base` as one governed center with `current` and `deprecated` partitions | PRD + Architecture + companion artifact |
| Review granularity | review is mandatory but review unit is still too abstract | attach review to governed units and explicit outcomes at candidate, base, refinement, and final stages | PRD + Architecture + companion artifact |
| Validation semantics | validation domains exist but are still blurred | standardize shared validation taxonomy; distinguish transition-local validation from full target-class validity | Architecture + companion artifact |
| Projection semantics | `site-data` is derived but still easy to overinterpret as an authoring surface | formalize `site-data` as downstream projection with no semantic repair and no semantic invention | PRD + Architecture + companion artifact |

## 3. Source Domain Absorption Map

| Source Domain | Must Preserve | PRD Responsibility | Architecture Responsibility | Companion Artifact Responsibility |
| --- | --- | --- | --- | --- |
| Validation model | reusable taxonomy, local-vs-full validation, projection-integrity rule, content-safety distinction | state governance intent and review obligation | define shared validation model and class-transition semantics | spell out class-by-class and transition-by-transition validation objectives |
| Classes | role, authority, persistence, governance posture, validation focus | summarize planning-level role and governance significance | define structural class model and lifecycle ordering | preserve dense per-class rules, optional-layer semantics, and decomposition guardrails |
| External dependencies | minimal contracts for `user-persona`, `patch-grammar`, `hypercv-docs-spec`, `hypercv-distillation-profile` | state high-level role and non-negotiable limits | define structural dependency boundaries and downstream effects | preserve normative interface rules and failure conditions |
| Transitions | semantic purpose, constraints, validation focus, provenance and reviewability | summarize planning-rule implications | define operational transition model | preserve dense transition rules and decomposition-safe detail |

## 4. Canonical Target Allocation

### 4.1 PRD

The PRD should absorb only planning-level rules that later epics and stories must not reinvent:

1. only the deployed static site crosses into the public runtime domain
2. `knowledge-base-candidate` is the review-entry layer
3. `knowledge-base` is a unified governed center with semantically active `current` and `deprecated` partitions
4. knowledge maintenance and editorial refinement are distinct change types
5. LLM usage is confined to the governed data pipeline and cannot replace schemas, validators, class contracts, or human review
6. projection and delivery may not repair meaning or invent semantics
7. `user-persona`, `patch-grammar`, `hypercv-docs-spec`, and `hypercv-distillation-profile` have planning-level roles and non-negotiable boundary rules

### 4.2 Architecture

The Architecture document should absorb the structural and operational model:

1. canonical class sequence
2. replacement of the older `hypercv-draft` and `hypercv-composition` primary model where conflicting
3. explicit review granularity across candidate, base, refinement, and final
4. explicit role of `knowledge-base-deprecated` as downstream exclusion guardrail
5. shared validation model with transition-local validation subordinate to full target-class validation
6. provenance obligations per class and per transition
7. regeneration semantics and replay-conflict handling
8. tightened projection contract forbidding semantic invention in projection or frontend layers

### 4.3 Companion Canonical Artifact

The companion artifact at [_bmad-output/planning-artifacts/portal-data-canonical-model.md](_bmad-output/planning-artifacts/portal-data-canonical-model.md) should absorb dense normative detail that would overload the main Architecture document:

1. class-by-class validation objectives
2. transition-by-transition validation objectives
3. normalized decision rules
4. dependency-interface rules
5. decomposition guardrails for future epic and story creation
6. semantic-drift taxonomy
7. replay-conflict blocking rules
8. optional-layer semantics that must still remain explicit when present

## 5. Class Absorption Matrix

| Class | PRD | Architecture | Companion Artifact |
| --- | --- | --- | --- |
| `raw` | mention as transient ingestion input only | define as non-persisted, non-governed class with meaning-preserving normalization constraints | preserve exact admissible normalization semantics |
| `deep-knowledge` | mention as first persisted governed boundary | define append-only, optional persisted layer in the portal data root | preserve split, optionality, and non-canonical downstream role |
| `knowledge-base-candidate` | introduce as review-entry layer | define reviewable proposal layer and allowed outcomes | preserve partial review and mixed-outcome rules |
| `knowledge-base-current` | mention as positive governed knowledge | define reusable approved source material | preserve class-level validation and downstream usage rules |
| `knowledge-base-deprecated` | mention as active negative guardrail | define exclusion and veto role | preserve non-reintroduction semantics |
| `knowledge-base` | define unified governed center | define logical center with current/deprecated partitions | preserve maintenance rules and class integrity constraints |
| `hypercv-base` | mention as first generated materialization | define spec/profile-constrained generated layer | preserve recognizability and validity rules |
| `hypercv-refinement` | mention as replayable editorial delta | define no-new-knowledge refinement layer | preserve current-patch normativity and replayability rules |
| `hypercv-final` | mention as approved canonical publication source in the portal data root | define semantically stable canonical materialization | preserve change-lever distinction and semantic-drift taxonomy |
| `site-data` | mention as subordinate projection only | define localized generated projection with no authoring authority | preserve projection-only and no-semantic-repair rules |
| `deployed static site` | mention as only public runtime artifact | define public delivery boundary | preserve publish-safety and release-coherence obligations |

## 6. Transition Absorption Matrix

| Transition | PRD | Architecture | Companion Artifact |
| --- | --- | --- | --- |
| `raw` -> `deep-knowledge-current` | mention as ingestion normalization without creating a persistent raw class | define format-preserving normalization and first persisted boundary | preserve losslessness and omission constraints |
| `deep-knowledge` -> `knowledge-base-candidate` | mention as governed preparation for review | define candidate-generation semantics and deprecated-side veto context | preserve deduplication, enrichment, and veto rules |
| `knowledge-base-candidate` -> `knowledge-base-current` / `knowledge-base-deprecated` / discard | mention explicit governed review outcomes | define review closure and reconstructable rationale | preserve mixed-outcome and partial-decision rules |
| `knowledge-base` -> `hypercv-base` | mention generated HyperCV materialization | define spec/profile-driven generation and provenance obligations | preserve dependency and veto-context rules |
| `hypercv-base` + `hypercv-refinement` -> `hypercv-final` | mention replayable editorial materialization | define replay conflict as approval blocker | preserve patch grammar and no-new-knowledge constraints |
| `hypercv-final` + `user-persona` -> `site-data` | mention projection-only persona effect | define localized projection contract | preserve no-claim-alteration rule |
| `site-data` -> `deployed static site` | mention delivery-only publication step | define publish boundary and non-semantic delivery behavior | preserve safety, accessibility, performance, and release-coherence checks |

## 7. Constraints That Must Stay Explicit

The following constraints must remain reconstructable after absorption and therefore require explicit placement, not implied intent:

1. deprecated knowledge remains semantically active
2. candidate review remains non-atomic
3. `hypercv-base` validity is stronger than draft-like language suggests
4. only the current refinement patch is normative
5. knowledge-base change, document-spec change, distillation-profile change, and refinement change remain distinct levers
6. semantic drift must be triaged as admissible, suspicious, or non-admissible
7. projection integrity remains transition-first and source-comparative
8. raw normalization remains meaning-preserving
9. replay conflict blocks approval
10. projection remains downstream-only and non-authoring

## 8. Execution Notes

This crosswalk is complete enough for proposal drafting and canonical editing if all of the following remain true:

1. PRD receives only planning-density rules, not the full dense model
2. Architecture receives the structural and operational model without becoming the only place where nuances live
3. the companion artifact is treated as canonical and normative, not as an optional appendix
4. later epic and story workflows can derive class identity, transition contracts, and review-validation semantics without consulting deleted upstream private-model files