---
artifactType: 'implementation-proposal'
workflowAlignment: 'supplemental-project-document'
status: 'active'
intendedPhase: 'implementation-planning'
sourceArchitecture: '_bmad-output/planning-artifacts/architecture.md'
sourcePrd: '_bmad-output/planning-artifacts/prd.md'
date: '2026-03-16'
---

# Operational Technical Proposal: Public Code + Private Data Execution

## Operational objective

Make the updated architectural model executable without ambiguity:

- the pipeline code remains in the public repository
- the real data and all production content classes remain in the private domain
- real processing happens in a composed private workspace
- the only output that crosses the public runtime boundary is the deployable static package

This proposal is designed as a plausible and implementable MVP setup without introducing a second codebase.

## Operational data model to support

The final model to respect is this:

- `raw` as ephemeral ingestion input
- `deep-knowledge` as the first persisted level, append-only and immutable
- `knowledge-base-dk` and `knowledge-base-manual` as private subclasses managed separately
- unified logical view of the knowledge base for HyperCV generation
- `hypercv-draft` as the draft contribution layer
- `hypercv-composition` as the separate convergence and revision pinning layer
- `hypercv-final` as materialized private canonical content
- `site-data` as the private projection of the web, regenerable and never edited by hand
- `static-site` as the only public production output

Key rule: the site must consume `site-data`, not `hypercv-final` and not the internal logic of composition.

## Recommended technical decision

Use two side-by-side checkouts in the same private workspace, not a submodule as the primary mechanism.

Recommended layout on a private computer or runner:

```text
workspace/
  portal-code/      # clone of the public repository
  portal-private/   # clone of the private repository or mounted private directory
  portal-runtime/   # local ephemeral outputs ignored by git
```

Reason:

- the public repo remains clean and demonstrable
- the private domain does not absorb the public codebase as a fragile Git dependency
- the boundary remains readable even for the team
- the pipeline can be run locally or from a secure runner with the same semantics

## Operational variant: private submodule

The submodule remains tolerable only as workspace bootstrap:

```text
portal-code/
  .git/
  .gitmodules
  private-data/   # submodule toward the private repository
```

This variant is acceptable only if:

1. the team controls both repositories
2. the private repo does not contain logical forks of the public code
3. the submodule serves only to provide a stable path to private data
4. the pipeline continues to support arbitrary `PRIVATE_DATA_ROOT`
5. governance remains in the application gates and in the manifests, not in the Git state of the submodule

If the submodule starts to represent the security boundary or the audit source, it becomes the wrong choice.

## Operational contract between public and private

The public repo must assume only this external contract:

- there is a private root readable via filesystem
- from that root it can read only expected folders and files with known schema
- all output of the private pipeline is written in the private domain or in an ephemeral runtime directory
- public deploy consumes only the validated static package

Minimum variables:

```bash
PRIVATE_DATA_ROOT=../portal-private
PIPELINE_MODE=showcase|private
PIPELINE_RUNTIME_DIR=../portal-runtime
PUBLIC_CODE_SHA=<sha of the public commit used>
```

## Concrete folder and file schema

### Public code domain

```text
portal-code/
  config/
    content-pipeline.ts
    publish-rules.ts
    release-rules.ts
    routes.ts
    locales.ts
  scripts/
    pipeline/
      run-pipeline.ts
      ingest-raw.ts
      distill-deep-knowledge.ts
      build-knowledge-base.ts
      generate-hypercv-draft.ts
      materialize-hypercv-final.ts
      build-site-data.ts
      detect-stale-compositions.ts
    release/
      verify-no-private-leakage.ts
      check-localization-parity.ts
      build-publish-manifest.ts
      build-release-evidence.ts
      build-static-package.ts
      deploy-static-package.ts
      generate-search-index.ts
  fixtures/
    sanitized/
      private-domain/
      site-data/
  src/
    lib/
      content/
        schemas/
        contracts/
        mappers/
        validators/
        provenance/
    pages/
    components/
    layouts/
```

Semantics:

- the public repo contains only code, configuration, and safe fixtures
- it does not contain real data, production `hypercv-final`, or production `site-data`
- sanitized fixtures must simulate the private contract well enough to support showcase and tests

### Private data domain

```text
portal-private/
  raw/
    notes/
    transcripts/
    prompts/
  deep-knowledge/
    entries/
      dk-<timestamp>.md
  knowledge-base/
    dk/
      <artifact-id>.kb.yaml
    manual/
      <artifact-id>.manual.yaml
  hypercv/
    drafts/
      cv-experience/
        <artifact-id>.draft.yaml
      cv-project/
        <artifact-id>.draft.yaml
      cv-star/
        <artifact-id>.draft.yaml
    compositions/
      cv-experience/
        <artifact-id>.composition.yaml
      cv-project/
        <artifact-id>.composition.yaml
      cv-star/
        <artifact-id>.composition.yaml
    final/
      cv-experience/
        <artifact-id>.final.yaml
      cv-project/
        <artifact-id>.final.yaml
      cv-star/
        <artifact-id>.final.yaml
  site-data/
    en/
      personas/
      routes/
      citations/
    it/
      personas/
      routes/
      citations/
    search/
      search-index.json
    manifests/
      route-manifest.json
      provenance-manifest.json
  release/
    candidates/
      <release-id>/
    evidence/
      <release-id>/
    deployable/
      <release-id>/
  manifests/
    pipeline-runs/
    releases/
```

Semantics:

- `deep-knowledge` is not regenerable and is not a cache layer
- `knowledge-base/dk` is regenerable from deep knowledge
- `knowledge-base/manual` is persisted and must not be overwritten by reprocessing
- `hypercv-draft` can contain partial contributions
- `hypercv-composition` governs convergence and the approved revisions to use
- `hypercv-final` is the private source of truth for publication and reuse
- `site-data` is a private web-specialized projection and must not be edited by hand

### Ephemeral runtime directory

```text
portal-runtime/
  tmp/
  logs/
  diffs/
  previews/
```

This directory is not part of data governance. It serves only for ephemeral artifacts, local debugging, and temporary staging.

## Naming and minimum file contracts

Minimum rules:

- artifact IDs must be stable and in kebab-case
- all HyperCV classes must expose `artifact_id` and `revision`
- compositions must explicitly reference the approved revisions they materialize
- finals must be materialized, not implicitly reconstructed by reading draft and composition during rendering

Minimum composition example:

```yaml
artifact_id: ai-distillation-pipeline
artifact_type: cv-star
revision: 20260316093000
kb_revision: 20260315062000
manual_revision: 20260316091000
strategy: explicit
status: approved
```

Minimum final example:

```yaml
artifact_id: ai-distillation-pipeline
artifact_type: cv-star
revision: 20260316094500
policy: hybrid-managed
title: AI Distillation Pipeline
situation: ...
task: ...
action: ...
result: ...
materialized_from:
  composition_revision: 20260316093000
  kb_revision: 20260315062000
  manual_revision: 20260316091000
```

Minimum `site-data` node example:

```yaml
node_id: ai-distillation-pipeline
locale: en
route: /en/technical/ai-distillation-pipeline
persona_targets:
  - technical-evaluator
source:
  artifact_id: ai-distillation-pipeline
  revision: 20260316094500
  fragment: result-summary
```

## Execution modes

### 1. Showcase mode

Purpose: public demo, frontend development, repeatable tests.

Input:

- `fixtures/sanitized/private-domain/`
- `fixtures/sanitized/site-data/`

Command:

```bash
npm run pipeline:showcase
```

Effect:

- runs the pipeline only on sanitized fixtures
- does not require access to the private repo
- must work on any public clone

### 2. Private mode

Purpose: real authoring, validation, and release.

Input:

- `PRIVATE_DATA_ROOT`

Typical values:

- `../portal-private` in the side-by-side checkout model
- `./private-data` in the submodule model

Command:

```bash
PRIVATE_DATA_ROOT=../portal-private \
PIPELINE_RUNTIME_DIR=../portal-runtime \
npm run pipeline:private
```

Effect:

- runs the public pipeline on private data
- writes intermediates only in the private domain or in the ephemeral runtime
- fails immediately if the private path is not present or contains unexpected classes

## Recommended npm scripts

```json
{
  "scripts": {
    "pipeline:showcase": "tsx scripts/pipeline/run-pipeline.ts --mode=showcase",
    "pipeline:private": "tsx scripts/pipeline/run-pipeline.ts --mode=private",
    "pipeline:validate": "tsx scripts/release/run-release-gates.ts",
    "release:build": "tsx scripts/release/build-static-package.ts",
    "release:deploy": "tsx scripts/release/deploy-static-package.ts",
    "release:leakage": "tsx scripts/release/verify-no-private-leakage.ts",
    "release:manifest": "tsx scripts/release/build-publish-manifest.ts"
  }
}
```

Responsibilities of `run-pipeline.ts`:

1. read config and mode
2. resolve the correct data root
3. execute the steps `ingest -> distill -> build-kb -> draft -> composition-check -> final -> site-data`
4. write artifacts to the target consistent with the mode
5. emit a machine-readable execution manifest

## Complete operational workflow

### Phase A: private authoring and approval

1. The operator updates data in `portal-private/raw/`.
2. Runs `npm run pipeline:private` from the public repo.
3. Outputs are updated in `deep-knowledge/`, `knowledge-base/`, `hypercv/drafts/`, and `site-data/` according to the stage rules.
4. Human review approves or corrects draft, composition, and final.

### Phase B: private release validation

1. The system detects stale compositions relative to referenced revisions.
2. It executes gates:
   - schema validation
   - revision traceability
   - stale detection
   - publish eligibility
   - localization parity
   - leakage checks
   - secret scanning
3. If everything passes, it generates:
   - final `site-data`
   - search index
   - release evidence
   - static package in `portal-private/release/deployable/<release-id>/`

### Phase C: public deploy

1. The validated static package is deployed to hosting/CDN.
2. The private domain records the release reference in `portal-private/manifests/releases/`.
3. The public repository does not receive production data; it receives only possible changes to code, configuration, or safe fixtures through the normal Git workflow.

## HyperCV model to support

HyperCV is a hierarchical CV catalog composed of:

- `cv-experience`
  - `experience_id`
  - `kind`
  - `label`
  - `role_label`
  - `period_from`
  - `summary`
  - `policy`

- `cv-project`
  - `project_id`
  - `experience_id`
  - `label`
  - `summary`
  - `policy`

- `cv-star`
  - `star_id`
  - `experience_id`
  - `project_id`
  - `title`
  - `situation`
  - `task`
  - `action`
  - `result`
  - `public_sources`
  - `policy`

Important rules:

- there is a revision log on `cv-experience`, `cv-project`, and `cv-star`
- `hypercv-final` is private and materialized
- `hypercv-composition` is separate from `hypercv-final`
- `site-data` introduces language, paths, citation targets, and public persona profiles

## Minimum publish manifest

Every release should emit a manifest similar to this:

```yaml
manifestVersion: 1
releaseId: 2026-03-16-001
publicRepo: alecsg77/alecsg77-portal
publicCodeShaUsedForProcessing: abc123
privateDataRevision: def456
siteDataRevision: ghi789
staticPackagePath: release/deployable/2026-03-16-001/
checks:
  - ruleId: no-private-leakage
    status: passed
  - ruleId: localization-parity
    status: passed
  - ruleId: schema-validation
    status: passed
  - ruleId: stale-detection
    status: passed
createdAt: 2026-03-16T10:00:00Z
```

This manifest must be kept in the private domain; a sanitized extract can be exported in publishable release evidence if useful.

## Important implementation rules

1. The public repo must never write sensitive intermediate outputs into its Git tree.
2. The private pipeline must not read from deployed public outputs to reconstruct the raw workflow.
3. Every public output must be reproducible from `publicCodeSha + privateDataRevision + schemaVersion`.
4. Automatic tests of the public repo must use only synthetic or sanitized fixtures.
5. The public code must degrade clearly when `PRIVATE_DATA_ROOT` is not present, not fail opaquely.
6. If a revision referenced by a composition changes, the derived final must be treated as stale until a new review.

## What I would implement first

Recommended order:

1. `config/content-pipeline.ts` with support for `showcase` and `private` mode.
2. `scripts/pipeline/run-pipeline.ts` as the single orchestrator.
3. `scripts/pipeline/materialize-hypercv-final.ts` and `scripts/pipeline/build-site-data.ts`.
4. `scripts/pipeline/detect-stale-compositions.ts`.
5. `scripts/release/verify-no-private-leakage.ts`.
6. `scripts/release/build-publish-manifest.ts` and `scripts/release/build-static-package.ts`.
7. A complete sanitized fixture to make the public repo genuinely demonstrable.

## Short proposal to bring to the team

> We implement the system with a single public codebase and a separate private data source. Locally or on a secure runner, the public codebase is executed against the private domain through a composed workspace. All data transformations happen in the private up to `site-data`, and only the validated static package is published into the public runtime.