---
artifactType: 'implementation-guidelines'
status: 'active'
scope: 'operational-definition'
sourceArchitecture: '/workspaces/alecsg77-portal/_bmad-output/planning-artifacts/architecture.md'
intendedPhase: 'implementation'
archiveWhen: 'implementation decisions are consolidated in code, tests, and final documentation'
date: '2026-03-16'
---

# Tech Spec Operational Guidelines

_This document is a temporary implementation-phase addendum. It captures operational guidance extracted from the architecture so implementation agents can work consistently without overloading the architecture document with file-level and process-level detail._

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
6 areas where AI agents could make incompatible choices if patterns are not specified early:
- canonical content naming and identifiers
- content generation pipeline stage boundaries
- route and locale mapping conventions
- component and file organization
- validation and manifest formats
- interaction, loading, and error-handling behavior

### Core Architectural Principle

The core architecture of this MVP is the content pipeline, not the frontend framework. The public frontend is a delivery projection of approved private canonical knowledge. All implementation patterns must therefore protect the integrity, traceability, and governability of the private generation pipeline first, and only then optimize rendering and delivery.

### Content Generation Patterns

**Pipeline Boundaries:**
- Raw notes, private source material, and working prompts must never be consumed directly by frontend rendering.
- Distillation outputs must pass through explicit private class transitions before they become publishable frontend input.
- Rendering components must consume `site-data` only, never intermediate generation outputs.
- The frontend must not repair, infer, or reinterpret missing semantic structure that should have been produced earlier in the pipeline.
- Human approval closes semantic authority. After approval, downstream stages may transform, package, validate, and render content, but must not silently redefine its meaning.

**Pipeline Stages:**
- Capture
- Distill
- Normalize
- Validate
- Approve
- Publish
- Deliver

Each stage must have a single responsibility, explicit input/output expectations, and a clearly owned artifact transition.

**Stage Rules:**
- Capture collects raw notes or recordings without forcing publish structure prematurely.
- Distill extracts candidate structured facts, claims, and private evidence units from raw material.
- Normalize maps distilled outputs into explicit private classes, stable identifiers, revision-aware composition references, and reusable content structures.
- Validate checks schema correctness, localization parity, provenance completeness, structural consistency, stale state, and publish eligibility.
- Approve establishes the human-reviewed canonical HyperCV artifact as the authoritative source of meaning.
- Publish generates `site-data`, route manifests, search inputs, release evidence, and the deployable static package from approved private canonical artifacts.
- Deliver publishes the static package without altering domain semantics.

**Artifact Model:**
The pipeline should distinguish explicit private and public artifact classes:
- raw source material
- `deep-knowledge`
- `knowledge-base` artifacts
- `hypercv-draft`
- `hypercv-composition`
- `hypercv-final`
- `site-data`
- deployable static package

These layers must be treated as separate contracts, not as interchangeable files.

**Artifact Rules:**
- Raw source material is private and non-renderable.
- `deep-knowledge` is append-only, immutable, private, and not a render target.
- `knowledge-base` artifacts remain private and are managed either as distillation-derived or manual contributions.
- `hypercv-draft` and `hypercv-composition` remain private editorial artifacts and are never frontend inputs.
- `hypercv-final` is the private semantic source of truth for publication and reuse.
- `site-data` is a private projection optimized for route generation, search indexing, localization, and rendering.
- The deployable static package is the only production artifact that crosses the runtime public boundary.

**Transformation Rules:**
- No stage may silently mutate canonical identifiers, locale links, approval state, or provenance metadata.
- Derived frontend fields must be generated through explicit mappers, not ad hoc inline page logic.
- Any new publishable field must be introduced in the canonical schema first, then mapped into `site-data` deliberately.
- If a field is needed only for presentation, its derivation rule must still be traceable back to private canonical content.
- Any transformation that changes meaning rather than shape must occur before approval, not after it.
- If a referenced approved revision changes, the affected composition and downstream final artifacts must be treated as stale until re-reviewed.

### Naming Patterns

**Content and Domain Naming Conventions:**
- Canonical content IDs must use stable kebab-case strings such as `career-journey`, `ai-distillation-pipeline`, `offer-strategy`.
- Locale codes must use `en` and `it` only.
- Locale-linked nodes must share the same canonical ID and differ only by locale metadata.
- Collection names should be plural, lowercase, and domain-oriented, such as `topics`, `artifacts`, `proofPoints`, if Astro collections are used.

**Route Naming Conventions:**
- Public route segments must use lowercase kebab-case.
- Localized routes must be explicit, for example `/en/about/positioning` and `/it/about/posizionamento`.
- Route parameters, if introduced later, must use descriptive lowercase names such as `[topicSlug]`, not ambiguous names such as `[id]` unless the route is truly ID-driven.
- Route semantics must be derived from canonical content mappings, not handcrafted independently per locale.

**Code Naming Conventions:**
- Components: PascalCase, for example `EvidenceBlock.astro`, `TopicEntryCard.astro`
- Utilities: camelCase function names, for example `buildLocaleRouteMap`
- Files for utilities: kebab-case, for example `build-locale-route-map.ts`
- Types and schemas: PascalCase, for example `TopicNode`, `ArtifactSchema`
- Constants: UPPER_SNAKE_CASE only for true constants, otherwise exported configuration objects in camelCase

### Structure Patterns

**Project Organization:**
- Canonical content definitions and structured content live under a dedicated content domain, separate from rendering components.
- Astro page files must remain thin composition layers, not containers of domain logic.
- Shared validation, mapping, manifest-generation, and publish-assembly utilities must live in dedicated library modules.
- Interactive behavior must be isolated in small components or islands rather than embedded across page templates.
- Private pipeline logic must remain clearly separated from public delivery logic even if both live in the same repository.

**File Structure Patterns:**
- Content schemas and content transformation rules must be colocated logically, not duplicated across pages.
- Route helpers and locale helpers must live in a dedicated routing module.
- Publish validation and release checks must live in a dedicated build or validation area.
- Static assets must be organized by durable purpose, such as icons, illustrations, and social assets, not by page-specific convenience.

### Format Patterns

**Canonical Artifact Formats:**
- Structured metadata must use consistent code-facing field names across all pipeline stages.
- Canonical artifacts must include:
  - `canonicalId`
  - `locale`
  - `contentType`
  - `approvalStatus`
  - `provenanceRef`
  - `publishEligibility`
  - `schemaVersion`
- Persisted content fields should remain consistent across all locales and content types.

**Publish Manifest Formats:**
- Publish manifests should be explicit JSON artifacts with stable keys such as:
  - `buildId`
  - `generatedAt`
  - `locale`
  - `canonicalId`
  - `route`
  - `publishEligible`
  - `validationStatus`

**Error and Result Formats:**
- Validation scripts should emit machine-readable structured errors first, then human-readable summaries.
- Every validation error should include:
  - rule identifier
  - affected canonical ID or route
  - locale if relevant
  - severity
  - remediation hint
- Failures that affect publish safety must stop the build.

### Communication Patterns

**Pipeline-to-Frontend Contract:**
- Rendering components must consume explicit typed inputs, not raw ad hoc content blobs.
- Locale switching logic must depend on canonical node mappings, not string heuristics.
- Search indexing must consume normalized publishable outputs rather than page internals.
- Delivery contracts must be explicit enough that a future ASP.NET MVC backend can consume the same `site-data`, canonical contracts, and publish manifests without redefining domain meaning.
- Frontend concerns may influence delivery projections, but must not back-propagate semantic shortcuts into canonical artifact design.

**State Management Patterns:**
- Prefer no global client state for V1.
- Use page state from build output, URL state, anchor state, and local component state only.
- Islands must own only their local interactive state.
- Shared client state is forbidden unless a documented architectural exception is added later.

### Process Patterns

**Error Handling Patterns:**
- Build-time validation errors must fail fast.
- User-facing frontend errors must degrade gracefully without hiding core content.
- Missing optional enhancements must never block reading or navigation.
- Logging for build and validation tasks must distinguish:
  - informational
  - warning
  - publish-blocking error

**Loading State Patterns:**
- Default preference is no loading state for core content because pages are statically generated.
- Loading indicators are allowed only for enhanced client-side features such as search.
- Skeletons or spinners must not replace already-available static content.
- Islands should render a useful baseline even before hydration.

### Enforcement Guidelines

**All AI Agents MUST:**
- treat canonical content IDs, locale mappings, artifact classes, and route contracts as shared architecture, not local implementation details
- preserve the separation between raw inputs, private persisted classes, private canonical artifacts, private web projections, and the deployable static package
- keep Astro page files thin and move reusable logic into typed utilities
- avoid introducing global client state, runtime data dependencies, or framework-specific shortcuts without explicit architectural approval
- preserve framework-light boundaries so future ASP.NET MVC integration remains feasible
- add or update validation rules when introducing new content structures or publish-critical metadata
- never compensate for missing pipeline semantics inside delivery components

**Pattern Enforcement:**
- Patterns are enforced through code review, schema validation, linting, and publish-time checks.
- Violations must be corrected in the same change where they are introduced.
- Any justified exception must be documented in the architecture or implementation notes before merge.

### Pattern Examples

**Good Examples:**
- `canonicalId: "offer-strategy"` reused across `en` and `it` entries with locale-specific content fields
- a distilled artifact that is normalized into a canonical schema before any route generation occurs
- `EvidenceBlock.astro` receiving typed props from a normalized content mapper
- `build-publish-manifest.ts` generating a stable JSON manifest from validated source content
- thin Astro page that imports route mapping helpers and render components without embedding transformation logic

**Anti-Patterns:**
- locale pages with manually duplicated logic and no canonical node linkage
- page templates that directly reshape raw content inline
- interactive widgets that require hydration for core reading flow
- route generation based on inconsistent slug assumptions across locales
- hidden framework coupling between Astro components and future backend assumptions
- pipeline stages that silently mutate semantic fields or approval state
- frontend components that infer missing meaning from incomplete content instead of failing against the contract

## Project Structure & Boundaries

### Repository Boundary Decision

This project uses a single public repository as the authoritative codebase for the full architecture: distillation pipeline, contracts, validators, release workflow, and frontend delivery.

The privacy boundary applies to data, not to core project code.

Therefore:
- raw notes, transcripts, prompts, private review materials, private structured content classes, `hypercv-final`, `site-data`, and release-candidate outputs must remain outside the public repository
- distillation, normalization, validation, projection, release, deploy, and frontend delivery code must remain inside the public repository
- the public repository must be executable against sanitized fixtures for showcase purposes and against private local data sources for real authoring workflows

This keeps the codebase unified and inspectable while preserving privacy for sensitive source material and private content structure.

### Private Data Persistence Boundary

Private production data is not only sensitive input; it is the recovery base for the entire system. Raw notes, private review materials, persisted knowledge classes, HyperCV artifacts, `site-data`, and release evidence inputs must therefore be stored in secure persistent storage outside the public repository.

That storage must support:
- recovery of source materials after data loss
- reprocessing when distillation or transformation logic changes
- revision-aware review of compositions and final artifacts
- controlled promotion from private classes into a deployable static package

Private data versioning is not mandatory by default. It should be introduced only if required by validated use cases such as rollback, auditability, historical comparison, or recovery guarantees beyond simple persistence.

### Data Classes for Production and Testing

The architecture distinguishes four operational data classes:

- private production data:
  raw notes, deep knowledge, knowledge-base content, HyperCV drafts, compositions, final artifacts, `site-data`, and release evidence inputs stored in secure private storage

- private projection artifacts:
  generated route payloads, localized citation targets, search sources, release candidate bundles, and other regenerable web-delivery artifacts that remain private until deployment

- public production artifacts:
  the deployed static site package and the runtime-served static assets produced from the private pipeline

- test data:
  synthetic or sanitized fixtures, stable regression datasets, and deterministic publishing inputs used for automated validation

### Testability Rules

- private production data must never be used as automated test input
- public deployed output must not be treated as the only stable baseline for repetitive publishing tests
- automated tests must rely on dedicated synthetic or sanitized datasets that are versioned and stable
- distillation validation, HyperCV materialization validation, and publishing validation may use different test datasets because they verify different contracts
- the public repository must remain runnable and demonstrable without requiring access to private production data

### Complete Project Directory Structure

```text
alecsg77-portal/
├── README.md
├── package.json
├── tsconfig.json
├── astro.config.mjs
├── .gitignore
├── .editorconfig
├── .env.example
├── docs/
│   ├── architecture/
│   ├── adr/
│   └── release-evidence/
├── config/
│   ├── locales.ts
│   ├── routes.ts
│   ├── content-pipeline.ts
│   ├── publish-rules.ts
│   ├── release-rules.ts
│   └── search.ts
├── scripts/
│   ├── pipeline/
│   │   ├── run-pipeline.ts
│   │   ├── ingest-raw.ts
│   │   ├── distill-deep-knowledge.ts
│   │   ├── build-knowledge-base.ts
│   │   ├── generate-hypercv-draft.ts
│   │   ├── materialize-hypercv-final.ts
│   │   ├── build-site-data.ts
│   │   └── detect-stale-compositions.ts
│   ├── release/
│   │   ├── build-static-package.ts
│   │   ├── build-release-evidence.ts
│   │   ├── build-publish-manifest.ts
│   │   ├── check-localization-parity.ts
│   │   ├── generate-search-index.ts
│   │   ├── run-release-gates.ts
│   │   ├── verify-no-private-leakage.ts
│   │   └── deploy-static-package.ts
│   └── reporting/
│       └── export-release-evidence.ts
├── fixtures/
│   ├── synthetic/
│   ├── sanitized/
│   └── showcase-site-data/
├── test-data/
│   ├── distillation/
│   ├── hypercv/
│   ├── publishing/
│   └── e2e/
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── en/
│   │   └── it/
│   ├── layouts/
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── evidence/
│   │   ├── disclosure/
│   │   └── islands/
│   ├── lib/
│   │   ├── content/
│   │   │   ├── schemas/
│   │   │   ├── contracts/
│   │   │   ├── mappers/
│   │   │   ├── validators/
│   │   │   └── provenance/
│   │   ├── routing/
│   │   ├── search/
│   │   ├── release/
│   │   └── analytics/
│   ├── styles/
│   ├── types/
│   └── env.d.ts
├── public/
│   ├── assets/
│   ├── icons/
│   └── social/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── .github/
    └── workflows/
        ├── ci.yml
        └── release-validation.yml

portal-private/   (outside repo, secure, persistent)
├── raw/
│   ├── notes/
│   ├── transcripts/
│   └── prompts/
├── deep-knowledge/
├── knowledge-base/
│   ├── dk/
│   └── manual/
├── hypercv/
│   ├── drafts/
│   │   ├── cv-experience/
│   │   ├── cv-project/
│   │   └── cv-star/
│   ├── compositions/
│   └── final/
├── site-data/
│   ├── en/
│   ├── it/
│   ├── search/
│   └── manifests/
├── release/
│   ├── candidates/
│   ├── evidence/
│   └── deployable/
└── manifests/
```

### Architectural Boundaries

**Codebase Boundary:**
- The public repository contains the full architecture code: distillation, normalization, validation, materialization, publication, and frontend delivery.
- No core architectural code should be hidden in private-only workspaces.
- Shared schemas and contracts must be used across private-data execution and showcase-safe execution.

**Private Data Boundary:**
- Private production data lives only in secure persistent storage outside the repository.
- Private storage is the recovery and reprocessing base for the system.
- All transformations across `raw`, `deep-knowledge`, `knowledge-base`, `hypercv-*`, and `site-data` happen inside this private boundary.

**Canonical Knowledge Boundary:**
- `hypercv-final` is the semantic source of truth for publication and reuse.
- `hypercv-draft` and `hypercv-composition` are editorial and governance layers, not render inputs.
- Future backend orchestration must consume these contracts rather than redefine them.

**Projection Boundary:**
- `site-data` contains private web projections derived from `hypercv-final`.
- `site-data` is optimized for routing, search, rendering, and release evidence preparation.
- `site-data` must remain auditable, regenerable, and never manually edited.

**Public Runtime Boundary:**
- The only production artifact that crosses into the public runtime is the deployable static package.
- No raw data, private structured content, HyperCV source layers, or `site-data` may be committed or published as public runtime source material.

**Test Data Boundary:**
- `test-data/` and `fixtures/` contain stable synthetic or sanitized datasets for automated validation.
- Test datasets must be versioned and repeatable.
- Test datasets must not be replaced by live private production data or by the latest deployed site output.

### Requirements to Structure Mapping

**FR1-FR4 Data Ingestion & Distillation:**
- `scripts/pipeline/ingest-raw.ts`
- `scripts/pipeline/distill-deep-knowledge.ts`
- `scripts/pipeline/build-knowledge-base.ts`
- `src/lib/content/schemas/`
- `src/lib/content/contracts/`
- `src/lib/content/validators/`
- `tests/integration/`
- private inputs resolved from `portal-private/`

**FR5-FR8 Content Assembly & Generation:**
- `scripts/pipeline/generate-hypercv-draft.ts`
- `scripts/pipeline/materialize-hypercv-final.ts`
- `scripts/pipeline/build-site-data.ts`
- `scripts/pipeline/detect-stale-compositions.ts`
- `scripts/release/build-publish-manifest.ts`
- `scripts/release/run-release-gates.ts`
- `tests/integration/`

**Localization & Bilingual Parity:**
- `config/locales.ts`
- `config/routes.ts`
- `portal-private/site-data/en/`
- `portal-private/site-data/it/`
- `scripts/release/check-localization-parity.ts`
- `tests/integration/`

**Search & Discovery Acceleration:**
- `src/lib/search/`
- `portal-private/site-data/search/`
- `scripts/release/generate-search-index.ts`
- `tests/e2e/search/`

**Automated Validation and Regression Safety:**
- `test-data/distillation/`
- `test-data/hypercv/`
- `test-data/publishing/`
- `tests/unit/`
- `tests/integration/`
- `tests/e2e/`

### Integration Points

**Private Promotion Flow:**
- raw -> `deep-knowledge`
- `deep-knowledge` -> `knowledge-base`
- `knowledge-base` -> `hypercv-draft`
- `hypercv-draft` + `hypercv-composition` -> `hypercv-final`
- `hypercv-final` -> `site-data`
- `site-data` -> deployable static package

**Future ASP.NET MVC Integration:**
- ASP.NET MVC should consume `site-data`, publish manifests, or canonical contracts, not Astro page internals.
- This preserves V2 as a runtime or orchestration evolution instead of a semantic rewrite.

### File Organization Patterns

**Public Repository Rules:**
- only code, configuration, synthetic fixtures, sanitized fixtures, and showcase-safe assets may be versioned
- raw notes, prompts, transcripts, `deep-knowledge`, `knowledge-base`, HyperCV production artifacts, `site-data`, and intermediate private artifacts are forbidden
- test fixtures must be synthetic or sanitized
- the public repository must support repeatable automated validation without private data access

**Private Storage Rules:**
- private storage must be persistent and secure
- it is the authoritative source for reprocessing and disaster recovery
- `site-data` persists there only as a regenerable projection and must never become the source of truth
- versioning is optional until justified by specific recovery, rollback, or audit use cases

### Development Workflow Integration

**Development Server Structure:**
- the repository must run in showcase mode using public fixtures
- the same codebase must also run in private authoring mode using local secure inputs
- rendering must consume fixture `site-data` in showcase mode and private `site-data` in authoring mode
- semantic repair must never happen in rendering code

**Build Process Structure:**
- verify no private leakage
- validate private canonical content and revision references
- detect stale compositions
- build `site-data`
- verify localization and provenance
- generate search inputs, release evidence, and manifests
- build Astro site from `site-data`
- run release gates and deploy the static package
- run automated tests against stable test datasets, not live production data

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
The implementation guidance is coherent around a static-first public delivery model and a private-content-centered generation pipeline. Astro remains a delivery framework rather than the owner of domain semantics. TypeScript-based contracts, class-based private content modeling, revision-aware validation, and the separation between private storage, private `site-data`, and the deployable static package reinforce the same architectural direction.

**Pattern Consistency:**
The implementation patterns support the architectural decisions well. Naming, structure, format, and process rules all reinforce the central principle that the content pipeline is the primary architecture and the frontend is a delivery projection. The class distinctions and stage boundaries reduce the risk that AI agents will mix raw inputs, editorial artifacts, canonical meaning, and render-time transformations.

**Structure Alignment:**
The project structure aligns with the updated architecture. The repository tree separates code, fixtures, tests, and frontend concerns clearly, while private production data, HyperCV artifacts, and `site-data` remain outside the repository in secure persistent storage.

### Requirements Coverage Validation ✅

**Feature Coverage:**
The implementation guidance supports both halves of the MVP:
- the private offline-first distillation pipeline
- the public static-first bilingual portal

**Functional Requirements Coverage:**
The guidance supports raw note ingestion, human approval, HyperCV composition, revision pinning, stale detection, artifact reuse across routes, bilingual route consistency, static search, progressive disclosure, publish-time validation, and release evidence.

**Non-Functional Requirements Coverage:**
- static-first performance constraints
- no-critical-JS resilience
- strong public/private data separation
- governance through provenance, approval, revision, and release gates
- bilingual consistency
- showcase/public-repository constraints
- recovery and reprocessing needs through secure persistent private storage
- repeatable automated validation through dedicated test datasets

### Implementation Readiness Validation ✅

**Decision Completeness:**
Critical decisions are sufficiently documented for implementation to begin. The technology direction, engine/data boundary, privacy boundaries, data classes, pipeline stages, revision handling, and migration stance are explicit enough to guide AI agents consistently.

**Structure Completeness:**
The project structure is concrete and implementation-oriented. It defines code ownership, artifact ownership, validation boundaries, and the transition from private classes to a deployable public artifact.

**Pattern Completeness:**
The most dangerous conflict areas are covered:
- semantic ownership
- artifact transitions
- route generation
- rendering boundaries
- leakage prevention
- test data separation
- revision pinning and stale detection

### Gap Analysis Results

**Important but Non-Blocking Gaps:**
- The secure private storage solution is intentionally unspecified and must be chosen during implementation planning.
- Private data versioning is deferred and should be revisited once rollback or audit needs are proven.
- Exact field-level schemas remain implementation-phase work, though the class model and folder layout are now defined.
- Regression comparison for pipeline reprocessing still needs a concrete strategy.

**No Critical Architectural Gaps Found:**
No unresolved issue currently blocks implementation planning at the architectural level.

### Validation Issues Addressed

The main validation risks addressed in this update are:
- removing the outdated assumption that production canonical artifacts are versioned in the public repository
- making `hypercv-final` and `site-data` explicitly private operational classes
- aligning the implementation structure with revision-aware composition and stale detection
- clarifying that only the deployable static package crosses the public runtime boundary

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions where relevant
- [x] Technology stack sufficiently specified
- [x] Integration patterns defined
- [x] Performance, privacy, and governance considerations addressed

**✅ Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component, artifact, and data boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping completed

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Qualification:** Architecturally ready for implementation. Operational details for secure storage and regression governance remain to be defined during implementation planning.

**Confidence Level:** High

### Implementation Handoff

**AI Agent Guidelines:**
- Follow the class model and stage boundaries exactly.
- Treat the content pipeline as the architectural center of the system.
- Keep frontend rendering semantically thin and `site-data`-driven.
- Never introduce dependencies on private production data into the public repository.
- Use only synthetic or sanitized fixtures for automated tests.
- Treat the transition from private classes to deployable package as a governed step, not a casual file copy.
- Do not compensate in delivery code for missing meaning, metadata, or validation that belongs earlier in the pipeline.

**First Implementation Priority:**
Set up the repository skeleton, shared contracts, and private-data integration boundary first. Then implement revision-aware validation, HyperCV materialization, and `site-data` projection scaffolding before building interactive frontend enhancements.