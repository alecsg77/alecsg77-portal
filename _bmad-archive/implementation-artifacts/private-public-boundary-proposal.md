---
artifactType: 'decision-proposal'
workflowAlignment: 'supplemental-project-document'
status: 'active'
intendedPhase: 'implementation-planning'
sourceArchitecture: '_bmad-output/planning-artifacts/architecture.md'
sourcePrd: '_bmad-output/planning-artifacts/prd.md'
date: '2026-03-16'
---

# Operational Proposal: Private Boundary and Promotion Flow toward Public Canonical

## Summary of the decision

The recommended proposal is to adopt an asymmetric model: the public repository is the authoritative codebase for pipeline, contracts, validations, publish workflow, and frontend; the private repository contains only sensitive data, raw materials, and non-publishable working state.

The actual execution of the pipeline takes place in a private workspace that combines:

- a pinned revision of the public repository as executable code
- a private data source as input

Promotion remains one-way for data: only approved, sanitized, and validated canonical artifacts cross from private to public. Code can instead flow from public to private, because it is precisely the public engine that processes sensitive data.

The brainstorming then refined the nature of the managed artifacts:

- `raw-input` is ephemeral and not persisted
- `deep-knowledge` is the first persisted memory, append-only and non-regenerable
- the knowledge base exists as a unified view of `knowledge-base-dk` and `knowledge-base-manual`
- `hypercv-candidates` are regenerable and non-canonical
- `editorial-resolution` is persisted and canonical
- `hypercv-final` is the materialized public document
- `site-data` are projection data derived from `hypercv-final`

## Problem to solve

Two things are needed:

1. A clear operational boundary between private material and publishable canonical artifacts.
2. A promotion flow that allows deriving public artifacts from the private side without introducing a return flow of sensitive public -> private data.

In addition, the pipeline code must remain public and demonstrable as a showcase, but it must be executable on real private data without absorbing those data into the public repository.

## Reference patterns

- Gatekeeper pattern: the transition between the two domains is mediated by a component with limited privileges that validates and sanitizes.
- Artifact promotion: approved, derived outputs are promoted, not the entire source workspace.
- Public-code / private-data split: the code can be open and reusable, while the security boundary applies to data classes and operational permissions.
- Trunk-based / short-lived branch on the public repo: once the artifacts are promoted, the public repo remains the operational trunk of the public domain.
- Secrets detection pre-commit and in pipeline: the boundary is not credible if secrets can enter Git history.

## Evaluated options

### 1. Monorepo with private and public folders

Pros:
- simple setup
- a single tooling stack

Cons:
- weak boundary: separation is organizational, not architectural
- high risk of accidental leakage
- difficult to sustain the assumption "private -> public only"

Verdict: discard.

### 2. Private repo with public repo submodule

Pros:
- seems simple because it makes the public target visible inside the private
- facilitates a local export toward the public repo working tree

Cons:
- the submodule introduces strong operational coupling and Git fragility
- it confuses the boundary: the public target appears as part of the private workspace
- it makes it easier to introduce improper dependencies from public toward private
- by itself it offers no sanitization, validation, or promotion rules

Verdict: usable only as a transitional local mechanic, not recommended as the target setup.

### 3. Public repo for code + private repo for data + export pipeline and PR on the public repo

Pros:
- aligns the design with the showcase requirement: the code remains public
- clear boundary between public codebase and private data source
- one-way promotion flow for data
- complete audit trail: private source revision, export manifest, public PR/merge
- the public repo remains autonomous and demonstrable even with sanitized fixtures

Cons:
- requires a bit of initial plumbing on pipeline and manifest
- imposes discipline on the artifact contract and on mounting the private workspace

Verdict: recommended for the MVP.

### 4. Bundle signed by the private side and imported into the public

Pros:
- even stronger separation
- excellent for future compliance and attestations

Cons:
- greater operational complexity
- unnecessary overhead for the MVP if the team does not already have this infrastructure

Verdict: excellent later evolution, not necessary as a first step.

## Recommended model

### Topology

- `public-repo`: authoritative codebase for distillation, normalization, validation, publish workflow, frontend, and showcase-safe fixtures.
- `private-repo`: raw notes, working materials, sensitive data, non-publishable review material, possible local authoring state.
- `private-execution-workspace`: checkout of the public repo at a pinned revision + access to the private repo or one of its working copies.
- `promotion job`: process executed in the private context that uses the code of the public repo, produces publishable artifacts, and updates the public repo via PR.

### Logical boundary

The boundary is not between two equivalent codebases but between data classes. Everything that crosses the data boundary must be:

1. explicitly allowed by a versioned schema
2. associated with an approval state
3. sanitized of non-publishable fields
4. tracked with provenance and manifest
5. validated before entering the public repo

## Private boundary rules

1. The public repo is the source of truth for pipeline code and publishable contracts.
2. The private repo is the source of truth for sensitive data: raw notes, working materials, prompts, notes, review material, unapproved sources, and reserved metadata.
3. The public can be a code input for the private; the private cannot be a raw data input for the public.
4. Exportable artifacts must be derived and declared `publishable`, never copied generically from the private workspace.
5. The export contract must be allowlist-based, not denylist-based: only permitted fields are exported.
6. The public repo cannot contain raw notes, working fields, internal editorial comments, sensitive references, secrets, tokens, internal paths, or unsanitized provenance.
7. Every export must be reproducible from the pair: public repo revision + private data revision + schema version.
8. Every promotion must fail if it finds secrets, forbidden fields, localization gaps, unapproved states, or schema inconsistencies.

## Code/data boundary rules

1. Pipeline code lives in the public repo and must run both in showcase mode with public fixtures and in private mode with real private data.
2. The private repo must not contain logical forks of the public code, except for minimal local configuration or strictly operational bootstrap.
3. Private execution must point to a pinned revision of the public repo, so every output is attributable to a precise code commit.
4. The public repo must not assume that private data are present in the Git tree; it must read them through configured paths, mounts, or separate checkouts.
5. No private transformation must require persistent manual changes to public code in order to work on real data.

## Recommended format for the public canonical artifact

Convergence note: later in the brainstorming the focus shifted from a generic `canonical artifact` to a more explicit structure for HyperCV and site-data. The format below remains useful as a minimum contract for public artifacts, but the final domain model was refined into:

- `cv-experience`
- `cv-project`
- `cv-star`

with a mandatory revision log on CV objects and final STAR content distinct from candidate and editorial-resolution.

Use file-based, schema-versioned artifacts, with a minimum structure similar to this:

```yaml
schemaVersion: 1
artifactId: topic.xyz
locale: it
canonicalGroup: topic.xyz
title: "..."
summary: "..."
body: "..."
evidence:
  - label: "..."
    url: "..."
publish:
  status: approved
  approvedAt: 2026-03-15T06:20:00Z
  approvedBy: editor-id
provenance:
  privateSourceRef: private-commit-or-record-id
  transformationVersion: exporter-v1
  redactionProfile: public-v1
```

Important rules:

- `privateSourceRef` may exist as a technical reference, but it must not reveal paths, internal names, or sensitive content.
- No free field such as `notes`, `draft`, `internal_comments`, `source_excerpt_raw` must be present in the public format.
- Artifacts must be stable and have durable IDs, so the public repo can work independently on generated outputs.

## Recommended promotion flow

### Standard flow

1. The author works in the private repo on raw materials.
2. The private workspace checks out the public repo at a pinned revision and runs the public pipeline on private data.
3. The result of the distillation produces candidate canonical artifacts in the private context.
4. An artifact moves to `approved` state in the private.
5. The promotion job materializes only approved artifacts in an ephemeral workspace of the public repo.
6. The gatekeeper applies schema validation, leakage checks, secret scanning, publish eligibility, parity checks between languages, and manifest generation.
7. If everything is green, the job opens a PR in the public repo with only canonical artifacts and permitted derived outputs.
8. The public PR is reviewable by the public-domain / low-security team.
9. The PR is merged into `main` of the public repo.
10. The private repo records the reference of the completed promotion: `promotion_id`, `public_repo`, `public_commit_sha`, `public_code_sha_used_for_processing`.

### Private workspace composition modes

The sound options are these, in order of preference:

1. separate side-by-side checkouts: `public-code/` and `private-data/`
2. temporary clone of the public repo inside an ephemeral private workspace
3. public repo with private submodule, used only as workspace bootstrap
4. released package/tool of the public code consumed by the private side

The submodule is therefore a workable variant, but only if it remains confined to workspace bootstrap. It must not become the heart of governance, the logical boundary, or the promotion audit trail.

### Rule: PR vs direct commit

For now: PR by default.

Reason:
- makes the boundary observable to the team
- lowers the risk of accidental publication
- creates a readable audit trail

Direct commit to `main` of the public repo can be introduced only later, when the gatekeeper is much more mature and the risk of leakage has already been lowered with evidence.

## How work continues in the public repo

The public repo always remains the ordinary working context for:

- pipeline development
- portal build
- routing and rendering
- search indexing
- public QA
- static deploy

In the private context, the same public repo is run against real data through workspace composition, not through copying the data into the repo.

This works if the public code is designed to read private inputs external to its own Git tree and if the public repo remains executable even without access to those data, using sanitized fixtures.

## Why avoid public -> private return

The point to preserve is not to avoid any use of the public inside the private. That is necessary and desirable, because the code is public. The point is to avoid sensitive data or raw semantics returning to the public without going through approval.

If the public started to contain raw data or if the private started to depend on public canonical artifacts as a substitute for the raw source, the boundary would collapse: it would become ambiguous where meaning is born and where redaction occurs.

So the rule is:

- code and public configuration can flow from public to private
- only derived, approved, and sanitized content can flow from private to public
- there must be no return of sensitive data from public to private to reconstruct the raw workflow

## Recommended minimum hardening

1. Secret scanning pre-commit on the public repo, on the private repo, and on the promotion job.
2. Private execution on a composed or temporary workspace, not on a persistent copy of the data inside the public repo.
3. Explicit allowlist of exportable files.
4. Release manifest with file hash, schema version, public code SHA used for processing, private source refs, and checks performed.
5. Separate permissions: whoever can modify private raw data does not necessarily coincide with whoever can approve public promotion.

## Proposed decision for the team

I would propose this wording:

> We keep two separate repositories. The private domain remains the source of truth for raw material and distillation; the public domain receives only approved canonical artifacts through a one-way promotion pipeline with gatekeeper, validations, and PR by default. The public repo does not re-enter the private authoring cycle except for release audit metadata.

I would instead propose this updated wording:

> We keep the public repository as the authoritative codebase for the pipeline and the portal, so that the behavior remains inspectable and demonstrable. We keep the private repository as the source of sensitive data and raw materials. The public pipeline is run in a private context against those data, but only approved canonical artifacts enter the public repository through governed promotion, validations, and PR by default.

## Minimum next steps

1. Define the execution interface between public code and private data: path, mount, config, and revision pinning.
2. Define the `canonical artifact` v1 schema with field allowlist.
3. Define the `publish manifest` v1 including `public_code_sha_used_for_processing`.
4. Implement the private execution workspace that checks out the public repo and reads the private repo without absorbing it into the public tree.
5. Hook up validations: schema, leakage, secret scan, locale parity.
6. Enable promotion via PR on the public repo.