# Sprint 0 Dry Run

## Clean Install

From a fresh clone, use the Sprint 0 install path:

```bash
corepack enable
corepack use yarn@4.10.3
yarn install --immutable
```

In a non-privileged dev container, `corepack enable` can fail because it tries to write global symlinks. If Yarn 4.10.3 is already present, `corepack use yarn@4.10.3 && yarn install --immutable` is sufficient for the local repository setup.

## Dry Run

Execute the bounded workflow proof:

```bash
yarn dry-run
```

Supported workflow runner modes are `live` and `fake` only. `live` is the default when no mode is passed.

For deterministic automated testing, swap only the workflow runner implementation:

```bash
yarn dry-run --workflow-runner=fake
```

Any other `--workflow-runner` value fails fast with a clear validation error instead of silently falling back to `live`.

The command always creates a new temporary root outside the repository. It scaffolds exactly these files before generation:

```text
PORTAL_DATA_ROOT/workflow-inputs/source/case-001.md
PORTAL_DATA_ROOT/workflow-inputs/personas/recruiter.json
PORTAL_DATA_ROOT/workflow-inputs/personas/technical-evaluator.json
PORTAL_DATA_ROOT/site-data/validation-challenge.json
```

Then the bridge executes this bounded path:

```text
scripts/dry-run.ts -> scripts/run-site-data-workflow.ts -> copilot --prompt
```

Within each generation attempt:

1. Step one generates one candidate JSON object for `site-data/site-data.json`.
2. Step two runs the runtime `zod` contract check.
3. Step three runs the deterministic fake validator only if step two passed.

On retry attempts, the bridge does not ask the skill to regenerate from scratch blindly. It passes two explicit pieces of repair context back into the same skill invocation:

- the structured machine-readable validator feedback, including the exact `path` and `requiredValue` to write
- the full previous candidate JSON so the skill can preserve earlier valid fields and apply only the required correction

The workflow stops on success or after three attempts. If the run fails before a valid prepared root exists, the temporary root created by that invocation is deleted.

On success, the final stdout line is exactly:

```text
PORTAL_DATA_ROOT=/absolute/path/to/root
```

Use only that final line as the handoff contract.

## Build And Preview

Export the emitted value and build the static site:

```bash
export PORTAL_DATA_ROOT=/absolute/path/to/root
yarn build
```

Optional manual preview after a successful dry run:

```bash
export PORTAL_DATA_ROOT=/absolute/path/to/root
yarn dev
```

`build` and `dev` read only `${PORTAL_DATA_ROOT}/site-data/site-data.json`. They do not fall back to repository-local sample data.

If `PORTAL_DATA_ROOT`, the `site-data` directory, or `site-data/site-data.json` is missing or unreadable, `build` and `dev` fail fast with a repository-owned error that tells you to run `yarn dry-run` again and export a valid root.

## Expected Outputs

After a successful run, the prepared root contains:

```text
PORTAL_DATA_ROOT/workflow-inputs/source/case-001.md
PORTAL_DATA_ROOT/workflow-inputs/personas/recruiter.json
PORTAL_DATA_ROOT/workflow-inputs/personas/technical-evaluator.json
PORTAL_DATA_ROOT/site-data/validation-challenge.json
PORTAL_DATA_ROOT/site-data/site-data.json
```

The generated `site-data/site-data.json` includes:

- `site.title`
- `pages.recruiter.headline`
- `pages.recruiter.body`
- `pages.technical-evaluator.headline`
- `pages.technical-evaluator.body`
- `buildMarker`
- `toolFeedbackEchoOne`
- `pages.recruiter.toolFeedbackEchoTwo`

The two tool-feedback echo fields must equal the per-run challenge tokens, not fixed literals.

## Cleanup

Sprint 0 leaves successful prepared roots on disk for explicit reuse.

Remove a prepared root when you are done with it:

```bash
rm -rf /absolute/path/to/root
```