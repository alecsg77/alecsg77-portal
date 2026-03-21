workflowType: planning-change-preparation
preparedDate: '2026-03-21'
project: alecsg77-portal
status: draft
purpose: prepare-a-consistent-canonical-change-proposal
skillReady: true
recommendedConsumer: bmad-correct-course
executionMode: delta-only
primaryObjective: absorb the private pipeline model into canonical planning documents without semantic loss
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/gray-area-review-2026-03-17.md
---

# Private Pipeline Canonical Change Proposal Preparation

## Skill Header

### Intended Consumer

This document is written to be consumed directly by a correction or change-proposal workflow, especially `bmad-correct-course`.

### Execution Prompt

Use this document as the authoritative delta-oriented brief for canonical planning realignment.

Your task is to produce a change proposal that updates the canonical planning set so that the private pipeline model is absorbed explicitly and decomposition-safely into the project baseline.

You should treat this document as the current source of truth for the required realignment and you should not expect a separate source-model document to remain available.

### Inputs You Must Use

1. [prd.md](/workspaces/alecsg77-portal/_bmad-output/planning-artifacts/prd.md)
2. [architecture.md](/workspaces/alecsg77-portal/_bmad-output/planning-artifacts/architecture.md)
3. [gray-area-review-2026-03-17.md](/workspaces/alecsg77-portal/_bmad-output/planning-artifacts/gray-area-review-2026-03-17.md)
4. this document as the delta-oriented realignment brief

### Outputs You Must Produce

1. A PRD change set
2. An Architecture change set
3. A new companion canonical artifact at `_bmad-output/planning-artifacts/private-pipeline-canonical-model.md`
4. A clear crosswalk explaining where the absorbed model now lives

### Non-Negotiable Execution Rules

1. Preserve product direction; do not redesign the product from zero.
2. Resolve model conflicts explicitly; do not layer conflicting terminology on top of existing canonicals.
3. Preserve all meaningful class, transition, validation, review, projection, and regeneration semantics from this brief.
4. Keep the outcome decomposition-safe for future epic and story generation.
5. Treat this as a delta-oriented canonical realignment, not as a source archive restoration exercise.
6. Treat the requirements in this document as settled unless they conflict with an explicitly listed model conflict that must be resolved.

### Success Condition

The change proposal is successful only if a future epic/story workflow can rely on the canonical planning set without needing any deleted upstream private-model source file.

## 1. Purpose

This document records the delta-oriented proposal for canonical planning realignment of the private pipeline model.

It is intentionally not a source archive. It is meant to answer four questions:

1. what information from the source must be preserved
2. what must change in the canonical planning set
3. where each information domain belongs
4. what the later correction workflow should actually do

It is not yet the final PRD or Architecture change set. It is the preparation layer that gives the next workflow a precise execution target.

## 2. Change Framing

This should be framed as a planning realignment, not as a redesign from zero.

The current PRD and Architecture already point in the right direction, but they do not yet express the private pipeline model with enough clarity for safe epic and story decomposition.

The source document sharpens six areas that are currently under-specified or internally inconsistent:

- class boundaries
- transition contracts
- validation semantics
- review and approval granularity
- refinement versus knowledge maintenance
- projection and regeneration rules

## 3. Canonical Absorption Strategy

The source content should be redistributed across three canonical targets:

1. PRD
2. Architecture
3. A new companion canonical artifact

This is not a split between canonical and non-canonical material. It is a stratified absorption of one semantic model across multiple planning layers.

Recommended new artifact:

- `_bmad-output/planning-artifacts/private-pipeline-canonical-model.md`

Recommended role of the new artifact:

- preserve the detailed rule density needed for epic and story decomposition without overloading PRD and Architecture

### 3.1 Interpretation Rule: Delta, Coverage, Constraints

This document uses three different semantic layers and they should not be collapsed into each other.

`Delta` means what the canonical planning set must change, add, realign, or resolve.

`Coverage` means what informational domains, classes, transitions, and dependencies must remain assigned somewhere in the canonical planning set after absorption.

`Constraints` means what must not be weakened, flattened, reinterpreted loosely, or silently dropped while executing the absorption.

## 4. Core Delta To The Canonical Set

The goal of the delta is not only to move information between documents.

It is to ensure that later epic and story decomposition can recover, without ambiguity, the following three kinds of rule:

1. class identity rules
2. transition contract rules
3. review, validation, and publication-governance rules

### 4.0 Integrated Delta Summary

The integrated delta to execute is:

1. realign the canonical class and transition model
2. resolve terminology conflicts in the current canonicals
3. make review, validation, provenance, regeneration, and projection rules explicit where they are currently soft
4. assign dense normative detail to a companion canonical artifact instead of losing it
5. explicitly block the simplifications that would make the future change set easier to write but semantically unsafe

### 4.1 PRD Delta

The PRD should absorb the product and governance implications of the source model.

Required PRD changes:

1. Make explicit that only the deployed static site crosses into the public runtime domain.
2. Replace generic offline-pipeline wording with governed class-transition wording.
3. Introduce `knowledge-base-candidate` explicitly as the review-entry layer.
4. Clarify that `knowledge-base` is the governed center with active `current` and `deprecated` roles.
5. Promote the distinction between knowledge maintenance and editorial refinement to planning-rule status.
6. Make review, approval, traceability, stale detection, and re-review obligations explicit.
7. State that LLM usage is allowed only inside the governed private pipeline and never replaces schemas, validators, class contracts, or human review.
8. State that projection and delivery layers may not repair semantics.
9. Add the planning-level role of `user-persona`, `patch-grammar`, `hypercv-docs-spec`, and `hypercv-distillation-profile`.

### 4.2 Architecture Delta

The Architecture document should absorb the structural and operational form of the model.

Required Architecture changes:

1. Realign the class model to:
   `raw` -> `deep-knowledge` -> `knowledge-base-candidate` -> `knowledge-base` -> `hypercv-base` -> `hypercv-refinement` -> `hypercv-final` -> `site-data` -> `deployed static site`.
2. Replace or reconcile the older `hypercv-draft` and `hypercv-composition` primary model where it conflicts with `hypercv-base` and `hypercv-refinement`.
3. Make review granularity explicit at candidate, base, refinement, and final stages.
4. Make the role of `knowledge-base-deprecated` explicit as a downstream exclusion guardrail.
5. Standardize the validation model and the distinction between transition-local validation and full target-class validation.
6. Make regeneration semantics explicit enough to guide backlog decomposition.
7. Tighten the projection contract so frontend and projection layers cannot invent semantic fields or shadow schemas.
8. Make provenance obligations explicit per class and per transition.

Additional Architecture emphasis:

- the architecture change set must preserve not only class names but also the difference between persisted, governed, canonical, regenerable, and publishable layers
- the architecture change set must preserve the fact that some layers are optional while still requiring explicit semantics when present
- the architecture change set must preserve that deprecated-side exclusions can shape downstream generation and therefore belong to provenance reasoning

### 4.3 Companion Artifact Delta

The companion artifact should absorb the dense normative material that would otherwise make the main Architecture document too heavy.

It should contain:

1. class-by-class validation objectives
2. transition-by-transition validation objectives
3. normalized decision rules
4. dependency-interface rules
5. decomposition guardrails for epic and story creation

The companion artifact should be treated as the place where local rule density becomes explicit again, especially where the main Architecture document would otherwise flatten important distinctions.

## 5. Conflicts To Resolve

The future change workflow must resolve, not merely accumulate, the following conflicts:

| Conflict Area | Current Tension | Required Resolution |
| --- | --- | --- |
| HyperCV intermediates | `hypercv-draft` and `hypercv-composition` still appear as primary canonical layers | realign canonicals around `hypercv-base`, `hypercv-refinement`, and `hypercv-final` |
| Knowledge-base modeling | current canonicals still imply a looser operational split than the source model | promote `knowledge-base-candidate` and treat `knowledge-base` as unified governed center with `current` and `deprecated` partitions |
| Review granularity | review is mandatory but still too abstract | attach review to governed units and explicit outcomes |
| Validation semantics | validation exists but is not sharply partitioned | standardize reusable validation domains and make target-class validity dominant |
| Projection semantics | `site-data` is derived but still structurally soft | formalize `site-data` as subordinate projection with no semantic repair |

## 6. Source Coverage Map

The source document contains four substantive information domains. None of them should be lost.

| Source Domain | What Must Be Preserved | Canonical Destination |
| --- | --- | --- |
| Validation model | reusable taxonomy, partial-vs-full validation rule, projection-integrity semantics, content-safety distinction | Architecture + companion artifact |
| Classes | role, authority, persistence, governance posture, validation focus of each class | PRD summary + Architecture + companion detail |
| External dependencies | minimal interfaces and boundary rules for `user-persona`, `patch-grammar`, `hypercv-docs-spec`, `hypercv-distillation-profile` | PRD summary + Architecture + companion detail |
| Transitions | semantic purpose, constraints, validation focus, provenance and reviewability expectations of each transition | Architecture + companion artifact |

Coverage note:

- the source should be treated as containing not only domains, but also fine-grained normative nuances inside those domains
- the matrices below preserve the destination of the information, while the density notes preserve the non-obvious distinctions that must not be flattened during change execution

## 7. Class Coverage Matrix

This section preserves the source content in compact informational form rather than verbatim form.

| Class | Role To Preserve | Key Rules To Preserve | Destination |
| --- | --- | --- | --- |
| `raw` | transient ingestion input | not persisted, not governed, not publishable; minimal ingestion checks only | PRD + Architecture |
| `deep-knowledge` | first persisted private boundary | append-only private memory; optional but governed; not canonical publication source | PRD + Architecture + companion |
| `knowledge-base-candidate` | review-entry proposal layer | may be partial, non-atomic, and fragment-reviewable; outcomes are promote, deprecate, discard | PRD + Architecture + companion |
| `knowledge-base-current` | positive governed knowledge | approved assertive content for downstream reuse | PRD + Architecture + companion |
| `knowledge-base-deprecated` | negative governed knowledge | exclusion, veto, non-reintroduction guardrail; semantically active | PRD + Architecture + companion |
| `knowledge-base` | governed knowledge center | manual edits must enter through candidate flow; separates knowledge maintenance from refinement | PRD + Architecture + companion |
| `hypercv-base` | first generated HyperCV materialization | regenerable, reviewable as generated artifact, provenance-bearing, not canonical final | PRD + Architecture + companion |
| `hypercv-refinement` | replayable editorial delta layer | no new knowledge; only current patch is normative; recurring patterns escalate upstream | PRD + Architecture + companion |
| `hypercv-final` | private canonical source of truth | explicit materialization; semantically stable across regenerations; no direct manual editing | PRD + Architecture + companion |
| `site-data` | private web projection | subordinate to final; regenerable; no authoring; no semantic invention | PRD + Architecture + companion |
| `deployed static site` | only public runtime artifact | pure delivery; contains no private classes | PRD + Architecture |

### 7.1 Class Density Notes

The following source-level nuances must remain visible during canonical absorption:

- `raw` is not only transient input; its admissible ingestion posture is constrained to defined markdown conversion without arbitrary manual reconstruction.
- `deep-knowledge` is optional, append-only, and internally split between `deep-knowledge-current` and `deep-knowledge-archived`; its role is persistent private sedimentation before consolidation, not canonical downstream truth.
- `knowledge-base-candidate` may be fed both by `deep-knowledge` and by sufficiently mature manual contributions; a candidate is not assumed to be atomic and may be reviewed in separable portions.
- `knowledge-base` is a unified governed center whose `current` and `deprecated` partitions have equal semantic dignity but different downstream roles: positive source versus negative exclusion guardrail.
- the knowledge-base must remain strong-form and LLM-manageable without implicit reconstruction of meaning; contradiction or unresolved interpretive ambiguity makes the class unreliable rather than merely low-quality.
- HyperCV-oriented predecessors may live in the knowledge-base only if they remain reusable governed knowledge beyond a single final output; otherwise they belong in `hypercv-base` or `hypercv-refinement`.
- `hypercv-base` is not merely a draft-like layer; it is a spec-constrained generated artifact whose recognizability matters, missing parts are acceptable only when value and recognizability survive, and an empty or semantically unrecognizable base is invalid.
- `hypercv-refinement` is not free editing: only the current patch between latest base and latest approved final is normative, while historical patches may exist only as auxiliary context for recurring intent, conflict diagnosis, or pattern recognition.
- refinement validity also depends on representability and replayability against recognizable base structure, not only on semantic intent.
- `hypercv-final` has four distinct change levers with different meanings: knowledge-base changes, document-spec changes, distillation-profile changes, and refinement changes must not be collapsed into one generic editing concept.
- `hypercv-final` must remain semantically stable across regenerations, with an explicit difference taxonomy: admissible lexical or local-shape changes, suspicious macro-order or emphasis shifts requiring review, and non-admissible claim or scope drift.
- `site-data` is not only a generic projection layer; it specifically owns route, locale, rendering, search, and public-facing surfaces before frontend delivery.
- the deployed static site is not just another derivative; it is the sole runtime public artifact and therefore the final boundary-enforcement checkpoint.

## 8. Transition Coverage Matrix

| Transition | Semantic Purpose To Preserve | Key Rules To Preserve | Destination |
| --- | --- | --- | --- |
| `raw` -> `deep-knowledge-current` | format-preserving normalization into first persisted boundary | preserve meaning and verbal content; remove only technical redundancy; no semantic cleanup | Architecture + companion |
| `deep-knowledge` -> `knowledge-base-candidate` | initial compression into reviewable contributions | deduplicate, enrich, respect deprecated-side veto, no unjustified new semantics | Architecture + companion |
| `knowledge-base-candidate` -> `knowledge-base-current` / `knowledge-base-deprecated` / discard | governed review closure | explicit outcomes; possible partial decisions; rationale remains reconstructable | PRD summary + Architecture + companion |
| `knowledge-base` -> `hypercv-base` | first generated HyperCV distillation | spec/profile-driven generation; deprecated-side constraints remain active; provenance required | Architecture + companion |
| `hypercv-base` + `hypercv-refinement` -> `hypercv-final` | replayable editorial materialization of final | patch replay must be clean or blocked; recurring corrections escalate to profile/spec change | PRD summary + Architecture + companion |
| `hypercv-final` + `user-persona` -> `site-data` | projection into localized web layer | persona affects projection only; no claim alteration; no new semantics | PRD summary + Architecture + companion |
| `site-data` -> `deployed static site` | public delivery packaging | publish safety, accessibility, performance, release coherence | PRD summary + Architecture |

### 8.1 Transition Density Notes

The following transition-level nuances from the source must remain explicit:

- `deep-knowledge` and `knowledge-base-candidate` are optional layers, so transition existence is conditional, but if a transition exists it must have explicit meaning, reviewability posture, and validations of its own.
- transition validation never replaces target-class validation; it checks preconditions, local invariants, and minimum postconditions, while the target class retains full validity judgment.
- `raw` -> `deep-knowledge-current` is format-preserving normalization, not stylistic cleanup: technical markers may be removed, but meaning, verbal substance, fillers, hesitations, repetitions, and self-corrections are preserved when informative, while non-informative pauses or silences need not be represented.
- `deep-knowledge` -> `knowledge-base-candidate` uses `deep-knowledge-current` as primary base while the broader knowledge-base provides deduplication, relevance, and exclusion context; `knowledge-base-deprecated` acts as semantic veto.
- `knowledge-base-candidate` review may split a single candidate into mixed outcomes while still remaining one governed and reconstructable decision event.
- `knowledge-base` -> `hypercv-base` must preserve traceability not only to snapshot, spec, and profile, but also to relevant deprecated-side exclusions when they shaped the distillate.
- `hypercv-base` + `hypercv-refinement` -> `hypercv-final` must surface replay conflicts explicitly; non-clean reapplication blocks approval rather than being silently absorbed.
- `hypercv-final` + `user-persona` -> `site-data` must be projection-ready for rendering with no semantic repair in delivery.
- `site-data` -> `deployed static site` is not a semantic transformation stage; it is a release boundary where publish safety, accessibility, performance, and release coherence become public-artifact obligations.

## 9. Validation Delta

The source validation model should be canonized through the following rules:

1. Validation domains are reusable control classes, not artifact-specific validator families.
2. Relevant domains include at least: minimal ingestion, structural, lineage and provenance, semantic quality, logical consistency and disambiguation, review and approval, policy and governance, content safety, projection integrity, publish safety, release coherence, accessibility, and performance.
3. Each class declares the domains relevant to its role.
4. Transition validation is partial and local.
5. Full target-class validity always prevails.
6. No transition may certify something the target class would consider invalid or out of scope.
7. Class validations must be re-executed after each transformation.
8. `projection integrity`, `semantic quality`, `logical consistency and disambiguation`, and `content safety` must remain semantically distinct.
9. When the same validation labels are used at class level and transition level, they should be treated as local applications of one shared taxonomy, not as separate redefinitions.
10. `projection integrity` is transition-first: it is not an abstract property in the absence of a comparable persisted source.
11. `semantic quality` measures clarity, useful density, and reusability in the role of the class; it does not replace fidelity, non-contradiction, or safety controls.
12. `logical consistency and disambiguation` must cover both contradiction prevention and LLM-reliability of interpretation.
13. `content safety` is distinct from information quality and becomes mandatory from the point where content enters the governed flow for reuse, projection, or publication.
14. review depends on the full validity of the reviewed class rather than on successful execution of the transformation that produced it.

Destination:

- Architecture for the model
- companion artifact for detailed application by class and transition

## 10. Review And Approval Delta

The source review model should be canonized through the following rules:

1. Review starts at `knowledge-base-candidate`, not only at final publication stages.
2. Review attaches to governed reviewable units.
3. Review may be partial within a single candidate.
4. `hypercv-base` is reviewable as generated output.
5. `hypercv-refinement` is reviewable as explicit editorial delta.
6. `hypercv-final` becomes the publishable private canonical source only after governed approval.
7. Review never depends only on the apparent success of the upstream transformation.
8. review policy must remain compatible with mixed-outcome candidate decisions and with explicit reviewability of both generated artifacts and replayable editorial deltas.

Destination:

- PRD for governance obligation
- Architecture for structural model
- companion artifact for detailed rule wording

## 11. Knowledge, Refinement, And Projection Delta

The source decision rules should be canonized through the following compact rule set:

1. If a change alters what the system must know, assert, deny, or prevent downstream, it is knowledge-base maintenance.
2. If a change alters only composition, order, synthesis, emphasis, or phrasing of supported content, it is refinement.
3. `knowledge-base-deprecated` remains an active negative guardrail.
4. Only the current refinement patch is normative.
5. Recurring refinement patterns indicate upstream design debt in profile or document-spec rules.
6. `site-data` is subordinate projection, not source of truth.
7. Projection and delivery may not repair meaning or invent publishable semantics.
8. If a recurring correction class persists across regenerated bases without depending on new private knowledge, the canonical response should move upstream to profile or document-spec change rather than accumulate as endless editorial residue.

Destination:

- PRD for high-level rule intent
- Architecture for operational semantics
- companion artifact for exact normative wording

## 12. External Dependency Delta

| Dependency | Rule To Preserve | Destination |
| --- | --- | --- |
| `user-persona` | affects projection only; can change exposure and granularity, not canonical claims | PRD + Architecture + companion |
| `patch-grammar` | defines representable and replayable editorial operations; must remain compatible with the no-new-knowledge rule | Architecture + companion |
| `hypercv-docs-spec` | defines structural and semantic contract of HyperCV document family; unique normative label | PRD + Architecture + companion |
| `hypercv-distillation-profile` | defines base-generation behavior from knowledge-base within the document-spec contract | PRD + Architecture + companion |

### 12.1 External Dependency Density Notes

- `user-persona` may change exposure, route surface, and expository granularity, but never canonical claims or knowledge-base semantics.
- `patch-grammar` is an external software dependency, but its admissible operations must remain anchored to base structure and compatible with the no-new-knowledge rule.
- `hypercv-docs-spec` is the only normative label for the HyperCV document-spec family in this model; it governs section admissibility, section purpose, filling constraints, cardinality, obligatoriness, inter-section relations, and minimum recognizability of a valid HyperCV document, and section meaning belongs here rather than in the distillation profile.
- `hypercv-distillation-profile` governs selection, prioritization, ordering, synthesis, density, aggregation strategy, and stable editorial constraints of base generation, while remaining subordinate to the document-spec contract and without defining the canonical HyperCV form by itself.
- dependency interfaces should remain minimal: the canonical planning set should absorb the contract they impose on the private pipeline, not the full public-software design of those concepts.

## 13. Non-Negotiable Preservation Constraints

The following constraints are not optional refinements of the proposal. They are part of the informational density that the source document introduced and must survive canonical absorption explicitly.

### 13.1 Negative Knowledge Must Stay Active

- `knowledge-base-deprecated` must not be treated as archival residue.
- It remains a semantically active negative guardrail used to exclude, veto, and prevent reintroduction of content downstream.
- Any future canonical wording that preserves `deprecated` only as historical storage is insufficient.

### 13.2 Candidate Review Must Stay Non-Atomic

- `knowledge-base-candidate` must not be simplified into a yes-or-no review blob.
- A single candidate may contain separable portions with mixed governed outcomes.
- Canonical review language must preserve the possibility of partial promotion, partial deprecation, and partial discard within one reconstructable decision event.

### 13.3 Base Validity Is Stronger Than Intermediate-Draft Language

- `hypercv-base` must not be reduced to a vague draft-like intermediate.
- It is a generated artifact constrained by `hypercv-docs-spec` and `hypercv-distillation-profile`.
- Recognizability under the document-spec contract is part of its validity.
- Missing parts may be tolerated only where recognizability and value are preserved; an empty or semantically unrecognizable base remains invalid.

### 13.4 Refinement Normativity Must Stay Sharp

- Only the current patch between the latest `hypercv-base` and the latest approved `hypercv-final` is normative.
- Historical patches may remain available as context for recurring intent, conflict diagnosis, or pattern recognition.
- Historical patches may not implicitly extend allowed content, be replayed as parallel authority, or accumulate into a second semantic source.

### 13.5 Final Change Levers Must Stay Distinct

- Changes to knowledge-base, document-spec, distillation-profile, and refinement are not interchangeable.
- The canonical model must preserve these as four distinct change levers with different semantic effects.
- Later backlog decomposition must not collapse them into one generic editing concept.

### 13.6 Semantic Drift Taxonomy Must Stay Explicit

- Differences between regenerated finals must remain triaged as admissible, suspicious, or non-admissible.
- Admissible changes are local phrasing, fluency, micro-synthesis, or local order changes that preserve claims, coverage, and semantic hierarchy.
- Suspicious changes affect macro-order, emphasis, or degree of synthesis enough to require explicit review.
- Non-admissible changes alter claims, scope, facts, interpretive boundaries, or supported content.

### 13.7 Validation Semantics Must Stay Partitioned

- `projection integrity` must remain transition-first and source-comparative rather than a vague abstract quality slogan.
- `semantic quality`, `logical consistency and disambiguation`, and `content safety` must remain separate validator concerns.
- Later summaries must not merge these into one generic quality bucket.

### 13.8 Raw Normalization Must Stay Meaning-Preserving

- `raw` normalization may remove technical redundancy.
- It may not silently perform paraphrase, stylistic cleanup, semantic repair, or unjustified omission.
- When informative, fillers, hesitations, repetitions, and self-corrections remain part of preserved verbal substance.

### 13.9 Replay Conflict Must Block Approval

- Replay conflict in `hypercv-base` plus `hypercv-refinement` -> `hypercv-final` must surface explicitly.
- Non-clean reapplication blocks approval until resolved.
- The process must not absorb conflict silently or hide it behind apparent successful generation.

### 13.10 Projection Must Remain Downstream-Only

- `site-data` may shape exposure, route surface, locale structure, rendering, and search support.
- It may not become a semantic authoring layer.
- Frontend or projection concerns may not invent publishable semantics or compensate for upstream semantic defects.

## 14. What The Future Change Workflow Should Produce

The dedicated change workflow should consume this document and produce:

1. a PRD change set
2. an Architecture change set
3. a new companion canonical artifact
4. a crosswalk showing where each source-information domain was absorbed
5. terminology resolutions for the model conflicts listed above

These outputs are intentionally downstream of this document. Their absence here is not a gap if the clarification and destination logic are already explicit and contradiction-free.

## 15. Completion Criteria

This preparation is good enough for the next workflow only if all of the following are true:

1. No informational domain of the source remains unassigned.
2. The proposal is expressed as delta, not as a duplicate source archive.
3. PRD, Architecture, and companion-artifact responsibilities are clearly separated.
4. The future workflow can execute from this document without needing to rediscover the core model.
5. The resulting change set remains usable for epic and story decomposition.
6. Fine-grained source nuances about optional layers, validation semantics, review granularity, replay conflict handling, semantic-drift taxonomy, and dependency-interface scope remain reconstructable from this proposal without consulting the source.
7. The document does not contain unresolved contradictions between delta, coverage, constraints, and downstream execution expectations.
8. The document is specific enough to guide execution, but still framed as preparation rather than prematurely pretending the canonical update has already been performed.
