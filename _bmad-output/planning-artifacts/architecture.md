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
  - _bmad-archive/brainstorming/brainstorming-session-2026-03-15-0620.md
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

The project combines two tightly coupled domains: an offline-first authoring and distillation pipeline over user-managed portal data, and a public static-first bilingual portal. Architecturally, this is a controlled content supply chain rather than a website with supporting scripts.

The architecture is shaped by 32 functional requirements across those two domains and by strict non-functional constraints: static-first performance, Lighthouse 95+ targets on key pages, sub-500 ms context-preserving language switching, no-critical-JS resilience, strong engine/data separation, provenance-aware publishing, bilingual parity, accessibility, crawlability, stale-aware regeneration, and release evidence.

The updated PRD and the March 15 brainstorming session clarify that the key architectural boundary is not between code repositories but between a public engine and portal data classes. The public repository remains authoritative for the engine, contracts, validators, and frontend delivery layer, while all real content classes and transformations remain in an externally managed `PORTAL_DATA_ROOT` until a sanitized static package is produced.

- Primary domain: static-first bilingual web application with local content pipeline
- Complexity level: medium
- Estimated architectural components: 9

### Architectural Decision Drivers

The current project context already implies a set of strong architectural drivers that will constrain later design choices.

**Driver 1: Engine / portal data split is non-negotiable**
The public portal must remain strictly isolated from raw notes, working materials, non-approved artifacts, and governed structured source layers. This is not only a security concern; it is a product principle and a publishing constraint. The boundary applies to data, not to code.

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
The bilingual web projection is derived from canonical content in the portal data root, but that projection must keep traceable provenance back to the approved canonical artifacts while remaining fully regenerable and non-authoritative.

### Product, UX, and Technical Alignment

The MVP succeeds only if product value, guided UX, and technical constraints stay aligned. The architecture must therefore optimize for qualification speed, trust, and clarity through a static-first, governance-safe system built on canonical content, build-time composition, and progressive enhancement.

Later architecture decisions should be evaluated against a three-part test:
- does this improve qualification speed and trust?
- does this preserve the guided UX model?
- does this stay coherent with the static-first and governance-first MVP boundary?

### Technical Constraints & Dependencies

The MVP must avoid live backend dependencies for public consumption. V1 has no authentication, no cloud database, no runtime retrieval layer, and no chatbot behavior. The architecture must therefore support static hosting, publish-time generation from approved canonical artifacts, and client-side enhancements that do not weaken crawlability, accessibility, or no-critical-JS resilience.

The UX specification adds concrete constraints: persona-first routing, progressive disclosure, evidence blocks, mobile/desktop continuity, and node-preserving language switching. The release model adds equally strong governance constraints: provenance-aware content management, bilingual parity, leakage prevention, revision-aware validation, and publish-time validation.

All transformations across `raw`, `deep-knowledge`, `knowledge-base`, `hypercv-*`, and `site-data` occur inside the portal data boundary. The only artifact class allowed to cross into the public runtime boundary is the approved static site package derived through allowlist-based promotion.

### Core Architectural Tensions

- Static simplicity vs future extensibility: V1 must stay static-first without making future backend evolution artificially expensive.
- Guided UX richness vs maintainable generation: persona-first and topic-first navigation must not create route-specific content drift.
- Client enhancement vs resilient delivery: search and disclosure can improve usability, but core meaning must remain available without client execution.
- Governance rigor vs authoring speed: approval, provenance, and release gates must remain strong without making routine publishing impractical.

### Architectural Implications

- Prefer build-time derivation over runtime interpretation.
- Prefer a canonical content schema with stable identifiers, provenance metadata, explicit locale linkage, and revision-aware composition.
- Prefer explicit class boundaries between governed persisted content, canonical HyperCV artifacts in the portal data root, generated web projections, and public deployable output.
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
- engine / portal data boundary enforcement
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
- Use a file-based canonical content architecture over `PORTAL_DATA_ROOT` with explicit classes for `deep-knowledge`, `knowledge-base-candidate`, `knowledge-base`, `hypercv-base`, `hypercv-refinement`, `hypercv-final`, and `site-data`.
- Enforce schema validation through shared TypeScript and schema definitions across ingestion, transformation, review, and pre-publish release checks.
- Materialize `hypercv-final` explicitly from `hypercv-base` plus `hypercv-refinement` rather than inferring final content implicitly from intermediate layers.
- Require revision pinning and stale detection for governed and HyperCV generated states before review reuse or release promotion.
- Keep the MVP free of runtime database, public authentication, and public backend APIs.
- Implement search through a prebuilt static index or equivalent static-search strategy.
- Deploy the public portal as a static build on CDN-backed hosting with atomic deploys.
- Allow only approved static deploy artifacts to cross from the portal data boundary into the public runtime boundary.
- Preserve explicit migration boundaries so future integration with ASP.NET MVC does not require redesigning the content model or route contracts.

**Important Decisions (Shape Architecture):**
- Use TypeScript in strict mode for shared schemas, validators, frontend code, and reusable engine utilities. Isolated deterministic helper scripts may use Node.js JavaScript when compilation overhead is not justified, provided they preserve the same contracts, inputs, outputs, and reviewability.
- Treat the portal-data pipeline as LLM-centered by default for extraction, synthesis, normalization, drafting, and guided editorial operations, currently mediated through GitHub Copilot skills and agents. Deterministic validators, schemas, class transitions, and review gates remain explicit and authoritative.
- Use Astro as a delivery framework, but keep domain structure, content contracts, and route semantics as framework-light as practical.
- Model localization explicitly with node-preserving language mappings rather than inferred route equivalence.
- Generate bilingual `site-data` from monolingual canonical HyperCV artifacts in the portal data root instead of making the canonical layer itself bilingual.
- Treat `site-data` as a generated projection with internal provenance and no manual edits.
- Make release validation a pipeline concern, including provenance, bilingual parity, leakage checks, accessibility, and benchmark verification.
- Produce build artifacts and validation manifests that remain usable even if a future .NET backend becomes the orchestration layer.

**Deferred Decisions (Post-MVP):**
- Runtime authentication and authorization
- User accounts and session management
- Runtime API design
- Backend database selection
- Public-runtime chatbot orchestration and live LLM service integration
- Identity-lens or alternate expressive presentation modes in the public experience
- SSR or hybrid rendering adoption
- Rate limiting and API-specific security controls

### Data Architecture

Use a file-based portal data model with explicit class responsibilities rather than a single undifferentiated content store.

The class model is:
- `raw` as ephemeral ingestion input, not a persistent governed class
- `deep-knowledge` as append-only, immutable, persisted memory and the first governed persistence boundary
- `knowledge-base-candidate` as the governed review-entry layer for proposed reusable knowledge
- `knowledge-base` as the unified governed center whose `current` partition is positive reusable source material and whose `deprecated` partition is an active downstream exclusion guardrail
- `hypercv-base` as the first generated HyperCV materialization constrained by `hypercv-docs-spec` and `hypercv-distillation-profile`
- `hypercv-refinement` as the replayable editorial delta layer, with no-new-knowledge semantics, only the current patch normative, and a concrete representation that remains text-first, diffable, LLM-readable, and easy to review manually
- `hypercv-final` as the canonical materialization inside the portal data root used as the source of truth for publication
- `site-data` as a fully regenerable web projection inside the portal data root that feeds the static renderer without becoming the content source of truth
- `deployed static site` as the only public runtime artifact

The canonical HyperCV catalog must preserve an explicit hierarchy of `cv-experience -> cv-project -> cv-star`, with policy classification on each object (`knowledge-base-managed`, `manual-managed`, or `hybrid-managed`). All governed and HyperCV artifacts carry stable IDs and required revision metadata. If a referenced approved revision changes, the related downstream generated state becomes stale and the derived final content must be re-reviewed before reuse.

Validation is schema-first but domain-oriented: minimal ingestion, structure, lineage and provenance, semantic quality, logical consistency and disambiguation, review and approval, policy and governance, content safety, projection integrity, publish safety, release coherence, accessibility, and performance are reusable validator domains applied to the classes where relevant. Transition validation is local and partial; full target-class validity remains dominant. Migration remains lightweight through content-shape migrations rather than database migrations. Caching is static and CDN-oriented only at the public output layer; persistence of `site-data` is a materialization choice, not a statement of canonical ownership.

Review granularity is explicit in the class model:
- `knowledge-base-candidate` is reviewable as a governed candidate and may produce mixed outcomes across promotable, deprecatable, or discardable portions
- `hypercv-base` is reviewable as generated output and must remain recognizable under the document contract
- `hypercv-refinement` is reviewable as an editorial delta constrained by replayability and the no-new-knowledge rule
- `hypercv-final` becomes the publishable canonical source only after governed approval

The dependency model is also explicit:
- `user-persona` affects projection only and may change exposure or granularity, not canonical claims
- `patch-grammar` defines admissible replayable editorial operations for `hypercv-refinement`; its concrete encoding should prefer human-reviewable textual forms such as structured Markdown, YAML, JSON, or equivalent line-oriented representations rather than opaque or tool-only formats
- `hypercv-docs-spec` defines the structural and semantic contract of the HyperCV document family
- `hypercv-distillation-profile` governs base-generation behavior within the document-spec contract

### Authentication & Security

The MVP has no public authentication layer. Authoring and distillation remain outside the public runtime boundary.

Security focuses on boundary enforcement and safe publication:
- prevent raw or non-approved material from entering the public build
- enforce strict separation of portal-data inputs and public outputs
- use security headers appropriate for a static site
- avoid exposing secrets or privileged tokens in frontend code

Authenticated authorization is deferred to a future backend-supported release. To reduce migration cost, content identity, route identity, and publication rules must remain valid beyond the anonymous-static MVP.

### API & Communication Patterns

The MVP exposes no public runtime API as a core dependency. Portal-data preparation and public delivery communicate through build-time artifact exchange using validated structured content and generated static outputs.

The architectural contract is schema-based rather than endpoint-based: content artifacts, localization mappings, navigation structures, route manifests, publish manifests, and revision references must be versioned and validated before build completion. Build failures are fail-fast. Search is delivered through a precomputed static index decoupled from route internals.

Within that boundary, the supported MVP orchestration surfaces are VS Code Chat and Copilot CLI. LLM orchestration through GitHub Copilot skills and agents is the primary execution mode for authoring and generation workflows, while deterministic transforms remain responsible for validation, replayability, materialization, and publish-safety enforcement. LLM usage does not replace canonical class transitions, explicit materialization, validation, or human approval.

The public engine must support an explicit configured `PORTAL_DATA_ROOT` for real authoring and publication workflows without changing its logical boundary. Each relevant component, transform, validator, and delivery contract must also be testable independently against dedicated mock datasets that remain separate from and are not implied by the `PORTAL_DATA_ROOT`.

The public repository must not assume that portal data are present inside its own Git tree. The contract is that portal data are provided through an explicit external root with known class boundaries and schema expectations.

The operational boundary is `public code + portal data`, not `public repo + private repo` as a hard architectural invariant. The engine consumes an externally managed `PORTAL_DATA_ROOT`; the persistence, versioning, and recovery strategy for that root are user-managed and remain outside project governance.

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

Use static hosting for the approved public package with atomic deploys and simple rollback capability. Prefer GitHub Pages for V1 when its constraints remain compatible with the required static-output model; keep Cloudflare as the fallback provider if Pages introduces blocking limitations.

Repository CI/CD must verify more than build success, but its scope is limited to the public engine, shared validators, dedicated mock datasets, and the publishable static package:
- schema correctness
- approval and provenance requirements
- bilingual parity
- leakage prevention
- accessibility checks
- performance benchmarks on key pages
- generation of publish manifests and validation evidence that remain reusable in future backend-supported workflows

Execution infrastructure must preserve the engine/data split:
- the public repository ships the engine, contracts, validators, and frontend delivery code
- the externally managed `PORTAL_DATA_ROOT` is the source location for `deep-knowledge`, knowledge-base content, HyperCV artifacts, `site-data`, and release evidence inputs
- the architecture distinguishes portal production data, portal projection artifacts, public production artifacts, and dedicated mock test datasets as separate governance categories with different handling rules; mock test datasets are not part of the `PORTAL_DATA_ROOT`
- all transformations from portal-data classes to public output run inside the portal-data execution environment
- the deployed public artifact is the static site package only

Each publication must be attributable to an explicit reproducibility tuple composed of the public engine revision used for processing, the relevant portal-data revision scope materialized into the release, and the active schema or contract version used by the pipeline gates.

The publish manifest and release evidence are the audit source for a release. The temporary Git state of a checkout, mount, or workspace composition is not sufficient as the governance record.

Persistence, versioning, and recovery for portal data are intentionally outside project scope and delegated to the user.

Environment configuration stays minimal and explicit, with public build variables cleanly separated from portal-data pipeline configuration such as `PORTAL_DATA_ROOT` and release evidence locations. V1 scales through CDN distribution and immutable static assets. If V2 introduces authentication, chatbot runtime, or SSR, the backend should be added as a separate boundary rather than eroding the current static delivery assumptions.

### Decision Impact Analysis

Implementation should proceed in this order: portal-data class schema and revision rules, shared validation and publish eligibility, candidate review and governed knowledge maintenance, HyperCV base/refinement/final materialization, `site-data` projection and provenance tracking, Astro route generation around framework-light contracts, static search indexing, release validation and publish manifests, then static hosting and deployment.

Key dependencies remain explicit: routing depends on the canonical schema and locale linkage; `site-data` depends on explicit `hypercv-final` materialization plus persona-scoped projection; stale detection depends on revision-aware generated-state dependencies; release validation depends on provenance, publish eligibility, and materialized revision evidence; search depends on stable page generation and content chunking; future ASP.NET MVC integration depends on keeping content, route semantics, and interaction boundaries independent from Astro internals.

## Implementation Governance Summary

Detailed implementation guidance was extracted through the temporary operational addendum and has now been triaged into canonical rules, rejected details, and archival leftovers. Detailed validation evidence remains preserved in the permanent record at [_bmad-archive/planning-artifacts/architecture-validation-record.md](_bmad-archive/planning-artifacts/architecture-validation-record.md). The operational addendum can now be archived because its stable value has been promoted where needed and its remaining content is intentionally non-canonical.

The architecture-level constraints that remain mandatory are:
- the content pipeline is the semantic center of the system and the frontend is only a delivery projection
- the public GitHub repository contains the full codebase, while portal production data and governed structured content classes remain outside the public repository in an externally managed `PORTAL_DATA_ROOT`
- the system distinguishes portal production data, portal projection artifacts, public production artifacts, and dedicated mock test datasets that remain separate from the `PORTAL_DATA_ROOT`
- the public engine must remain runnable against externally provided portal data, while each relevant element remains independently testable with dedicated mock data without changing semantic contracts
- canonical HyperCV final artifacts remain the source of truth for publication, reuse, and future backend evolution
- `site-data` remains inside the portal data root, regenerable, never manually edited, and subordinate to canonical HyperCV content
- release governance must preserve revision traceability from approved source inputs through composition, final materialization, and public projection
- any publishable semantic field must be introduced in canonical contracts before it appears in `site-data` or delivery components
- the canonical class baseline is `raw`, `deep-knowledge`, `knowledge-base-candidate`, `knowledge-base`, `hypercv-base`, `hypercv-refinement`, `hypercv-final`, `site-data`, and the deployed static site; repository layout should explicitly separate public engine code, dedicated mock datasets, and optional local orchestration helpers from the external `PORTAL_DATA_ROOT`, while exact folder names remain implementation-phase detail
- regression safety uses a two-track model: deterministic CI checks on dedicated mock datasets in the public repository and mandatory release-evidence comparison for portal-data-backed production promotions

The archived operational addendum should not be used as an active planning input after archival. Any future reuse requires explicit re-promotion into canonical documentation.

## Architecture Readiness Summary

The architecture is validated as coherent and ready for implementation at the design level. The remaining open points are narrower implementation details rather than unresolved operating-model decisions: exact field-level schema details for governed artifacts in `PORTAL_DATA_ROOT`, the concrete shape of release evidence templates, and the final selection of text-first governed artifact and refinement encodings consistent with replayability, LLM readability, and manual review.

## Architecture Validation Record

**Coherence validation**
The architecture is coherent around a static-first public portal and a portal-data-centered generation pipeline. Astro is treated as a delivery framework, while contracts, governed data classes, canonical HyperCV materialization, and release validation remain the true architectural backbone.

**Requirements coverage validation**
The architecture covers both sides of the MVP: portal-data ingestion and distillation workflows, explicit HyperCV composition and revision governance, and public bilingual delivery with guided navigation, static search, progressive disclosure, and publish-time governance.

**Implementation readiness validation**
The design is ready for implementation because technology direction, engine/data boundary, privacy constraints, data classes, revision model, migration stance, and release model are explicit enough to guide implementation consistently.

**Deferred but non-blocking gaps**
- exact field-level schema details to be finalized during implementation
- concrete release-evidence template format to be finalized during implementation