---
workflowType: canonical-companion-model
preparedDate: '2026-03-21'
project: alecsg77-portal
status: complete
purpose: preserve-dense-portal-data-rules-for-safe-decomposition
sourceBrief: _bmad-archive/planning-artifacts/private-pipeline-canonical-change-proposal-2026-03-21.md
crosswalk: _bmad-output/planning-artifacts/portal-data-canonical-crosswalk-2026-03-21.md
---

# Portal Data Canonical Model

## 1. Purpose

This companion artifact preserves the dense normative rules of the portal-data model without overloading the PRD or the main Architecture document.

It is canonical. It is not an appendix, brainstorming note, or implementation-only reference.

Its role is to keep future epic and story decomposition safe by making class identity, transition contracts, validation semantics, review granularity, and dependency-interface rules explicit.

## 2. Governing Interpretation Rules

This artifact distinguishes three semantic layers that must not be collapsed into one generic summary:

1. delta: what the canonical planning set had to change
2. coverage: what informational domains must remain assigned somewhere in the canonical planning set
3. constraints: what must not be weakened, flattened, or silently dropped during implementation or decomposition

## 3. Validation Taxonomy

Validation domains are shared control domains, not artifact-specific validator families.

The canonical taxonomy is:

1. minimal ingestion
2. structural
3. lineage and provenance
4. semantic quality
5. logical consistency and disambiguation
6. review and approval
7. policy and governance
8. content safety
9. projection integrity
10. publish safety
11. release coherence
12. accessibility
13. performance

Validation rules:

1. each class declares the domains relevant to its role
2. transition validation is local and partial
3. full target-class validity always prevails
4. no transition may certify something the target class would consider invalid or out of scope
5. class validation must be re-executed after each transformation
6. `projection integrity`, `semantic quality`, `logical consistency and disambiguation`, and `content safety` remain distinct concerns
7. `projection integrity` is primarily a transition-first, source-comparative control and remains a class-level concern only where a layer is defined by persisted, verifiable dependence on a source artifact
8. review depends on full validity of the reviewed class, not only on apparent success of the transformation that produced it

## 4. Class Model

### 4.1 `raw`

Role:

- transient ingestion input
- not persisted as a governed class
- not canonical and not publishable

Validation focus:

- minimal ingestion only

Rules:

- normalization may remove technical redundancy only
- normalization may not silently paraphrase, clean up style, repair semantics, or omit informative verbal substance
- informative fillers, hesitations, repetitions, and self-corrections remain part of preserved meaning when relevant

### 4.2 `deep-knowledge`

Role:

- first persisted governed boundary
- append-only, optional, non-public inside the portal data root
- persistent sedimentation before governed consolidation

Validation focus:

- structural
- lineage and provenance
- content safety
- semantic quality appropriate to persistent governed memory

Rules:

- may be internally split for operational purposes, but that split does not replace canonical downstream truth
- when the optional split is used, `deep-knowledge-current` holds material still awaiting candidate generation and `deep-knowledge-archived` holds already-processed material retained for traceability
- remains outside the public deliverable and outside canonical publication ownership

### 4.3 `knowledge-base-candidate`

Role:

- governed review-entry layer
- reviewable proposal state for reusable knowledge

Validation focus:

- structural
- semantic quality
- logical consistency and disambiguation
- review and approval
- policy and governance
- content safety

Rules:

- may be partial, non-atomic, and reviewable in separable portions
- may be fed by `deep-knowledge` or sufficiently mature manual contributions
- review outcomes are promote, deprecate, or discard
- one candidate may yield mixed outcomes while remaining one reconstructable governed decision event

### 4.4 `knowledge-base`

Role:

- unified governed knowledge center
- semantically active `current` and `deprecated` partitions

Validation focus:

- structural
- lineage and provenance
- semantic quality
- logical consistency and disambiguation
- review and approval
- policy and governance
- content safety

Rules:

- `current` is positive downstream source material
- `deprecated` is an active negative guardrail used to exclude, veto, and prevent reintroduction of content downstream
- manual edits to governed knowledge must enter through candidate flow
- if a change alters what the system must know, assert, deny, or prevent downstream, it belongs to knowledge-base maintenance

### 4.5 `hypercv-base`

Role:

- first generated HyperCV materialization
- reviewable generated artifact
- provenance-bearing and regenerable

Validation focus:

- structural
- lineage and provenance
- semantic quality
- logical consistency and disambiguation
- review and approval
- policy and governance

Rules:

- generated under `hypercv-docs-spec` and `hypercv-distillation-profile`
- must remain recognizable under the document contract
- missing parts are admissible only when recognizability and value are preserved
- empty or semantically unrecognizable base is invalid

### 4.6 `hypercv-refinement`

Role:

- replayable editorial delta layer
- no-new-knowledge editorial adjustment over the latest base

Validation focus:

- structural
- lineage and provenance
- semantic quality
- logical consistency and disambiguation
- review and approval
- policy and governance

Rules:

- only the current patch between the latest `hypercv-base` and the latest approved `hypercv-final` is normative
- historical patches may remain as context for recurring intent, conflict diagnosis, or pattern recognition only
- historical patches may not become a parallel semantic source
- if a recurring correction class persists across regenerated bases without depending on new governed knowledge, it is evidence of upstream design debt in `hypercv-distillation-profile` or `hypercv-docs-spec`

### 4.7 `hypercv-final`

Role:

- approved canonical publication source inside the portal data root
- semantically stable materialized source of truth for downstream projection

Validation focus:

- full class validity across all relevant domains

Rules:

- no direct manual editing as an alternative authority path
- changes to knowledge-base, document-spec, distillation-profile, and refinement are distinct levers with different meanings
- semantic differences across regenerations must be triaged as admissible, suspicious, or non-admissible

### 4.8 `site-data`

Role:

- web projection inside the portal data root
- localized, regenerable, non-authoritative

Validation focus:

- lineage and provenance
- projection integrity
- publish safety
- release coherence
- accessibility
- performance where relevant before delivery

Rules:

- subordinate to `hypercv-final`
- no authoring authority
- no semantic repair
- no semantic invention

### 4.9 `deployed static site`

Role:

- sole public runtime artifact

Validation focus:

- publish safety
- release coherence
- accessibility
- performance

Rules:

- delivery-only boundary
- contains no governed source classes

## 5. Transition Model

### 5.1 `raw` -> `deep-knowledge-current`

Purpose:

- format-preserving normalization into the first persisted boundary

Rules:

- preserve meaning and verbal content
- remove only technical redundancy
- do not perform semantic cleanup or unjustified omission

### 5.2 `deep-knowledge` -> `knowledge-base-candidate`

Purpose:

- initial compression into governed reviewable contributions

Rules:

- deduplicate and enrich without inventing unjustified semantics
- use broader knowledge-base context for relevance and deduplication
- respect deprecated-side veto context

### 5.3 `knowledge-base-candidate` -> `knowledge-base-current` / `knowledge-base-deprecated` / discard

Purpose:

- governed review closure

Rules:

- outcomes must be explicit
- partial decisions are allowed
- rationale must remain reconstructable

### 5.4 `knowledge-base` -> `hypercv-base`

Purpose:

- first generated HyperCV distillation

Rules:

- generation is governed by `hypercv-docs-spec` and `hypercv-distillation-profile`
- relevant deprecated-side exclusions remain active
- provenance must capture relevant snapshot, profile, and exclusion context

### 5.5 `hypercv-base` + `hypercv-refinement` -> `hypercv-final`

Purpose:

- replayable editorial materialization of final

Rules:

- patch replay must be clean or approval is blocked
- replay conflict must surface explicitly
- refinement may not add new knowledge

### 5.6 `hypercv-final` + `user-persona` -> `site-data`

Purpose:

- projection into the localized web layer

Rules:

- `user-persona` may affect exposure and granularity only
- persona may not alter canonical claims
- projection must remain ready for rendering without semantic repair in delivery

### 5.7 `site-data` -> `deployed static site`

Purpose:

- public delivery packaging

Rules:

- not a semantic transformation stage
- public-artifact obligations are publish safety, accessibility, performance, and release coherence

## 6. Dependency Interface Rules

### 6.1 `user-persona`

- affects projection only
- may change exposure, route surface, and expository granularity
- may not change canonical claims or knowledge-base semantics

### 6.2 `patch-grammar`

- defines admissible replayable editorial operations
- must remain compatible with the no-new-knowledge rule
- must stay anchored to recognizable base structure

### 6.3 `hypercv-docs-spec`

- defines the structural and semantic contract of the HyperCV document family
- is the single normative label for this document-spec family in the portal-data model
- owns section admissibility, section purpose, filling constraints, cardinality, obligatoriness, inter-section relations, and minimum recognizability

### 6.4 `hypercv-distillation-profile`

- governs selection, prioritization, ordering, synthesis, density, and stable editorial constraints of base generation
- remains subordinate to the document-spec contract
- does not define canonical HyperCV form by itself

## 7. Semantic Drift Taxonomy

Differences between regenerated finals are triaged as:

1. admissible: local phrasing, fluency, micro-synthesis, or local order changes that preserve claims, coverage, and semantic hierarchy
2. suspicious: macro-order, emphasis, or compression shifts requiring explicit review
3. non-admissible: claim, scope, fact, interpretive-boundary, or supported-content changes

## 8. Decomposition Guardrails

Future epic and story creation must preserve the following rules:

1. each story must name the input class, output class, validation gate, and review gate it owns
2. no story may treat projection or frontend delivery as the place where semantics are repaired
3. no story may collapse knowledge maintenance, refinement, projection, and delivery into one generic content-editing concept
4. validator work must distinguish local transition checks from full target-class validity
5. review stories must respect explicit review units and mixed-outcome candidate decisions
6. deprecated knowledge must remain active downstream in exclusion logic, generation constraints, and provenance reasoning

## 9. Non-Negotiable Constraints

The following must remain explicit in future planning and implementation:

1. deprecated knowledge stays semantically active
2. candidate review stays non-atomic
3. `hypercv-base` validity stays stronger than vague draft language suggests
4. only the current refinement patch is normative
5. knowledge-base, document-spec, distillation-profile, and refinement remain distinct change levers
6. validation semantics remain partitioned rather than merged into a generic quality bucket
7. replay conflict blocks approval
8. projection remains downstream-only and non-authoring