---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-04-user-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-01b-continue
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
  - step-e-01-discovery
  - step-e-02-review
  - step-e-03-edit
inputDocuments:
  - _bmad-archive/planning-artifacts/product-brief-alecsg77-portal-2026-02-27.md
  - _bmad-archive/brainstorming/brainstorming-session-2026-02-25.md
  - _bmad-output/brainstorming/brainstorming-session-2026-03-15-0620.md
date: '2026-02-27'
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
productVision:
  vision: Transform the work experience into an explorable public knowledge base, capable of exposing tangible facts and objective lessons learned through guided discovery and verifiable structured content.
  differentiator: "A HyperCV powered by an offline-first private pipeline that distills memories and raw notes into canonically structured artifacts validated by humans, then published in a highly readable bilingual static portal."
  insight: The goal is not to replace the interview with an assistant that speaks on behalf of the candidate, but to reduce evaluation friction by exposing a real database of experiences that can be consulted through navigation, search, and progressive disclosure.
  oneLiner: "A public static portal that makes a career consultable like a knowledge base, powered by a private pipeline that distills verifiable content."
lastEdited: '2026-03-16'
editHistory:
  - date: '2026-03-08'
    changes: 'Refocused requirements for measurability, traceability, web-app coverage, and abstract provenance/regeneration language'
  - date: '2026-03-08'
    changes: 'Tightened BMAD rigor across success criteria, transition architecture, selected FRs, and release-evidence terminology'
  - date: '2026-03-16'
    changes: 'Aligned PRD with system brainstorming: clarified private/public boundary, canonical content model, HyperCV governance, and publish-safety requirements'
  - date: '2026-03-16'
    changes: 'Refined flagged FRs and NFRs after validation to improve measurability, evidence, and abstraction level'
  - date: '2026-03-16'
    changes: 'Closed final validation gaps by tightening canonical-governance FRs and evidence-oriented acceptance language'
workflowType: 'prd'
workflow: 'edit'
---

# Product Requirements Document - alecsg77-portal

**Author:** Alessio
**Date:** 2026-02-27

## Executive Summary

HyperCV is a web app that transforms the static CV into an explorable knowledge base. The problem to solve is twofold: a traditional CV compresses too much context for recruiters and technical evaluators, while a narrative portfolio requires too much time to get to the useful point. V1 addresses this gap with a bilingual public static portal, designed to offer guided discovery, search over the static corpus, and progressive disclosure over verifiable content. The portal's value derives from an offline-first private pipeline that keeps both working materials and canonical content in the private domain, and publishes to the public domain only approved and sanitized static artifacts. Conversational features and real-time matching remain explicitly out of scope for the MVP.

### What Makes This Special

The differentiator is the separation between private content preparation and public consultation:

1. **Private canonical model:** the Author collects raw inputs, consolidates them into persisted private content, and converts them into a canonical HyperCV catalog subject to human review.
2. **Public engine, private data boundary:** the public repository remains authoritative for engine, contracts, and frontend, while the real data and canonical layers remain in the private domain; the boundary applies to data, not code.
3. **Safe static publication:** the portal exposes only approved bilingual static outputs, with publication safety controls and absence of leakage as release constraints.
4. **Contextual progressive disclosure:** the public experience first shows the relevant question and then the structured fragment, making rapid evaluation and operational copy-paste easier.

**Core Insight:** *"A public static portal that makes a career consultable like a knowledge base, powered by a private domain that consolidates verifiable canonical content and publishes only safe static outputs."*

## Project Classification

* **Project Type:** Web App (SPA/PWA)
* **Domain:** General 
* **Complexity Level:** Low (no industry-specific compliance; basic GDPR applies to Raw Data retention)
* **Project Context:** Greenfield 

## Success Criteria

### User Success (The Recruiter)
Success for the user consists of three observable outcomes within the same session:
* they reach a relevant fragment within 15 seconds;
* they expand at least one useful deep dive;
* they obtain reusable text for screening or internal handoffs without substantial reformatting.

### Business Success (The Author/Candidate)
Business success for the Author is demonstrated by two measurable signals of qualification and return:
* **Circular interest generation:** Establish a traffic flywheel in which LinkedIn profile visitors access the portal and at least 5% of unique portal visits generate a return click to LinkedIn or a professional contact CTA.
* **Contact qualification:** At least 50% of professional contacts generated by the portal must arrive after consultation of at least one technical or methodological deep dive tracked in analytics or confirmed in the context of the contact.

### Technical Success
V1 achieves technical success if it simultaneously meets five release conditions:
* public delivery costs within the approved operating budget for V1 and with monthly variance not exceeding 10% under comparable traffic conditions;
* main public interactions within 100 ms after initial load;
* language switch within 500 ms in supported browsers;
* Lighthouse score of at least 95 on release benchmark pages, with no runtime-critical dependencies for consultation of public content;
* release evidence confirming absence of leakage of private data or working materials in the public package.

### Measurable Outcomes
* **Time-to-Value (TTV) < 15 seconds:** The user explores the taxonomies and reaches their first level of deep dive within the first few seconds.
* **Deep-Dive Engagement (>40%):** 40% of unique visits must expand the methodological descriptions (S.T.A.R) and not remain on the Root List.
* **Conversion / Click-through-Rate (CTR) >= 5%:** At least 5% of unique portal visits must generate an outbound click to the primary professional CTA, with separate tracking of inbound traffic from LinkedIn and return traffic from the portal.

These goals impose a conservative architectural choice for V1: verifiable content, low operating costs, and maximum public readability before introducing more costly and risky real-time capabilities.

## Product Scope

### MVP - Minimum Viable Product
Builds the minimum value while reducing cost, hallucination risk, and attack surface:
* Offline-first private pipeline to transform ephemeral inputs into persisted private content, curated knowledge base, and final HyperCV catalog subject to review.
* Bilingual public static portal with hierarchical navigation as the primary mode and search over the static corpus as secondary support.
* **Progressive Disclosure:** links expose contextual questions and open readable, copyable S.T.A.R. fragments.
* Analytics for TTV, deep-dive engagement, and CTR toward LinkedIn.
* Publication workflow with evidence package, safety controls, and promotion to the public allowed only for approved static outputs.
* Explicit MVP exclusions: no runtime chatbot, no live job matching, no dynamic on-demand report generation, no authentication, and no alternate identity-lens or style-switch mode in the public experience.

### Growth Features (Post-MVP)
Extends the same canonical knowledge base with real-time capabilities and operational governance:
* Authentication and gating of advanced features.
* Retrieval and contextual matching on Job Descriptions behind login.
* Conversational experiences and dynamic outputs generated at runtime.
* Optional identity-lens or alternate expressive presentation modes, if later validated as product-relevant rather than decorative.
* Administrative dashboard for ingestion, validation, and content updates.

The MVP scope is sufficient if it demonstrates that guided discovery, operational copy-paste, and rapid consultation generate real value before introducing real-time AI capabilities.

### Canonical Content Boundary
The product distinguishes four layers at the requirement level, without turning the PRD into a detailed technical design:
* **Ephemeral inputs:** work notes and voice notes used for initial ingestion, not intended for publication.
* **Persisted private content:** rich memory, curated knowledge base, and editorial materials that remain outside the public domain.
* **Canonical HyperCV catalog:** approved private representation of experiences, projects, and S.T.A.R. cases used as the authoritative source for publishing.
* **Derived public output:** bilingual site-data and static pages generated from the approved catalog and sanitized before release.

The MVP requires that only the derived public output crosses the boundary toward the published site; private layers always remain excluded from the public package.

## User Journeys

At this MVP stage, the experience is static-first: hierarchical navigation is the primary pattern, while global search over the static corpus serves as a secondary accelerator for retrieving known content. Information is organized into coherent paths and adapted contextually based on the navigation node.

The primary interaction pattern is **Progressive Disclosure**: a contextual request first shows the relevant question and then the structured answer fragment, in order to favor rapid reading and copying of useful content.

### 1. The Technical Evaluator (CTO / Tech Lead)
* **Goal:** Validate skills (for example, architecture, problem solving) thoroughly but without wasting time on boring narrative tests.
* **Journey:** The user lands on the portal and navigates through technical categories or by project. When they identify a stack or skill of interest, they call up the related context and then expand the case study in inverse S.T.A.R. format ("Result -> Problem -> Action"), optimized for fast technical reading and to allow copying quantitative data without manual reformatting.

### 2. The Talent Sourcer (Recruiter / HR)
* **Goal:** Quickly understand whether the profile deserves further investigation and gather clear elements to share with Hiring Managers.
* **Journey:** The recruiter accesses without barriers or login, reads a clear executive summary, and uses navigation and search to find relevant stacks, outcomes, and contexts. They expand the details of interest and use the on-screen formatted fragments for quick copy and paste into ATS, email, or screening notes.

### 3. The Author (Alessio / Admin)
* **Goal:** Enter and keep their professional experience up to date while reducing friction and maximizing data quality, using a **completely local** private pipeline made up of one or more agents or offline processes.
* **Journey (Offline Backend):**
  1. **Initial input:** Alessio records a voice note or writes unstructured notes after a day of work.
  2. **Private consolidation:** local processes transform the inputs into persisted private content, preserving the context useful for future review.
  3. **Curatorial knowledge base:** the consolidated content is distilled into a curated knowledge base, which can also be integrated with native manual contributions.
  4. **HyperCV drafting and composition:** the pipeline produces and refines drafts of experiences, projects, and S.T.A.R. cases, then converts them into a final HyperCV catalog ready for review.
  5. **Human validation:** Alessio reviews, approves, or corrects the final content before it becomes a publishable source.
  6. **Projection and publish safety:** local processes generate bilingual site-data and static pages, execute safety checks, and prepare the release evidence package.
  7. **Public update:** only the approved static package is distributed, without introducing complex runtime interactions in the MVP.

These journeys show why the product combines a readable, fast public experience with a private editorial cycle governed by the Author.

## Innovation & Novel Patterns

### Detected Innovation Areas
* **Offline-First AI Pipeline:** distillation happens upstream, outside the public runtime, reducing costs, leakage risk, and hallucinations.
* **Canonical HyperCV Catalog:** the CV is not a static document but a view derived from an approved private catalog of experiences, projects, and reusable S.T.A.R. cases across multiple paths.
* **Public Engine / Private Data Split:** the site and pipeline engine can remain public and inspectable, while the real data and editorial layers remain in the private domain.
* **Contextual Progressive Disclosure:** navigation first exposes the question and then the structured answer, favoring fast reading and operational copy-paste.

### Market Context & Competitive Landscape
Current alternatives are polarized between static portfolios that are hard to query and CV chatbots with hallucination risk, runtime costs, and limited trust. HyperCV positions itself between these extremes: guided exploratory experience, but with precompiled, verifiable content served by static infrastructure.

### Validation Approach
The model was validated through First Principles Analysis: it clearly separates the needs of recruiters and technical evaluators, without introducing cloud complexity in V1. The hypothesis will be considered valid if the product exceeds 40% deep-dive engagement beyond the initial view.

### Risk Mitigation
* **Risk:** the local pipeline becomes too burdensome to maintain and slows down updates.
* **Mitigation:** the system must provide a manual fallback and minimum automation. Since the core remains based on locally editable files, the Author can continue publishing even in the absence of AI agents.

## Web App Specific Requirements & Architecture

### Browser Support Matrix

* V1 supports the latest two stable major releases of Chrome, Edge, Firefox, and Safari on desktop.
* V1 supports Safari iOS and Chrome Android on modern smartphones, keeping core discovery, language switch, deep-dive, and CTA flows accessible.
* If a secondary enhancement is not available in a supported browser, consultation of public content must remain possible without loss of the primary path.

### Responsive Design

* MVP core flows must remain usable from mobile viewports starting at 360 px width up to wide desktop layouts, without loss of essential content or horizontal scrolling in the main content.
* Navigation, search, progressive disclosure, language switch, and CTA must preserve the same logical hierarchy on mobile and desktop.

### Transition Architecture (V1 $\rightarrow$ V2)

This section defines a decision constraint, not a final technical solution: V1 must remain static and low-risk; Growth may introduce runtime and additional services only after validating value and operating cost.

The operational principle that emerged from system discovery is that the key contract is not between two specific repositories, but between a **public engine** and a **private data domain**. Pipeline code, validation rules, and frontend can remain public; real data, editorial materials, and the canonical catalog remain private.

#### V1 Phase (Minimum Viable Product):
* **Boundary:** static public experience with content approved before publishing.
* **Decision Driver:** maximize readability, SEO, operational simplicity, and release predictability.
* **Core User Experience:** primary hierarchical navigation, search over the static corpus as a secondary mode, and progressive disclosure over public content in English and Italian, kept consistent across desktop and mobile in supported browsers.
* **Content Promotion Chain:** final private HyperCV catalog -> projection site-data -> deployed static site, with allowlist-based controls before every release.
* **Engine Promotion Chain:** separate evolution of public pipeline code, contracts, and frontend, consumable by the private workspace without requiring real data to enter the public repository.

#### Phase 2 (Growth & Backend Migration):
* **Activation Condition:** optional introduction of runtime or additional services only after V1 validation.
* **Decision Driver:** the final Growth pattern remains open until operating cost and the value of advanced features have been measured.
* **Additional capabilities:** authentication, gating, contextual matching, and other runtime AI features.
* **Invariant to preserve:** even in Growth, the private data -> public content boundary remains governed by publication safety policy and explicit review.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy
**MVP Approach:** *Problem-Solving MVP.* The goal of the first iteration is to demonstrate the value of the structured interactive S.T.A.R. format, reducing friction for real recruiters who have little time. The zero assumption is that a very fast portal with pragmatically condensed information beats a traditional narrative portal. If the static MVP converts (high deep-dive engagement rate), it is authorized to proceed toward an advanced backend architecture (V2).

### Scope Boundaries (In vs Out)

#### Phase 1: Minimum Viable Product (Static Publish)
* **[IN SCOPE] Private Domain:** persisted content, curated knowledge base, editorial drafts, and final HyperCV catalog managed exclusively in the Author's local private pipeline.
* **[IN SCOPE] Web Front-end:** static generator distributed as a public experience with low operating cost.
* **[IN SCOPE] Public Localization:** publication of static pages in English and Italian from the approved canonical knowledge base.
* **[IN SCOPE] User Experience (UX):** exploratory progressive disclosure dynamic with explicit context and on-demand deep dive.
* **[IN SCOPE] Search over the static corpus:** global search over a static index as a secondary discovery mode.
* **[IN SCOPE] Publish Governance:** release evidence package, human review of modified content, and automatic publication safety checks before deploy.
* **[OUT OF SCOPE]** No cloud database. No live operational backend. No log-in. No semantic retrieval, chatbot, or LLM inference produced by user interactions at run time.
* **[OUT OF SCOPE]** No identity-lens toggle, alternate style mode, or secondary expressive presentation layer in the public MVP.
* **[OUT OF SCOPE]** Publication of raw materials, private knowledge bases, editorial drafts, or other structured sources internal to the private domain.

#### Phase 2: Growth (Backend Evaluation)
* **[IN SCOPE]** Introduction of backend and managed services only after V1 validation.
* **[IN SCOPE]** Authentication for gating advanced features.
* **[IN SCOPE]** Activation of real-time AI inference for matching and contextual retrieval.
* **[OUT OF SCOPE]** Multi-tenancy systems (if the portal does not open to other users/external portfolios).

## Functional Requirements (MVP V1)

The previous sections define the problem, the product model, the journeys to support, and the minimum architecture that makes V1 credible. The following requirements therefore represent the V1 capability contract. From this point the document moves from scope decisions to required system behaviors and, immediately after, to the quality attributes that constrain the implementation.

### Data Ingestion & Distillation (Offline AI Pipeline)
* **FR1:** The Author can enter unstructured "memories" (text notes or voice notes) related to their career in the local environment.
* **FR2:** The local pipeline can consolidate inputs into persisted private content, preserving the context needed for review and future updates.
* **FR3:** The Distiller Agent (local) can derive from persisted content a curated knowledge base reusable for the canonical HyperCV catalog and for approved public projections of the same release.
* **FR4:** The Author can read, edit, and manually approve the generated content and native manual contributions that flow into the canonical catalog.

### Content Assembly & Generation
* **FR5:** The local pipeline can organize approved content into a HyperCV catalog composed of experiences, projects, and S.T.A.R. cases ready for publication.
* **FR6:** The Generator Agent (local) can reuse the same approved canonical content across the different approved navigation nodes of the portal while maintaining semantic consistency, linkage to the same canonical source, and absence of unapproved textual divergences between published views of the same release.
* **FR7:** The local System can publish the static output of the portal through the public hosting pipeline.
* **FR8:** The Author can bypass the Agents (manual degradation) and directly edit approved content before publication.

### Navigation & Discovery (UX)
* **FR9:** The Visitor can access a general Executive Summary and navigate the career through logical clusters.
* **FR10:** The Visitor can call up the context of a stack or a skill and see the exact question that content answers.
* **FR11:** The Visitor can perform a "click" (Progressive Disclosure) on the element to expand the text block containing the S.T.A.R. case study.
* **FR12:** The Visitor can select and copy the on-screen S.T.A.R. fragments while preserving headings, paragraphs, and list blocks sufficient for reuse in third-party tools without substantial reformatting.
* **FR13:** The Visitor can use a global search bar over the static corpus as a secondary mode for querying the CV index.

### Accessibility, SEO & AI Ingestion
* **FR14:** The Visitor with disabilities, as well as non-visual assistive tools, can navigate the entire site tree and access contextual content and deep dives.
* **FR15:** External crawling and document retrieval systems can read the structured public content and retrieve the main content of release benchmark pages without depending on client-side JavaScript execution.
* **FR16:** Public search engines can index the exposed professional content so that release benchmark pages are eligible for priority professional queries defined by the Author.

### Analytics & Conversion
* **FR17:** The web System tracks engagement by measuring the percentage of visitors who expand descriptions (Deep-Dive).
* **FR18:** The web System tracks "Time-to-Value", calculating the elapsed time until the first exploratory click.
* **FR19:** The Visitor can click on a primary professional contact Call-to-Action at the end of the page to land directly on the LinkedIn profile.

### Canonical Knowledge, Localization & Reprocessing
* **FR20:** The Author can acquire raw data in Italian and English; additional languages are allowed only when the active editorial workflow declares explicit support.
* **FR21:** The distillation system can create a monolingual canonical HyperCV catalog only from heterogeneous sources and manual contributions that, for the current release, have `approved` status, completed human review, and no blocking publishability findings.
* **FR22:** The system can maintain a verifiable link between the canonical catalog, the contributions that compose it, and the sources that support its review so that, during review, the Author can trace every canonical element back to at least one approved source or contribution with identifiable review.
* **FR23:** The Author can inspect provenance, review status, and approved components of the canonical content during review and publish decisions.
* **FR24:** The static generation system can publish page variants in English and Italian from the approved canonical catalog, without exposing private editorial layers.
* **FR25:** The Visitor can change language while preserving, when available, the same logical content or navigation node.
* **FR26:** The system can detect before public release untranslated placeholders, missing variants for required pages, and manifest inconsistencies between equivalent nodes that prevent coherent publication.
* **FR27:** The Author can trigger selective or full regeneration when source inputs or approved transformation rules change.
* **FR28:** The system can publish only a state of the corpus that has been reviewed as coherent for the intended public release.
* **FR29:** The system can distinguish content managed primarily by the knowledge base, manual content, and hybrid content by assigning each content item a single active classification among `knowledge-base-managed`, `manual-managed`, or `hybrid-managed`, visible in review and respected during regeneration.
* **FR30:** The system can associate a verifiable revision with canonical content and the references used to compose it.
* **FR31:** The system can signal when an approved composition becomes stale due to a change in a referenced revision.
* **FR32:** The Author can inspect which revisions and which contributions were materialized into the content ready for publication.

## Non-Functional Requirements

### Performance
* The main public interactions of navigation, search over the static corpus, and progressive disclosure must complete within 100 ms after the initial page load, measured in supported browsers on release builds.
* The main public release benchmark pages (homepage, one representative experience page, and one bilingual path with language switch) must achieve a Lighthouse score of at least 95 on mobile and desktop in pre-release checks.
* A new public release must not degrade interaction times or page weight by more than 10% compared to the previous public release, as measured in the release evidence package.
* Language switch must complete within 500 ms on already loaded public pages in supported browsers.

### Security & Boundary Enforcement
* Pre-publish checks must verify on all modified content that raw data, private knowledge bases, editorial drafts, and working materials are not included in the public package.
* The public build must include only content and projections marked as publishable through allowlist-based policy; every element lacking approval must be excluded from the release bundle, as verified in the release evidence package for 100% of modified content.
* The number of unauthorized private references in the public layer must be 0 in every release review.
* The release evidence package must confirm that sensitive metadata, internal references, NDA-covered details, and structured layers not intended for publication are absent from modified public pages.

### Governance & Traceability
* Every published content item must have a review status, verifiable provenance, and an identifiable revision before release, as attested for 100% of modified content by the release checklist or equivalent evidence attached to the release evidence package.
* The Author must be able to trace an approved content item back to at least one supporting source or contribution during pre-publish review.
* If a referenced revision changes after approval, the derived content must be treated as stale until it is reviewed again.
* The release evidence package must verify review status, provenance linkage, and materialized revisions for 100% of modified content in a release.

### Localization & Content Consistency
* Every public page in English must have an equivalent Italian variant or an explicit approved exception before release.
* Language switch must preserve the same logical content or navigation node in 100% of bilingual pages verified in release QA.
* Pre-release checks must detect 100% of untranslated placeholders and manifestly inconsistent content in modified pages.

### Accessibility & Machine Readability
* All main public interactions must be usable via keyboard in supported browsers during release QA.
* MVP public templates must satisfy WCAG 2.1 AA in automated and manual review before publication.
* The release evidence package must include HTML snapshots or equivalent captures with JavaScript disabled for the homepage, one representative experience page, and one bilingual path, demonstrating that the main public content remains readable without depending on client-side execution.

### Validation & Publish Readiness
* Pre-publish checks must block the release in the presence of leakage, non-allowed metadata, or incomplete content on modified pages.
* Human review must cover 100% of modified public pages in a release.
* The release evidence package must demonstrate that the public package contains neither raw data nor unauthorized private references.

### Operability
* A standard update of publishable content must be completable by a single author-operator in less than 30 minutes, excluding raw note drafting, during a process dry run.
* A full corpus rebuild must be executable through a documented end-to-end checklist, without undescribed manual interventions and with a verifiable outcome in a dry run completed successfully at least once for every substantial workflow change.
* The operational workflow must be executable in a private workspace that consumes the public engine without requiring real data to enter the public repository.
* The release evidence package and the rebuild, review, and publish checklist must be executable by a single author using repository documentation as the only operational guide.