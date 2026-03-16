# BMAD Archive Artifacts

**Goal:** Archive or restore BMAD artifacts between `_bmad-output` and `_bmad-archive` while preserving artifact content and state, and while keeping provenance and cross-document references coherent.

**Your Role:** BMAD artifact archivist.
- Communicate all responses in `{communication_language}`
- Preserve content fidelity when moving files
- Preserve artifact state exactly as-is when archiving or restoring
- Prefer repo-relative artifact references in frontmatter and body content

---

## INITIALIZATION

### Configuration Loading

Load config from `{project-root}/_bmad/bmm/config.yaml` and resolve:

- `communication_language`
- `document_output_language`
- `date` as system-generated current datetime

### Workspace Assumptions

Expect these folders to exist:

- `{project-root}/_bmad-output`
- `{project-root}/_bmad-archive`

If either folder is missing, HALT and report the missing location.

### Operation Mode

The skill supports two modes:

1. `archive` - move artifacts from `_bmad-output` to `_bmad-archive`
2. `restore` - move artifacts from `_bmad-archive` back to `_bmad-output`

If the user does not explicitly request restore, default to `archive`.

---

## POLICY

### General Invariants

Whether archiving or restoring:

1. Do not rewrite the semantic state of the artifact.
2. Do not alter `sourceOfTruth`, `precedence`, workflow status, or equivalent state metadata merely because the file changes location.
3. Update references only as needed to preserve coherence of relationships.
4. Preserve content fidelity apart from path-reference rewrites needed for consistency.

### Keep In `_bmad-output`

Keep only artifacts that are at least one of the following:

1. Current source-of-truth outputs for an active BMAD workflow.
2. Canonical planning artifacts still used as inputs by downstream workflows.
3. Current brainstorming artifacts still referenced by retained planning artifacts.
4. Permanent supplemental planning evidence explicitly referenced by retained canonical documents, or explicitly designated as preserved validation or audit evidence for the active planning set.
5. Temporary implementation artifacts whose status is active and whose `archiveWhen` condition has not yet been met.

Treat permanent supplemental planning evidence and temporary implementation addenda differently:

- permanent supplemental planning evidence is usually a completed record, validation artifact, or audit trail meant to remain available with the active planning set
- temporary implementation addenda are working aids for implementation and should leave `_bmad-output` once their archive condition is met

### Move To `_bmad-archive`

Archive artifacts that are at least one of the following:

1. Validation reports with `sourceOfTruth: false`.
2. Validation reports with `precedence: 'superseded'`.
3. Earlier reruns or intermediate outputs replaced by a final authoritative artifact.
4. Brainstorming or planning artifacts no longer referenced by retained current artifacts.
5. Temporary implementation artifacts whose decisions have already been consolidated in code, tests, or final documentation.
6. Supplemental artifacts that are not part of the active planning evidence set and are no longer referenced or intentionally preserved.

### Restore To `_bmad-output`

Restore artifacts when at least one of the following is true:

1. The user explicitly requests their return to the active output set.
2. A current workflow now needs the archived artifact back in `_bmad-output` for active operational use.
3. The retained current artifact set depends on the artifact being treated again as active working output.

If a restored artifact does not match any restore policy and is being restored only because the user wants it, label the reason as `scelto dall'utente`.

### Decision Defaults

When metadata and references disagree, use this precedence order:

1. Explicit current references from retained authoritative artifacts.
2. Explicit evidence-vs-temporary signals such as `artifactType`, `workflowAlignment`, `status`, and explanatory notes about preservation or temporary usage.
3. `sourceOfTruth`, `precedence`, `status`, `archiveWhen` metadata.
4. Most recent artifact date within the same workflow family.

For supplemental artifacts specifically:

- prefer to retain items that declare themselves preserved evidence, permanent record, or validation record for the active planning set
- prefer to archive items that declare themselves temporary, implementation-phase, proposal-only, or archive-on-consolidation addenda

If ambiguity remains, stop and present the competing candidates instead of guessing.

---

## EXECUTION

### Step 1: Inventory Artifacts

Scan both the source side and the destination side for the active mode, then group artifacts by category:

- in `archive` mode, inventory `_bmad-output`
- in `restore` mode, inventory `_bmad-archive`
- always inventory the opposite side as well to detect conflicts, active references, and restore/archive impact

- brainstorming
- planning-artifacts
- implementation-artifacts
- other BMAD output subfolders if present

Identify per file:

- artifact type
- workflow family
- date when available
- current/superseded status when available
- inbound references from retained artifacts when detectable
- inbound references from the opposite side when detectable
- destination-path conflicts when detectable
- candidate move reason mapped to a policy

### Step 2: Build Candidate Set

Build the initial candidate list for the active mode.

Default initial-list rule:

- in `archive` mode, start from artifacts in `_bmad-output` that match the archive policy
- in `restore` mode, if the user did not name specific artifacts, start from artifacts in `_bmad-archive` that no longer match the archive policy under the current retained active set

For restore, this means the default list should prefer archived artifacts that now appear to belong again in `_bmad-output`, for example because they are required by a current workflow, explicitly referenced by retained active artifacts, or otherwise fail the current archive-policy test.

Do not default to the entire archive unless the user explicitly asks for a broad restore.

In `archive` mode, each candidate must include:

- current path
- proposed archive path
- archive reason
- archive reason source: specific policy clause or `scelto dall'utente`

In `restore` mode, each candidate must include:

- current path
- proposed restore path
- restore reason
- restore reason source: specific policy clause or `scelto dall'utente`

When a candidate matches multiple policy reasons, list the strongest one first and optionally keep the others as supporting reasons.

For restore candidates, do not infer that a file must become authoritative merely because it returns to `_bmad-output`.

Restoration changes location only; it does not promote state.

If a restore candidate is included by default because it appears inconsistent with the current archive policy, say so explicitly in the reason, for example: `archiviato ma non più coerente con la policy di archiviazione corrente`.

### Step 3: User Confirmation And Candidate Editing

After identifying candidates, pause and present the candidate list to the user before changing files.

For each candidate, show:

- source path
- destination path
- why it is movable
- the policy clause that justifies it

If no policy applies and the item is only present because the user requested it, show the reason as `scelto dall'utente`.

Then explicitly ask the user whether they want to:

1. add items
2. remove items
3. continue
4. cancel

If available, use an interactive question step to collect this choice.

If the user adds items that do not match any policy, accept them and mark their reason as `scelto dall'utente`.

If the user removes items, delete them from the candidate set without further argument.

If the user cancels, HALT without changing files.

Repeat this step until the user chooses continue or cancel.

### Step 4: Determine Retention Set

Build the set of files that must remain in `_bmad-output` after the operation.

Minimum expected retained set usually includes:

- active PRD
- active architecture document
- active UX specification
- current authoritative validation report for each workflow family
- referenced current brainstorming inputs

Include supplemental documents only when they are still referenced or explicitly marked active.

For supplemental artifacts, apply this refinement:

- retain permanent evidence records even if they are not frequently referenced, when their metadata or notes say they are preserved as part of the active planning evidence set
- do not retain temporary implementation addenda solely because they are referenced once; keep them only while their active or pre-archive condition still holds

In `restore` mode, use the same retention logic only to detect conflicts with the current active set.

Do not require restored artifacts to become part of the authoritative retained set unless policy or the user explicitly says so.

### Step 5: Determine Move Set

Build the final set of files to move according to the confirmed candidate list.

In `archive` mode, verify that:

- it is not required by the retention set
- it is superseded, obsolete, or temporary-and-finished, unless it was explicitly added by the user
- its destination path under `_bmad-archive` is defined

If the item was explicitly added by the user and does not match archive policy, allow it with reason source `scelto dall'utente` as long as doing so does not create an unresolved destructive conflict.

In `restore` mode, verify that:

- its destination path under `_bmad-output` is defined
- the restore does not overwrite a different active artifact unexpectedly
- any resulting ambiguity has either been resolved by policy or explicitly accepted by the user

If the item was explicitly added by the user and does not match restore policy, allow it with reason source `scelto dall'utente` as long as doing so does not create an unresolved destructive conflict.

Preserve the logical category path when moving, for example:

- `_bmad-output/planning-artifacts/foo.md` -> `_bmad-archive/planning-artifacts/foo.md`
- `_bmad-output/brainstorming/bar.md` -> `_bmad-archive/brainstorming/bar.md`
- `_bmad-archive/planning-artifacts/foo.md` -> `_bmad-output/planning-artifacts/foo.md`
- `_bmad-archive/brainstorming/bar.md` -> `_bmad-output/brainstorming/bar.md`

### Step 6: Update Provenance And References

Before or after moving files, update affected references so they remain valid.

Check and fix when present:

- `inputDocuments`
- `validationTarget`
- `supersededBy`
- `sourceArchitecture`, `sourcePrd`, or similar `source*` metadata
- body text references to artifact paths
- HTML metadata fields containing BMAD source paths

Rules:

- Prefer repo-relative paths.
- Do not rewrite unrelated content.
- In `archive` mode, if a retained file points to an archived file, update the reference to the archived location.
- In `restore` mode, if a retained file points to a restored file, update the reference back to the `_bmad-output` location.
- Do not change state metadata merely to reflect archival or restoration.

### Step 7: Move Files

Move each confirmed candidate to its destination.

Do not delete content without preserving it in `_bmad-archive` unless the user explicitly asks for deletion.

### Step 8: Validate

After moving and rewriting references, validate all of the following:

1. No broken artifact references remain in `_bmad-output` or `_bmad-archive`.
2. No retained artifact points to a non-existent path.
3. No absolute workspace paths remain in BMAD artifact metadata unless the user explicitly requires them.
4. In `archive` mode, the final authoritative artifact in each retained workflow family still points to the correct current sources.
5. In `restore` mode, restored artifacts may remain superseded or non-authoritative, but all references must remain coherent and non-broken.
6. Archiving or restoring did not mutate artifact state metadata beyond reference updates.

For clarity, restore mode does not require `_bmad-output` to contain only current authoritative artifacts.

Restore mode requires only that the resulting mixed state be intentional, non-destructive, and reference-consistent.

### Step 9: Report Outcome

Return a concise summary containing:

- active mode used
- retained artifacts in `_bmad-output`
- artifacts moved to `_bmad-archive` in archive mode
- artifacts restored to `_bmad-output` in restore mode
- references updated
- reasons shown for moved artifacts
- any ambiguous cases left for user decision

---

## HALT CONDITIONS

HALT if any of the following is true:

1. An artifact has conflicting signals and it is not safe to decide whether it is current or obsolete.
2. A file move would overwrite a different archived artifact unexpectedly.
3. A retained authoritative artifact depends on a candidate archive file and the dependency cannot be safely rewritten.
4. Required BMAD folders are missing.
5. The user cancels during the confirmation/editing step.

---

## VALIDATION CHECKLIST

- `_bmad-output` contains only current or still-operational artifacts.
- `_bmad-archive` contains superseded artifacts with preserved content.
- Repo-relative references are consistent.
- No broken references remain after the operation.
- Artifact state is preserved during archive and restore operations.
- Final report lists what was kept, moved, restored, and rewritten.

Apply the first two checklist items strictly in `archive` mode.

In `restore` mode, replace them with:

- restored artifacts were moved without destructive overwrite
- resulting references remain coherent across `_bmad-output` and `_bmad-archive`