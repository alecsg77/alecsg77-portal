---
workflowType: sprint-change-proposal
preparedDate: '2026-03-21'
project: alecsg77-portal
status: completed-absorbed
executionMode: batch
changeScope: major
triggerType: canonical-model-realignment-before-epic-decomposition
inputDocuments:
  - _bmad-archive/planning-artifacts/private-pipeline-canonical-change-proposal-2026-03-21.md
  - _bmad-output/planning-artifacts/private-pipeline-canonical-crosswalk-2026-03-21.md
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-archive/planning-artifacts/gray-area-review-2026-03-17.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
approvalStatus: implemented-2026-03-21
---

# Sprint Change Proposal - Private Pipeline Canonical Realignment

## 1. Issue Summary

### Trigger

The March 21 private-pipeline canonical change brief established that the current canonical planning set is directionally correct but still under-specifies the private pipeline model in ways that can distort future epic and story decomposition.

This is not a product redesign from zero. It is a canonical realignment before backlog decomposition.

### Issue Type

- misunderstanding or under-specification of the current canonical model
- terminology drift between older HyperCV intermediate names and the intended private-pipeline model
- governance and validation semantics not yet explicit enough for decomposition-safe planning

### Evidence

- the delta brief explicitly states that the current PRD and Architecture do not yet express the private pipeline model with enough clarity for safe decomposition
- the current PRD still uses `hypercv-draft` and `hypercv-composition` as primary intermediate language in the canonical content boundary and minimum transformation contract
- the current Architecture still models `knowledge-base-dk`, `knowledge-base-manual`, `hypercv-draft`, and `hypercv-composition` as the primary canonical class structure
- the gray-area review already identified review granularity as operationally ambiguous and likely to derail future decomposition if left implicit
- the planning set is pre-epics, so unresolved canonical ambiguity would flow directly into the first epic set rather than being caught by existing backlog structure

### Problem Statement

The project now needs a canonical planning realignment that:

1. resolves terminology conflicts instead of layering new terms on top of old ones
2. makes class identity, transition contracts, validation semantics, and review granularity explicit in the canonical planning set
3. preserves dense normative detail in a companion artifact rather than flattening it away
4. keeps the result usable for future epic and story decomposition without depending on deleted upstream private-model files

## 2. Checklist Status

### Section 1 - Understand the Trigger and Context

- 1.1 Triggering story: N/A. Epics and stories do not exist yet.
- 1.2 Core problem precisely defined: Done.
- 1.3 Initial impact and evidence gathered: Done.

### Section 2 - Epic Impact Assessment

- 2.1 Current epic impact: N/A. No epics exist yet.
- 2.2 Required epic-level changes: Action-needed only in the sense of protecting future epic decomposition from canonical drift.
- 2.3 Remaining epic review: N/A.
- 2.4 Future epic invalidation or new epic need: N/A before first decomposition.
- 2.5 Epic order or priority change: N/A before first decomposition.

### Section 3 - Artifact Conflict and Impact Analysis

- 3.1 PRD conflict check: Done. Targeted updates applied.
- 3.2 Architecture conflict check: Done. Targeted updates applied.
- 3.3 UX conflict check: Done. No material rewrite was required; UX remains aligned as a constraint consumer.
- 3.4 Other artifact impact: Done. Companion artifact and crosswalk created.

### Section 4 - Path Forward Evaluation

- 4.1 Direct adjustment: Viable.
- 4.2 Potential rollback: Not viable.
- 4.3 PRD MVP review: Not required. Product direction is preserved.
- 4.4 Selected approach: Option 1 with a canonical companion artifact and explicit terminology resolution.

### Section 5 - Proposal Components

- 5.1 Issue summary: Done.
- 5.2 Epic impact and artifact adjustment needs: Done.
- 5.3 Recommended path forward with rationale: Done.
- 5.4 MVP impact and high-level action plan: Done.
- 5.5 Agent handoff plan: Done.

### Section 6 - Final Review and Handoff

- 6.1 Checklist completion review: Done.
- 6.2 Proposal accuracy review: Done.
- 6.3 Explicit user approval: Done.
- 6.4 Update sprint-status.yaml: N/A. No epics or sprint-status artifact exists yet.
- 6.5 Confirm next steps and handoff plan: Done.

## 2.1 Closure State

This change proposal is now closed.

The proposed canonical realignment has been absorbed into the active planning set through:

1. updates to [_bmad-output/planning-artifacts/prd.md](_bmad-output/planning-artifacts/prd.md)
2. updates to [_bmad-output/planning-artifacts/architecture.md](_bmad-output/planning-artifacts/architecture.md)
3. creation of [_bmad-output/planning-artifacts/private-pipeline-canonical-model.md](_bmad-output/planning-artifacts/private-pipeline-canonical-model.md)
4. preservation of [_bmad-output/planning-artifacts/private-pipeline-canonical-crosswalk-2026-03-21.md](_bmad-output/planning-artifacts/private-pipeline-canonical-crosswalk-2026-03-21.md)
5. archival of superseded planning and brainstorming artifacts so the active BMAD output set now reflects only the current canonical baseline and the retained UX support artifact

The issue summary and conflict analysis above remain preserved as the historical rationale for the change. The sections below record the implemented resolution state.

## 3. Impact Analysis

### Epic Impact

No current epic is being modified because epics do not yet exist.

The impact is pre-epic and preventive: the canonical planning set must be corrected before decomposition so that future epic boundaries, validator work, review flows, and projection stories are derived from the intended model instead of from older intermediate terminology.

### Story Impact

No current stories are being modified because stories do not yet exist.

The future story impact is high if left unresolved. The likely failure modes are:

1. stories model `hypercv-draft` and `hypercv-composition` as enduring product concepts instead of migrating to `hypercv-base` and `hypercv-refinement`
2. review workflows are written against ambiguous review units
3. validation stories collapse transition validation and full target-class validation into one generic validator bucket
4. projection and frontend stories wrongly absorb semantic-repair responsibilities

### Artifact Conflicts

#### PRD

The PRD already states key boundary rules, including that only the deployable static package crosses into the public domain and that `raw` remains transient. However, it still anchors the canonical model in older intermediate terms.

Current wording that now conflicts with the target model:

- `hypercv-draft` and `hypercv-composition` remain private editorial classes and never become direct frontend inputs.
- `knowledge-base` -> `hypercv-draft`: generation of private draft contributions.
- `hypercv-draft` + `hypercv-composition` -> `hypercv-final`: explicit materialization of approved final content.

#### Architecture

The Architecture already carries strong governance, provenance, and projection rules, but its core class model still codifies the older split:

- `knowledge-base-dk` and `knowledge-base-manual` as two managed subclasses that merge into a logical unified knowledge-base view for downstream generation
- `hypercv-draft` as persistent draft contributions
- `hypercv-composition` as the explicit convergence layer

That model must now be reconciled with the intended canonical sequence centered on `knowledge-base-candidate`, `knowledge-base`, `hypercv-base`, and `hypercv-refinement`.

#### UX Design Specification

No primary UX contradiction was found. The UX document remains valid because it mainly describes the public consultation experience, not the dense private pipeline semantics.

The only required discipline is that UX and frontend implementation must continue to treat `site-data` as a projection and not as an authoring or semantic-repair layer.

### Technical and Governance Impact

This change has no direct public-runtime redesign impact, but it has major planning-governance impact:

1. it changes the canonical model future backlog items must implement
2. it introduces a new canonical companion artifact that future epic and story workflows must treat as authoritative
3. it changes review, validation, regeneration, and projection assumptions that would otherwise be invented piecemeal during backlog creation

## 4. Recommended Approach

### Option Evaluation

#### Option 1 - Direct Adjustment

Viable.

Update the canonical planning set directly by:

1. revising PRD language to express the planning-level model correctly
2. revising Architecture to express the structural and operational model correctly
3. adding a companion canonical artifact for dense normative rules
4. preserving a crosswalk so the absorption remains auditable

Effort: Medium.
Risk: Medium.

#### Option 2 - Potential Rollback

Not viable.

There is no code or backlog implementation to roll back. The problem is not unwanted implementation progress; it is canonical under-specification.

Effort: High for no benefit.
Risk: High.

#### Option 3 - PRD MVP Review

Not required.

The product direction, MVP boundary, and public experience remain valid. The issue is model explicitness, not MVP viability.

Effort: High.
Risk: Medium.

### Selected Path

Select Option 1 with one important extension: the correction must include a new canonical companion artifact rather than trying to force all dense normative detail into PRD or Architecture.

### Rationale

This path is preferred because it:

1. preserves product direction
2. resolves terminology conflicts explicitly
3. keeps dense normative detail decomposition-safe
4. minimizes the risk of backlog drift before the first epic set is created

## 5. Detailed Change Proposals

### Proposal A - PRD Realignment

Status: Completed.

#### PRD Change 1 - Canonical Content Boundary

OLD:

- `knowledge-base` content managed through distillation-derived and manual subclasses
- HyperCV artifacts separated into draft, composition, and final responsibilities
- `hypercv-draft` and `hypercv-composition` remain private editorial classes

NEW:

- `knowledge-base-candidate` is the governed review-entry layer for proposed reusable knowledge
- `knowledge-base` is the unified governed center with semantically active `current` and `deprecated` partitions
- private HyperCV artifacts are centered on `hypercv-base`, `hypercv-refinement`, and `hypercv-final`
- `site-data` remains a subordinate projection and may not become a semantic authoring layer

Rationale:

The PRD must stop framing the older intermediate model as the planning baseline. It should state only the planning-level rules future backlog decomposition must inherit.

#### PRD Change 2 - Minimum Transformation Contract

OLD:

- `deep-knowledge` -> `knowledge-base`
- `knowledge-base` -> `hypercv-draft`
- `hypercv-draft` + `hypercv-composition` -> `hypercv-final`

NEW:

- `raw` -> `deep-knowledge-current`
- `deep-knowledge` -> `knowledge-base-candidate`
- `knowledge-base-candidate` -> `knowledge-base-current` / `knowledge-base-deprecated` / discard
- `knowledge-base` -> `hypercv-base`
- `hypercv-base` + `hypercv-refinement` -> `hypercv-final`
- `hypercv-final` + `user-persona` -> `site-data`
- `site-data` -> deployed static site

Rationale:

Future epics must inherit the actual governed transitions, not a compressed chain that hides candidate review, deprecated-side semantics, refinement, or persona-scoped projection.

#### PRD Change 3 - Governance Rule Additions

Add planning-level rules stating that:

1. knowledge maintenance and editorial refinement are distinct change types
2. LLM usage is allowed only inside the governed private pipeline and never replaces schemas, validators, class contracts, or human review
3. projection and delivery may not repair meaning or invent publishable semantics
4. `user-persona`, `patch-grammar`, `hypercv-docs-spec`, and `hypercv-distillation-profile` each impose planning-level contract constraints

Rationale:

These are backlog-shaping governance rules and cannot remain implicit or architecture-only.

### Proposal B - Architecture Realignment

Status: Completed.

#### Architecture Change 1 - Replace Primary Class Model

OLD:

- `knowledge-base-dk` and `knowledge-base-manual`
- `hypercv-draft`
- `hypercv-composition`

NEW:

- `raw`
- `deep-knowledge`
- `knowledge-base-candidate`
- `knowledge-base`
- `hypercv-base`
- `hypercv-refinement`
- `hypercv-final`
- `site-data`
- `deployed static site`

Rationale:

The Architecture document is the structural owner of the pipeline model and must codify the intended class sequence directly.

#### Architecture Change 2 - Review Granularity

Add explicit review semantics for:

1. `knowledge-base-candidate` as review-entry layer with mixed possible outcomes
2. `hypercv-base` as reviewable generated output
3. `hypercv-refinement` as reviewable editorial delta with no-new-knowledge rule
4. `hypercv-final` as approved private canonical publication source only after governed approval

Rationale:

The gray-area review already identified review-unit ambiguity as a future decomposition risk. The Architecture document should remove that ambiguity before backlog creation.

#### Architecture Change 3 - Validation and Provenance Model

Add explicit rules stating that:

1. validation domains are shared across classes and transitions
2. transition validation is local and partial
3. full target-class validity remains dominant
4. provenance obligations exist per class and per transition
5. `knowledge-base-deprecated` remains an active downstream exclusion guardrail
6. replay conflict in `hypercv-base` plus `hypercv-refinement` -> `hypercv-final` blocks approval

Rationale:

These rules determine how validator, review, provenance, and regeneration stories should be decomposed later.

### Proposal C - Create Companion Canonical Artifact

Status: Completed.

Create [_bmad-output/planning-artifacts/private-pipeline-canonical-model.md](_bmad-output/planning-artifacts/private-pipeline-canonical-model.md) with:

1. class-by-class validation objectives
2. transition-by-transition validation objectives
3. normalized decision rules
4. dependency-interface rules
5. decomposition guardrails for epic and story creation
6. semantic-drift taxonomy
7. replay-conflict blocking rules

Rationale:

Without this artifact, either the Architecture document becomes overloaded or the dense model is lost. Both outcomes are unsafe for future decomposition.

### Proposal D - Preserve Crosswalk As Canonical Support Artifact

Status: Completed.

Created [_bmad-output/planning-artifacts/private-pipeline-canonical-crosswalk-2026-03-21.md](_bmad-output/planning-artifacts/private-pipeline-canonical-crosswalk-2026-03-21.md) to show where the absorbed model now lives.

Rationale:

The change brief explicitly requires a clear crosswalk. Keeping it separate from the main proposal improves auditability and reduces drift during document editing.

### Proposal E - Terminology Resolution Rules

Status: Completed.

Adopt these explicit rules during canonical editing:

1. do not retain `hypercv-draft` and `hypercv-composition` as the primary canonical model where they conflict with `hypercv-base` and `hypercv-refinement`
2. do not retain knowledge-base derived/manual subclasses as the primary canonical split where they conflict with `knowledge-base-candidate` and governed `current`/`deprecated` semantics
3. if legacy terminology is preserved anywhere for historical continuity, mark it as mapped or superseded instead of leaving it as parallel authority

Rationale:

The change must resolve conflict, not accumulate competing models.

## 6. Crosswalk Reference

The authoritative absorption crosswalk for this change is documented in [_bmad-output/planning-artifacts/private-pipeline-canonical-crosswalk-2026-03-21.md](_bmad-output/planning-artifacts/private-pipeline-canonical-crosswalk-2026-03-21.md).

That crosswalk should be used during canonical editing to verify that:

1. no information domain is left unassigned
2. PRD, Architecture, and companion-artifact responsibilities remain separated
3. dense rules are preserved without overloading the PRD

## 7. Implementation Handoff

### Scope Classification

Major.

This is a major planning-governance change because it alters the canonical model future epics and stories must decompose from, introduces a new canonical artifact, and requires coordinated PRD and Architecture updates before backlog creation.

### Handoff Recipients

- Product Manager / Architect: apply the canonical edits and resolve wording conflicts
- Scrum Master: enforce canonical-only inputs for future epic creation and record pre-epic N/A exceptions correctly
- Future epic/stories workflow: consume only the updated canonical planning set plus the companion artifact

### Deliverables

1. updated PRD
2. updated Architecture
3. new companion canonical artifact
4. preserved crosswalk
5. active BMAD output reduced to the updated canonical set plus retained UX support artifact

### Success Criteria

The handoff is complete because:

1. future epic and story workflows can derive class identity, transition contracts, review semantics, validation semantics, and projection constraints without consulting deleted upstream private-model files
2. no future story needs to invent whether a change belongs to knowledge maintenance, refinement, projection, or delivery
3. frontend and projection work is prevented from becoming the place where semantic defects are repaired

## 8. Approval Status

This proposal has been approved and implemented.

Current status:

- proposal drafted: yes
- crosswalk drafted: yes
- canonical updates applied: yes
- archive cleanup applied: yes
- user approval to implement canonical document updates: yes

## 9. Recommended Next Execution Order

Completed in this change:

1. approve this Sprint Change Proposal
2. update [prd.md](_bmad-output/planning-artifacts/prd.md)
3. update [architecture.md](_bmad-output/planning-artifacts/architecture.md)
4. create [_bmad-output/planning-artifacts/private-pipeline-canonical-model.md](_bmad-output/planning-artifacts/private-pipeline-canonical-model.md)
5. preserve [_bmad-output/planning-artifacts/private-pipeline-canonical-crosswalk-2026-03-21.md](_bmad-output/planning-artifacts/private-pipeline-canonical-crosswalk-2026-03-21.md)
6. archive superseded BMAD planning and brainstorming artifacts

Recommended next step:

1. run a focused post-update readiness check before epic creation