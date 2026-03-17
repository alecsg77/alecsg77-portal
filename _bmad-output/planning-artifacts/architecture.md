---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/brainstorming/brainstorming-session-2026-03-15-0620.md
workflowType: 'architecture'
lastStep: 8
status: 'complete'
project_name: 'alecsg77-portal'
user_name: 'Alessio'
date: '2026-03-14'
completedAt: '2026-03-14'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

The project combines two tightly coupled domains: a private offline-first authoring and distillation pipeline, and a public static-first bilingual portal. Architecturally, this is a controlled content supply chain rather than a website with supporting scripts.

The architecture is shaped by 32 functional requirements across those two domains and by strict non-functional constraints: static-first performance, Lighthouse 95+ targets on key pages, sub-500 ms context-preserving language switching, no-critical-JS resilience, strong public/private separation, provenance-aware publishing, bilingual parity, accessibility, crawlability, stale-aware regeneration, and release evidence.

The updated PRD and the March 15 brainstorming session clarify that the key architectural boundary is not between code repositories but between a public engine and private data classes. The public repository remains authoritative for the engine, contracts, validators, and frontend delivery layer, while all real content classes and transformations remain in the private domain until a sanitized static package is produced.

- Primary domain: static-first bilingual web application with local content pipeline
- Complexity level: medium
- Estimated architectural components: 9

### Architectural Decision Drivers

The current project context already implies a set of strong architectural drivers that will constrain later design choices.

**Driver 1: Public/private separation is non-negotiable**
The public portal must remain strictly isolated from raw notes, working materials, non-approved artifacts, and private structured source layers. This is not only a security concern; it is a product principle and a publishing constraint. The boundary applies to data, not to code.

**Driver 2: Static-first delivery is a core MVP constraint**
The MVP is not allowed to rely on live backend systems for public consumption. This strongly pushes architecture toward build-time generation, static hosting, precomputed navigation structures, and client-side enhancement only where it does not break the no-critical-JS requirement.

**Driver 3: Canonical content reuse must not drift**
The same approved artifact may appear in multiple routes and perspectives. This means the architecture needs a canonical content model with stable identifiers, explicit composition rules, revision pinning, and strong consistency guarantees across generated outputs.

**Driver 4: Bilingual parity is structural, not cosmetic**
English and Italian are not a late translation layer. The architecture must preserve logical node equivalence, detect localization gaps before publish, and maintain context across language switches.

**Driver 5: UX speed and clarity drive frontend architecture**
The persona-first TOC, top-topic entry points, progressive disclosure, and evidence blocks are not ornamental UI patterns. They define the information architecture, routing strategy, content chunking model, and page-generation logic.

**Driver 6: Release evidence is part of the system boundary**
The product is not complete at build output alone. It also requires a release discipline that verifies approval state, leakage prevention, localization consistency, accessibility, and benchmark performance before publication.

**Driver 7: Projection layers must preserve provenance without becoming source of truth**
The bilingual web projection is derived from private canonical content, but that projection must keep traceable provenance back to the approved canonical artifacts while remaining fully regenerable and non-authoritative.

### Product, UX, and Technical Alignment

The MVP succeeds only if product value, guided UX, and technical constraints stay aligned. The architecture must therefore optimize for qualification speed, trust, and clarity through a static-first, governance-safe system built on canonical content, build-time composition, and progressive enhancement.

Later architecture decisions should be evaluated against a three-part test:
- does this improve qualification speed and trust?
- does this preserve the guided UX model?
- does this stay coherent with the static-first and governance-first MVP boundary?

### Technical Constraints & Dependencies

The MVP must avoid live backend dependencies for public consumption. V1 has no authentication, no cloud database, no runtime retrieval layer, and no chatbot behavior. The architecture must therefore support static hosting, publish-time generation from approved canonical artifacts, and client-side enhancements that do not weaken crawlability, accessibility, or no-critical-JS resilience.

The UX specification adds concrete constraints: persona-first routing, progressive disclosure, evidence blocks, mobile/desktop continuity, and node-preserving language switching. The release model adds equally strong governance constraints: provenance-aware content management, bilingual parity, leakage prevention, revision-aware validation, and publish-time validation.

All transformations across `raw`, `deep-knowledge`, `knowledge-base`, `hypercv-*`, and `site-data` occur inside the private domain. The only artifact class allowed to cross into the public runtime boundary is the approved static site package derived through allowlist-based promotion.

### Core Architectural Tensions

- Static simplicity vs future extensibility: V1 must stay static-first without making future backend evolution artificially expensive.
- Guided UX richness vs maintainable generation: persona-first and topic-first navigation must not create route-specific content drift.
- Client enhancement vs resilient delivery: search and disclosure can improve usability, but core meaning must remain available without client execution.
- Governance rigor vs authoring speed: approval, provenance, and release gates must remain strong without making routine publishing impractical.

### Architectural Implications

- Prefer build-time derivation over runtime interpretation.
- Prefer a canonical content schema with stable identifiers, provenance metadata, explicit locale linkage, and revision-aware composition.
- Prefer explicit class boundaries between private persisted content, private canonical HyperCV artifacts, private web projections, and public deployable output.
- Prefer route and language models that preserve logical equivalence explicitly.
- Prefer progressive enhancement over JS-dependent core reading flows.
- Prefer the smallest architecture that satisfies MVP constraints without introducing speculative V2 infrastructure.

### Architectural Risk Register

- Weak canonical model: if approved artifacts do not keep stable identity and reuse rules, content will drift across routes and locales.
- Weak class boundaries: if `deep-knowledge`, `knowledge-base`, `hypercv-final`, and `site-data` are collapsed conceptually, ownership and regeneration rules will become ambiguous.
- Excessive JS dependence: if core comprehension depends on client execution, crawlability, accessibility, and resilience goals will fail.
- Late localization modeling: if bilingual parity is handled too late, language switching and semantic equivalence will become fragile.
- Governance bolted on too late: if approval, provenance, and leakage rules are not modeled upstream, publishing will become manual and unsafe.
- Missing revision pinning: if final artifacts do not pin the approved revisions they materialize, stale outputs will be undetectable and review trust will erode.
- UX routing complexity trap: if persona-first and topic-first routing require route-specific authoring logic, frontend clarity will become operationally expensive.
- V2 overengineering: if future backend evolution is optimized too early, the MVP will absorb complexity without validating present value.

### Cross-Cutting Concerns

- canonical content reuse across multiple routes
- public/private boundary enforcement
- provenance, approval state, and release gating
- revision pinning, stale detection, and materialized review state
- bilingual parity and context-preserving language switching
- projection integrity between `hypercv-final`, `site-data`, and public routes
- accessibility, semantic HTML, and crawlable delivery
- SEO and machine-readable content without critical JS dependency
- performance budgets for navigation, disclosure, and search
- analytics for qualification speed, engagement, and CTA conversion
- responsive continuity across desktop and mobile
- editorial consistency between routing, evidence surfaces, and generated output

### Future Decision Focus

Later design work should stay concentrated on the areas already identified as high leverage: canonical schema evolution, localization and route modeling, search indexing, release validation, and frontend patterns for guided discovery. This keeps future architectural work tied to current constraints rather than speculative platform expansion.

## Starter Template Evaluation

Two realistic starter directions were considered for V1: Astro 6.0.4 and Vite 8.0.0.

**Decision**
Choose Astro 6.0.4 for V1.

**Why Astro**
- strongest fit for a static-first, content-led, bilingual, SEO-sensitive MVP
- lower architectural overhead for routing, content composition, and progressive enhancement
- better alignment with low-JavaScript delivery and editorial publishing flows

**Why not Vite for V1**
- Vite is more neutral toward future ASP.NET MVC integration, but that neutrality shifts more architectural work into the MVP
- a Vite-first approach increases the risk of solving future integration problems before proving current product value

**Guardrail**
Use Astro with migration-aware boundaries: framework-light content contracts, explicit route mappings, isolated interactive components, and no unnecessary coupling between content structure and rendering internals.

### Comparative Assessment

| Criterion | Astro 6.0.4 | Vite 8.0.0 |
| --- | --- | --- |
| Fit for static-first MVP | Strong | Moderate |
| Content-driven publishing support | Strong | Weak to Moderate |
| SEO and low-JS resilience alignment | Strong | Moderate |
| Architectural effort required in V1 | Lower | Higher |
| Neutrality for future ASP.NET MVC integration | Moderate | Strong |
| Risk of V1 overengineering | Lower | Higher |
| Risk of future migration/rework | Moderate | Lower to Moderate |

### Decision Summary

- Choose Astro 6.0.4 as the V1 starter because it best fits the MVP's static-first and content-led requirements.
- Recognize Vite 8.0.0 as the main alternative when future ASP.NET MVC integration is weighted more heavily than MVP specialization.
- Reduce future migration cost by keeping content modeling, route contracts, and interactive behaviors as framework-light as practical.
- Treat backend integration, authentication, chatbot runtime, and SSR as future capability triggers rather than current implementation commitments.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Use a file-based private canonical content architecture with explicit classes for `deep-knowledge`, `knowledge-base`, `hypercv-draft`, `hypercv-composition`, `hypercv-final`, and `site-data`.
- Enforce schema validation through shared TypeScript and schema definitions across ingestion, transformation, review, and pre-publish release checks.
- Materialize `hypercv-final` explicitly from draft plus composition rather than inferring final content implicitly from intermediate layers.
- Require revision pinning and stale detection for HyperCV compositions and release candidates.
- Keep the MVP free of runtime database, public authentication, and public backend APIs.
- Implement search through a prebuilt static index or equivalent static-search strategy.
- Deploy the public portal as a static build on CDN-backed hosting with atomic deploys.
- Allow only approved static deploy artifacts to cross from the private data domain into the public runtime boundary.
- Preserve explicit migration boundaries so future integration with ASP.NET MVC does not require redesigning the content model or route contracts.

**Important Decisions (Shape Architecture):**
- Use TypeScript in strict mode across content utilities, validation logic, and frontend code.
- Use Astro as a delivery framework, but keep domain structure, content contracts, and route semantics as framework-light as practical.
- Model localization explicitly with node-preserving language mappings rather than inferred route equivalence.
- Generate bilingual `site-data` from monolingual private canonical HyperCV artifacts instead of making the canonical layer itself bilingual.
- Treat `site-data` as a private projection with internal provenance and no manual edits.
- Make release validation a pipeline concern, including provenance, bilingual parity, leakage checks, accessibility, and benchmark verification.
- Produce build artifacts and validation manifests that remain usable even if a future .NET backend becomes the orchestration layer.

**Deferred Decisions (Post-MVP):**
- Runtime authentication and authorization
- User accounts and session management
- Runtime API design
- Backend database selection
- Chatbot orchestration and LLM service integration
- Identity-lens or alternate expressive presentation modes in the public experience
- SSR or hybrid rendering adoption
- Rate limiting and API-specific security controls

### Data Architecture

Use a repository-backed, file-based private data model with explicit class responsibilities rather than a single undifferentiated content store.

The class model is:
- `raw` as ephemeral ingestion input, not a persistent governed class
- `deep-knowledge` as append-only, immutable, private persisted memory
- `knowledge-base-dk` and `knowledge-base-manual` as two managed subclasses that merge into a logical unified knowledge-base view for downstream generation
- `hypercv-draft` as persistent draft contributions for `cv-experience`, `cv-project`, and `cv-star`
- `hypercv-composition` as the explicit convergence layer that records approved revision references and composition defaults
- `hypercv-final` as the private canonical materialization used as the source of truth for publication
- `site-data` as a private, fully regenerable web projection that feeds the static renderer without becoming the content source of truth

The canonical HyperCV catalog must preserve an explicit hierarchy of `cv-experience -> cv-project -> cv-star`, with policy classification on each object (`knowledge-base-managed`, `manual-managed`, or `hybrid-managed`). All HyperCV artifacts carry stable IDs and required revision metadata. If a referenced approved revision changes, the related composition becomes stale and the derived final content must be re-reviewed before reuse.

Validation is schema-first but domain-oriented: structure, lineage, safety, semantic quality, consistency, and publication readiness are reusable validator domains applied to the classes where relevant. Migration remains lightweight through content-shape migrations rather than database migrations. Caching is static and CDN-oriented only at the public output layer; persistence of `site-data` is a materialization choice, not a statement of canonical ownership.

### Authentication & Security

The MVP has no public authentication layer. Private authoring and distillation remain outside the public runtime boundary.

Security focuses on boundary enforcement and safe publication:
- prevent raw or non-approved material from entering the public build
- enforce strict separation of private inputs and public outputs
- use security headers appropriate for a static site
- avoid exposing secrets or privileged tokens in frontend code

Authenticated authorization is deferred to a future backend-supported release. To reduce migration cost, content identity, route identity, and publication rules must remain valid beyond the anonymous-static MVP.

### API & Communication Patterns

The MVP exposes no public runtime API as a core dependency. Private preparation and public delivery communicate through build-time artifact exchange using validated structured content and generated static outputs.

The architectural contract is schema-based rather than endpoint-based: content artifacts, localization mappings, navigation structures, route manifests, publish manifests, and revision references must be versioned and validated before build completion. Build failures are fail-fast. Search is delivered through a precomputed static index decoupled from route internals.

The public engine must support two execution contexts without changing its logical boundary:
- showcase mode on sanitized fixtures for public demonstration, repeatable testing, and frontend work
- private mode against an explicit configured private data root for real authoring and publication workflows

The public repository must not assume that private data are present inside its own Git tree. The contract is that private data are provided through an explicit external root with known class boundaries and schema expectations.

The operational boundary is `public code + private data`, not `public repo + private repo` as a hard architectural invariant. The private workspace may consume the public engine as a package in automation and may use adjacent local checkouts in development. Git submodules are tolerated only as a local bootstrap convenience and must not become the governance mechanism.

### Frontend Architecture

Use Astro as a content-first delivery framework with selective islands for interactive behavior. Astro is the rendering and delivery layer, not the owner of domain semantics.

Component architecture stays disciplined and migration-aware:
- layout primitives for page shells and hierarchy
- reusable evidence and disclosure components
- locale-aware route and navigation helpers
- strict separation between content rendering and interaction utilities
- explicit contracts between `site-data` nodes and rendered page structures

State management remains minimal: build-produced page state, URL and anchor state, and local component state. Routing uses explicit localized routes with canonical node mappings so language switching preserves logical context. Route semantics must stay stable independently of the rendering framework.

The frontend must render from `site-data`, not directly from `hypercv-final`. `site-data` is where localized citation targets, persona-profile entities, path derivation, and user-facing route surfaces are established. Internal provenance must remain traceable back to `hypercv-final`, while user-facing citations resolve only to localized public targets.

Delivery components must not repair missing semantic structure that should have been produced earlier in the pipeline. New publishable fields must be introduced in canonical schemas first and then mapped deliberately into `site-data`; they must not arise as ad hoc page-level reinterpretation.

### Infrastructure & Deployment

Use static CDN deployment with atomic builds, preview environments, and simple rollback capability. Stay provider-agnostic unless a platform introduces a concrete implementation advantage.

CI/CD must verify more than build success:
- schema correctness
- approval and provenance requirements
- bilingual parity
- leakage prevention
- accessibility checks
- performance benchmarks on key pages
- generation of publish manifests and validation evidence that remain reusable in future backend-supported workflows

Execution infrastructure must preserve the engine/data split:
- the public repository ships the engine, contracts, validators, and frontend delivery code
- the private GitHub repository is the authoritative persistence and recovery baseline for `deep-knowledge`, knowledge-base content, HyperCV artifacts, `site-data`, and release evidence inputs
- the architecture distinguishes private production data, private projection artifacts, public production artifacts, and dedicated test datasets as separate governance categories with different handling rules
- all transformations from private classes to public output run inside the private execution environment
- the deployed public artifact is the static site package only

Each private publication must be attributable to an explicit reproducibility tuple composed of the public engine revision used for processing, the relevant private revision scope materialized into the release, and the active schema or contract version used by the pipeline gates.

The publish manifest and release evidence are the audit source for a release. The temporary Git state of a checkout, mount, or workspace composition is not sufficient as the governance record.

For MVP operations, protect the default branch of the private repository, disallow force-push to its main branch, and rely on repository-backed recovery rather than a separate backup platform unless stronger recovery needs are later validated.

Private persistence is mandatory. Additional private-data versioning beyond the repository-backed recovery baseline is optional until a validated need emerges for stronger rollback, audit, historical comparison, or recovery guarantees.

Environment configuration stays minimal and explicit, with public build variables cleanly separated from private pipeline configuration such as content-root paths and release evidence locations. V1 scales through CDN distribution and immutable static assets. If V2 introduces authentication, chatbot runtime, or SSR, the backend should be added as a separate boundary rather than eroding the current static delivery assumptions.

### Decision Impact Analysis

Implementation should proceed in this order: private class schema and revision rules, shared validation and publish eligibility, HyperCV draft/composition/final materialization, `site-data` projection and provenance tracking, Astro route generation around framework-light contracts, static search indexing, release validation and publish manifests, then static hosting and deployment.

Key dependencies remain explicit: routing depends on the canonical schema and locale linkage; `site-data` depends on explicit HyperCV final materialization; stale detection depends on revision-aware composition; release validation depends on provenance, publish eligibility, and materialized revision evidence; search depends on stable page generation and content chunking; future ASP.NET MVC integration depends on keeping content, route semantics, and interaction boundaries independent from Astro internals.

## Implementation Governance Summary

Detailed implementation guidance was extracted through the temporary operational addendum and has now been triaged into canonical rules, rejected details, and archival leftovers. Detailed validation evidence remains preserved in the permanent record at [_bmad-output/planning-artifacts/architecture-validation-record.md](_bmad-output/planning-artifacts/architecture-validation-record.md). The operational addendum can now be archived because its stable value has been promoted where needed and its remaining content is intentionally non-canonical.

The architecture-level constraints that remain mandatory are:
- the content pipeline is the semantic center of the system and the frontend is only a delivery projection
- the public GitHub repository contains the full codebase, while private production data and private structured content classes remain in a separate private GitHub repository used as the persistence and recovery baseline for MVP
- the system distinguishes private production data, private projection artifacts, public production artifacts, and dedicated test datasets
- the public engine must remain runnable both on sanitized fixtures and on externally provided private data without changing semantic contracts
- canonical HyperCV final artifacts remain the source of truth for publication, reuse, and future backend evolution
- `site-data` remains private, regenerable, never manually edited, and subordinate to canonical HyperCV content
- release governance must preserve revision traceability from approved source inputs through composition, final materialization, and public projection
- any publishable semantic field must be introduced in canonical contracts before it appears in `site-data` or delivery components
- the class and folder baseline for private production data is fixed at the operational level as `raw`, `deep-knowledge`, `knowledge-base/{dk,manual}`, `hypercv/{drafts,compositions,final}`, `site-data/{locale}`, `release/{candidates,evidence,deployable}`, and `manifests`, while field-level schemas remain implementation-phase detail
- regression safety uses a two-track model: deterministic CI checks on sanitized fixtures in the public repository and mandatory release-evidence comparison for private production promotions

The archived operational addendum should not be used as an active planning input after archival. Any future reuse requires explicit re-promotion into canonical documentation.

## Architecture Readiness Summary

The architecture is validated as coherent and ready for implementation at the design level. The remaining open points are narrower implementation details rather than unresolved operating-model decisions: optional private-data versioning strategy, exact field-level schema details for private artifacts, and the concrete shape of release evidence templates.

## Architecture Validation Record

**Coherence validation**
The architecture is coherent around a static-first public portal and a private-content-centered generation pipeline. Astro is treated as a delivery framework, while contracts, private data classes, canonical HyperCV materialization, and release validation remain the true architectural backbone.

**Requirements coverage validation**
The architecture covers both sides of the MVP: private ingestion and distillation workflows, explicit HyperCV composition and revision governance, and public bilingual delivery with guided navigation, static search, progressive disclosure, and publish-time governance.

**Implementation readiness validation**
The design is ready for implementation because technology direction, engine/data boundary, privacy constraints, data classes, revision model, migration stance, and release model are explicit enough to guide implementation consistently.

**Deferred but non-blocking gaps**
- optional private-data versioning, pending proven rollback or audit needs
- exact field-level schema details to be finalized during implementation
- concrete release-evidence template format to be finalized during implementation