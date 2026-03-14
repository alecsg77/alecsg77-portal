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
  - /workspaces/alecsg77-portal/_bmad-output/planning-artifacts/prd.md
  - /workspaces/alecsg77-portal/_bmad-output/planning-artifacts/ux-design-specification.md
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

**Functional Requirements:**
The project defines 28 functional requirements across two tightly coupled domains: a private offline-first authoring/distillation pipeline and a public static-first bilingual portal.

The private side must support raw memory capture, local AI-assisted distillation into structured editable artifacts, human approval, provenance inspection, and selective or full regeneration of the publishable corpus. The public side must support guided navigation, contextual progressive disclosure, client-side search, bilingual content delivery, analytics, accessibility, and CTA-driven conversion.

Architecturally, this means the system is not just a website. It is a controlled content supply chain with a strict boundary between private preparation workflows and public static delivery.

**Non-Functional Requirements:**
The NFR set is architecture-shaping and unusually strict for an MVP. Public interactions must feel instantaneous after page load, key benchmark pages must sustain Lighthouse scores of at least 95, language switching must preserve logical context and complete within 500 ms, and the public experience must remain accessible and readable even when JavaScript is disabled for core content retrieval.

Security and governance constraints are equally important. The release process must exclude raw/private material, include only approved artifacts, preserve provenance traceability, and block publication when leakage or localization inconsistency is detected. Accessibility, crawlability, bilingual parity, and release evidence are not secondary QA concerns; they are first-class architectural constraints.

**Scale & Complexity:**
The product is a static-first web platform with a private local content pipeline behind it. The business domain is small and single-author, but the architecture has medium complexity because it combines content modeling, multilingual publishing, strict public/private separation, performance budgets, and high editorial governance.

- Primary domain: static-first bilingual web application with local content pipeline
- Complexity level: medium
- Estimated architectural components: 7

### Architectural Decision Drivers

The current project context already implies a set of strong architectural drivers that will constrain later design choices.

**Driver 1: Public/private separation is non-negotiable**
The public portal must remain strictly isolated from raw notes, working materials, and non-approved artifacts. This is not only a security concern; it is a product principle and a publishing constraint.

**Driver 2: Static-first delivery is a core MVP constraint**
The MVP is not allowed to rely on live backend systems for public consumption. This strongly pushes architecture toward build-time generation, static hosting, precomputed navigation structures, and client-side enhancement only where it does not break the no-critical-JS requirement.

**Driver 3: Canonical content reuse must not drift**
The same approved artifact may appear in multiple routes and perspectives. This means the architecture needs a canonical content model with stable identifiers, controlled derivations, and strong consistency guarantees across generated outputs.

**Driver 4: Bilingual parity is structural, not cosmetic**
English and Italian are not a late translation layer. The architecture must preserve logical node equivalence, detect localization gaps before publish, and maintain context across language switches.

**Driver 5: UX speed and clarity drive frontend architecture**
The persona-first TOC, top-topic entry points, progressive disclosure, and evidence blocks are not ornamental UI patterns. They define the information architecture, routing strategy, content chunking model, and page-generation logic.

**Driver 6: Release evidence is part of the system boundary**
The product is not complete at build output alone. It also requires a release discipline that verifies approval state, leakage prevention, localization consistency, accessibility, and benchmark performance before publication.

### Product, UX, and Technical Alignment

**Product perspective**
The MVP wins only if it proves that guided discovery and copy-ready evidence are more useful than a static CV or generic portfolio. This means the architecture must optimize for qualification speed, trust, and clarity before optimizing for extensibility or feature breadth.

**UX perspective**
The public experience depends on fast orientation, meaningful first-step routing, and evidence surfaces that feel immediately useful. The architecture therefore has to support page structures and content models that make persona-first navigation, top-topic entry, and progressive disclosure easy to generate and maintain consistently.

**Technical perspective**
The system has to satisfy those product and UX goals while staying static-first, inspectable, and governance-safe. That pushes the technical design toward build-time composition, strong content modeling, explicit metadata, and progressive enhancement rather than runtime-heavy personalization.

**Alignment implication**
Later architecture decisions should be evaluated against a three-part test:
- does this improve qualification speed and trust?
- does this preserve the guided UX model?
- does this stay coherent with the static-first and governance-first MVP boundary?

### Technical Constraints & Dependencies

The MVP must avoid live backend dependencies for public consumption. There is no authentication, no cloud database, no runtime retrieval layer, and no chatbot behavior in V1. The architecture must support static hosting, client-side discovery aids, and publish-time generation from approved canonical artifacts.

The UX specification adds concrete frontend constraints: persona-first homepage routing, anchor-based section navigation, topic-entry cards, evidence blocks with progressive disclosure, mobile/desktop cognitive parity, and node-preserving language switching. The design system should remain lightweight, token-driven, native-first where possible, and component-disciplined rather than framework-heavy.

The release model also depends on publish-time validation, provenance-aware content management, and a structure that allows the same canonical content to surface in multiple navigation contexts without drift.

### Key Trade-Offs Already Visible

**Trade-off 1: Static simplicity vs future feature growth**
The MVP gains clarity, predictability, and cost control by staying static-first, but this also constrains how far personalization, runtime matching, and dynamic retrieval can go before a future architectural transition.

**Trade-off 2: Client-side enhancement vs crawlable resilience**
Client-side search and interactive disclosure improve usability, but the architecture must ensure that core content remains accessible and meaningful even without client execution.

**Trade-off 3: Rich UX routing vs maintainable content generation**
A persona-first, topic-driven UX increases relevance and time-to-value, but it also raises complexity in how canonical artifacts are mapped into multiple public navigation paths without duplication drift.

**Trade-off 4: Editorial governance vs authoring speed**
Approval states, provenance checks, and release gates improve trust and safety, but they also create friction in the content pipeline. The architecture must keep governance strong without making routine publishing unreasonably heavy for a single author-operator.

### Pre-Mortem Risks

If the MVP failed after launch, the most likely causes would be architectural misalignment rather than lack of features.

**Failure Mode 1: The canonical model is too weak**
If the content architecture does not give each approved artifact a stable identity and controlled reuse model, the same evidence will drift across routes, languages, or generated pages. This would break trust, increase maintenance cost, and weaken the release process.

**Failure Mode 2: The public experience depends too much on client execution**
If routing, evidence visibility, or content comprehension rely too heavily on JavaScript, the project may fail its crawlability, accessibility, and resilience goals even if the interactive UX feels good in ideal browser conditions.

**Failure Mode 3: Localization is handled too late**
If bilingual parity is treated as a post-processing layer rather than a first-class content and routing concern, language switching will become fragile, pages will diverge semantically, and release QA cost will rise sharply.

**Failure Mode 4: Governance is bolted on instead of designed in**
If approval state, provenance, publish eligibility, and leakage prevention are not modeled directly in the content pipeline, the release process will become manual, error-prone, and hard to trust.

**Failure Mode 5: UX routing becomes a content-maintenance trap**
If persona-first navigation and topic-based entry require too much route-specific authoring logic, the frontend may become elegant for users but unsustainable for long-term content operations.

**Failure Mode 6: The architecture optimizes for future V2 too early**
If the MVP introduces abstractions primarily to prepare for future dynamic features, the system may absorb backend-style complexity without earning enough value from the static-first release.

### Risk Prevention Implications

These risks imply several architectural biases for later decisions.

- Prefer a canonical content schema with strong identifiers, approval metadata, and explicit provenance links.
- Prefer build-time derivation over runtime interpretation wherever possible.
- Prefer route and language models that preserve logical equivalence explicitly rather than infer it indirectly.
- Prefer frontend patterns that progressively enhance static content instead of hiding critical content behind interaction logic.
- Prefer release validation as a formal pipeline concern, not an editorial checklist alone.
- Prefer the smallest architecture that satisfies MVP constraints without introducing speculative V2 infrastructure.

### Cross-Functional Tensions to Resolve Later

The current context already reveals a few tensions that later decisions must resolve explicitly.

**Tension 1: Product wants fast relevance, UX wants guided richness, engineering wants low complexity**
The architecture must support enough routing depth to make the experience feel tailored, without forcing a navigation/content system so elaborate that the MVP becomes expensive to maintain.

**Tension 2: UX wants fluid interaction, engineering must preserve no-critical-JS resilience**
Progressive disclosure, search, and route refinement should feel smooth, but the core value of each page must still exist in a crawlable, readable, semantically structured static baseline.

**Tension 3: Product wants trustable proof, operations need efficient publishing**
The system must preserve rigorous approval and provenance, but still allow a single author-operator to publish updates without excessive friction.

**Tension 4: Product wants future migration headroom, MVP discipline requires present simplicity**
The architecture should leave room for later backend evolution, but the current release should not pay large upfront complexity costs for capabilities that are explicitly out of scope.

### Cross-Cutting Concerns Identified

- Canonical content model and reuse across multiple routes
- Public/private boundary enforcement
- Provenance, approval state, and release gating
- Bilingual parity and context-preserving language switching
- Accessibility and semantic HTML discipline
- SEO and machine-readable content without critical JS dependency
- Performance budgets for navigation, disclosure, and search
- Analytics for TTV, deep-dive engagement, and CTA conversion
- Responsive continuity across desktop and mobile
- Editorial consistency between routing structure, evidence surfaces, and generated static output

### Architectural Implications for Later Decisions

This context suggests that later architecture decisions should be biased toward boring, build-time, inspectable solutions unless a more dynamic option is clearly justified by MVP value.

It also suggests that the most important future decisions will likely cluster around:
- canonical content schema and source-of-truth boundaries
- static site generation approach
- localization and route modeling
- search indexing strategy
- publish-time validation and release evidence workflow
- frontend component architecture for guided discovery patterns

The main open question is therefore not whether the MVP should be dynamic. The documents already answer that. The real open question is how to implement a static-first system that preserves strong UX guidance, strict governance, and future migration headroom without overengineering the first release.

## Starter Template Evaluation

Two realistic starter directions were considered for V1: Astro 6.0.4 and Vite 8.0.0.

Astro is the stronger fit for the current MVP because the product is explicitly static-first, content-led, bilingual, SEO-sensitive, and governed by strict performance and accessibility constraints. Astro starts from a site-generation model rather than an application-shell model, which makes it naturally aligned with editorial routing, content composition, progressive enhancement, and low-JavaScript delivery. This reduces the amount of architectural scaffolding required to achieve the desired V1 behavior.

Vite is a credible alternative because it is more framework-neutral and may reduce future integration friction if a later version introduces an ASP.NET MVC backend. A Vite-based frontend can be more easily positioned as a standalone asset pipeline or frontend layer adjacent to a .NET application. However, that neutrality comes at a cost in V1: more architectural decisions must be made explicitly around routing, content modeling, static generation strategy, localization behavior, and no-critical-JS resilience. In other words, Vite offers more long-term flexibility, but less built-in alignment with this MVP's immediate shape.

The trade-off is therefore not between a good option and a bad option, but between present-fit and future-neutrality. Astro better optimizes for the success criteria of the MVP. Vite better optimizes for future convergence with a backend-centered architecture such as ASP.NET MVC.

For this project, the preferred starter remains Astro 6.0.4 because V1 should be optimized first for static-first delivery quality, fast qualification, editorial clarity, and low runtime complexity. That said, the migration concern is valid and should shape how Astro is used. If Astro is selected, the implementation should preserve migration-aware boundaries: framework-light content contracts, explicit route mappings, isolated interactive components, and no unnecessary coupling between content structure and rendering internals.

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
- Use a file-based canonical content architecture with stable identifiers, locale-linked records, and publish eligibility metadata.
- Enforce schema validation at build time through shared TypeScript and schema definitions.
- Keep the MVP free of runtime database, public authentication, and public backend APIs.
- Implement search through a prebuilt static index or equivalent static-search strategy.
- Deploy the public portal as a static build on CDN-backed hosting with atomic deploys.
- Preserve explicit migration boundaries so future integration with ASP.NET MVC does not require redesigning the content model or route contracts.

**Important Decisions (Shape Architecture):**
- Use TypeScript in strict mode across content utilities, validation logic, and frontend code.
- Use Astro as a delivery framework, but keep domain structure, content contracts, and route semantics as framework-light as practical.
- Model localization explicitly with node-preserving language mappings rather than inferred route equivalence.
- Make release validation a pipeline concern, including provenance, bilingual parity, leakage checks, accessibility, and benchmark verification.
- Produce build artifacts and validation manifests that remain usable even if a future .NET backend becomes the orchestration layer.

**Deferred Decisions (Post-MVP):**
- Runtime authentication and authorization
- User accounts and session management
- Runtime API design
- Backend database selection
- Chatbot orchestration and LLM service integration
- SSR or hybrid rendering adoption
- Rate limiting and API-specific security controls

### Data Architecture

The MVP should use a repository-backed, file-based canonical content model as the source of truth. Approved artifacts should be represented as structured content entries with stable IDs, locale linkage, approval metadata, provenance references, and publication eligibility flags. This keeps the public site inspectable and buildable without introducing runtime persistence.

Validation should be schema-first. Shared schema definitions should govern content contracts, required metadata, localization parity, route eligibility, and publish eligibility. This creates one validation layer for both content ingestion and pre-publish release checks.

Migration strategy should remain lightweight: use explicit schema version fields on content artifacts and one-off migration scripts when the model changes. Because the MVP has no runtime database, migrations are content-shape migrations rather than database migrations. The schema and identifiers should be treated as long-lived contracts so that a future ASP.NET MVC backend can consume the same logical content model rather than forcing a remodel.

Caching should be static and delivery-oriented. Public HTML, assets, and search indexes should rely on CDN caching and immutable asset fingerprints rather than application-level caches.

### Authentication & Security

The MVP should have no public authentication layer. Private authoring and distillation remain outside the public runtime boundary, which keeps security scope narrow and consistent with the static-first product definition.

Security should focus on boundary enforcement and safe publication:
- prevent raw or non-approved material from entering the public build
- enforce strict separation of private inputs and public outputs
- use security headers appropriate for a static site
- avoid exposing secrets or privileged tokens in frontend code

Authorization for authenticated users is intentionally deferred to a future backend-supported release. To reduce future integration cost, content identity, route identity, and publication rules should not depend on anonymous-static assumptions that would later conflict with authenticated delivery.

### API & Communication Patterns

The MVP should expose no public runtime API as a core dependency. Communication between the private preparation workflow and the public portal should happen through build-time artifact exchange using validated structured content and generated static outputs.

The architectural contract is therefore schema-based rather than endpoint-based. Content artifacts, localization mappings, navigation structures, route manifests, and publish manifests should be versioned and validated before build completion. These contracts should be explicit enough that a future ASP.NET MVC layer could consume or orchestrate them without reverse engineering Astro-specific internals.

Error handling should be fail-fast at build time. If schema validation, localization parity, provenance rules, or leakage checks fail, the build should stop rather than publish a degraded output.

Search should be implemented via a precomputed static index so discovery remains fast without introducing backend coupling. The indexing approach should remain decoupled from route internals as much as possible to avoid unnecessary migration cost later.

### Frontend Architecture

The frontend should use Astro as a content-first delivery framework with selective islands for interactive behavior. Astro should be treated primarily as the rendering and delivery layer, not as the owner of domain semantics.

Component architecture should stay disciplined and migration-aware:
- layout primitives for page shells and hierarchy
- reusable evidence and disclosure components
- locale-aware route and navigation helpers
- strict separation between content rendering and interaction utilities
- explicit contracts between canonical content nodes and rendered page structures

State management should remain minimal. Prefer build-produced page state, URL and anchor state, and local component state over introducing a global client store. The MVP does not justify SPA-style state complexity.

Routing should use explicit localized routes with canonical node mappings so language switching preserves logical context rather than redirecting to approximate equivalents. Route semantics should remain stable independently of the rendering framework, reducing the cost of future ASP.NET MVC integration.

### Infrastructure & Deployment

The hosting strategy should be static CDN deployment with atomic builds, preview environments, and simple rollback capability. The architecture should remain provider-agnostic unless a platform introduces a real functional advantage during implementation.

CI/CD should verify more than build success:
- schema correctness
- approval and provenance requirements
- bilingual parity
- leakage prevention
- accessibility checks
- performance benchmarks on key pages
- generation of publish manifests and validation evidence that remain reusable in future backend-supported workflows

Environment configuration should be minimal and explicit. Public build variables should be separated cleanly from any private pipeline configuration, and the public site should not depend on secret runtime configuration.

Scaling strategy for V1 is straightforward: scale through CDN distribution and immutable static assets. If V2 introduces authentication, chatbot runtime, or SSR, the backend should be added as a separate architectural boundary rather than by eroding the static assumptions inside the current public delivery layer.

### Decision Impact Analysis

**Implementation Sequence:**
1. Define the canonical content schema, stable identifiers, and locale-linking rules.
2. Implement shared validation and publish eligibility checks.
3. Build Astro content ingestion and route generation around framework-light contracts.
4. Add static search indexing.
5. Generate release validation gates and reusable publish manifests.
6. Finalize static hosting and deployment workflow.

**Cross-Component Dependencies:**
- The routing model depends on the canonical content schema and locale-linking strategy.
- Release validation depends on provenance metadata and publish eligibility modeling.
- Search indexing depends on stable page generation and content chunking.
- Future ASP.NET MVC integration depends on keeping content, route semantics, and interaction boundaries independent from Astro-specific implementation details.

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

The core architecture of this MVP is the content pipeline, not the frontend framework. The public frontend is a delivery projection of approved canonical knowledge. All implementation patterns must therefore protect the integrity, traceability, and governability of the private generation pipeline first, and only then optimize rendering and delivery.

### Content Generation Patterns

**Pipeline Boundaries:**
- Raw notes, private source material, and working prompts must never be consumed directly by frontend rendering.
- Distillation outputs must pass through a canonical structured-content layer before they become publishable frontend input.
- Rendering components must consume normalized publishable artifacts only, never intermediate generation outputs.
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
- Distill extracts candidate structured facts, claims, and draft evidence units from raw material.
- Normalize maps distilled outputs into canonical schemas, stable identifiers, locale relationships, and reusable content structures.
- Validate checks schema correctness, localization parity, provenance completeness, structural consistency, and publish eligibility.
- Approve establishes the human-reviewed canonical artifact as the authoritative source of meaning.
- Publish generates delivery-ready artifacts, route manifests, search inputs, and release evidence from approved canonical artifacts.
- Deliver renders the approved publishable artifacts without altering domain semantics.

**Artifact Model:**
The pipeline should distinguish four artifact classes:
- raw source material
- distilled structured artifacts
- approved canonical artifacts
- publishable delivery artifacts

These layers must be treated as separate contracts, not as interchangeable files.

**Artifact Rules:**
- Raw source material is private and non-renderable.
- Distilled structured artifacts are candidate interpretations and remain non-publishable until validated and approved.
- Approved canonical artifacts are the semantic source of truth for publication and reuse.
- Publishable delivery artifacts are projections optimized for route generation, search indexing, and rendering.
- Delivery artifacts may optimize structure for the frontend, but must remain derivable from canonical artifacts through explicit, auditable mappings.

**Transformation Rules:**
- No stage may silently mutate canonical identifiers, locale links, approval state, or provenance metadata.
- Derived frontend fields must be generated through explicit mappers, not ad hoc inline page logic.
- Any new publishable field must be introduced in the canonical schema first, then mapped into delivery artifacts deliberately.
- If a field is needed only for presentation, its derivation rule must still be traceable back to canonical content.
- Any transformation that changes meaning rather than shape must occur before approval, not after it.

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
- Delivery contracts must be explicit enough that a future ASP.NET MVC backend can consume the same approved canonical artifacts and publish manifests without redefining domain meaning.
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
- preserve the separation between raw inputs, distilled artifacts, approved canonical artifacts, and publishable delivery artifacts
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

This project uses a single public repository as the authoritative codebase for the full architecture: distillation pipeline, canonical contracts, validation, publish workflow, and frontend delivery.

The privacy boundary applies to data, not to core project code.

Therefore:
- raw notes, transcripts, sensitive prompts, private review materials, and non-approved intermediate data must remain outside the public repository
- distillation, normalization, validation, publish, and delivery code must remain inside the public repository
- the public repository must be executable against sanitized fixtures for showcase purposes and against private local data sources for real authoring workflows

This keeps the codebase unified and inspectable while preserving privacy for sensitive source material.

### Private Data Persistence Boundary

Private production data is not only sensitive input; it is the recovery base for the entire system. Raw notes, transcripts, private review materials, and non-approved intermediate artifacts must therefore be stored in secure persistent storage outside the public repository.

That storage must support:
- recovery of source materials after data loss
- reprocessing when distillation or normalization logic changes
- controlled promotion of approved artifacts into the public repository boundary

Private data versioning is not mandatory by default. It should be introduced only if required by validated use cases such as rollback, auditability, historical comparison, or recovery guarantees beyond simple persistence.

### Data Classes for Production and Testing

The architecture distinguishes at least three data classes:

- private production data:
  raw notes, transcripts, sensitive prompts, private review materials, and non-approved intermediate artifacts stored in secure private storage

- public production data:
  approved canonical artifacts, publishable delivery artifacts, release evidence, and showcase-safe materials stored in the public repository

- test data:
  synthetic or sanitized fixtures, stable regression datasets, and deterministic publishing inputs used for automated validation

### Testability Rules

- private production data must never be used as automated test input
- public production data must not be treated as the only stable baseline for repetitive publishing tests
- automated tests must rely on dedicated synthetic or sanitized datasets that are versioned and stable
- distillation validation and publishing validation may use different test datasets because they verify different contracts
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
│   │   ├── distill-content.ts
│   │   ├── normalize-artifacts.ts
│   │   ├── validate-canonical.ts
│   │   └── assemble-publishable-output.ts
│   ├── release/
│   │   ├── build-publish-manifest.ts
│   │   ├── check-localization-parity.ts
│   │   ├── generate-search-index.ts
│   │   ├── run-release-gates.ts
│   │   └── verify-no-private-leakage.ts
│   └── reporting/
│       └── export-release-evidence.ts
├── content/
│   ├── canonical/
│   │   ├── topics/
│   │   ├── artifacts/
│   │   ├── proof-points/
│   │   ├── relationships/
│   │   └── manifests/
│   ├── delivery/
│   │   ├── routes/
│   │   ├── search/
│   │   ├── publish/
│   │   └── snapshots/
│   └── fixtures/
│       ├── synthetic/
│       └── sanitized/
├── test-data/
│   ├── distillation/
│   │   ├── synthetic-raw/
│   │   ├── expected-canonical/
│   │   └── fixtures.json
│   ├── publishing/
│   │   ├── canonical-fixtures/
│   │   ├── expected-delivery/
│   │   └── manifests/
│   └── e2e/
│       └── showcase-safe-content/
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
│   │   ├── content/
│   │   ├── routing/
│   │   ├── release/
│   │   └── search/
│   ├── integration/
│   │   ├── pipeline/
│   │   ├── contracts/
│   │   ├── localization/
│   │   ├── publish/
│   │   └── leakage-prevention/
│   └── e2e/
│       ├── navigation/
│       ├── language-switching/
│       └── search/
└── .github/
    └── workflows/
        ├── ci.yml
        └── release-validation.yml

private-storage/   (outside repo, secure, persistent)
├── raw/
├── transcripts/
├── prompts/
├── review/
├── distilled/
├── exports/
│   └── approved-canonical/
└── recovery/
```

### Architectural Boundaries

**Codebase Boundary:**
- The public repository contains the full architecture code: distillation, normalization, validation, publication, and frontend delivery.
- No core architectural code should be hidden in private-only workspaces.
- Shared schemas and contracts must be used across private-data execution and showcase-safe execution.

**Private Data Boundary:**
- Private production data lives only in secure persistent storage outside the repository.
- Private storage is the recovery and reprocessing base for the system.
- Promotion from private storage into the public repository boundary happens only through validated and approved artifacts.

**Canonical Knowledge Boundary:**
- `content/canonical` contains only approved artifacts that are safe to version publicly.
- Canonical artifacts remain the semantic source of truth for publication and reuse.
- Future backend orchestration must consume this boundary rather than redefine it.

**Delivery Boundary:**
- `content/delivery` contains publishable projections derived from approved canonical artifacts.
- Delivery artifacts are optimized for routing, search, rendering, and release evidence.
- Delivery artifacts must remain auditable derivations of canonical content.

**Test Data Boundary:**
- `test-data/` contains stable synthetic or sanitized datasets for automated validation.
- Test datasets must be versioned and repeatable.
- Test datasets must not be replaced by live private production data or by ever-changing public production data.

### Requirements to Structure Mapping

**FR1-FR4 Data Ingestion & Distillation:**
- `scripts/pipeline/distill-content.ts`
- `scripts/pipeline/normalize-artifacts.ts`
- `src/lib/content/schemas/`
- `src/lib/content/contracts/`
- `src/lib/content/validators/`
- `tests/integration/pipeline/`
- private inputs resolved from `private-storage/`

**FR5-FR8 Content Assembly & Generation:**
- `content/canonical/`
- `content/delivery/`
- `scripts/pipeline/assemble-publishable-output.ts`
- `scripts/release/build-publish-manifest.ts`
- `scripts/release/run-release-gates.ts`
- `tests/integration/publish/`

**Localization & Bilingual Parity:**
- `config/locales.ts`
- `config/routes.ts`
- `content/canonical/relationships/`
- `scripts/release/check-localization-parity.ts`
- `tests/integration/localization/`

**Search & Discovery Acceleration:**
- `src/lib/search/`
- `content/delivery/search/`
- `scripts/release/generate-search-index.ts`
- `tests/e2e/search/`

**Automated Validation and Regression Safety:**
- `test-data/distillation/`
- `test-data/publishing/`
- `test-data/e2e/`
- `tests/unit/`
- `tests/integration/`
- `tests/e2e/`

### Integration Points

**Private to Public Promotion Flow:**
- raw -> distilled in secure private storage
- distilled -> approved canonical through validation and human review
- approved canonical exported or synchronized into the public repository boundary
- canonical -> delivery via explicit mappers and publish scripts
- delivery -> frontend via typed rendering inputs

**Future ASP.NET MVC Integration:**
- ASP.NET MVC should consume approved canonical contracts or publish manifests, not frontend internals.
- This preserves V2 as a runtime/orchestration evolution instead of a semantic rewrite.

### File Organization Patterns

**Public Repository Rules:**
- only approved, publishable, or showcase-safe artifacts may be versioned
- raw notes, prompts, transcripts, and intermediate private artifacts are forbidden
- test fixtures must be synthetic or sanitized
- the public repository must support repeatable automated validation without private data access

**Private Storage Rules:**
- private storage must be persistent and secure
- it is the authoritative source for reprocessing and disaster recovery
- versioning is optional until justified by specific recovery, rollback, or audit use cases

### Development Workflow Integration

**Development Server Structure:**
- the repository must run in showcase mode using public fixtures
- the same codebase must also run in private authoring mode using local secure inputs
- semantic repair must never happen in rendering code

**Build Process Structure:**
- verify no private leakage
- validate canonical content
- verify localization and provenance
- assemble delivery artifacts
- generate manifests and search inputs
- build Astro site
- run release gates and export release evidence
- run automated tests against stable test datasets, not live production data

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
The architecture is coherent around a static-first public delivery model and a private-content-centered generation pipeline. Astro 6.0.4 is used as a delivery framework rather than as the owner of domain semantics. TypeScript-based contracts, canonical content modeling, publish-time validation, and the separation between private storage, public canonical artifacts, and delivery artifacts all reinforce the same architectural direction rather than conflicting with it.

The repository decision is also coherent with the showcase requirement. The codebase remains unified and public, while the privacy boundary applies to data only. This avoids architectural drift between distillation logic and publication logic while still protecting sensitive source material.

**Pattern Consistency:**
The implementation patterns support the architectural decisions well. Naming, structure, format, and process rules all reinforce the central principle that the content pipeline is the primary architecture and the frontend is a delivery projection. The artifact-class distinctions and stage boundaries reduce the risk that AI agents will mix raw inputs, canonical meaning, and render-time transformations.

**Structure Alignment:**
The project structure aligns with the architecture. The repository tree separates code, canonical content, delivery artifacts, test datasets, and frontend concerns clearly, while private production data remains outside the repository in secure persistent storage. The structure supports both showcase-safe execution and real authoring workflows without requiring a second codebase.

### Requirements Coverage Validation ✅

**Feature Coverage:**
The architecture supports both halves of the MVP:
- the private offline-first distillation pipeline
- the public static-first bilingual portal

This is critical because the project is not modeled as a website with supporting scripts, but as a governed content supply chain whose public interface is only one projection of the larger system.

**Functional Requirements Coverage:**
The architecture supports:
- raw note ingestion and private distillation workflows
- human approval and canonical artifact management
- artifact reuse across multiple public routes
- bilingual route and node consistency
- static search and progressive disclosure
- publish-time validation and release evidence
- future migration toward backend-supported capabilities without redefining the semantic model

No major functional requirement appears unsupported by the architecture as currently described.

**Non-Functional Requirements Coverage:**
The architecture addresses:
- static-first performance constraints
- no-critical-JS resilience
- strong public/private data separation
- governance through provenance, approval, and release gates
- bilingual consistency
- showcase/public-repository constraints
- recovery and reprocessing needs through secure persistent private storage
- repeatable automated validation through dedicated test datasets

### Implementation Readiness Validation ✅

**Decision Completeness:**
Critical decisions are sufficiently documented for implementation to begin. The technology direction, repository model, privacy boundaries, data classes, pipeline stages, and migration stance are all explicit enough to guide AI agents consistently.

**Structure Completeness:**
The project structure is concrete and implementation-oriented. It defines code ownership, artifact ownership, validation boundaries, promotion flow from private data to public deliverables, and dedicated boundaries for automated testing.

**Pattern Completeness:**
The most dangerous conflict areas are covered:
- semantic ownership
- artifact transitions
- route generation
- rendering boundaries
- leakage prevention
- test data separation
- promotion flow between private storage and public publishable artifacts

This is a strong level of detail for an architecture intended to guide multiple agents.

### Gap Analysis Results

**Important but Non-Blocking Gaps:**
- The secure private storage solution is intentionally unspecified. This is acceptable at the architecture stage, but implementation will need a concrete storage and backup approach.
- Private data versioning is deferred. This is reasonable, but rollback, audit, and historical comparison use cases should be revisited before the private pipeline becomes operationally critical.
- The exact shape of some canonical schemas is still implementation-phase work, though the governing rules are already clear.
- The architecture implies deterministic or controlled reprocessing, but does not yet define how output regressions are measured when pipeline logic changes.
- The promotion/synchronization mechanism between secure private storage and the public repository boundary is still a design-level concept and will need operational definition.

**No Critical Architectural Gaps Found:**
No unresolved issue currently blocks implementation planning at the architectural level. Remaining gaps are operational or implementation-detail decisions rather than missing architectural direction.

### Validation Issues Addressed

The main validation risks were addressed during the workflow:
- Step 3 was corrected to compare Astro primarily against Vite rather than against an irrelevant future full-stack baseline.
- The architecture was re-centered on the content pipeline rather than the frontend starter.
- The repository model was revised to keep the codebase public and unified while moving private data outside the repository.
- Testability concerns were addressed by distinguishing private production data, public production data, and stable test datasets.
- The project structure was refined so that the full codebase remains inspectable while sensitive source material remains excluded from the public repository.

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

**Qualification:** Architecturally ready for implementation. Operational details for secure storage, promotion mechanics, and regression governance remain to be defined during implementation planning.

**Confidence Level:** High

**Key Strengths:**
- The architecture models the project as a full content pipeline, not just a static site.
- The codebase remains public, inspectable, and showcase-friendly.
- Sensitive data is protected through an external secure persistence boundary.
- Canonical contracts provide a stable bridge between distillation, publication, frontend delivery, and future backend evolution.
- Testability is explicitly supported through dedicated stable datasets.

**Areas for Future Enhancement:**
- define the secure-storage strategy once operational constraints are clearer
- decide whether private data versioning is needed based on actual recovery and audit use cases
- formalize canonical schema details during implementation
- define regression comparison strategy for pipeline reprocessing over time
- define the operational promotion flow between private storage and public publishable artifacts

### Implementation Handoff

**AI Agent Guidelines:**
- Follow the canonical artifact model and stage boundaries exactly.
- Treat the content pipeline as the architectural center of the system.
- Keep frontend rendering semantically thin.
- Never introduce dependencies on private production data into the public repository.
- Use only synthetic or sanitized fixtures for automated tests.
- Treat promotion from private storage to public canonical artifacts as a governed step, not a casual file copy.
- Do not compensate in delivery code for missing meaning, metadata, or validation that belongs earlier in the pipeline.

**First Implementation Priority:**
Set up the repository skeleton, shared canonical contracts, and secure private-data integration boundary first. Then implement validation and publish-safe pipeline scaffolding before building interactive frontend enhancements.