---
stepsCompleted: [1, 2, 3, 4, 5, 6]
workflowCompleted: true
inputDocuments: ["_bmad-archive/brainstorming/brainstorming-session-2026-02-25.md"]
date: 2026-02-27
author: Alessio
---

# Product Brief: alecsg77-portal

## Executive Summary

The alecsg77-portal project aims to solve the problem of "information overload" and "context misalignment" in the recruiting and technical evaluation process for senior profiles. Through an innovative B2B portal, Alessio's varied decade-long professional experience is transformed into a dynamically queryable knowledge base. A conversational AI assistant, acting as Alessio's "Digital Manager", functions as an intelligent intermediary: it extracts, filters, and presents only the information relevant to the specific needs of the potential client (CTO, Hiring Manager), overcoming the limits of the static curriculum vitae and demonstrating advanced architectural skills in practice.

---

## Core Vision

### Problem Statement

IT professionals with many years of experience and heterogeneous backgrounds struggle to communicate their value effectively through static formats such as the CV. A comprehensive document becomes too long and scattered, while reduced versions risk omitting crucial experiences for specific business contexts. This creates a two-way communication problem: the candidate must guess which information to select without fully knowing the company's internal dynamics, and the recruiter/CTO must struggle to filter the data relevant to their Job Description or their core business.

### Problem Impact

- **For the candidate:** Time lost in continuously customizing CVs, risk of being discarded due to omission of relevant details, difficulty positioning themselves as an all-around "problem solver".
- **For the company (Recruiter/CTO):** Difficulty identifying the perfect "fit" between the candidate's skills and the company's specific technical challenges, longer evaluation times, and risk of losing valid talent due to ineffective communication.

### Why Existing Solutions Fall Short

Current solutions (static CVs, LinkedIn profiles, traditional portfolios) are based on a "push" and one-way communication paradigm. They require the user to read passively and make the cognitive effort to map the candidate's experiences onto their own problems. They do not offer interactivity, do not adapt dynamically to the reader's context, and do not allow multidimensional exploration of skills.

### Proposed Solution

An interactive B2B portal that acts as a lead-generation hub, powered by a data extraction engine (HyperCV) and a conversational AI assistant. The AI, positioned as Alessio's "Digital Manager", allows users to query his experience base in natural language. The system analyzes requests (for example, a Job Description or a specific architectural challenge) and returns only the relevant case studies, skills, and lessons learned, offering a personalized, multilingual experience highly focused on value.

### Key Differentiators

- **Context-Aware Interactivity (Zero Friction):** The use of LLMs to dynamically extract relevant information based on the user's specific context. The interface offers precompiled prompt suggestions to eliminate initial friction. In addition, for those who prefer a traditional approach, **the classic PDF CV is always available** for download (through an email form for lead generation), ensuring that the portal is an expansion of the experience rather than an obstacle.
- **Multidimensional Exploration (Drill-Down):** Beyond chat, the portal offers a manual "drill-down" mode. The user can filter the HyperCV by tags (technologies, roles, challenges). In this mode, the AI acts only as an upstream classifier: the experience fragments presented maintain their original form (for example, the STAR framework), guaranteeing synthesis and completeness without narrative alterations.
- **The "Digital Manager" (Trust by Design):** The AI does not pretend to be the candidate, but acts as a professional agent who presents the data objectively. It is instructed to always cite sources and to clearly admit when information is not present in the knowledge base, eliminating the risk of hallucinations.
- **Radical Transparency (Open Source):** The portal itself is a "Living Library of Architectural Patterns". The entire project, including raw data (Markdown) and source code, is **open source and linked to the GitHub repository**. This concretely demonstrates Alessio's technical abilities and proves beyond doubt that the AI invents nothing, but simply reprocesses and classifies real information.

<!-- Content will be appended sequentially through collaborative workflow steps -->
## Target Users

### Primary Users

**The Technical Evaluator (The "Time-Poor Reviewer")**
- **Profile & Context:** This may be a CTO, a VP of Engineering, a Tech Lead, or a future colleague tasked with the technical interview. Evaluating candidates is not their main job: it is an interruption to their daily work. They are short on time, have high technical competence, and low tolerance for "fluff" or purely textbook answers.
- **Problem Experience:** They are frustrated by long traditional CVs or standard profiles. For them, finding specific information (for example, "does this person really understand the security implications of refactoring legacy systems?") in a passive PDF takes too much time. They fear wasting time in interviews with candidates who know the theory but lack real-world experience ("battle scars"). They exhibit strong **"Generic Answer Anxiety"**: they fear the AI may filter too much of the raw technical reality, offering answers that are valid in theory but empty in practice.
- **Success Vision:** They enter Alessio's portal and do not have to read a wall of text; instead, they query the AI directly or filter the card dashboard ("Have you ever scaled a system with this architecture?"). Within seconds, they receive real case studies (STAR format) enriched with concrete and unequivocal **Proof of Work** (failures overcome and lessons learned). They get the raw information they need to validate competence and return to their work certain that they want to meet him.

### Secondary Users

**The Talent Sourcer / Recruiter (The "Matchmaker")**
- **Profile & Context:** They handle the first screening for a client company or for the internal HR department. They must filter many candidates and match profiles to highly technical and detailed Job Descriptions (JD) whose language they often do not fully command.
- **Problem Experience:** They must guess whether a candidate's past experience maps to the specific requirements of a new JD, risking discarding the best candidates or advancing unsuitable profiles because of the language barrier. In addition, they suffer from **"Missing Deliverable Syndrome"**: even when they find the perfect candidate, they need a formal, structured document to send to internal stakeholders or the end client to justify their choice. A great interaction with the AI is not enough.
- **Success Vision:** They arrive at the portal, interact with the "Digital Manager", and provide the Job Description as input, using it as a "translator". The AI not only confirms the match, but also allows them to download an **"Executive Match Report"** (a dynamically generated artifact, for example a PDF) that highlights exactly on the basis of which experiences Alessio satisfies the JD. Their deliverable is ready to be forwarded.

### Excluded Users (Anti-Personas / Out of Scope)

**The Student / Junior Developer ("The Rubber Wall")**
- **Profile:** They are looking for free mentoring on how to become a Cloud Architect, using the B2B portal as a tutor for learning technologies or industry best practices.
- **System Behavior ("Gatekeeping")** The "Digital Manager" is instructed to gently discourage non-B2B use, specifying the commercial limits of its mandate: "My role is to illustrate Alessio's skills for potential collaborations or hiring. For educational support, I suggest the official documentation."

### User Journey

**The Technical Evaluator's and Recruiter's "Fast-Track"**
1. **Discovery:** The user arrives through a link generated specifically for an application (which pre-contextualizes the AI) or through organic search focused on a specific technical challenge.
2. **Onboarding (Zero Friction):** They land on a clean interface. No wall of text to read. The "Digital Manager" (the AI in the third person) presents itself professionally and offers quick options meant to build trust immediately (for example, "Would you like to upload your Job Description for a match?").
3. **Core Usage (Drill-Down / Dialogue for Authenticity):** The user interacts based on their profile:
   - The CTO asks exploratory and technical questions about how specific problems were handled; if unsatisfied, they dig deeper using the UI's "advanced" technology filters. **Fundamental: the Digital Manager uses an "Anti-Fluff" approach and the Inverted STAR framework (Result -> Problem -> Action)** for troubleshooting questions. If a CTO asks about a failure or a criticality, it skips the preambles and provides scannable bullet points.
   - The Recruiter provides the context (JD/company) and asks Alessio's Digital Manager for an objective compatibility assessment.
4. **Success Moment (Trust Building & Data-Limit Handling):**
   - **Happy Path Scenario:** The CTO appreciates the Digital Manager's intellectual honesty and responds positively to the "Fail Fast / Lessons Learned" sections that demonstrate real "battle scars". The Recruiter sees the perfect match within seconds.
   - **Elegant "Mis-Match" Scenario:** If the Recruiter presents a JD in domains completely outside Alessio's updated Knowledge Base, **the AI does not issue definitive judgments or rejection statements**. It answers humbly and commercially: *"Based on the data currently available to me, I did not find documented experience on this specific combination of technologies in Alessio's portfolio. However, he may have handled similar challenges or acquired recent knowledge not yet indexed in this portal. I recommend contacting him directly for an accurate verification through a call."*
5. **Lead Generation and Conclusion (The Exportable Deliverable):** Convinced by the experience and/or by the generation of an Executive Match Report PDF, the user fills out a short form or directly books an introductory call with Alessio, in a true process of advanced, pre-filtered lead generation.

## Success Metrics

The success of `alecsg77-portal` is not measured through generic vanity metrics (for example, "total page visits"), but through the quality of interaction (Leading Indicators) and the actual generation of high-level opportunities (Lagging Indicators).

### User Success Metrics (Leading Indicators)

These metrics tell us whether our interactive approach and the "Anti-Fluff" AI are working:

*   **Positive Feedback Rate:** Percentage of "Helpful" / (Helpful + Unhelpful) submitted by users through the feedback buttons on individual "Digital Manager" messages. Initial target: > 80%.
*   **Conversation Depth / Engagement:** Average number of consecutive questions asked by the user to the chatbot. A number that is too low (1) indicates "bounce"; a balanced number (3-5) indicates real interest and evaluator drill-down.
*   **Time-to-Next-Action (Reactivity):** Average time between the AI's response and the user's next query. Low times combined with multiple interactions indicate a high-engagement flow and clear, scannable answers.
*   **Artifact Generation Rate:** Percentage of chat sessions that end with download of the "Executive Match Report" (particularly relevant for the Recruiter profile).
*   **Retry Rate:** Frequency of use of the "Retry/Regenerate" button on individual responses. A very high rate indicates that the AI is not hitting the desired level of detail or tone of voice (for example, perhaps the responses are missing "Fail Fast" elements).

### Business Objectives (Lagging Indicators)

These metrics confirm that the product is solving Alessio's real problem: improving qualified lead generation and skipping the intermediate screening steps of the standard CV.

*   **6-Month Goal:** Demonstrate the feasibility of the model, establishing the personal hub as a "tangible proof" of competence.
*   **12-Month Goal:** Drastically reduce the time invested in useless early interviews by using the B2B hub to pre-filter and profile companies with more qualified requests.

### Key Performance Indicators (KPIs)

Specific performance indicators measurable monthly:

*   **Qualified Lead Generation:** Number of contacts/requests received through the portal each month for interviews (Senior/Staff/Principal roles) and for consulting (Advisory B2B).
*   **Conversion Rate (MQL/SQL):** Percentage of visits (unique visitors who interact with the digital manager) that convert into a qualified contact request or match report download.
## MVP Scope

The initial strategy focuses on **reducing development and infrastructure friction**, prioritizing rapid Time-To-Market (max. 4-6 weeks). The MVP is designed to validate the users' interest (*Time-Poor Reviewer* and *Matchmaker*) in the multidimensional skills model (HyperCV), without having to implement complex and expensive RAG architectures from day one.

### Core Features (Minimum Viable Product)

*   **Offline HyperCV Engine (Inverted STAR Editor Agent):** A local AI agent (pipeline script) executed only during the site build process. It reads narrative files or raw notes on projects and does not limit itself to extracting dimensions (Technologies, Roles, Lessons Learned), but actively "normalizes/rewrites" them by applying the **Inverted STAR Framework** or explicitly **Anti-Fluff** copy. It forces text blocks to get straight to the point (Result -> Problem -> Solution Architecture). As a separate process, it ensures pre-release human precision through simple Markdown review.
*   **SSG Architecture (Static Site Generation):** The portal will generate static HTML pages from the structured and rewritten data provided by the HyperCV agent, ensuring instant asynchronous loading, immunity from direct server-side hacker attacks, and hosting costs tending toward zero on Vercel/Netlify.
*   **Narrative Presence of the Digital Manager ("Alpha/Read-Only" mode):** To maintain the portal's experiential promise, the page Hero will present a static but curated greeting from Alessio's Digital Manager. It will manage expectations by radically and transparently declaring its still-offline learning nature ("I am cataloging past experiences, browse what I have indexed").
*   **Dynamic "Guided Questions" UI (Intentional Presets):** A single-page interface that prevents "blank page" paralysis. Instead of empty filters that require effort, the user clicks UI triggers shaped as direct questions (for example, "🛡️ Show me how he solved legacy disasters", "🚀 Show me cloud-native successes"). Project cards are instantly re-rendered client-side.
*   **Cloud Native Telemetry System:** Logging of essential events (through a managed layer such as AWS Pinpoint/Azure App Insights integrated asynchronously) to measure interactions and form conversion without complex database overhead.

### Out of Scope for MVP (Not planned for V1)

*   **Real Conversational RAG Chatbot:** No live server-side LLM interaction or free-text prompting for end users (the bot does not "respond vocally" in the browser). This eliminates brand-reputation risks caused by unwanted hallucinations on out-of-target technical queries. It will be discussed only after V1 validation.
*   **Precompiled Dynamic Pages (Personalized Referral URL Params):** Development of unique URLs generated for specific JD/client pairings (for example, `/?target_company=X&jd_id=Y`) to pre-adapt pages. In V1 all users will have access to the same set of base insights.
*   **On-Demand Auto-PDF Generation of the "Executive Match Report":** On-demand document generation or download of "dynamic Resume for HR" packages is postponed to later features. A basic direct-contact "Call to Action" form remains guaranteed.

### MVP Success Criteria

V1 of the MVP will be considered a success and will trigger time-investment approval for V2 if:

1.  **Pipeline Validation:** The local agent succeeds, in a single command, in executing parsing, STAR-copy formatting, frontmatter enrichment, and SSG activation without blocking breakage, with post-build human review reduced to under 5 minutes per entry.
2.  **Traffic Validation ("Guided Question" Engagement):** At least 15% of users who do not bounce immediately intentionally click the question presets and analyze depth cards, not only the first top-down view.
3.  **Extreme Practical Deployment:** Platform distributed in Production with cloud calculation times equal to zero in request handling (Full Cache).

### Future Vision (V2+ Versions)

*   **Full Conversational Implementation (The Live RAG "Digital Manager"):** Real-time chat where the AI processes indexed HyperCV data live in a vector database, autonomously maintaining the "anti-fluff" tone without hard-coded presets, with precise responses on previous how-to experiences.
*   **Deep Customization Routing:** Connection to a scraper of LinkedIn/Job Description sources on the recruiter side in order to instantiate dedicated custom landing pages that cross the extracted JD's "Match Score" with the card skills on the public domain.
*   **On-Demand Artifact Generator:** Engine for native PDF export that condenses successful chat sessions into formal direct submissions to third-party business stakeholders (such as an Executive Report).