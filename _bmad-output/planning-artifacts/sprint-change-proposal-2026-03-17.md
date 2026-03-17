# Sprint Change Proposal - Planning Realignment Before Epic Decomposition

## 1. Issue Summary

### Trigger

Post-readiness brainstorming and follow-up implementation artifacts introduced useful decisions together with implementation-detail proposals. As a result, supplemental documents now risk carrying more authority than intended at a stage where epics and stories have not yet been created.

### Issue Type

- Misunderstanding of original artifact authority boundaries
- Premature implementation detail mixed with valid planning decisions
- Risk of false constraints entering epic decomposition

### Evidence

- The canonical planning set is explicitly the PRD, UX Design Specification, and Architecture.
- The March 15 brainstorming session declares several decisions closed, but it also records that validator catalog details, site-data contract details, rebuild strategy, and workspace bootstrap remain implementation-level choices.
- The implementation artifacts contain concrete folder schemas, script names, workflow choreography, and manifest examples that are useful for future implementation but are too specific to be treated as binding planning constraints.
- The current PRD and Architecture already absorb most of the stable boundary, governance, and content-model decisions that emerged from brainstorming.

### Problem Statement

The planning baseline is directionally correct, but two distinct issues exist:

1. document authority is blurred between canonical and supplemental artifacts
2. several brainstorming decisions are only partially absorbed into the canonical set, especially at PRD level, leaving enough ambiguity to distort epic and story decomposition

The project should therefore preserve stable decisions already consolidated into the canonical documents, explicitly declassify supplemental implementation-oriented artifacts, and patch the small but backlog-relevant canonical gaps before epic creation.

## 2. Checklist Status

### Section 1 - Understand the Trigger and Context

- 1.1 Triggering story: N/A. Epics and stories do not exist yet.
- 1.2 Core problem precisely defined: Done.
- 1.3 Initial impact and evidence gathered: Done.

### Section 2 - Epic Impact Assessment

- 2.1 Current epic impact: N/A. No epics exist yet.
- 2.2 Required epic-level changes: Action-needed only in the sense of preventing premature constraints before epic creation.
- 2.3 Remaining epic review: N/A.
- 2.4 Future epic invalidation/new epic need: N/A.
- 2.5 Epic order/priority change: N/A.

### Section 3 - Artifact Conflict and Impact Analysis

- 3.1 PRD conflict check: Done.
- 3.2 Architecture conflict check: Done.
- 3.3 UX conflict check: Done.
- 3.4 Other artifact impact: Done.

### Section 4 - Path Forward Evaluation

- 4.1 Direct adjustment: Viable.
- 4.2 Potential rollback: Not viable.
- 4.3 PRD MVP review: Not required.
- 4.4 Selected approach: Hybrid of Option 1 plus explicit declassification/archival of supplemental artifacts.

### Section 5 - Proposal Components

- 5.1 Issue summary: Done.
- 5.2 Artifact adjustment needs: Done.
- 5.3 Recommended path forward: Done.
- 5.4 MVP impact and action plan: Done.
- 5.5 Handoff plan: Done.

## 3. Stable Decisions That Should Be Preserved As Planning Baseline

The following decisions are stable and should remain authoritative through the canonical documents:

1. Public code plus private data is the core boundary model.
2. The public repository is authoritative for engine, contracts, validators, and frontend delivery.
3. The private domain owns real data, editorial materials, canonical HyperCV artifacts, and all intermediate transformations.
4. Only approved derived public output may cross into the public runtime boundary.
5. The private data class model is explicit: raw, deep-knowledge, knowledge-base subclasses, hypercv-draft, hypercv-composition, hypercv-final, site-data.
6. HyperCV is a hierarchical catalog: cv-experience to cv-project to cv-star.
7. HyperCV final is monolingual canonical content; bilingual publication appears in site-data projection.
8. Revision pinning, stale detection, provenance, and explicit materialization are mandatory governance rules.
9. Site-data is derived, private, regenerable, and never the canonical source of truth.
10. Public engine promotion and public site publication are separate promotion flows.

### Canonical Absorption Assessment

- Architecture absorbs most of the March 15 structural decisions explicitly.
- PRD absorbs the overall model, but compresses several structural decisions into generic wording that is sufficient for strategic planning and insufficient for safe epic/story decomposition.
- UX remains aligned and is not the main source of drift, aside from the need to keep post-MVP identity-lens concepts out of V1 backlog creation.

### Important Correction After Detailed Audit

The initial proposal overstated how complete the canonical absorption already was.

The actual issue pattern is:

- some decisions are fully canonicalized
- some are canonicalized mainly in Architecture, but not crisply enough in PRD
- some are only partially expressed even across the full canonical set

This matters because epic and story generation often leans heavily on PRD wording and high-level canonical summaries.

## 4. Decisions and Details That Must Be Reopened or Declassified

The following items should not be treated as canonical planning constraints for epic decomposition:

1. Exact private workspace composition mechanics.
2. Exact folder layout and file naming conventions.
3. Exact npm script names and command choreography.
4. Exact publish manifest schema and field shape.
5. Exact site-data contract structure and file layout.
6. Exact full-rebuild versus delta-rebuild strategy.
7. Exact validator-to-class matrix as a locked catalog.
8. Operational bootstrap specifics such as side-by-side checkout conventions and fallback scripts.

### Why These Must Reopen

- They are implementation choices, not product or architecture invariants.
- They were discussed in supplemental artifacts after canonical readiness and were not validated through implementation feedback.
- If promoted too early, they would create false constraints for epic decomposition and reduce implementation freedom without adding product clarity.

## 5. Artifact Conflict Assessment

### PRD

No material PRD contradiction was found. The PRD already contains the stable planning decisions needed for epic creation.

### Architecture

No material architecture contradiction was found. The architecture document already reflects most of the stable brainstorming outcomes.

### UX Design Specification

No material UX contradiction was found. The only area that requires care during decomposition is to keep post-MVP identity-lens concepts out of V1 epic scope.

### Real Conflict Identified

The main conflict is not content contradiction. It is authority ambiguity:

- canonical planning documents contain the durable decisions
- supplemental implementation artifacts contain valuable but non-binding elaborations
- current file placement and tone can make those elaborations look more authoritative than they should

## 6. Minimum Canonical Updates Required

### PRD

Targeted updates are required before epic creation. A full rewrite is not required.

Minimum PRD fixes:
- make explicit that `raw` is an ephemeral ingestion input and not a persisted governed class
- add a concise private data class model section or subsection naming `deep-knowledge`, `knowledge-base-dk`, `knowledge-base-manual`, `hypercv-draft`, `hypercv-composition`, `hypercv-final`, and `site-data`
- state the transformation contract at a rule level, at least for `raw -> deep-knowledge`, `deep-knowledge -> knowledge-base`, `draft + composition -> final`, and `final -> site-data`
- strengthen the revision rule so that all HyperCV artifacts have mandatory revisions and stale compositions block automatic reuse until re-review
- expand policy semantics for `knowledge-base-managed`, `manual-managed`, and `hybrid-managed`
- make engine-version traceability in the release evidence package explicit

### UX Design Specification

No substantive content rewrite is required before epic creation.

Optional only:
- add a short note in backlog planning guidance that the identity-lens switch remains post-MVP and must not seed V1 epics

### Architecture

Architecture is much closer to the brainstorming baseline, but it still needs a few focused clarifications.

Minimum Architecture fixes:
- make the site-data contract explicit enough to prevent stories from collapsing provenance, localized citations, persona profiles, and path derivation into one vague projection step
- make the distinct engine-promotion versus site-publication flow easier to consume in backlog decomposition
- add a short note confirming that workspace bootstrap variants, validator catalog detail, manifest shape, and rebuild strategy remain implementation-level, not architectural constraints

### Summary

The minimum rigorous correction is still not a rewrite from zero.

But it is also not only a restoration of document authority.

The actual minimum is:

1. restore authority boundaries
2. patch the small structural gaps in PRD and selected Architecture sections that are large enough to mislead epic/story creation

## 7. Detailed Change Proposals

### Proposal A - Declare Canonical Authority Explicitly

Status: Recommended

Change:
- Treat PRD, UX Design Specification, and Architecture as the only canonical inputs for epic creation.
- Treat brainstorming and implementation artifacts as supporting references only.

Rationale:
- This preserves stable decisions without allowing implementation scaffolding to become false scope.

### Proposal B - Declassify Supplemental Artifacts In Place

Status: Recommended

Change:
- Add a short status banner at the top of each supplemental artifact stating:
  - document status: supplemental
  - authority: non-canonical
  - purpose: decision trace, implementation exploration, or reference guidance
  - usage rule: does not override PRD, UX, or Architecture

Affected documents:
- brainstorming-session-2026-03-15-0620.md
- private-public-boundary-proposal.md
- private-public-operational-implementation.md
- tech-spec-operational-guidelines.md

Rationale:
- This is the smallest possible fix that restores clarity without deleting useful work.

### Proposal C - Archive Implementation-Heavy Supplements After Value Extraction

Status: Completed

Change:
- Move implementation-heavy supplements to archive while keeping a pointer from planning artifacts.
- Preserve the brainstorming session either in archive or in brainstorming output, but label it as a closed decision record rather than active planning authority.

Recommended archival posture:
- Keep the brainstorming session as historical decision record.
- Use the three implementation artifacts temporarily as extraction sources only.
- Promote any stable, still-desired value explicitly into canonical documents.
- Archive the implementation artifacts after that extraction pass is complete.
- Treat any decision that remains only in those archived implementation artifacts as not accepted until explicitly promoted into canonical documents.

Rationale:
- The brainstorming session preserves decision provenance.
- The implementation artifacts may still contain stable clarifications that were not yet promoted into PRD or Architecture.
- Archiving should happen only after extraction, otherwise useful value is discarded together with implementation noise.

### Proposal D - Gate Epic Decomposition Against Canonical Inputs Only

Status: Recommended

Change:
- When creating epics and stories, use the canonical planning set as the binding source.
- Allow supplemental artifacts only as background input where they do not add new constraints.

Rationale:
- This prevents premature implementation assumptions from hardening into backlog scope.

## 8. Recommended Approach

### Selected Path

Hybrid: targeted canonical extraction first, then declassification and archival.

### Why This Path Wins

- It fixes the real issue at the source: authority ambiguity.
- It corrects the small but dangerous structural omissions that can produce the wrong backlog even when the big-picture architecture is sound.
- It does not reopen validated product and architecture decisions unnecessarily.
- It preserves useful design knowledge.
- It preserves the last remaining stable clarifications from the implementation artifacts before they are removed from the active planning set.
- It avoids delaying epic creation with a full planning rewrite.

### Effort and Risk

- Effort: Low
- Risk: Low to medium
- Timeline impact: Minimal

### Why Immediate Discard Is Not Recommended

Discarding the implementation artifacts before extracting their remaining stable value would lose useful clarifications together with the premature implementation detail that the team does not want to keep.

### Why PRD MVP Review Is Not Required

The MVP itself is still coherent. The issue is planning hygiene, not MVP viability.

### Why Small Canonical Patches Are Required

The detailed audit showed that some decisions are present in spirit but not explicit enough in canonical language to support backlog generation safely.

The clearest example is `raw`: the Architecture says it is an ephemeral ingestion input and not a persisted governed class, but the PRD only describes ephemeral inputs at a higher level. That gap is enough for story generation to drift toward long-term raw storage.

## 9. Declassification and Archival Plan

### Immediate Actions

1. Treat implementation artifacts as temporary extraction sources, not as canonical inputs.
2. Record this proposal as the active planning realignment decision.
3. Patch PRD and Architecture with stable value still missing from the canonical set.
4. Use only canonical planning documents for epic creation.

### Follow-Up Actions

1. Archive implementation artifacts after the canonical extraction pass is complete.
2. Keep a short pointer note in archive explaining that their stable value was extracted and their remaining content is intentionally non-canonical.
3. Do not use archived implementation artifacts as default reference guidance.

## 10. Correct Workflow Resume Point

### BMAD Stage Assessment

The project remains in planning, but it is already past product, UX, and architecture definition. The readiness outcome remains valid because no substantive contradiction has been found in the canonical set.

### Correct Resume Point

Resume from epic decomposition only after the targeted canonical patches are applied.

Recommended next BMAD step:
- update the canonical planning set with the targeted P0 fixes identified in this proposal
- then run bmad-create-epics-and-stories using only the updated canonical planning set

Then:
- create individual stories from the approved epic structure
- archive the implementation artifacts once the extraction pass is complete

### Conditional Note

If the team applies the targeted canonical patches described here, a focused readiness rerun is recommended once before epic creation. A full planning restart is not required.

## 11. Detailed Gap Audit Addendum

The deeper audit of the 17 brainstorming decisions shows the following canonicalization pattern:

- a small set is fully clear across the canonical set
- a larger set is captured mainly in Architecture and too compressed in PRD
- a smaller but important set remains only partially explicit even across the full canonical set

### Backlog-Relevant Gap Clusters

The highest-risk gaps before epic creation are:

1. `raw` is not explicit enough in PRD as an ephemeral non-persisted class boundary
2. the PRD does not name the private data classes and their responsibilities crisply enough
3. transformation contracts are implied but not stated as rules
4. draft, composition, and final separation is present architecturally but still too weak in requirement language
5. revisions and stale handling are present but not explicit enough as hard operational gates
6. policy semantics for `knowledge-base-managed`, `manual-managed`, and `hybrid-managed` are underdefined
7. site-data projection responsibilities are explicit in Architecture but too implicit in the overall canonical planning narrative
8. release traceability and security guardrails are directionally present but still too generic for safe backlog decomposition

### Practical Count

Using a strict backlog-safety lens:

- 1 gap is already proven to have caused decomposition drift: the `raw` handling rule
- about 5 additional gaps are high-risk enough to create the same kind of distortion
- another 2 or 3 gaps are medium priority and should be clarified before sprint planning or implementation planning, even if they do not block epic creation by themselves

Important filter:

- this count measures gaps between the canonical planning set and the stable decision baseline
- brainstorming is the primary baseline
- implementation artifacts are secondary extraction sources and were used only to recover stable clarifications that had not yet been promoted into canonicals

### Highest-Risk Fix Order

Recommended fix order before epic creation:

1. explicit `raw` rule in PRD
2. explicit private data class model in PRD
3. explicit transformation contract summary in PRD
4. explicit draft/composition/final rule in PRD
5. explicit revision and stale policy in PRD
6. explicit site-data contract summary in Architecture

## 12. Implementation Handoff

### Change Scope Classification

Moderate

Reason:
- No fundamental product rethink is needed.
- Backlog creation rules and artifact authority need explicit coordination before planning continues.

### Handoff Recipients

- Product Manager or Product Owner: approve the canonical baseline and archive timing rule
- Scrum Master: enforce canonical-only input during epic creation
- Architect: extract remaining stable value from implementation artifacts, then archive them as discarded historical material

### Success Criteria

1. There is a single accepted statement of canonical authority.
2. Stable value from implementation artifacts is extracted before archival.
3. Epic decomposition proceeds from PRD, UX, and Architecture only.
4. No epic acceptance criterion is derived solely from folder layout, script naming, manifest shape, or workspace bootstrap assumptions.

## 13. Final Recommendation

Approve a minimal planning realignment.

Do not rewrite the canonical documents from zero.
Do not keep implementation artifacts as long-term active planning authority.
Do restore authority clarity before epic creation.
Do patch the small canonical gaps that can distort epic/story generation.

The cleanest next move is:

1. Accept this proposal.
2. Patch the P0 canonical gaps in PRD and Architecture.
3. Extract any remaining stable value from the implementation artifacts into canonicals.
4. Archive the implementation artifacts after extraction.
5. Rerun readiness once in focused mode.
6. Resume with epic creation from the updated canonical planning set.

## 14. Execution Note

Completed on 2026-03-17:

- the implementation artifacts were restored after an earlier premature archival step
- stable value was extracted from them into canonical planning documents
- the implementation artifacts were then archived and removed from the active planning set