# Implementation Artifact Extraction Matrix - 2026-03-17

## Purpose

This matrix records what stable value was extracted from the three implementation artifacts, what was intentionally not promoted, and what still needs an explicit decision before those artifacts can be archived.

Primary decision baseline:
- `_bmad-archive/brainstorming/brainstorming-session-2026-03-15-0620.md`

Secondary extraction sources:
- `_bmad-archive/implementation-artifacts/private-public-boundary-proposal.md`
- `_bmad-archive/implementation-artifacts/private-public-operational-implementation.md`
- `_bmad-archive/implementation-artifacts/tech-spec-operational-guidelines.md`

Canonical targets:
- `_bmad-output/planning-artifacts/prd.md`
- `_bmad-output/planning-artifacts/architecture.md`
- `_bmad-output/planning-artifacts/ux-design-specification.md`

## Decision Rule

- `promoted`: stable value already integrated into canonical documents
- `not promoted`: implementation detail, concrete example, or operational preference intentionally left out of canonicals
- `re-examine`: potentially valuable point not yet ready to archive blindly and not yet promoted clearly enough

## Promoted

| Topic | Source artifact | Classification | Canonical target | Note |
|---|---|---|---|---|
| Raw is ephemeral and not a persisted governed class | boundary proposal; operational implementation | promoted | `prd.md`, `architecture.md` | Now explicit enough to prevent stories from introducing long-term raw persistence. |
| Private class boundary between `deep-knowledge`, `knowledge-base-*`, `hypercv-*`, `site-data`, and static package | operational implementation; tech spec guidelines | promoted | `prd.md`, `architecture.md` | Promoted without copying folder structure detail. |
| Public engine runs in showcase mode and private mode | operational implementation | promoted | `prd.md`, `architecture.md` | Stable contract promoted; exact commands not promoted. |
| Configured external private data root | operational implementation | promoted | `prd.md`, `architecture.md` | Stable boundary rule promoted; exact env var naming remains non-canonical. |
| Frontend must consume `site-data` only | operational implementation; tech spec guidelines | promoted | `prd.md`, `architecture.md` | Kept as architectural constraint. |
| Delivery components must not repair missing semantics | tech spec guidelines | promoted | `architecture.md` | Promoted as delivery discipline. |
| New publishable fields must originate in canonical contracts before mapping to `site-data` | tech spec guidelines | promoted | `architecture.md` | Prevents page-level semantic drift. |
| Reproducibility tuple with public engine revision and private revision scope | boundary proposal; operational implementation | promoted | `prd.md`, `architecture.md` | Promoted abstractly, without freezing manifest shape. |
| Release evidence must include engine revision used for processing | boundary proposal; operational implementation | promoted | `prd.md` | Added as governance requirement. |
| Distinct transformation chain from raw through static site | operational implementation; tech spec guidelines | promoted | `prd.md` | Promoted as minimum transformation contract, not as pipeline command choreography. |
| `site-data` is private, regenerable, not manually edited, and subordinate to canonical content | all three implementation artifacts | promoted | `prd.md`, `architecture.md` | Reinforced in canonicals. |
| Showcase-safe fixtures are required for public execution and tests | operational implementation; tech spec guidelines | promoted | `prd.md`, `architecture.md` | Stable, useful, and non-invasive. |
| Public repo must not assume private data inside its Git tree | boundary proposal; operational implementation | promoted | `prd.md`, `architecture.md` | Promoted as core execution contract. |
| Allowlist-based promotion and leakage gates | boundary proposal; operational implementation | promoted | `prd.md`, `architecture.md` | Promoted as policy principle, not as script inventory. |

## Not Promoted

| Topic | Source artifact | Classification | Why not promoted |
|---|---|---|---|
| Exact side-by-side workspace layout such as `portal-code/` and `portal-private/` | operational implementation | not promoted | Useful example only; too environment-specific. |
| Concrete folder tree for private repository | operational implementation | not promoted | Captures one file-based implementation, not an architectural invariant. |
| Exact script inventory such as `pipeline:private`, `release:build`, `release:deploy` | operational implementation | not promoted | Tooling convention, not planning-level truth. |
| Concrete file names like `ingest-raw.ts`, `build-site-data.ts`, `verify-no-private-leakage.ts` | operational implementation | not promoted | Premature implementation structure. |
| Exact manifest JSON schema and field names | boundary proposal; operational implementation; tech spec guidelines | not promoted | Principle promoted, structure intentionally left flexible. |
| Exact runtime directory semantics and path examples | operational implementation | not promoted | Operational example only. |
| Route file organization conventions and Astro-specific module layout | tech spec guidelines | not promoted | Too implementation-bound for current planning realignment. |
| Concrete naming conventions beyond stable IDs and locale invariants | tech spec guidelines | not promoted | Team convention, not planning requirement. |
| NPM-centric command choreography for release flow | operational implementation | not promoted | Workflow detail likely to change. |
| Detailed build logging and frontend loading-state conventions | tech spec guidelines | not promoted | Valid implementation guidance, but not required in canonicals before epic creation. |
| Full project directory structure and organization mapping tables | tech spec guidelines | not promoted | Too detailed and too coupled to one implementation approach. |
| Archive-when and implementation-phase workflow metadata in frontmatter | all three implementation artifacts | not promoted | Document management metadata, not product or architecture value. |

## Re-Examine

| Topic | Source artifact | Classification | Why it still needs a decision |
|---|---|---|---|
| Security guardrails such as secret scanning, least-privilege credentials, and untrusted workflow restrictions | boundary proposal | re-examine | Stable in principle, but not yet promoted explicitly enough into PRD wording. Likely should be added before archival. |
| Public PR vs direct commit as the preferred promotion control | boundary proposal | re-examine | The principle of gated promotion is useful, but PR-specific governance may be too concrete for canonical planning. Needs explicit keep/drop decision. |
| Private data versioning default posture | tech spec guidelines | re-examine | “Not mandatory by default” is useful, but still partly operational and may deserve either a short architectural note or explicit discard. |
| Distinction between private production data, private projection artifacts, public production artifacts, and test datasets | tech spec guidelines | re-examine | Partly present in architecture, but may benefit from one more concise canonical clarification before archival. |
| Publish manifest as audit source rather than Git workspace state | boundary proposal; brainstorming-aligned security discussion | re-examine | Important operational principle, but currently only partially visible in canonical wording. |
| Explicit statement that private repo must not contain logical forks of public code | boundary proposal; operational implementation | re-examine | Useful governance guardrail, but may be too implementation-management specific for PRD. |

## Keep Or Drop Decisions

| Topic | Decision | Why | If kept, where it should live |
|---|---|---|---|
| Security guardrails such as secret scanning, least-privilege credentials, and untrusted workflow restrictions | keep | These are stable release-safety and governance controls, not merely local implementation taste. They reduce leakage risk and clarify the trust boundary. | `prd.md` under Security & Boundary Enforcement as minimum operational guardrails; optionally echoed in `architecture.md` security notes |
| Public PR vs direct commit as the preferred promotion control | drop | This is too workflow-specific and depends on team size, repository protections, and automation maturity. It should not constrain planning or architecture canon. | none |
| Private data versioning default posture | keep | This answers a real backup and recovery question at planning level: private persistence is mandatory, but additional versioned storage beyond the repository-backed recovery baseline is optional until justified by validated rollback, audit, or recovery needs. | `architecture.md` infrastructure/deployment section and optionally `prd.md` operability |
| Distinction between private production data, private projection artifacts, public production artifacts, and test datasets | keep | This is a genuine architectural clarity improvement. It helps backlog decomposition, testing boundaries, and release safety without locking in concrete file layouts. | `architecture.md` implementation governance summary or infrastructure/deployment section; optionally a concise operability note in `prd.md` |
| Publish manifest as audit source rather than Git workspace state | keep | This is a stable governance principle tied to reproducibility, release evidence, and auditability. It should be canonical at principle level even if manifest shape remains flexible. | `prd.md` Governance & Traceability and/or `architecture.md` Infrastructure & Deployment |
| Explicit statement that private repo must not contain logical forks of public code | drop | Useful as engineering discipline, but too repository-management specific for current canonical planning documents. Better left to future implementation guidance or contributing docs. | none |

## Counts

- promoted: 14
- not promoted: 12
- re-examine: 6

## Re-Examine Shortlist Before Archival

The remaining items worth deciding before archival are:

1. promote minimum security guardrails into PRD non-functional requirements
2. promote the “publish manifest is audit source” principle into Architecture or PRD
3. add one concise canonical note distinguishing private production data, private projection artifacts, public production artifacts, and test datasets
4. add the private-data versioning default posture to canonical docs

Items recommended for discard with the archival pass:

1. PR-based promotion control as canonical rule
2. “no logical forks of public code in private repo” as canonical rule

## Current Recommendation

Extraction is complete.

The retained `keep` decisions have been promoted into canonical documents.

The implementation artifacts can therefore be archived.

After archival:
- treat everything left only in those files as intentionally non-canonical
- use PRD, Architecture, UX Design Specification, and the brainstorming decision record as the active planning baseline