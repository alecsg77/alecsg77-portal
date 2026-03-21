---
workflowType: planning-review
reviewDate: '2026-03-17'
project: alecsg77-portal
scope:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
status: complete
decision: non-blocking-gray-areas-identified
---

# Gray-Area Review

## Purpose

This review isolates the remaining non-blocking ambiguities in the canonical planning set that could still derail future epic or story creation.

The objective is not to reopen the operating model. The objective is to identify where implementation stories could still become inconsistent, over-specific, or under-specified even though the planning baseline is now coherent.

## Overall Judgment

The canonical baseline is strong enough to support epic creation.

The remaining risks are concentrated in implementation-shaping gray areas where the canonicals intentionally preserve flexibility. Those areas should be treated as anti-drift checkpoints during epic and story writing.

## Findings

### 1. LLM step boundaries are allowed but not partitioned sharply enough

The canonicals now make LLM-assisted private transformations explicitly in scope, but they still do not define a sharp per-step contract for where LLM assistance is expected, where deterministic transforms are mandatory, and where the system must stop and require review.

Potential derailment:

- stories may collapse `deep-knowledge`, `knowledge-base`, and `hypercv-draft` into one generic "LLM pipeline"
- stories may assign semantic repair to delivery steps instead of upstream generation steps
- validator stories may be written too late because the LLM orchestration story appears to own the whole pipeline

Required discipline for decomposition:

- keep class transitions separate from implementation convenience
- require stories to state the input class, output class, validation gate, and review gate for each transformation

### 2. Review and approval granularity is still operationally ambiguous

The PRD is clear that human review and approval are mandatory, but it does not yet fix the exact review unit across all classes.

Potential derailment:

- one story may model approval at artifact level, while another assumes approval at field or contribution level
- review UI or workflow stories may conflict with release-gating stories
- stale detection stories may assume more granular provenance than the review model actually supports

Required discipline for decomposition:

- each epic must declare the review unit it assumes
- review, approval, and publishability must be modeled consistently across `knowledge-base`, `hypercv-draft`, `hypercv-composition`, `hypercv-final`, and release evidence

### 3. Selective regeneration remains under-specified at dependency level

The canonicals allow selective or full regeneration and explicitly require stale detection, but they do not yet define the dependency graph that drives rebuild scope.

Potential derailment:

- stories may overfit to full rebuild only and make later incremental behavior expensive
- stories may implement selective regeneration inconsistently across locales, search indexes, site-data, and release evidence
- stale-composition handling may be implemented separately from rebuild planning and create contradictory behavior

Required discipline for decomposition:

- regeneration stories must state what invalidates what
- search, localization, projection, and release evidence must be included in rebuild-scope reasoning

### 4. `site-data` responsibilities are clear semantically but still soft structurally

The canonicals now say what `site-data` is for, but they still leave field-level contracts intentionally open.

Potential derailment:

- frontend stories may invent page-facing fields before canonical contracts exist
- projection stories may disagree on how persona-profile entities, localized citation targets, and route surfaces are represented
- search and route generation stories may each introduce their own shadow schema

Required discipline for decomposition:

- any story that introduces a new publishable field must first define the canonical source contract and then the `site-data` projection rule
- frontend stories must consume existing projection contracts rather than inventing new semantic fields

### 5. Validator domains are named, but blocking policy is not yet standardized

The architecture is explicit that validation is schema-first and domain-oriented, but it does not yet define a canonical validator catalog, severity model, or suppression workflow.

Potential derailment:

- different stories may invent different validator categories or naming
- warning vs blocking behavior may diverge across pipeline stages
- suppression handling may appear ad hoc and break auditability

Required discipline for decomposition:

- validator stories should share one common severity and evidence model
- suppression, waiver, or override behavior must be treated as a governed capability, not local story detail

### 6. Workspace mechanics are still flexible enough to tempt over-specific infrastructure stories

The canonicals intentionally avoid locking the implementation to one local workspace layout or bootstrap mechanism.

Potential derailment:

- stories may overcommit to submodules, package linking, or one particular local folder topology
- local developer-convenience decisions may be mistaken for governance constraints
- CI and local execution stories may diverge because they assume different engine or private-root acquisition patterns

Required discipline for decomposition:

- treat workspace mechanics as replaceable implementation detail unless they affect governance, reproducibility, or boundary enforcement
- require stories to distinguish execution contract from bootstrap convenience

## Anti-Drift Checks For Epic Writing

Before approving an epic or story, verify that it answers all of these:

1. Which canonical class transition does this story own?
2. Where is the deterministic validation gate?
3. Where is the human review or approval gate?
4. Does the story add semantic data, or only transport/project existing semantics?
5. If it touches `site-data`, what canonical source contract feeds it?
6. If it touches regeneration, what downstream artifacts become stale or need rebuild?
7. If it touches validation, what severity and evidence model does it use?
8. If it touches workspace setup, is it describing governance or only local convenience?

## Conclusion

The planning baseline does not need another round of broad canonical changes before epic creation.

What it needs is disciplined decomposition that preserves the now-explicit class boundaries, keeps LLM usage inside the governed private pipeline, and prevents implementation stories from inventing semantics that the canonicals have not assigned yet.