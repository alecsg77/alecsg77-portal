---
stepsCompleted: [1]
inputDocuments: []
session_topic: 'Operational boundary between private canonical data, public engine, and static deploy; data classes, transformations, validation, HyperCV, and promotion flow'
session_goals: 'Converge on a plausible data and operational model for public engine + private canonical data + static deploy, with particular attention to security, governance, review, and publication safety'
selected_approach: 'AI-Recommended Techniques'
techniques_used: ['First Principles Thinking', 'Constraint Mapping', 'Cross-Pollination', 'Six Thinking Hats']
ideas_generated: ['Monorepo with private/public folders', 'Private repo with public submodule', 'Public repo with operational clone of private data', 'Two separate repositories with public pipeline run on private data', 'Candidate/editorial/final model for HyperCV']
context_file: ''
---

# Brainstorming Session Results

**Facilitator:** Alessio
**Date:** 2026-03-15

## Session Overview

**Topic:** Operational boundary between private canonical data, public engine, and static deploy; data classes, transformations, validation, HyperCV, and promotion flow.
**Goals:** Converge on a plausible data and operational model for public engine + private canonical data + static deploy, with particular attention to security, governance, review, and publication safety.

### Session Setup

The brainstorming started from an architectural question about private -> public promotion, but progressively shifted toward a deeper model: data classes, transformations between classes, validators, security boundaries, the role of the public repository, the role of the private side, and the structure of HyperCV as a private canonical artifact from which the public static site is derived.

The approach used was divergent at the beginning and progressively convergent. The final part of the conversation consolidated operational and semantic decisions stable enough to be used as a primary source for a subsequent architecture review.

## Decision Summary

### 1. Repository model and public/private boundary

Decision:

- The public repository is the authoritative codebase for pipeline, contracts, validations, publish workflow, and frontend.
- The private domain contains all real data, working materials, canonical content, and intermediate artifacts.
- The security boundary applies to the data, not to the code.

Rationale:

- The pipeline code must remain public for showcase and inspectability reasons.
- Real data must be processable by the public engine without entering the public repository.
- The main risk is not that the public code is visible, but that the canonical data or their source projections can be easily replicated or cross the boundary without control.

Operational consequences:

- Code can flow from public to private.
- Only approved, sanitized, derived static deploy artifacts can flow from private to public.
- The return of sensitive or raw data from public to private must not become part of the workflow.

Additional decision matured at the end of the brainstorming:

- The public repository must not contain the real site data, not even when those data describe publishable content.
- The public repository must distribute a reusable engine; the private repository remains the place where real data are transformed into deployable static output.
- The public online content remains copyable because it is published, but it is not necessary to also publish the structured sources and canonical layers.

### 2. Private execution workspace

Decision:

- The private execution workspace can be composed operationally in multiple ways.
- The target architecture is that the private repository consumes the public engine as an installable dependency.
- In local development, using side-by-side checkouts of public repository and private repository remains valid to avoid republishing the package on every change.

Rationale:

- The process must depend on an execution contract between public engine and private data, not on a specific Git mechanism.
- The submodule is technically possible but introduces public metadata of the private repo, greater Git complexity, and more risk of improper use.
- A local workspace with side-by-side checkouts satisfies the development requirement without introducing a formal Git dependency into the public repository.

Security constraint:

- The presence of local checkouts or mounts of the data repository in the development workspace does not make them public.
- Real protection remains based on private repository or storage permissions and on the credentials of the workflows that read it.

Operational variants considered:

1. public package/tool consumed by the private repository in automation
2. separate side-by-side checkouts of public repo and private repo in local development
3. submodule of the private repo inside the public one, tolerated only as local bootstrap

Conclusion:

- the process must depend on a stable contract between the public engine and the private data repository, not on a formal Git dependency
- the submodule is not the security boundary and must not become the heart of governance

### 3. Raw input

Decision:

- Raw data are not a persisted class of the system.
- They are ephemeral, optional, and transient ingestion inputs.

Rationale:

- It makes no sense to treat them as stable system assets.
- It makes no sense to invest in strong lineage, versioning, or extended semantic validation for them.
- The system truly begins to take persisted responsibility only from the deep knowledge level onward.

Consequences:

- Raw inputs have only minimal ingestion checks, not real class validators.
- The `raw -> deep-knowledge` step should be thought of as ingestion, not as a transformation between two equivalent persisted classes.

### 4. Private data classes

Important structural note:

- the model distinguishes between `classes` and `subclasses`
- class rules apply to all subclasses of that class
- subclass rules refine or restrict the behavior of the parent class

Consolidated private classes and subclasses:

- persisted private class `deep-knowledge`
- private class `knowledge-base`
	- subclass `knowledge-base-dk`
	- subclass `knowledge-base-manual`

Class and subclass decisions:

- `deep-knowledge`
	- persisted
	- append-only
	- immutable
	- non-regenerable

- `knowledge-base-dk`
	- generated from deep knowledge
	- regenerable
	- not directly editable without the risk of losing changes during reprocessing

- `knowledge-base-manual`
	- created and edited manually
	- persisted and versionable
	- never touched by deep knowledge reprocessing

Rationale:

- Deep knowledge is not a cache: it is consolidated private rich memory.
- The knowledge base serves both as a curated derivative of deep knowledge and as an entry point for manual knowledge that is already ready.
- Separating generated KB and manual KB avoids ambiguity about what can be overwritten and what cannot.

Important point:

- The distinction between `knowledge-base-dk` and `knowledge-base-manual` stops being relevant in the generation of HyperCV and subsequent projections.
- For later steps there is a single logical view of the knowledge base, regardless of source.

### 5. Derived data classes for HyperCV and site

Consolidated derived classes and subclasses:

- private derived class `hypercv-draft`
	- KB drafts for `cv-experience`, `cv-project`, `cv-star`
	- manual drafts for `cv-experience`, `cv-project`, `cv-star`
- separate private class `hypercv-composition`
	- composition for `cv-experience`, `cv-project`, `cv-star`
- private canonical class `hypercv-final`
	- `cv-experience`
	- `cv-project`
	- `cv-star`
- private derived class `site-data`

Class and subclass decisions:

- `hypercv-draft`
	- family of draft artifacts for HyperCV
	- may contain KB contributions and manual contributions, even partial ones
	- KB drafts are derived from the knowledge base; manual drafts are entered or corrected manually
	- it is not canonical
	- persistence is useful for review, comparison, and controlled regeneration

- `hypercv-composition`
	- class separate from drafts
	- contains the convergence rules between draft contributions and references to approved revisions
	- may be explicit or implicit through model defaults
	- becomes explicit whenever a KB source participates or when convergence is not trivial

- `hypercv-final`
	- final canonical content in CV/STAR format
	- persisted and materialized in the private domain
	- canonical source for projection toward the site
	- must not mix draft or composition logic within itself

- `site-data`
	- projection data for the static site
	- never edited by hand
	- regenerable
	- persisted only as cache/materialization when useful for build, DevOps, and deploy
	- contains the public persona profiles and the path model derived from them

Rationale:

- It is necessary to clearly separate private canonical content, draft contributions, composition rules, web projection, and final public output.
- The deployed static site must not coincide with the source layers of the content.

### 6. Transformations between classes

Decisions:

1. `raw -> deep-knowledge`
	Type: ingestion / normalization.
	Rule: formal noise cleanup and restructuring are allowed; loss of relevant meaning is not allowed.

2. `deep-knowledge -> knowledge-base-dk`
	Type: distillation.
	Rule: it is synthesized, deduplicated, made LLM-friendly, and attempts are made to remove redundancy and sensitivity; the process must be rerunnable over time.

3. `knowledge-base (unified view) -> hypercv-draft`
	Type: generation of KB drafts.
	Rule: draft contributions derived from the knowledge base are produced, even partial ones, intended for subsequent editorial convergence.

4. `hypercv-draft + hypercv-composition -> hypercv-final`
	Type: editorial materialization.
	Rule: final content must be generated explicitly from draft and composition; it must not be deduced informally and must not be used as a container for internal logic.

5. `hypercv-final -> site-data`
	Type: technical projection.
	Rule: everything is generated from scratch or in any case without manual edits to site-data; this is where dual language, public persona profiles, navigable citations, and verticalization by site paths are born.

6. `site-data -> static-site`
	Type: static rendering.
	Rule: the public output is the deployed static package, not the source or intermediate data.

Cross-cutting boundary rule:

- all transitions from the private data domain to the deployed public output must be allowlist-based, not denylist-based
- publication safety must be verified before an artifact can contribute to the public static output

### 7. Validators

Decisions:

- Real validators start from `deep-knowledge` onward.
- For raw inputs there are only minimal ingestion checks.
- For persisted classes at least these validation domains are required:
	- structure
	- lineage
	- safety
	- semantic-quality
	- consistency
	- publication-readiness

Design principles:

- Validators must not be duplicated per class if the same logic can be reused.
- Validators belong to reusable control domains, not to a single concrete class.
- Each class declares which domains and reusable validators are relevant for its artifacts.
- A pipeline can reuse the same validators on different classes, applying them where the domain is relevant.
- Validation is separate from transformation and promotion: it describes the state of an artifact, it does not by itself decide the pipeline transition.

Validator output model:

- Validators produce diagnostic observations, not operational severities.
- Every observation must have at least one stable `code` used by policies and a comparable identity over time.
- Pipeline policies must work on `code`, not on `observation_id`.
- The same `code` can be emitted by different rules if it represents the same semantic category of problem for policies.
- A rule that does not find the condition it checks emits nothing.

Observation governance model:

- Operational severities such as `blocking`, `non-blocking`, or equivalents are not part of the validator: they derive from the policy of the context that consumes the observations.
- Suppressions are part of the validation system design and must be able to act at different granularities.
- The identity of an observation must be semantic enough to allow comparison between reports and targeted suppressions.
- The exact format of `observation_id` and the serialization details are implementation decisions to defer.

Role of the pipelines:

- Automatic pipelines verify that the input satisfies the preconditions required by the transformation.
- After transformation, the pipelines rerun the relevant validators on the target class.
- Promotion must not be used as a generic synonym for transformation: it remains a governance concept applied only to transitions that raise the level of responsibility, canonicity, or visibility.

Matrix guidelines by class:

- `deep-knowledge`: prioritize `structure`, `lineage`, `safety`, `consistency`; `semantic-quality` remains useful but does not by itself define the validity of the layer.
- `knowledge-base-dk` and `knowledge-base-manual`: mainly require `structure`, `lineage`, `consistency`, `safety`; `semantic-quality` becomes more relevant for the editorial value of the output.
- logical `knowledge-base` view: must be validated as an integration result, therefore with strong emphasis on `lineage` and `consistency`.
- `hypercv-draft`: requires validations that help review and consolidation; `publication-readiness` may be observed but is not yet the dominant criterion.
- `hypercv-composition`: requires validations oriented toward coherence, traceability of referenced revisions, and preparation for final materialization.
- `hypercv-final`: requires all relevant domains, including those related to readiness for projection and static deploy.
- `site-data`: mainly requires controls on projection integrity, traceability toward `hypercv-final`, and absence of leakage.

Guidelines for HyperCV subclasses:

- `cv-experience`, `cv-project`, and `cv-star` inherit the domains of the layer in which they live.
- Subclasses may add validators specific to their catalog role without introducing a separate taxonomy.
- Subclass-specific rules will need to be refined during implementation and real reviews, not closed in advance in this brainstorming.

Practical consequence:

- The validator matrix should be understood as architectural guidance on the expected control domains for each class and subclass.
- The concrete rule catalog will be refined progressively as real problems emerge to automate.

### 8. HyperCV as a CV catalog, not only as a collection of isolated STARs

Decision:

- HyperCV must maintain the nature of a cataloged CV.
- The final structure is not only a list of independent STAR documents.
- An explicit catalog hierarchy is needed.

Chosen catalog:

1. `cv-experience`
	Minimum required fields:
	- `experience_id`
	- `kind`
	- `label`
	- `role_label`
	- `period_from`
	- `summary`
	- `policy`

2. `cv-project`
	Minimum required fields:
	- `project_id`
	- `experience_id`
	- `label`
	- `summary`
	- `policy`

3. `cv-star`
	Minimum required fields:
	- `star_id`
	- `experience_id`
	- `project_id`
	- `title`
	- `situation`
	- `task`
	- `action`
	- `result`
	- `public_sources`
	- `policy`

Relationships:

- one `cv-experience` contains `1..n` `cv-project`
- one `cv-project` contains `1..n` `cv-star`

Additional decision:

- the concepts of draft, composition, policy, and revisions extend not only to `cv-star` but also to `cv-experience` and `cv-project`
- therefore the entire HyperCV catalog is generable and reviewable at multiple levels, not only in the STAR narrative part

### 9. Draft, composition, and final content

Decisions:

- Final HyperCV content is distinct from drafts and composition.
- `hypercv-final` is always a materialized and canonical S.T.A.R. document in the private domain.
- Draft and composition must not contaminate canonical final content.
- Final content must be generated, not informally deduced by reading internal layers.
- `hypercv-composition` is a separate class, linked to draft and final through the same logical `artifact_id`.
- Every `hypercv-final` is the result of a valid composition, explicit or implicit.

### 10. Revisions and stale detection

Decisions:

- All HyperCV artifacts must have a mandatory `revision` field.
- For generated contributions (`*.kb.md`) and for `hypercv-final` the initial revision can be a generation timestamp `YYYYMMDDHHMMSS`.
- `hypercv-composition` must explicitly reference the approved KB revision and, when present, the manual revision it refers to.
- Revision constraints take precedence over the composition strategy.
- If a revision referenced by a composition changes, the composition becomes `stale` and the `hypercv-final` can no longer be automatically regenerated without a new review.
- For the MVP revision pinning can happen at artifact level, not at single-field level.

Defaults of implicit composition:

- `manual revision`: `0..1`
- `kb revision`: `none`
- `section scope`: `all`
- `strategy`: `manual XOR kb`

Operational rules:

- Implicit composition is simply the composition obtained by applying all defaults.
- An explicit composition can redefine only the necessary fields, leaving the others to defaults.
- If a KB source participates, the composition must explicitly reference the approved KB revision.
- If there are multiple incompatible contributions or non-trivial merges, the composition must be explicit.
- The default composition allows the unambiguous manual-only case; KB never enters the final implicitly.

### 11. Manual content intended for the public site

Decision:

- HyperCV allows native manual content even without an upstream source in the KB.
- These cases are considered legitimate, even if over time a gradual migration toward KB-derived content is hoped for.

### 12. Policies for managing CV objects

Decision:

- All `cv-experience`, `cv-project`, and `cv-star` objects can be handled with policies such as `kb-managed`, `manual-managed`, or `hybrid`.

### 13. Language and localization

Decision:

- `hypercv-final` is monolingual, presumably Italian with possible English terminology when natural for the professional domain.
- Dual language appears only in the `hypercv-final -> site-data` transition.

### 14. Site-data

Decision:

- `site-data` are never edited manually.
- Any corrections must be made on HyperCV or on the transformation pipeline.
- Regeneration must be able to wipe out any manual modification of site-data.
- `site-data` remain private artifacts.
- `site-data` are regenerable from `hypercv-final` and do not become the source of truth.
- Persisting `site-data` is a cache/materialization choice, not canonical ownership of the content.
- Canonical HTML rendering starts from `site-data`, not directly from `hypercv-final`.
- `site-data` are not a mirror of the HyperCV catalog: they are a specialized projection for the web.
- Every significant content node in `site-data` must maintain internally traceable provenance toward one or more fragments of `hypercv-final`, with at least `artifact_id`, `revision`, and a stable selector of the source fragment.
- User-facing citations must not resolve toward `hypercv-final`, which remains private and monolingual, but toward localized public targets derived in the web projection.
- Persona profiles are first-level public entities in the `site-data` model.
- Public paths derive from persona profiles and from the projection of canonical content, not from an autonomous duplication of content.
- The `hypercv-final -> site-data` contract therefore requires four stable elements: internal provenance, localized citation targets, public persona profiles, and path derivation coherent with the canonical content.

### 15. Determinism and LLM

Decision:

- LLM-driven transformations must be made as operationally deterministic as possible, using very low temperatures and precise instructions.
- Strong determinism is not assumed, however, because model behavior is not completely under control.

### 16. Security of the submodule and credentials

Decisions:

- A private submodule inside a public repo does not make the content of the private readable to anyone who does not have permissions on the private.
- The submodule still exposes metadata of the private repo and introduces more operational friction; for this reason it was downgraded from target architecture to possible workspace variant.
- The real security risk is not the submodule itself, but overly broad credentials or untrusted workflows with access to the private.

Minimum guardrails that emerged:

- secret scanning on public repo, private repo, and release/deploy jobs
- least-privilege credentials to read the private
- no untrusted public workflow must be able to read private data
- explicit leakage checks before deploy of the `static-site` and before releases of the public engine
- the release/deploy manifest remains the audit source, not the Git state of the mount or the submodule

### 17. Promotion flow

Decision:

- In the new model there is no longer any promotion of data from the private repository to the public repository.
- All transformations between data classes (`raw`, `deep-knowledge`, `knowledge-base`, `hypercv-*`, `site-data`) happen in the private domain.
- Promotion toward the public coincides with deploy of the `static-site` generated in the private domain.
- In parallel there is a distinct promotion of the public engine: release of the code, package, or tool consumed by the private repository.

Rationale for explicit governance:

- clearly separates engine release from content publication
- makes observable the moment when the public engine is released or the shared workflow is updated
- lowers the risk of accidental publication and of drift between the engine used and the deployed site

Two distinct promotions in the model:

1. promotion of the public engine
	- happens in the public repository
	- produces an installable version of the engine
	- is relevant for CI/CD, automation, and non-local environments

2. promotion of the public site
	- happens in the private repository
	- uses an explicit version of the public engine
	- starts from private canonical data and ends with deployment of the `static-site`

Minimum operational contract that emerged:

- the public repo must be able to run in `showcase mode` with sample/demo data and without access to real data
- the private runtime must be able to consume the public engine as an installable package/tool
- local development must be able to use side-by-side checkouts without republishing the package on every change
- the `static-site` is the only artifact that crosses the boundary toward the public

Minimum gates of site promotion:

- explicit selection of the public engine version to use
- validation of the private layers required by the build
- application of publication safety and leakage checks
- generation of `site-data` and rendering of the `static-site`
- evidence of release, provenance, and checks performed

Subsequent consolidated decisions:

- the private repository does not promote data into the public repository; it promotes only deployment of the `static-site`
- `hypercv-final` and `site-data` remain on the private side even when they contribute to the public output
- the version of the engine used to generate the site must be traceable
- the private repository can use side-by-side checkouts locally, but in automation the official contract remains the versioned public package/tool

## Consolidated Model

1. ephemeral `raw-input`
2. persisted and immutable `deep-knowledge`
3. `knowledge-base-dk` regenerable from deep knowledge
4. manually editable `knowledge-base-manual`
5. unified logical view of the `knowledge-base`
6. `hypercv-draft` persisted for review and editorial convergence
7. `hypercv-composition` as a separate convergence class
8. `hypercv-final` materialized and canonical in the private domain
9. `site-data` generated, private, and never edited by hand
10. `static-site` generated and publicly deployed

## Closed Decisions

Decisions closed in this session:

- `public code + private data` model
- public repository as authoritative codebase
- public repository as installable engine consumed by the private repository
- raw as ephemeral input and not as a persisted class
- `deep-knowledge` append-only, immutable, and non-regenerable
- distinction between `knowledge-base-dk` and `knowledge-base-manual`
- unified logical view of the knowledge base in HyperCV generation
- `hypercv-draft` as a family of KB and manual contributions, even partial ones
- `hypercv-composition` as a separate class, explicit or implicit, that governs convergence toward the final
- `hypercv-final` as materialized private canonical content
- `site-data` as a private derived projection, regenerable and persistable only as cache/materialization
- `static-site` as the only public production artifact
- validator model by control domains instead of one validator family per class
- diagnostic observations with stable codes and policy-defined severities
- HyperCV catalog `cv-experience -> cv-project -> cv-star`
- revision mandatory for all HyperCV artifacts
- explicit stale detection when a referenced revision changes
- monolingual `hypercv-final`, dual language only in `site-data`
- internal provenance required in `site-data` and localized public citation targets
- public engine promotion distinct from site publication promotion

## Open Questions Residue

No architectural open points remain within the scope of this brainstorming.

Notes that remain, but are no longer considered architectural open points:

- the validator matrix is closed at brainstorming level as a design guide; the concrete rule catalog will be refined during implementation and review
- the detail of the `site-data` data contract will need refinement at schema or file layout level during implementation
- the full rebuild vs delta rebuild strategy is an implementation choice
- workspace bootstrap (side-by-side checkouts, init scripts, operational fallbacks) is an implementation choice

## Status

The brainstorming session is considered closed.

This file is the consolidated primary source of the session and can be used as input for the subsequent architecture review, architectural formalization, or implementation planning.