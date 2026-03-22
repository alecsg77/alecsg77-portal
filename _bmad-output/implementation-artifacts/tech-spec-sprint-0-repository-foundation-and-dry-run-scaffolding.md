---
title: 'Sprint 0 - Repository Foundation and Dry-Run Scaffolding'
slug: 'sprint-0-repository-foundation-and-dry-run-scaffolding'
created: '2026-03-22'
status: 'ready-for-dev'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['Astro', 'TypeScript', 'Node.js', 'Yarn', 'Dev Containers', 'GitHub Copilot Skills', 'GitHub Copilot CLI']
files_to_modify: ['package.json', 'yarn.lock', '.yarnrc.yml', 'tsconfig.json', 'eslint.config.js', 'vitest.config.ts', 'astro.config.mjs', '.gitignore', 'src/env.d.ts', 'src/pages/', 'src/layouts/', 'src/styles/', 'src/lib/', 'scripts/', 'tests/', 'samples-data/', 'docs/dry-run.md', '.github/skills/']
code_patterns: ['Create-first bootstrap on a confirmed clean slate', 'Normative canonicals plus operational anchors', 'Single-package source-first editable development topology', 'Framework-light Astro delivery layer', 'Engine and portal-data split', 'Skill-orchestrated workflow with deterministic tool feedback', 'Samples-data-backed dry run with no production portal data', 'Sprint 0 verification before showcase or release']
test_patterns: ['Sprint 0 verification chain distinct from later feature tests', 'No existing test suite found', 'Repository bootstrap should introduce unit tests for shared helpers and validators', 'Smoke validation for install, lint, typecheck, dry-run, validator retries, dev preview, and build']
---

# Tech-Spec: Sprint 0 - Repository Foundation and Dry-Run Scaffolding

**Created:** 2026-03-22

## Overview

### Problem Statement

Sprint 0 starts from a repository that currently contains planning and BMAD workflow artifacts only. It does not yet contain the public Astro engine, the minimal repository scaffolding needed to run locally, or a concrete technical proof that a GitHub Copilot skill can execute a bounded workflow, produce renderer-consumable `site-data`, pass a real runtime contract check, absorb tool feedback, retry, and eventually materialize output that the Astro engine can consume. The previous Sprint 0 framing still carried too much latent pipeline ambition. For the current technological proof, the repository needs a much narrower objective: prove that a single skill-driven workflow can transform a deliberately tiny seed document plus two persona definitions into valid `site-data`, first satisfying a runtime schema contract and then responding to tool feedback with bounded retries rather than a large canonical content chain.

### Solution

Sprint 0 delivers four dependency-ordered slices: repository foundation and package-manager policy, skill-oriented site-data generation helpers, Astro public engine scaffold, and a documented verification flow. The selected local-development topology is a single-package, source-first repository in which Astro pages, workflow helpers, the validation tool, and the skill definition are all consumed directly from the root working tree during development. To remove naming ambiguity:

- `Sprint 0` is the name of this mini-project or implementation phase.
- `dry-run` is the end-to-end preparation command. It creates a temporary root outside the repository, copies in committed `samples-data/`, invokes one skill workflow, and leaves behind generated `site-data` for follow-up verification.
- `samples-data/` contains only the minimal workflow inputs required for the proof: one seed source document and two persona definitions.
- the repository-local skill for this PoC lives at `.github/skills/site-data-workflow-poc/SKILL.md`. Sprint 0 uses one dedicated bridge script as the workflow controller. On each generation attempt, the bridge calls `copilot --prompt` once, references only that single repository-local skill, and requests one candidate `site-data` payload from the skill.
- the bridge, not the skill, owns the control loop: it prepares inputs, writes the candidate `site-data` file, runs a runtime `zod` contract check as workflow step two, runs the deterministic fake validator as workflow step three, parses machine-readable results, and either stops on success or re-prompts the same skill for the next attempt using the returned feedback.
- the skill-facing input contract must not expose the prepared root path, the target output path, the challenge-file path, or challenge token values before fake-validator feedback. The bridge may pass only the seed content, persona content, repository-controlled `buildMarker`, and machine-readable retry feedback, so correction-token discovery can occur only through fake-validator feedback surfaced by the bridge.
- the skill-to-bridge output contract must be machine-readable: each generation attempt returns only a single JSON object on stdout representing the full candidate content for `site-data/site-data.json`, with no surrounding prose or markdown fences
- workflow step one is generation by the skill; workflow step two is a runtime `zod` contract check against the minimum Sprint 0 `site-data` schema; workflow step three is a deterministic fake validator designed for workflow testing rather than semantic validation.
- the `zod` contract check must fail before the fake validator runs whenever the candidate payload is not consumable by the renderer's minimum Sprint 0 schema.
- the fake validator returns exactly one prescribed, machine-checkable error per invocation, in a fixed sequence, and passes only after the generated file visibly incorporates both required corrections.
- the workflow runs on a fixed three-generation-attempt envelope. Each attempt must run `zod` step two; fake-validation step three runs only if step two succeeds for that attempt. If no attempt reaches full success within the third generation attempt, `dry-run` fails.
- `PORTAL_DATA_ROOT` is the only supported handoff mechanism between workflow generation and the Astro engine. `dry-run` prepares a temporary root and exposes it through a stable stdout contract whose final line is exactly `PORTAL_DATA_ROOT=/absolute/path/to/root`; `dev` and `build` resolve source data only through `${PORTAL_DATA_ROOT}/site-data`.
- `build` is the normative engine-consumption proof for Sprint 0. `dev` remains available only as an optional manual preview after `dry-run` has completed successfully and `site-data` exists in the prepared temporary root referenced by `PORTAL_DATA_ROOT`.

The committed `samples-data/` set remains part of the repository as reusable example content for onboarding and technical validation. Sprint 0 does not attempt to prove the full portal-data pipeline from `raw` to `hypercv-final`; it proves only the minimal skill-workflow loop needed to generate renderer-consumable `site-data`.

### Scope

**In Scope:**
- Astro public engine scaffold
- explicit repository segmentation for public engine, versioned `samples-data/`, temporary external `PORTAL_DATA_ROOT`, skill definitions, and local orchestration helpers
- minimal pipeline helper foundation for deterministic operations exposed through repository commands and documentation
- one committed seed document plus two committed persona definitions in `samples-data/`
- one skill workflow that generates candidate `site-data`, passes a runtime `zod` contract check, calls a fake validator, retries on feedback, and stops after success or three failed attempts
- one runtime `zod` contract validator for the minimum Sprint 0 `site-data` schema
- one deterministic fake validator whose purpose is to test workflow feedback handling through two prescribed errors
- baseline scripts for install, `dry-run`, `dev`, `build`, `lint`, `typecheck`, and `test`
- install support for clean bootstrap plus ordinary in-repository source editing after the initial install
- repository quality gates and baseline tests
- documented first observable end-to-end dry run from repository checkout to locally verifiable static artifact
- a temporary `PORTAL_DATA_ROOT` created outside the repository and scaffolded from `samples-data/` for technical simulation without real production content
- two persona-specific pages rendered from the same generated `site-data`

**Out of Scope:**
- complete feature implementation of the public portal
- real production portal data
- production-ready portal-data authoring workflow
- the full canonical transformation chain from `raw` to `hypercv-final`
- complete canonical schema implementation
- complete refinement grammar implementation
- real semantic validation of publication readiness
- full search, localization, analytics, or release-governance implementation beyond Sprint 0 needs

## Context for Development

### Codebase Patterns

- Confirmed Clean Slate: the repository is greenfield for application code, with no package manifest, no tsconfig, no src tree, and no existing application tests.
- Active canonical sources are planning artifacts in `_bmad-output/planning-artifacts/`.
- Planning artifacts under `_bmad-output/planning-artifacts/` are the normative technical baseline; earlier change proposals remain historical rationale only.
- The latest architecture requires Astro for the public engine, a static-hostable output model, and a portal-data boundary in which the frontend consumes only generated `site-data`.
- PRD and architecture remain authoritative on the public boundary and on the fact that `site-data` is a projection, but Sprint 0 intentionally narrows the transformation proof to a minimal workflow PoC rather than implementing the broader pipeline.
- Shared contracts and validation helpers should default to strict TypeScript; runtime contract validation should be explicit through `zod`; deterministic helper scripts and fake validation tools should remain easy to read, replay, and test.
- The first implementation slice should prove boundary separation and workflow control before feature depth.
- The first dry run must be example-data-backed and must not require governed production data.
- Existing repository context is limited to devcontainer and dependency-maintenance metadata; there is no legacy application architecture to preserve.
- Sprint 0 structure must preserve future portability of contracts and pipeline semantics independently from the Astro delivery layer.
- Sprint 0 install posture must support a clean install mode for reproducible setup plus ordinary in-repository source editing in which engine code changes are consumed directly from the working tree without requiring repeated dependency reinstalls.
- The Sprint 0 topology is a single-package, source-first repository rather than a linked local package or workspace split. The root package owns Astro delivery code, shared TypeScript contracts, helper scripts, skill definitions, tests, and generated bootstrap artifacts.
- Sprint 0 dry runs create a temporary `PORTAL_DATA_ROOT` outside the repository, scaffold required example inputs into that root from versioned `samples-data/`, and generate outputs inside the same root to simulate the real execution model.
- `samples-data/` is the committed canonical Sprint 0 example dataset: for this phase it contains one seed source document plus two persona definitions and nothing more ambitious.
- The Astro app and helper scripts consume only the configured `PORTAL_DATA_ROOT` during verification, and Astro-derived source-data paths are always computed from `${PORTAL_DATA_ROOT}/site-data`.
- Sprint 0 verifies only that a skill-driven workflow can generate `site-data`, satisfy a runtime schema check, react to deterministic fake-validator feedback, and then hand the result to the engine through `dev` or `build`. Real hosting and deployment remain explicitly out of scope for this phase.

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `_bmad-output/planning-artifacts/architecture.md` | Current canonical technical baseline |
| `_bmad-output/planning-artifacts/prd.md` | Product and MVP scope constraints |
| `_bmad-output/planning-artifacts/epics.md` | Implementation sequencing and story coverage |
| `_bmad-output/planning-artifacts/sprint-change-proposal-2026-03-22.md` | Execution-baseline rationale for the current stack and install posture |
| `_bmad-output/planning-artifacts/consistency-review-2026-03-22-post-stack-realignment.md` | Historical consistency interpretation |
| `.devcontainer/devcontainer.json` | Operational anchor: existing environment baseline with Node 22 devcontainer and Copilot CLI feature |
| `.github/dependabot.yml` | Operational anchor: existing repository automation pattern |

### Technical Decisions

- Package manager: Corepack-managed Yarn 4.x with `nodeLinker: node-modules`
- Node runtime baseline: Node 22.x, aligned with the existing devcontainer
- Sprint 0 target: public engine plus one minimal skill-driven site-data workflow PoC through first end-to-end dry run
- CI and deploy are intentionally out of scope for Sprint 0
- Static output directory: `dist/`
- Verification modes after `dry-run`: `yarn build` for normative static artifact generation and optional `yarn dev` for interactive preview
- Astro public base path: `/`
- Bootstrap fixture source directory: `samples-data/`
- Dry-run temporary `PORTAL_DATA_ROOT`: created outside the repository by `dry-run` itself
- Generated Sprint 0 site-data directory inside root: `PORTAL_DATA_ROOT/site-data/`
- `dry-run` must create its own temporary root, perform root scaffolding internally, and then operate only on that prepared `PORTAL_DATA_ROOT`
- `dry-run` must invoke exactly one repository-controlled bridge to produce candidate `site-data`; no alternate generation path is in scope for Sprint 0
- the exact execution path is: `scripts/dry-run.ts` -> `scripts/run-site-data-workflow.ts` -> `copilot --prompt ...` referencing `.github/skills/site-data-workflow-poc/SKILL.md`, with one `copilot --prompt` call per generation attempt and no alternate skill path accepted in Sprint 0
- `dry-run` must support an explicit workflow-runner selector for testability: default mode is `live`, while automated tests and CI may invoke `dry-run` with `WORKFLOW_RUNNER_MODE=fake` or an equivalent documented `--workflow-runner=fake` option that swaps only the workflow runner implementation and leaves the rest of the `dry-run` contract unchanged
- the stable handoff contract for `dry-run` is that the final stdout line is exactly `PORTAL_DATA_ROOT=/absolute/path/to/root`; preceding log output is allowed, but consumers and docs must rely on that final line only
- the temporary root created by `dry-run` remains on disk after command completion so that `dev` and `build` can reuse it; cleanup is explicit and documented rather than automatic in Sprint 0
- each `dry-run` invocation must create a new unique temporary root rather than mutating a previously prepared one in place
- if `dry-run` fails after creating a temporary root but before producing a valid prepared root, it must remove the incomplete temporary root before exiting with a non-zero status
- Internal root scaffolding must accept only a target directory that does not exist yet or exists and is empty
- `samples-data/` should be designed as a minimal but coherent example dataset that another developer can run without needing private HyperCV source material
- the workflow input set is exactly one seed source document and two persona definitions copied from `samples-data/`
- the prepared-root fixture layout is normative for Sprint 0 and must be created exactly as follows:
  - `PORTAL_DATA_ROOT/workflow-inputs/source/case-001.md`
  - `PORTAL_DATA_ROOT/workflow-inputs/personas/recruiter.json`
  - `PORTAL_DATA_ROOT/workflow-inputs/personas/technical-evaluator.json`
  - `PORTAL_DATA_ROOT/site-data/validation-challenge.json`
- the bridge-controlled workflow must use a generate-then-check-then-validate loop with exactly three total generation attempts at most, paired with exactly one `zod` contract check per generation attempt and at most one fake-validator invocation per generation attempt
- `dry-run` must write a per-run challenge file at `PORTAL_DATA_ROOT/site-data/validation-challenge.json` before invoking the skill. That file contains two opaque token values, one for the first correction and one for the second.
- the runtime `zod` contract check is the authoritative proof that generated `site-data` matches the repository's minimum Sprint 0 renderer contract before any artificial workflow-feedback checks run; that minimum contract intentionally excludes the fake-validator echo fields
- the fake validator is intentionally workflow-oriented rather than semantically complete: it must return two prescribed, machine-checkable errors in sequence unless the generated file visibly integrates the exact correction requested for the current challenge token
- the first required correction is a top-level field `toolFeedbackEchoOne` whose exact value must equal the challenge file's first token
- the second required correction is a nested field `pages.recruiter.toolFeedbackEchoTwo` whose exact value must equal the challenge file's second token
- the `zod` contract check must run against the same candidate file path the bridge writes for the renderer handoff and must surface machine-readable contract failures before the fake validator is invoked
- the fake validator must emit exactly one validation error per invocation in this order: first top-level correction if missing or wrong, else second nested correction if missing or wrong, else success
- the fake validator must read its inputs through explicit file-path arguments: `--site-data-file <absolute-path>` and `--challenge-file <absolute-path>`
- the fake validator must write a single JSON result object to stdout and use exit codes `0` for success, `2` for validation failure, and `1` for operational failure
- on fake-validation failure, the stdout JSON must minimally contain `ok`, `code`, `path`, `requiredValue`, and `message` so the skill can use the feedback deterministically rather than from vague prose
- on fake-validator operational failure, the validator must still emit a JSON result object to stdout containing at least `ok`, `code`, and `message` before exiting with code `1`
- the source of truth for `buildMarker` is the repository-controlled helper in `src/lib/build-marker.ts`; `dry-run` or its bridge must resolve that value before skill execution and make it available to the workflow, and the workflow must write that exact value into `site-data/site-data.json`
- automated tests must not depend on a live authenticated Copilot session; `scripts/run-site-data-workflow.ts` must therefore expose a mockable execution seam so repository tests can substitute a deterministic fake workflow runner, while the real Copilot CLI path remains covered by the manual walkthrough and optional live integration checks
- A temporary root counts as successfully prepared only if it contains the normative fixture layout plus `site-data/site-data.json`; any failure before the final stdout handoff line requires deleting the root created by that invocation
- Success proof requires generated `site-data` plus local verification through `build`; `dev` is optional manual preview only
- Repository Sprint 0 work must optimize for dependency-first implementation order
- Target repository directories should explicitly separate `src/` delivery code, `scripts/` pipeline helpers, `.github/skills/` workflow definitions, versioned `samples-data/` fixtures, and `tests/` verification. Temporary execution roots are created outside the repository.
- The first file set should be created rather than modified in place, because no legacy app layer exists.
- Current file targets are create-first targets, not legacy modifications.
- Historical 2026-03-21 proposals inform rationale but do not override current canonicals.
- Sprint 0 verification must minimally cover install, lint, typecheck, unit-test execution, `dry-run` execution, `zod` contract checks, fake-validator retries, and `build` generation of the static artifact. Optional manual verification may also include `dev` preview.
- Clean install mode is defined as `corepack enable`, `corepack use yarn@4`, and `yarn install --immutable` from a fresh clone.
- Sprint 0 development in this repository is direct engine-repo development, not an installed-engine scenario. After initial install, ordinary source edits are verified by rerunning `yarn dev`, `yarn build`, and `yarn test` against the root working tree, with `yarn dry-run` remaining the explicit workflow-generation command.
- Environment contract for Sprint 0:
  - `PORTAL_DATA_ROOT`: required for `dev` and `build`; in Sprint 0 it must point to a directory previously prepared by `dry-run`, and Astro must derive source-data paths from `${PORTAL_DATA_ROOT}/site-data`
  - generated Sprint 0 `site-data` output path: `PORTAL_DATA_ROOT/site-data/`
  - `TMPDIR` or platform temp directory: used by `dry-run` to create its temporary execution root
- Minimum generated site-data contract for Sprint 0:
  - file path: `PORTAL_DATA_ROOT/site-data/site-data.json`
  - required top-level fields for the minimum `zod` renderer contract: `site`, `pages`, `buildMarker`
  - additional top-level field required only for final fake-validator success: `toolFeedbackEchoOne`
  - `site` must minimally contain a human-readable `title`
  - `pages` must minimally contain `recruiter` and `technical-evaluator` entries
  - each page entry must minimally contain `headline` and `body`
  - `pages.recruiter.toolFeedbackEchoTwo` is required only after the workflow has successfully integrated the second fake-validation correction
  - `buildMarker` must be a visible string rendered in the homepage HTML so local build verification remains easy to observe
- Config loading must fail fast on invalid `PORTAL_DATA_ROOT` values for `dev` or `build`, absent committed `samples-data/`, failure to create the temporary root for `dry-run`, attempts by internal scaffolding to initialize a non-empty target, missing seed workflow inputs, or attempts to run `dev`/`build` without a valid `PORTAL_DATA_ROOT` that already contains generated `site-data`.

## Implementation Plan

### Tasks

- [ ] Task 1: Create repository foundation and install posture
  - File: `package.json`, `.yarnrc.yml`, and `yarn.lock`
  - Action: Create the root manifest and Yarn policy with pinned Node 22 / Yarn 4 expectations, `nodeLinker: node-modules`, `packageManager` metadata, and scripts for `dry-run`, `dev`, `build`, `lint`, `typecheck`, and `test`, with each command documented as a distinct Sprint 0 concern.
  - Notes: The root package is the engine package for Sprint 0 purposes. Local source edits must be consumed directly from the working tree with no link or reinstall workflow.
- [ ] Task 2: Establish baseline repository configuration
  - File: `tsconfig.json` and `src/env.d.ts`
  - Action: Create the strict TypeScript baseline and Astro-aware ambient typing required for shared contracts, helper scripts, tests, and app code.
  - Notes: Keep the configuration minimal, source-first, and compatible with Astro plus script execution.
- [ ] Task 3: Add repository hygiene and local-environment defaults
  - File: `.gitignore`
  - Action: Ignore build output, cache directories, temporary local env files, and any optional ad hoc debug artifacts while preserving `samples-data/`, `.github/skills/`, and documentation.
  - Notes: Sprint 0 temporary roots are created outside the repository, so `.gitignore` should stay focused on in-repo artifacts only.
- [ ] Task 4: Add baseline lint and test tool wiring
  - File: `eslint.config.js` and `vitest.config.ts`
  - Action: Create minimal ESLint and Vitest configuration compatible with Astro, TypeScript, repository scripts, the runtime `zod` contract check, and the fake validator.
  - Notes: Sprint 0 cannot claim lint and test commands without explicitly wiring them.
- [ ] Task 5: Create minimal shared contracts and config utilities
  - File: `src/lib/config.ts` and `src/lib/contracts/site-data.ts`
  - Action: Add initial TypeScript contracts and `zod` schemas for site-data consumption and explicit environment/config loading, including the Sprint 0 contract for temporary `PORTAL_DATA_ROOT`, the `${PORTAL_DATA_ROOT}/site-data` resolution rule, and the exact page entry shape. Model the two fake-validation feedback fields separately from the minimum `zod` renderer contract so they can be added after step-two contract success.
  - Notes: The frontend must remain projection-only, must not infer missing semantics, and must not silently switch data sources. The same minimum contract must be consumable both as TypeScript types and as runtime `zod` parsing logic.
- [ ] Task 6: Add committed workflow seed fixtures
  - File: `samples-data/`
  - Action: Create the minimal Sprint 0 workflow inputs: one seed source document plus two persona definitions, copied into a temporary `PORTAL_DATA_ROOT` during dry-run scaffolding using the exact prepared-root layout defined in Technical Decisions.
  - Notes: These fixtures remain inside the public repository as committed canonical example data and stay categorically separate from any real external `PORTAL_DATA_ROOT`.
- [ ] Task 7: Add runtime contract check and fake validator
  - File: `src/lib/contracts/site-data.ts` and `scripts/validate-site-data.ts`
  - Action: Define the minimum Sprint 0 `site-data` schema in `zod` and expose a runtime parser that the bridge can invoke as workflow step two against the candidate file. Create a deterministic fake validator that reads the candidate file and the per-run challenge file through `--site-data-file` and `--challenge-file` absolute-path arguments and writes a single JSON result object to stdout. The fake validator must emit exactly one validation error per invocation in fixed order: first require `toolFeedbackEchoOne` to equal challenge token one, then require `pages.recruiter.toolFeedbackEchoTwo` to equal challenge token two, then succeed once both are present.
  - Notes: The `zod` contract check is the real renderer-safety gate. The fake validator is a workflow-control tool, not a full semantic validator. Its purpose is to verify that the skill reads tool feedback, applies corrections, and retries. Exit code `2` means validation failure; exit code `1` means operational failure.
- [ ] Task 8: Add skill workflow for site-data generation
  - File: `.github/skills/site-data-workflow-poc/SKILL.md`
  - Action: Create one Sprint 0 skill workflow that reads the seed content and persona content supplied by the bridge and returns candidate `site-data` content for a single attempt as one machine-readable JSON object, accepting `zod` contract failures and fake-validator feedback as structured prompt context on retries.
  - Notes: The bridge owns step-two `zod` execution, fake-validator execution, and attempt control. The skill must not pre-bake the correction values because they come from the per-run challenge file surfaced through fake-validator feedback, and the skill must not emit prose or markdown wrappers around the JSON candidate.
- [ ] Task 9: Add skill invocation bridge and dry-run orchestration
  - File: `scripts/run-site-data-workflow.ts` and `scripts/dry-run.ts`
  - Action: Create a dedicated bridge script that invokes `copilot --prompt` against the repository-local skill `.github/skills/site-data-workflow-poc/SKILL.md`, passing only the seed content, persona content, and repository-controlled `buildMarker` value, but not the prepared root path, target output path, challenge-file path, or token values. The bridge must write the candidate file, run the `zod` contract parser against the candidate file, invoke the fake validator against the candidate file and the challenge file only if the `zod` check succeeds, parse machine-readable failures, re-prompt the same skill with structured feedback when needed, and enforce the three-attempt envelope. Update `dry-run` to create the per-run challenge file, resolve the `buildMarker`, call that bridge, verify that `site-data/site-data.json` exists afterward, and end stdout with the exact line `PORTAL_DATA_ROOT=/absolute/path/to/root` for follow-up commands.
  - Notes: `dry-run` owns temporary-root lifecycle and root scaffolding. It does not start the dev server and does not perform the final build. On success it leaves the prepared root in place for explicit reuse by `build` and optional manual `dev`; on failure it removes the incomplete temporary root it created before exiting. The bridge must provide a mockable execution seam for automated tests so they can replace the live Copilot invocation, and `dry-run` must expose a documented selector such as `WORKFLOW_RUNNER_MODE=fake` or `--workflow-runner=fake` so tests can activate that seam without changing any other behavior.
- [ ] Task 10: Scaffold the Astro public engine
  - File: `astro.config.mjs`
  - Action: Configure Astro for static output, root base path `/`, and explicit generated-site-data consumption from `${PORTAL_DATA_ROOT}/site-data` only.
  - Notes: Hosting-provider-specific behavior is not implemented in Sprint 0.
- [ ] Task 11: Create shared layout and visible build marker
  - File: `src/layouts/BaseLayout.astro` and `src/lib/build-marker.ts`
  - Action: Add the base document shell and a small source-controlled build-marker helper whose exported value is the sole source of truth used by `dry-run` or the bridge during generation to populate the visible marker rendered from `site-data`.
  - Notes: The marker exists only to make local verification deterministic and easy to observe; runtime rendering must read the generated marker from `site-data`, not a separate direct import.
- [ ] Task 12: Create the initial delivery shell
  - File: `src/pages/index.astro` and `src/pages/[persona].astro`
  - Action: Add a minimal homepage and two persona pages proving the engine boots, reads `${PORTAL_DATA_ROOT}/site-data/site-data.json`, and renders the recruiter and technical-evaluator projections from the same generated file, with the homepage visibly rendering `buildMarker`.
  - Notes: This is a Sprint 0 shell, not the real product UI. The pages only need the minimum contract fields defined for Sprint 0 and must not infer fallback structure.
- [ ] Task 13: Add Sprint 0 verification tests
  - File: `tests/`
  - Action: Create unit tests for config/contracts, `zod` contract parsing, smoke checks for `dry-run`, fake-validator tests for the two prescribed errors plus operational failure, and build-oriented verification of the prepared-root contract.
  - Notes: Tests must prove that the workflow can succeed only by first satisfying the runtime `zod` contract and then integrating the fake-validator feedback, and that it fails after three attempts if those conditions are not met. Automated tests must use the bridge's mockable seam rather than requiring a live authenticated Copilot CLI session.
- [ ] Task 14: Document Sprint 0 command workflow
  - File: `docs/dry-run.md`
  - Action: Write the step-by-step instructions for clean install mode, `dry-run`, the bridge-controlled skill workflow, workflow step two `zod` contract checking, workflow step three fake validation, `build`, optional `dev` preview, temporary-root behavior, the `PORTAL_DATA_ROOT` handoff, cleanup, and expected outputs.
  - Notes: This document must include the exact command sequence, the exact final stdout line emitted by `dry-run`, the required `PORTAL_DATA_ROOT` export step, the expected generated files, and cleanup instructions so a fresh developer can execute Sprint 0 without consulting workflow history.

### Acceptance Criteria

- [ ] AC 1: Given a fresh clone of the repository, when the clean Sprint 0 install path `corepack enable && corepack use yarn@4 && yarn install --immutable` is executed, then dependencies install successfully and the documented Sprint 0 commands are available without manual repository restructuring.
- [ ] AC 1a: Given the clean Sprint 0 install path has completed successfully, when `yarn lint`, `yarn typecheck`, and `yarn test` are executed, then all three commands complete successfully under the documented Sprint 0 configuration.
- [ ] AC 2: Given no real production portal data are present, when `yarn dry-run` is executed, then the command creates a temporary `PORTAL_DATA_ROOT` outside the repository, performs internal root scaffolding from `samples-data/`, invokes only the repository-controlled bridge path `scripts/dry-run.ts` -> `scripts/run-site-data-workflow.ts` -> `copilot --prompt` referencing `.github/skills/site-data-workflow-poc/SKILL.md`, and does not require governed production content.
- [ ] AC 2a: Given automated tests or CI need deterministic execution, when `dry-run` is invoked with the documented fake-runner selector, then the command keeps the same temporary-root, `zod`, fake-validator, stdout, and cleanup contracts while replacing only the live Copilot runner with the fake workflow runner.
- [ ] AC 3: Given the committed workflow fixtures are present, when the bridge-controlled workflow begins, then it reads `PORTAL_DATA_ROOT/workflow-inputs/source/case-001.md`, `PORTAL_DATA_ROOT/workflow-inputs/personas/recruiter.json`, and `PORTAL_DATA_ROOT/workflow-inputs/personas/technical-evaluator.json`, requests candidate content from the single Sprint 0 skill, and writes candidate `site-data/site-data.json` for validation.
- [ ] AC 3a: Given a generation attempt is in progress, when the bridge calls the skill, then the skill input does not expose the prepared root path, target output path, challenge-file path, or challenge token values, and the skill response is a single machine-readable JSON object with no surrounding prose or markdown fences.
- [ ] AC 4: Given a candidate file is produced, when the bridge runs workflow step two, then the `zod` parser accepts only payloads matching the minimum Sprint 0 `site-data` contract and rejects non-conforming payloads before the fake validator is invoked.
- [ ] AC 5: Given `dry-run` has prepared a per-run challenge file and a candidate file passes the `zod` contract check, when the fake validator is first invoked against a candidate file that does not yet contain `toolFeedbackEchoOne`, then it fails with exit code `2` and a stdout JSON object requiring `toolFeedbackEchoOne` to equal the challenge file's first token.
- [ ] AC 6: Given the candidate file already contains the first token in `toolFeedbackEchoOne` and still satisfies the `zod` contract but does not yet contain `pages.recruiter.toolFeedbackEchoTwo`, when the fake validator is next invoked, then it fails with exit code `2` and a stdout JSON object requiring `pages.recruiter.toolFeedbackEchoTwo` to equal the challenge file's second token.
- [ ] AC 7: Given the file satisfies the `zod` contract and contains both required fake-validator corrections with exact values, when the fake validator is invoked, then it succeeds and the workflow stops retrying.
- [ ] AC 8: Given workflow step two or three returns a machine-readable failure, when the workflow continues, then the bridge parses that failure and re-prompts the same skill with that structured feedback rather than treating the previous output as final.
- [ ] AC 9: Given the workflow requires retries, when it runs, then it performs at most three generation attempts, exactly one `zod` contract check per generation attempt, and at most one fake-validator invocation per attempt only when the `zod` check succeeds, before either succeeding or failing explicitly.
- [ ] AC 10: Given the required fake-validator feedback has been integrated within three attempts and every accepted candidate passes the `zod` contract check, when `yarn dry-run` completes successfully, then `${PORTAL_DATA_ROOT}/site-data/site-data.json` exists and includes `site.title`, `pages.recruiter.headline`, `pages.recruiter.body`, `pages.technical-evaluator.headline`, `pages.technical-evaluator.body`, `buildMarker`, `toolFeedbackEchoOne`, and `pages.recruiter.toolFeedbackEchoTwo`, with the two feedback fields equal to the per-run challenge tokens rather than fixed literals.
- [ ] AC 11: Given the candidate file never satisfies the `zod` contract or the required fake-validator feedback is not integrated within the three-attempt envelope, when `yarn dry-run` exits, then it fails explicitly and removes the temporary root created by that invocation.
- [ ] AC 12: Given fake-validator inputs are missing, unreadable, or operationally invalid, when the fake validator runs, then it exits with code `1` and still emits a stdout JSON object containing at least `ok`, `code`, and `message`.
- [ ] AC 13: Given `yarn dry-run` has completed successfully, when the command exits, then the final stdout line is exactly `PORTAL_DATA_ROOT=/absolute/path/to/root`, the referenced root contains the normative fixture layout plus `site-data/site-data.json`, and that root remains available on disk until the developer explicitly removes it.
- [ ] AC 14: Given `yarn dry-run` is run multiple times, when each invocation succeeds, then each run creates a new unique temporary root rather than mutating a previously prepared root in place.
- [ ] AC 15: Given `yarn dry-run` has completed successfully, when the prepared `PORTAL_DATA_ROOT` value is exported into the environment and `yarn build` is executed, then the build succeeds by reading `${PORTAL_DATA_ROOT}/site-data/site-data.json`, produces two persona-specific pages, and the generated homepage HTML contains the exact `buildMarker` value resolved from `src/lib/build-marker.ts` and written into that file during generation.
- [ ] AC 16: Given `PORTAL_DATA_ROOT` is missing, points to an invalid path, or does not contain generated `site-data/site-data.json`, when `yarn build` begins, then the command fails fast with a clear validation error instead of inferring fallback data sources.
- [ ] AC 17: Given a fresh developer follows `docs/dry-run.md`, when they execute the documented Sprint 0 steps, then they can run the exact command sequence, understand workflow step one generation, step two `zod` contract checking, and step three fake validation, export `PORTAL_DATA_ROOT` exactly as documented, identify the expected generated files, and apply the documented cleanup steps without consulting workflow history.

## Additional Context

### Dependencies

- `astro` for the static public engine scaffold
- `zod` for runtime `site-data` contract validation before fake validation and renderer handoff
- `typescript` for strict shared contracts and app typing
- `@astrojs/check` or Astro-equivalent type validation support for framework-aware type checking
- `tsx` or equivalent TypeScript script runner for local helper execution without precompile friction
- `vitest` for unit and smoke-level Sprint 0 verification
- `eslint` plus Astro/TypeScript-compatible configuration for repository linting

### Testing Strategy

- Unit-test config parsing and minimal shared site-data contracts.
- Unit-test the `zod` contract parser so non-conforming candidate payloads fail before fake validation is attempted.
- Unit-test the fake validator so the first prescribed error is emitted until `toolFeedbackEchoOne` equals challenge token one.
- Unit-test the fake validator so the second prescribed error is emitted until `pages.recruiter.toolFeedbackEchoTwo` equals challenge token two.
- Unit-test the fake validator so missing or unreadable inputs produce exit code `1` and machine-readable stdout JSON.
- Add a smoke test for `dry-run` asserting creation of a temporary root, the exact prepared-root fixture layout, emission of the exact final stdout line `PORTAL_DATA_ROOT=/absolute/path/to/root`, invocation of the single bridge path, and generation of `site-data/site-data.json` inside the prepared root.
- Run the automated `dry-run` smoke path through the documented fake-runner selector rather than the live Copilot path.
- Assert that the generated Sprint 0 `site-data/site-data.json` includes the minimum required fields `site.title`, `pages.recruiter`, `pages.technical-evaluator`, `buildMarker`, `toolFeedbackEchoOne`, and `pages.recruiter.toolFeedbackEchoTwo`, and that the two feedback fields match the current run's challenge tokens.
- Assert that the generated `buildMarker` equals the value exported from `src/lib/build-marker.ts`.
- Verify repeated successful `dry-run` executions create distinct prepared roots.
- Verify that `build` consumes only `${PORTAL_DATA_ROOT}/site-data` and fails fast when that contract is not satisfied.
- Verify Astro static build succeeds after `dry-run` preparation.
- Verify that failed `dry-run` executions clean up incomplete temporary roots before exit.
- Verify the bridge does not invoke the fake validator if the candidate fails the `zod` contract check.
- Use the bridge's mockable seam for automated workflow tests, and perform one manual walkthrough with the live Copilot CLI path from clean clone to generated static artifact using `docs/dry-run.md`. Optional manual smoke may also verify `yarn dev` preview against a prepared root.

### Notes

This quick spec must produce a dependency-ordered, implementation-ready Sprint 0 plan that a fresh dev agent can execute without consulting workflow history.

High-risk items:
- drifting away from the selected single-package source-first topology and reintroducing reinstall-based workflows
- leaking production-data assumptions into the Sprint 0 temporary-root path
- breaking the explicit contract between `samples-data/`, temporary `PORTAL_DATA_ROOT`, the validation tool, and the Astro delivery layer
- silently introducing non-`PORTAL_DATA_ROOT` path resolution inside Astro or helper code
- overbuilding feature-layer UI or canonical-model depth before the foundation layer is proven

Known limitations:
- this Sprint 0 phase does not implement the full portal feature set
- `samples-data/` are intentionally minimal example data and do not represent a real portal-data workspace
- the fake validator is intentionally artificial and tests workflow feedback handling rather than real publication semantics
- no real hosting, CI/CD, or public publication is verified in this phase; only local static artifact viability is proven

Future considerations:
- evolve the minimum `zod` contract into a richer site-data runtime schema once the workflow control proof is complete
- expand site-data contracts once canonical field-level schemas are stabilized
- define a separate host-repository integration phase for editable-install behavior if the engine is later consumed from outside this repository
- define a separate post-Sprint-0 phase for publishing a minimal showcase site derived from `samples-data/`, without coupling that step to real HyperCV readiness
- add search, bilingual routing, analytics, and release-governance depth only after the Sprint 0 chain is proven
