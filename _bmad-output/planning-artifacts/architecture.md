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

The project combines two tightly coupled domains: a private offline-first authoring and distillation pipeline, and a public static-first bilingual portal. Architecturally, this is a controlled content supply chain rather than a website with supporting scripts.

The architecture is shaped by 28 functional requirements across those two domains and by strict non-functional constraints: static-first performance, Lighthouse 95+ targets on key pages, sub-500 ms context-preserving language switching, no-critical-JS resilience, strong public/private separation, provenance-aware publishing, bilingual parity, accessibility, crawlability, and release evidence.

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

The MVP succeeds only if product value, guided UX, and technical constraints stay aligned. The architecture must therefore optimize for qualification speed, trust, and clarity through a static-first, governance-safe system built on canonical content, build-time composition, and progressive enhancement.

Later architecture decisions should be evaluated against a three-part test:
- does this improve qualification speed and trust?
- does this preserve the guided UX model?
- does this stay coherent with the static-first and governance-first MVP boundary?

### Technical Constraints & Dependencies

The MVP must avoid live backend dependencies for public consumption. V1 has no authentication, no cloud database, no runtime retrieval layer, and no chatbot behavior. The architecture must therefore support static hosting, publish-time generation from approved canonical artifacts, and client-side enhancements that do not weaken crawlability, accessibility, or no-critical-JS resilience.

The UX specification adds concrete constraints: persona-first routing, progressive disclosure, evidence blocks, mobile/desktop continuity, and node-preserving language switching. The release model adds equally strong governance constraints: provenance-aware content management, bilingual parity, leakage prevention, and publish-time validation.

### Core Architectural Tensions

- Static simplicity vs future extensibility: V1 must stay static-first without making future backend evolution artificially expensive.
- Guided UX richness vs maintainable generation: persona-first and topic-first navigation must not create route-specific content drift.
- Client enhancement vs resilient delivery: search and disclosure can improve usability, but core meaning must remain available without client execution.
- Governance rigor vs authoring speed: approval, provenance, and release gates must remain strong without making routine publishing impractical.

### Architectural Implications

- Prefer build-time derivation over runtime interpretation.
- Prefer a canonical content schema with stable identifiers, provenance metadata, and explicit locale linkage.
- Prefer route and language models that preserve logical equivalence explicitly.
- Prefer progressive enhancement over JS-dependent core reading flows.
- Prefer the smallest architecture that satisfies MVP constraints without introducing speculative V2 infrastructure.

### Architectural Risk Register

- Weak canonical model: if approved artifacts do not keep stable identity and reuse rules, content will drift across routes and locales.
- Excessive JS dependence: if core comprehension depends on client execution, crawlability, accessibility, and resilience goals will fail.
- Late localization modeling: if bilingual parity is handled too late, language switching and semantic equivalence will become fragile.
- Governance bolted on too late: if approval, provenance, and leakage rules are not modeled upstream, publishing will become manual and unsafe.
- UX routing complexity trap: if persona-first and topic-first routing require route-specific authoring logic, frontend clarity will become operationally expensive.
- V2 overengineering: if future backend evolution is optimized too early, the MVP will absorb complexity without validating present value.

### Cross-Cutting Concerns

- canonical content reuse across multiple routes
- public/private boundary enforcement
- provenance, approval state, and release gating
- bilingual parity and context-preserving language switching
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

Use a repository-backed, file-based canonical content model as the source of truth. Approved artifacts must carry stable IDs, locale linkage, approval metadata, provenance references, publish eligibility, and schema versioning.

Validation is schema-first and shared across content ingestion and pre-publish release checks. Migration remains lightweight through content-shape migrations rather than database migrations. Caching is static and CDN-oriented through immutable assets and prebuilt outputs.

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

The architectural contract is schema-based rather than endpoint-based: content artifacts, localization mappings, navigation structures, route manifests, and publish manifests must be versioned and validated before build completion. Build failures are fail-fast. Search is delivered through a precomputed static index decoupled from route internals.

### Frontend Architecture

Use Astro as a content-first delivery framework with selective islands for interactive behavior. Astro is the rendering and delivery layer, not the owner of domain semantics.

Component architecture stays disciplined and migration-aware:
- layout primitives for page shells and hierarchy
- reusable evidence and disclosure components
- locale-aware route and navigation helpers
- strict separation between content rendering and interaction utilities
- explicit contracts between canonical content nodes and rendered page structures

State management remains minimal: build-produced page state, URL and anchor state, and local component state. Routing uses explicit localized routes with canonical node mappings so language switching preserves logical context. Route semantics must stay stable independently of the rendering framework.

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

Environment configuration stays minimal and explicit, with public build variables cleanly separated from private pipeline configuration. V1 scales through CDN distribution and immutable static assets. If V2 introduces authentication, chatbot runtime, or SSR, the backend should be added as a separate boundary rather than eroding the current static delivery assumptions.

### Decision Impact Analysis

Implementation should proceed in this order: canonical schema and locale-linking rules, shared validation and publish eligibility, Astro route generation around framework-light contracts, static search indexing, release validation and publish manifests, then static hosting and deployment.

Key dependencies remain explicit: routing depends on the canonical schema and locale linkage; release validation depends on provenance and publish eligibility; search depends on stable page generation and content chunking; future ASP.NET MVC integration depends on keeping content, route semantics, and interaction boundaries independent from Astro internals.

## Implementation Governance Summary

Detailed implementation guidance has been extracted into the temporary operational addendum at [_bmad-output/implementation-artifacts/tech-spec-operational-guidelines.md](/workspaces/alecsg77-portal/_bmad-output/implementation-artifacts/tech-spec-operational-guidelines.md). Detailed validation evidence has been preserved separately in the permanent record at [_bmad-output/planning-artifacts/architecture-validation-record.md](/workspaces/alecsg77-portal/_bmad-output/planning-artifacts/architecture-validation-record.md). The implementation addendum remains temporary and can be archived once its decisions are consolidated in code, tests, and final documentation.

The architecture-level constraints that remain mandatory are:
- the content pipeline is the semantic center of the system and the frontend is only a delivery projection
- the public repository contains the full codebase, while private production data remains outside the repository in secure persistent storage
- the system distinguishes private production data, public production artifacts, and dedicated test datasets
- canonical artifacts remain the source of truth for publication, reuse, and future backend evolution

The operational addendum must not be archived until its critical rules are persisted elsewhere through code enforcement, CI validation, backlog items for deferred decisions, and permanent architecture notes where needed.

## Architecture Readiness Summary

The architecture is validated as coherent and ready for implementation at the design level. The remaining open points are operational, not architectural: concrete secure-storage choice, optional private-data versioning, promotion mechanics between private storage and public artifacts, and regression strategy for pipeline reprocessing.

## Architecture Validation Record

**Coherence validation**
The architecture is coherent around a static-first public portal and a private-content-centered generation pipeline. Astro is treated as a delivery framework, while contracts, canonical content, and release validation remain the true architectural backbone.

**Requirements coverage validation**
The architecture covers both sides of the MVP: private ingestion and distillation workflows, and public bilingual delivery with guided navigation, static search, progressive disclosure, and publish-time governance.

**Implementation readiness validation**
The design is ready for implementation because technology direction, repository model, privacy boundaries, data classes, migration stance, and release model are explicit enough to guide implementation consistently.

**Deferred but non-blocking gaps**
- concrete secure-storage choice and backup strategy
- optional private-data versioning, pending proven rollback or audit needs
- exact canonical schema details to be finalized during implementation
- regression comparison strategy for pipeline reprocessing
- operational promotion flow between private storage and public publishable artifacts