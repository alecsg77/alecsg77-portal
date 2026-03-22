---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# alecsg77-portal - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for alecsg77-portal, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: The Author can enter unstructured memories as text notes or voice notes in the local environment.
FR2: The local pipeline can consolidate inputs into governed content beginning at deep-knowledge while keeping raw inputs transient and non-persisted as a governed class.
FR3: The Distiller Agent can derive governed knowledge-base-candidate contributions and reusable knowledge-base content under schema validation, human review, and publish-safety gates.
FR4: The Author can read, edit, and manually approve generated content and native manual contributions through candidate review, knowledge maintenance, HyperCV generation, and publication decisions.
FR5: The local pipeline can organize approved content into a HyperCV catalog through explicit class transitions from candidate review to knowledge maintenance to hypercv-base to hypercv-refinement to hypercv-final to site-data.
FR6: The Generator Agent can reuse the same approved canonical content across multiple portal navigation nodes while preserving semantic consistency, shared source linkage, and no unapproved textual drift.
FR7: The local system can publish the static portal output through the public hosting pipeline.
FR8: The Author can bypass agents and manually edit approved content before publication, but governed knowledge edits must still pass validation, provenance, and approval rules.
FR9: The Visitor can access an executive summary and navigate the career through logical clusters.
FR10: The Visitor can open the context of a stack or skill and see the exact question the content answers.
FR11: The Visitor can expand progressive-disclosure elements to reveal S.T.A.R. case-study content.
FR12: The Visitor can select and copy on-screen S.T.A.R. fragments while preserving reusable structure.
FR13: The Visitor can use a global search bar over the static corpus as a secondary query mode.
FR14: Visitors using disabilities-related assistive access and non-visual tools can navigate the full site tree and access contextual content and deep dives.
FR15: External crawling and document-retrieval systems can read the structured public content without depending on client-side JavaScript for main benchmark-page content.
FR16: Public search engines can index the exposed professional content for author-defined priority queries.
FR17: The web system tracks deep-dive engagement based on description expansions.
FR18: The web system tracks time-to-value based on elapsed time to first exploratory click.
FR19: The Visitor can use a primary professional CTA that links directly to LinkedIn.
FR20: The Author can acquire raw data in Italian and English, with extra languages allowed only when explicitly supported by the workflow.
FR21: The distillation system can create a monolingual canonical HyperCV catalog only from approved, reviewed, and publishable heterogeneous sources and manual contributions.
FR22: The system can maintain verifiable links from canonical catalog elements back to approved supporting sources or contributions.
FR23: The Author can inspect provenance, review status, and approved components of canonical content during review and publish decisions.
FR24: The static generation system can publish English and Italian page variants from the approved canonical catalog while ensuring the public delivery layer consumes site-data rather than governed editorial layers directly.
FR25: The Visitor can change language while preserving the same logical content or navigation node when available.
FR26: The system can detect untranslated placeholders, missing required variants, and manifest inconsistencies before release.
FR27: The Author can trigger selective or full regeneration when approved inputs or transformation rules change.
FR28: The system can publish only a corpus state that has been reviewed as coherent for the intended public release.
FR29: The system can assign each content item a single active management classification among knowledge-base-managed, manual-managed, or hybrid-managed, and use that classification to govern editability and regeneration behavior.
FR30: The system can associate verifiable revision metadata with governed and HyperCV artifacts participating in review, generation, refinement, final materialization, and publication.
FR31: The system can mark approved generated state as stale when a referenced revision, dependency contract, or approved input changes, and prevent automatic reuse until re-review.
FR32: The Author can inspect which revisions and contributions were materialized into content ready for publication.

### NonFunctional Requirements

NFR1: Main public interactions for navigation, static search, and progressive disclosure must complete within 100 ms after initial page load on supported release builds.
NFR2: Homepage, one representative experience page, and one bilingual path must score at least 95 Lighthouse on mobile and desktop in pre-release checks.
NFR3: A new public release must not degrade interaction time or page weight by more than 10 percent versus the previous release.
NFR4: Language switch on already loaded public pages must complete within 500 ms in supported browsers.
NFR5: Pre-publish checks must verify that raw data, governed knowledge bases, editorial drafts, and working materials are absent from the public package for all modified content.
NFR6: The public build must include only content and projections marked publishable through allowlist-based policy, with every unapproved element excluded from the release bundle.
NFR7: Unauthorized governed-source or internal references in the public layer must be zero in every release review.
NFR8: The release evidence package must confirm absence of sensitive metadata, internal references, NDA-covered details, and non-public structured layers from modified public pages.
NFR9: Minimum release guardrails must include secret scanning, least-privilege credentials for automation reading PORTAL_DATA_ROOT, and a rule that untrusted public workflows cannot read governed production portal data.
NFR10: Every published content item must have a review status, verifiable provenance, and identifiable revision before release for all modified content.
NFR11: The Author must be able to trace approved content back to at least one supporting source or contribution during pre-publish review.
NFR12: If a referenced revision changes after approval, derived content must be treated as stale until re-reviewed.
NFR13: The release evidence package must verify review state, provenance linkage, materialized revisions, and the exact public engine revision used for processing for all modified release content.
NFR14: The publish manifest and release evidence package, not transient workspace state, must be the audit source for what was built, validated, and released.
NFR15: Every public English page must have an equivalent Italian variant or an explicit approved exception before release.
NFR16: Language switch must preserve the same logical content or navigation node in all bilingual pages verified in release QA.
NFR17: Pre-release checks must detect untranslated placeholders and manifestly inconsistent content in all modified pages.
NFR18: All main public interactions must be usable via keyboard in supported browsers during release QA.
NFR19: MVP public templates must satisfy WCAG 2.1 AA in automated and manual review before publication.
NFR20: The release evidence package must include JavaScript-disabled HTML snapshots or equivalent captures for benchmark pages to prove main public content remains readable without client execution.
NFR21: Pre-publish checks must block release when leakage, non-allowed metadata, or incomplete content exists on modified pages.
NFR22: Human review must cover all modified public pages in a release.
NFR23: The release evidence package must demonstrate that the public package contains neither raw data nor unauthorized governed-source or internal references.
NFR24: A standard publishable-content update must be completable by a single author-operator in under 30 minutes, excluding raw note drafting, in a dry run.
NFR25: A full corpus rebuild must be executable via a documented end-to-end checklist without undescribed manual interventions and with a verifiable dry-run outcome after each substantial workflow change.
NFR26: The operational workflow must run against an externally managed PORTAL_DATA_ROOT without requiring real data inside the public repository.
NFR27: The public repository must remain usable for tests and frontend work when production portal data are unavailable, using dedicated mock data kept separate from PORTAL_DATA_ROOT.
NFR28: The execution workflow must use an explicit configured PORTAL_DATA_ROOT rather than assuming governed content exists inside the public repository tree.
NFR29: The release evidence package and rebuild, review, and publish checklist must be executable by a single author using repository documentation as the only operational guide.
NFR30: The project must not prescribe a specific persistence, versioning, or recovery strategy for production portal data beyond requiring an explicit configured PORTAL_DATA_ROOT at execution time.

### Additional Requirements

- Use Astro 6.0.4 as the V1 starter template, while keeping content contracts, route semantics, and interactive behaviors framework-light to reduce future migration cost.
- Implement an explicit file-based class architecture over PORTAL_DATA_ROOT covering deep-knowledge, knowledge-base-candidate, knowledge-base, hypercv-base, hypercv-refinement, hypercv-final, and site-data, with raw remaining ephemeral.
- Enforce shared schema validation and strict TypeScript for shared schemas, validators, reusable engine code, and frontend-facing contracts, while allowing isolated Node.js JavaScript helper scripts where compilation overhead is not justified.
- Materialize hypercv-final explicitly from hypercv-base plus hypercv-refinement instead of inferring final content implicitly.
- Require stable IDs, revision pinning, stale detection, and provenance metadata across governed and HyperCV artifacts.
- Keep the MVP free of runtime database, public authentication, public backend APIs, chatbot runtime, and public SSR dependencies.
- Implement search via a prebuilt static index or equivalent static-search strategy decoupled from route internals.
- Generate bilingual site-data from monolingual canonical HyperCV artifacts, preserving node mappings and internal provenance.
- Ensure the frontend renders from site-data only and never repairs missing semantics that should have been produced upstream in canonical schemas.
- Support an explicit configured PORTAL_DATA_ROOT for real workflows and separate dedicated mock datasets for tests and frontend work.
- Run release validation as a first-class pipeline concern covering provenance, publish eligibility, bilingual parity, leakage prevention, accessibility, and benchmark verification.
- Deploy the public portal as a static CDN-backed site with atomic deploys, preview environments, and simple rollback capability.
- Produce publish manifests and validation evidence as the authoritative release audit record, including the reproducibility tuple of engine revision, portal-data revision scope, and active schema or contract version.
- Apply static-site security controls appropriate to the boundary, including secret scanning, least-privilege automation, and prevention of untrusted workflows reading governed production data.

### UX Design Requirements

UX-DR1: The homepage must behave as a Persona-First Homepage TOC that explains what the product is, who it is for, and how to start within the first few seconds.
UX-DR2: The dominant first move must be a persona- or perspective-based routing interaction that supports both direct jumps and exploratory scanning without forcing premature commitment.
UX-DR3: Implement a Persona Routing Rail with framing label, perspective title, explanatory line, anchor action, keyboard reachability, visible focus state, and active state that updates when the target section is in view.
UX-DR4: Implement each homepage persona section as a Persona Micro-Landing Section containing a short framing introduction, an immediate value-bearing description, a curated top-topic list, and a clear route to a full dedicated page.
UX-DR5: Each persona section must provide immediate reward before deeper commitment by exposing useful orientation content in language tailored to that evaluation perspective.
UX-DR6: Implement Top Topic Entry Cards whose titles read as meaningful evaluation questions or proof prompts, not generic taxonomy labels, and which serve as the first explicit step into a deeper path.
UX-DR7: Provide a dedicated Technical Evaluator journey that helps users validate architecture judgment, problem-solving depth, delivery credibility, and technical leadership without linear reading.
UX-DR8: Provide a dedicated Recruiter Screening and Handoff journey that supports fast qualification, concise evidence review, and extraction of reusable fragments for ATS, email, or handoff.
UX-DR9: Support a Comparative Orientation Flow on the homepage so uncertain visitors can compare persona-aligned sections before choosing a deeper path.
UX-DR10: Implement Evidence Blocks with context label, evidence title, short visible summary, optional metadata row, disclosure control, and an expanded inverse S.T.A.R. body.
UX-DR11: Progressive disclosure must always feel like moving from an evaluative question to supporting proof, with collapsed state already meaningful and expanded state remaining scannable and copy-friendly.
UX-DR12: Embed copy-ready interaction support in evidence surfaces, including preserved headings, paragraphs, and list structure plus quiet local copied-state feedback.
UX-DR13: Keep search as a secondary accelerator for known-item recovery or rapid narrowing after orientation rather than as the dominant entry model.
UX-DR14: Preserve the same logical content node when switching language, and do not reset users to unrelated overviews when an equivalent node exists.
UX-DR15: Build the UI from a lightweight custom design system driven by tokens for typography, spacing, color, border, elevation, and motion, with native HTML preferred and any external primitive layer kept minimal and replaceable.
UX-DR16: Use the Research Archive direction as the default MVP visual baseline, with a restrained Technical Signal Layer expressed through metadata, labels, and typography rather than through a separate component family.
UX-DR17: Keep the public MVP visually calm, editorial, and high-signal; avoid dashboard aesthetics, AI theatrics, freeform input flows, and long-scroll delay before first value.
UX-DR18: Maintain a strict action hierarchy with at most one visually dominant primary action per screen or section.
UX-DR19: Preserve cognitive continuity across breakpoints so mobile and desktop keep the same order of perspective selection, section reward, top-topic choice, proof expansion, and optional continuation.
UX-DR20: Ensure responsive layouts remain usable from small mobile through desktop, protecting routing scanability, readable evidence width, safe tap targets, and touch-friendly disclosure controls.
UX-DR21: Use semantic HTML, logical heading hierarchy, strong focus indicators, full keyboard support, and screen-reader-friendly disclosure and routing patterns across all main public flows.
UX-DR22: Anchor navigation must land on clear section headings with predictable focus handling and obvious arrival state.
UX-DR23: Touch targets for interactive controls must meet minimum mobile usability expectations, including at least 44x44 px where applicable.
UX-DR24: Feedback for copy, language switch, disclosure, and similar interactions must be subtle, inline, contextual, and non-disruptive to reading flow.
UX-DR25: Identity-lens or alternate style switching remains explicitly post-MVP and must not be included in V1 public scope.

### FR Coverage Map

FR1: Epic 1 - acquisizione di memorie non strutturate
FR2: Epic 1 - consolidamento verso deep-knowledge
FR3: Epic 1 - distillazione governata con review e safety gates
FR4: Epic 1 - lettura, editing e approvazione dell'autore
FR5: Epic 2 - assemblaggio del catalogo HyperCV tramite transizioni esplicite
FR6: Epic 5 - riuso coerente del contenuto canonico tra nodi pubblici
FR7: Epic 5 - pubblicazione dell'output statico
FR8: Epic 1 - fallback manuale con vincoli di validazione e approval
FR9: Epic 3 - executive summary e navigazione per cluster
FR10: Epic 3 - contesto stack o skill e domanda associata
FR11: Epic 3 - progressive disclosure dei case study
FR12: Epic 3 - copia strutturata dei frammenti S.T.A.R.
FR13: Epic 3 - ricerca globale sul corpus statico
FR14: Epic 4 - accessibilità per utenti e strumenti assistivi
FR15: Epic 4 - leggibilità per crawler senza JS critico
FR16: Epic 4 - indicizzazione SEO del contenuto pubblico
FR17: Epic 4 - tracking del deep-dive engagement
FR18: Epic 4 - tracking del time-to-value
FR19: Epic 3 - CTA professionale verso LinkedIn
FR20: Epic 1 - acquisizione bilingue delle fonti raw
FR21: Epic 2 - catalogo canonico da input approvati e revisionati
FR22: Epic 2 - tracciabilità da canonico a fonti e contributi
FR23: Epic 2 - ispezione di provenance e review state
FR24: Epic 5 - pubblicazione bilingue da catalogo approvato via site-data
FR25: Epic 5 - language switch con preservazione del nodo logico
FR26: Epic 5 - detection pre-release di placeholder e inconsistenze
FR27: Epic 5 - rigenerazione selettiva o completa
FR28: Epic 5 - pubblicazione solo di uno stato corpus coerente e revisionato
FR29: Epic 2 - classificazione knowledge-base or manual or hybrid governante
FR30: Epic 2 - revision metadata per artefatti governati e HyperCV
FR31: Epic 2 - stale detection e blocco del riuso automatico
FR32: Epic 2 - ispezione di revisioni e contributi materializzati

## Epic List

### Epic 1: Governed Intake and Editorial Control
L'Author puo acquisire input grezzi, trasformarli in contenuto governato iniziale e gestire review, editing e fallback manuale senza perdere controllo editoriale.
**FRs covered:** FR1, FR2, FR3, FR4, FR8, FR20

### Epic 2: Canonical Catalog and Reviewable Provenance
L'Author puo trasformare contenuti approvati in un catalogo HyperCV canonico, tracciabile per provenienza, classificazione, revisioni e stato di stale.
**FRs covered:** FR5, FR21, FR22, FR23, FR29, FR30, FR31, FR32

### Epic 3: Guided Public Discovery
Il Visitor puo orientarsi rapidamente, navigare il profilo, aprire prove contestuali, cercare nel corpus statico, copiare frammenti utili e raggiungere il CTA professionale.
**FRs covered:** FR9, FR10, FR11, FR12, FR13, FR19

### Epic 4: Trust, Reach, and Evaluation Signals
Visitatori, crawler e autore ottengono un'esperienza pubblica credibile, accessibile, indicizzabile, leggibile senza JS critico e misurabile in termini di engagement e time-to-value.
**FRs covered:** FR14, FR15, FR16, FR17, FR18

### Epic 5: Bilingual Projection, Regeneration, and Safe Release
L'Author puo proiettare il catalogo canonico in site-data bilingue, rigenerarlo selettivamente e pubblicare solo release coerenti, approvate e sicure.
**FRs covered:** FR6, FR7, FR24, FR25, FR26, FR27, FR28

## Epic 1: Governed Intake and Editorial Control

L'Author puo acquisire input grezzi, trasformarli in contenuto governato iniziale e gestire review, editing e fallback manuale senza perdere controllo editoriale.

### Story 1.1: Set Up Initial Project from Astro Starter Template

As an Author,
I want the local project scaffolded from the approved Astro starter template with explicit runtime configuration,
So that I can execute the governed intake and publishing workflows in the supported architecture baseline.

**Implements:** FR7, FR27, NFR26, NFR27, NFR28, Additional Requirement - Astro 6.0.4 starter template

**Acceptance Criteria:**

**Given** the public repository is initialized for implementation
**When** the project setup story is completed
**Then** the workspace is scaffolded from the approved Astro 6.0.4 starter template with dependencies installed and baseline configuration committed
**And** the setup remains framework-light enough to preserve contract, route, and interaction portability.

**Given** the initialized workspace is inspected
**When** environment configuration is reviewed
**Then** the project exposes an explicit PORTAL_DATA_ROOT configuration path and separate mock-data support for local development and tests
**And** the setup does not assume governed production data are stored inside the public repository tree.

### Story 1.2: Capture Raw Memory Inputs

As an Author,
I want to capture text notes and voice-note references inside a configured local intake flow,
So that I can register new memories in Italian or English without depending on the public portal.

**Implements:** FR1, FR20

**Acceptance Criteria:**

**Given** a configured local workspace with an explicit PORTAL_DATA_ROOT
**When** the Author saves a text note or a voice-note reference through the intake flow
**Then** the system records the intake item with a unique intake identifier, capture type, source language, timestamp, and draft status
**And** the item remains in a transient raw staging area rather than being treated as a persisted governed class.

**Given** the Author registers a voice-note reference without a transcript
**When** the intake item is saved
**Then** the system accepts the reference as a valid raw input record
**And** does not require transcription before the item can enter the intake backlog.

**Given** the intake flow is started without a valid configured root or required metadata
**When** the Author attempts to save the intake item
**Then** the system blocks the operation with a clear validation error
**And** no governed content is created accidentally.

### Story 1.3: Normalize Intake into Deep-Knowledge Entries

As an Author,
I want approved intake batches normalized into deep-knowledge entries,
So that source material becomes governed, durable, and reviewable.

**Implements:** FR2

**Acceptance Criteria:**

**Given** one or more raw intake items are ready for normalization
**When** the Author runs the normalization step
**Then** the system creates deep-knowledge entries with stable identifiers and source linkage
**And** preserves the language and capture provenance needed for later review.

**Given** normalization completes successfully
**When** the resulting deep-knowledge entries are inspected
**Then** they appear as the first persisted governed layer
**And** raw intake is not promoted as a governed persisted class.

### Story 1.4: Distill Governed Candidate Contributions

As an Author,
I want deep-knowledge entries distilled into knowledge-base-candidate contributions under validation gates,
So that reusable knowledge proposals are ready for review instead of bypassing governance.

**Implements:** FR3

**Acceptance Criteria:**

**Given** approved deep-knowledge entries exist
**When** the distillation workflow runs
**Then** the system generates knowledge-base-candidate items that conform to schema expectations
**And** each candidate retains explicit linkage to its supporting deep-knowledge sources.

**Given** a generated candidate fails schema, provenance, or publish-safety checks
**When** the workflow validates the candidate
**Then** the candidate is flagged as blocked for review closure
**And** the workflow writes a validation result identifying the blocking findings that must be resolved before promotion.

### Story 1.5: Review and Approve Candidate Content

As an Author,
I want a review workspace for generated candidates and manual contributions,
So that I can approve, edit, reject, or route content with explicit governance decisions.

**Implements:** FR4

**Acceptance Criteria:**

**Given** candidate items or manual contributions are awaiting review
**When** the Author opens the review workspace
**Then** the system shows content, supporting context, review status, and required actions in one place
**And** allows the Author to approve, reject, or request edits item by item.

**Given** the Author makes a review decision
**When** the decision is saved
**Then** the system records the outcome and review metadata
**And** only approved items become eligible for downstream canonical assembly.

### Story 1.6: Edit Governed Content Through Manual Fallback

As an Author,
I want a manual fallback editing path for governed content,
So that publication work can continue even when automation is insufficient.

**Implements:** FR8

**Acceptance Criteria:**

**Given** generated content is incomplete or unsuitable
**When** the Author switches to manual fallback editing
**Then** the system allows edits within the governed workflow
**And** preserves provenance, validation, and approval obligations instead of bypassing them.

**Given** manually edited governed content is submitted for continuation
**When** the workflow resumes
**Then** downstream steps consume the approved edited version
**And** the system records that the content followed a manual-managed or hybrid-managed path as appropriate.

**Given** the Author edits governed content through the manual fallback path
**When** the edited content is proposed for publishable use
**Then** the system requires a new approval pass before the edited state can become canonical or publishable
**And** manual editing cannot silently alter already approved release-ready outputs.

## Epic 2: Canonical Catalog and Reviewable Provenance

L'Author puo trasformare contenuti approvati in un catalogo HyperCV canonico, tracciabile per provenienza, classificazione, revisioni e stato di stale.

### Story 2.1: Assign Canonical Identity and Management Classifications

As an Author,
I want canonical items to carry stable identifiers, management classification, and revision metadata,
So that I can reason about ownership, editability, and regeneration behavior consistently.

**Implements:** FR29, FR30

**Acceptance Criteria:**

**Given** an approved item is entering the canonical workflow
**When** it is registered as a governed or HyperCV artifact
**Then** the system assigns a stable identifier, revision metadata, and one active management classification
**And** the classification is limited to knowledge-base-managed, manual-managed, or hybrid-managed.

**Given** an item already has canonical metadata
**When** the Author opens its canonical record in review or regeneration tooling
**Then** the record shows its identity, revision, and classification explicitly
**And** those attributes govern editability and regeneration behavior rather than acting as labels only.

### Story 2.2: Resolve Candidate Outcomes into Governed Knowledge Base

As an Author,
I want reviewed candidate content resolved into current, deprecated, or discarded outcomes,
So that the knowledge base remains governed and semantically explicit.

**Implements:** FR21, FR22

**Acceptance Criteria:**

**Given** one or more reviewed knowledge-base-candidate items exist
**When** the Author closes review outcomes
**Then** each item is promoted to knowledge-base current, moved to knowledge-base deprecated, or discarded explicitly
**And** the outcome keeps a provenance link to supporting sources and review metadata.

**Given** a candidate is deprecated rather than promoted as current
**When** downstream workflows inspect the knowledge base
**Then** the deprecated outcome remains available as an exclusion guardrail
**And** it is not treated as positive reusable source material.

### Story 2.3: Generate HyperCV Base from Approved Knowledge

As an Author,
I want approved knowledge-base content assembled into hypercv-base documents under explicit document constraints,
So that I can inspect a first governed HyperCV materialization before editorial refinement.

**Implements:** FR5, FR21, FR30

**Acceptance Criteria:**

**Given** approved knowledge-base content exists for the release scope
**When** the HyperCV base generation workflow runs
**Then** the system creates hypercv-base artifacts from approved inputs only
**And** records the profile, spec, and source revisions used in the generation as part of the artifact metadata.

**Given** a hypercv-base artifact is generated
**When** the Author inspects its generation record
**Then** the system exposes the set of materialized source revisions used for that artifact
**And** makes the generation scope reviewable before refinement begins.

**Given** an input is unapproved, blocked, or outside release scope
**When** base generation evaluates the input set
**Then** the system excludes that input from hypercv-base output
**And** reports the reason in generation results.

### Story 2.4: Materialize HyperCV Final from Replayable Refinements

As an Author,
I want replayable editorial refinements applied to hypercv-base and materialized into hypercv-final,
So that final publishable content remains traceable and constrained by the no-new-knowledge rule.

**Implements:** FR5, FR30

**Acceptance Criteria:**

**Given** a hypercv-base artifact and an admissible refinement patch exist
**When** final materialization runs
**Then** the system produces a hypercv-final artifact that records its dependency on the base revision and current refinement patch
**And** the final output is not inferred implicitly from intermediate layers.

**Given** a refinement attempts to add unsupported knowledge or cannot be replayed cleanly
**When** the system validates the refinement
**Then** final materialization is blocked
**And** the Author receives a conflict or policy violation to resolve before approval.

**Given** a refinement is accepted for final materialization
**When** the workflow evaluates the patch operations
**Then** every accepted change is validated as editorial refinement rather than new knowledge introduction
**And** the validation outcome is attached to the final materialization result.

### Story 2.5: Inspect Provenance, Revisions, and Stale State

As an Author,
I want review screens that expose supporting sources, materialized revisions, and stale warnings,
So that I can make publish decisions with full traceability.

**Implements:** FR22, FR23, FR31, FR32

**Acceptance Criteria:**

**Given** a canonical or HyperCV artifact is opened for review
**When** the Author inspects it
**Then** the system shows supporting sources or contributions, review state, and the revisions materialized into the current artifact
**And** the Author can trace each canonical element back to at least one approved support item.

**Given** a referenced revision or dependency contract changes after approval
**When** downstream artifacts are evaluated
**Then** the system marks affected artifacts as stale
**And** prevents their automatic reuse until re-review occurs by surfacing a blocked stale state in review and regeneration outputs.

## Epic 3: Guided Public Discovery

Il Visitor puo orientarsi rapidamente, navigare il profilo, aprire prove contestuali, cercare nel corpus statico, copiare frammenti utili e raggiungere il CTA professionale.

### Story 3.1: Start from a Persona-First Homepage

As a Visitor,
I want a homepage that explains the portal and offers clear evaluation entry points,
So that I can understand how to start within seconds.

**Implements:** FR9, UX-DR1, UX-DR2, UX-DR3

**Acceptance Criteria:**

**Given** a Visitor lands on the homepage
**When** the first viewport renders
**Then** the page explains what the portal is, who it is for, and how to begin
**And** presents a Persona Routing Rail with clear perspective-based entry points rather than generic taxonomy alone.

**Given** the Visitor lands on the homepage on desktop or mobile
**When** the first screen is visible
**Then** at least one useful first routing action is available within the initial viewport
**And** the dominant first move does not require exploratory scrolling before the user can start.

**Given** the Visitor uses keyboard or touch navigation
**When** they move through the routing rail
**Then** each entry is reachable, visibly focused, and descriptively labeled
**And** selecting an entry moves the Visitor to the corresponding homepage section.

### Story 3.2: Compare Persona Micro-Landings and Top Topics

As a Visitor,
I want persona sections with framed summaries and top-topic entry cards,
So that I can choose the most relevant evaluation path without committing too early.

**Implements:** FR9, FR10, UX-DR4, UX-DR5, UX-DR6, UX-DR9

**Acceptance Criteria:**

**Given** the Visitor enters or scrolls to a persona section
**When** the section is displayed
**Then** the page shows a short framing introduction, an immediate value-bearing description, and a curated top-topic list
**And** the section acts as a micro-landing rather than a full destination.

**Given** a persona section is used as a micro-landing
**When** the Visitor reviews it
**Then** the section contains only the framing layer, a constrained set of top topics, and a route to the deeper page
**And** does not attempt to inline the full path content inside the homepage section.

**Given** the Visitor inspects top-topic cards
**When** they choose one
**Then** the selected card behaves as a valid first explicit step into a deeper path
**And** card labels read as meaningful evaluation questions or proof prompts rather than generic category names.

### Story 3.3: Read Contextual Evidence Through Progressive Disclosure

As a Visitor,
I want contextual questions and expandable evidence blocks,
So that I can inspect relevant proof without reading the entire profile linearly.

**Implements:** FR10, FR11, UX-DR7, UX-DR8, UX-DR10, UX-DR11

**Acceptance Criteria:**

**Given** the Visitor opens a deeper path from a persona section or topic
**When** the evidence view loads
**Then** the page presents contextual questions alongside Evidence Blocks with visible summary content
**And** the collapsed state already communicates enough meaning to justify expansion.

**Given** the Visitor expands an Evidence Block
**When** the disclosure control is activated
**Then** the system reveals a structured inverse S.T.A.R. body with context label, evidence title, and optional metadata row
**And** the interaction feels like moving from evaluative question to supporting proof rather than from teaser to wall of text.

### Story 3.4: Search and Copy Evidence Fragments

As a Visitor,
I want static search and copy-ready evidence fragments,
So that I can retrieve and reuse relevant content quickly.

**Implements:** FR12, FR13, UX-DR12, UX-DR13, Additional Requirement - static search index

**Acceptance Criteria:**

**Given** the Visitor uses the global search control
**When** they search for a known term, stack, or topic
**Then** the system returns results from a static index over the approved corpus
**And** search acts as a secondary accelerator rather than replacing the guided routing model.

**Given** a new approved public corpus is built
**When** the search preparation step runs
**Then** the workflow writes a static search index artifact for the approved corpus
**And** the public search experience consumes that artifact rather than a runtime search backend.

**Given** the Visitor copies visible or expanded evidence content
**When** the copy interaction completes
**Then** the copied text preserves headings, paragraphs, and list structure suitable for reuse
**And** the interface shows quiet inline feedback without disrupting the reading flow.

### Story 3.5: Reach the Professional CTA from the Discovery Flow

As a Visitor,
I want a clear professional CTA within the discovery journey,
So that I can move directly to contact once I have enough confidence.

**Implements:** FR19, UX-DR18

**Acceptance Criteria:**

**Given** the Visitor has explored homepage sections or evidence views
**When** they reach the relevant CTA placement
**Then** the page presents a single clear professional contact action that links to LinkedIn
**And** the CTA does not compete with multiple dominant primary actions in the same context.

**Given** the Visitor navigates the main persona paths
**When** they reach the end of a relevant evaluation segment
**Then** the professional CTA appears in a consistent placement across those paths
**And** remains subordinate to the reading flow until the user has enough context to act.

**Given** the Visitor activates the CTA
**When** the action is triggered
**Then** the system sends the Visitor directly to the configured professional destination
**And** the action can be tracked as part of the public evaluation journey.

## Epic 4: Trust, Reach, and Evaluation Signals

Visitatori, crawler e autore ottengono un'esperienza pubblica credibile, accessibile, indicizzabile, leggibile senza JS critico e misurabile in termini di engagement e time-to-value.

### Story 4.1: Deliver Semantic and Keyboard-Usable Benchmark Pages

As a Visitor using assistive access,
I want benchmark pages and key interactions to be semantically structured and keyboard usable,
So that I can evaluate the profile without barriers.

**Implements:** FR14, UX-DR19, UX-DR20, UX-DR21, UX-DR22, UX-DR23

**Acceptance Criteria:**

**Given** a Visitor navigates the homepage, a representative experience page, or a bilingual path
**When** they use keyboard-only interaction
**Then** all main flows remain usable through semantic structure, heading hierarchy, visible focus states, and operable disclosure patterns
**And** interactive controls meet expected mobile target sizing where applicable.

**Given** a screen reader or assistive tool reads the same pages
**When** section routing or disclosure states are encountered
**Then** destination headings, control labels, and expanded or collapsed states are announced clearly
**And** anchor arrival preserves understandable orientation.

**Given** accessibility verification is run for a release candidate
**When** the checks complete
**Then** the workflow produces an accessibility audit result or checklist outcome for the benchmark flows
**And** failed accessibility requirements are visible before release approval.

### Story 4.2: Expose Crawlable and Search-Ready Public Content

As a crawler, search engine, or evaluating Visitor,
I want the public content exposed as structured HTML without critical JavaScript dependency,
So that it can be retrieved, indexed, and read reliably.

**Implements:** FR15, FR16, NFR20

**Acceptance Criteria:**

**Given** a benchmark page is requested without client-side JavaScript execution
**When** the page is rendered
**Then** the main public content remains readable in server-delivered HTML
**And** the page still exposes the core information needed for evaluation.

**Given** no-JS verification runs on benchmark pages
**When** the verification completes
**Then** the workflow produces HTML snapshots or equivalent captures for the required benchmark pages
**And** those captures can be reviewed as release evidence.

**Given** search engines or retrieval systems inspect the public pages
**When** they parse the markup and metadata
**Then** the content is eligible for indexing and retrieval
**And** route-level structure supports author-defined professional discovery goals.

### Story 4.3: Measure Deep-Dive Engagement and Time-to-Value

As an Author,
I want analytics for deep-dive engagement and time-to-value,
So that I can evaluate whether the public discovery model actually works.

**Implements:** FR17, FR18

**Acceptance Criteria:**

**Given** a Visitor interacts with the public portal
**When** they expand evidence or reach their first exploratory click
**Then** the analytics layer records deep-dive expansion and time-to-value events
**And** the tracked events map back to the intended product metrics.

**Given** analytics data has been collected for a release window
**When** the Author reviews it
**Then** they can inspect deep-dive engagement and first-value timing trends
**And** use those signals to evaluate whether guided discovery is producing value.

### Story 4.4: Verify Performance, Accessibility, and Trust Budgets

As an Author,
I want automated benchmark checks for performance, accessibility, and no-critical-JS readability,
So that release trust stays measurable rather than assumed.

**Implements:** NFR1, NFR2, NFR3, NFR4, NFR18, NFR19, NFR20

**Acceptance Criteria:**

**Given** a release candidate is prepared
**When** trust and reach verification runs
**Then** the workflow produces a benchmark report containing Lighthouse results, interaction-budget checks, accessibility status, and no-JS snapshot presence for required pages
**And** marks the candidate as pass or fail against release thresholds.

**Given** a candidate fails a required trust or reach threshold
**When** verification completes
**Then** the result is marked as failing for release readiness
**And** the failure is visible to the Author before publication proceeds.

## Epic 5: Bilingual Projection, Regeneration, and Safe Release

L'Author puo proiettare il catalogo canonico in site-data bilingue, rigenerarlo selettivamente e pubblicare solo release coerenti, approvate e sicure.

### Story 5.1: Project Canonical Content into Bilingual Site-Data

As an Author,
I want approved canonical content projected into bilingual site-data with stable node mappings,
So that the public portal can reuse the same approved meaning consistently across routes.

**Implements:** FR6, FR24, Additional Requirement - site-data as frontend source

**Acceptance Criteria:**

**Given** approved hypercv-final content exists for the target release
**When** site-data projection runs
**Then** the system generates site-data in English and Italian from canonical content
**And** the public delivery layer is wired to consume site-data rather than governed editorial layers directly.

**Given** site-data is generated for a bilingual release
**When** the projection output is inspected
**Then** each projected node exposes explicit English and Italian node mappings where equivalents exist
**And** those mappings are usable by language-switch and release-validation workflows.

**Given** the same approved canonical content appears across multiple public nodes
**When** the projection is generated
**Then** the system preserves semantic consistency and shared source linkage across those nodes
**And** avoids unapproved textual drift between published views of the same release.

### Story 5.2: Preserve Logical Node Across Language Switching

As a Visitor,
I want language switching to preserve the same logical content node,
So that I can compare or continue reading without losing context.

**Implements:** FR25, FR26, UX-DR14

**Acceptance Criteria:**

**Given** equivalent English and Italian site-data nodes exist
**When** the Visitor switches language from a public page
**Then** the system opens the equivalent logical node in the target language
**And** preserves the user's evaluation context rather than redirecting to an unrelated overview.

**Given** a required equivalent node is missing or inconsistent
**When** variant validation runs before release
**Then** the system flags the problem as a blocking publication issue
**And** records the mismatch in release validation output.

### Story 5.3: Regenerate Affected Outputs from Approved Changes

As an Author,
I want selective or full regeneration based on approved changes and stale dependencies,
So that I can refresh outputs efficiently without rebuilding blindly every time.

**Implements:** FR27, FR31

**Acceptance Criteria:**

**Given** approved inputs, rules, or dependency revisions have changed
**When** the Author triggers regeneration
**Then** the system supports selective regeneration for affected outputs and full regeneration for the complete corpus
**And** respects stale markers and approval state when determining what must be refreshed.

**Given** selective regeneration is requested
**When** the regeneration plan is computed
**Then** the workflow outputs the list of impacted artifacts scheduled for rebuild
**And** the Author can inspect that plan before execution.

**Given** an output is stale because a dependency changed
**When** regeneration planning is computed
**Then** the system identifies the affected downstream artifacts
**And** prevents outdated outputs from being reused as if they were current.

### Story 5.4: Validate Release Safety and Coherence

As an Author,
I want pre-release checks for placeholders, variant coherence, publish eligibility, leakage, and manifest consistency,
So that only safe and coherent releases can proceed.

**Implements:** FR26, FR28, NFR5, NFR6, NFR7, NFR8, NFR21, NFR23

**Acceptance Criteria:**

**Given** a release candidate has been projected into site-data and public artifacts
**When** release validation runs
**Then** the workflow checks untranslated placeholders, variant parity, publish eligibility, leakage boundaries, and manifest consistency
**And** blocks the release when a required condition fails.

**Given** the release candidate passes validation
**When** the Author inspects release readiness
**Then** the system provides evidence and manifest outputs that show the candidate is coherent for the intended public release
**And** only approved release-scope content is eligible for publication.

**Given** release validation completes
**When** the outputs are written
**Then** the workflow emits release evidence files consumable by the publish decision
**And** those files capture the final validation status of the candidate.

### Story 5.5: Publish the Approved Static Package

As an Author,
I want the hosting pipeline to deploy only the approved static package with release evidence,
So that publication stays auditable and safe.

**Implements:** FR7, FR28, NFR9, NFR10, NFR13, NFR14, NFR22, NFR29

**Acceptance Criteria:**

**Given** a release candidate has passed validation and approval
**When** the publish workflow is triggered
**Then** the system deploys the static package through the public hosting pipeline
**And** excludes raw data, governed knowledge bases, editorial drafts, and other non-public artifacts from the deployed output.

**Given** a release is published
**When** the Author reviews the outcome
**Then** the system exposes the publish manifest, validation evidence, and processing revision tuple for auditability
**And** persists those audit records alongside the release outcome while the deployed artifact remains the only runtime artifact crossing the public boundary.