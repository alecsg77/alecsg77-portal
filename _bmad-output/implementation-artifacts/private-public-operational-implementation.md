# Proposta Tecnica Operativa: Esecuzione Public Code + Private Data

## Obiettivo operativo

Rendere eseguibile il modello architetturale aggiornato senza ambiguita:

- il codice della pipeline resta nel repository pubblico
- i dati reali e tutte le classi di contenuto di produzione restano nel dominio privato
- l'elaborazione reale avviene in un workspace privato composto
- l'unico output che attraversa il boundary runtime pubblico e' il package statico deployabile

Questa proposta e' pensata come assetto MVP plausibile e implementabile senza introdurre una seconda codebase.

## Modello dati operativo da supportare

Il modello finale da rispettare e' questo:

- `raw` come input effimero di ingestione
- `deep-knowledge` come primo livello persistito, append-only e immutabile
- `knowledge-base-dk` e `knowledge-base-manual` come sottoclassi private gestite separatamente
- vista logica unificata della knowledge base per la generazione HyperCV
- `hypercv-draft` come layer di contributi draft
- `hypercv-composition` come layer separato di convergenza e pinning delle revisioni
- `hypercv-final` come contenuto canonico privato materializzato
- `site-data` come projection privata del web, rigenerabile e mai editata a mano
- `static-site` come unico output pubblico di produzione

Regola chiave: il sito deve consumare `site-data`, non `hypercv-final` e non la logica interna di composition.

## Decisione tecnica raccomandata

Usare due checkout affiancati nello stesso workspace privato, non un submodule come meccanica primaria.

Layout raccomandato su computer o runner privato:

```text
workspace/
  portal-code/      # clone del repository pubblico
  portal-private/   # clone del repository privato o directory mountata privata
  portal-runtime/   # output effimeri locali ignorati da git
```

Motivo:

- il repo pubblico resta pulito e dimostrabile
- il dominio privato non ingloba la codebase pubblica come dipendenza Git fragile
- il boundary resta leggibile anche per il team
- la pipeline puo essere eseguita da locale o da secure runner con la stessa semantica

## Variante operativa: submodule privato

Il submodule resta tollerabile solo come bootstrap del workspace:

```text
portal-code/
  .git/
  .gitmodules
  private-data/   # submodule verso il repository privato
```

Questa variante e' accettabile solo se:

1. il team controlla entrambi i repository
2. il repo privato non contiene fork logici del codice pubblico
3. il submodule serve solo a fornire un path stabile ai dati privati
4. la pipeline continua a supportare `PRIVATE_DATA_ROOT` arbitrario
5. la governance resta nei gate applicativi e nei manifest, non nello stato Git del submodule

Se il submodule inizia a rappresentare il boundary di sicurezza o la fonte di audit, diventa la scelta sbagliata.

## Contratto operativo tra pubblico e privato

Il repo pubblico deve assumere solo questo contratto esterno:

- esiste una root privata leggibile via filesystem
- da quella root puo leggere solo cartelle attese e file con schema noto
- tutta l'uscita della pipeline privata viene scritta nel dominio privato o in una directory runtime effimera
- il deploy pubblico consuma solo il package statico validato

Variabili minime:

```bash
PRIVATE_DATA_ROOT=../portal-private
PIPELINE_MODE=showcase|private
PIPELINE_RUNTIME_DIR=../portal-runtime
PUBLIC_CODE_SHA=<sha del commit pubblico usato>
```

## Schema concreto di cartelle e file

### Dominio pubblico del codice

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

Semantica:

- il repo pubblico contiene solo codice, configurazione e fixture safe
- non contiene dati reali, `hypercv-final` di produzione o `site-data` di produzione
- le fixture sanitized devono simulare il contratto privato abbastanza bene da supportare showcase e test

### Dominio privato dei dati

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

Semantica:

- `deep-knowledge` non e rigenerabile e non e un cache layer
- `knowledge-base/dk` e rigenerabile dalla deep knowledge
- `knowledge-base/manual` e persistita e non deve essere sovrascritta dal reprocessing
- `hypercv-draft` puo contenere contributi parziali
- `hypercv-composition` governa la convergenza e le revisioni approvate da usare
- `hypercv-final` e la source of truth privata per pubblicazione e riuso
- `site-data` e una projection privata web-specialized e non deve essere modificata a mano

### Directory runtime effimera

```text
portal-runtime/
  tmp/
  logs/
  diffs/
  previews/
```

Questa directory non fa parte della governance dei dati. Serve solo per artefatti effimeri, debug locale e staging temporaneo.

## Naming e contratti minimi dei file

Regole minime:

- gli artifact ID devono essere stabili e in kebab-case
- tutte le classi HyperCV devono esporre `artifact_id` e `revision`
- le composition devono referenziare in modo esplicito le revisioni approvate che materializzano
- i final devono essere materializzati, non ricostruiti implicitamente leggendo draft e composition durante il rendering

Esempio minimale di composition:

```yaml
artifact_id: ai-distillation-pipeline
artifact_type: cv-star
revision: 20260316093000
kb_revision: 20260315062000
manual_revision: 20260316091000
strategy: explicit
status: approved
```

Esempio minimale di final:

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

Esempio minimale di nodo `site-data`:

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

## Modalita di esecuzione

### 1. Showcase mode

Scopo: demo pubblica, sviluppo frontend, test ripetibili.

Input:

- `fixtures/sanitized/private-domain/`
- `fixtures/sanitized/site-data/`

Comando:

```bash
npm run pipeline:showcase
```

Effetto:

- esegue la pipeline solo su fixture sanitize
- non richiede accesso al repo privato
- deve funzionare su qualsiasi clone pubblico

### 2. Private mode

Scopo: authoring reale, validazione e rilascio.

Input:

- `PRIVATE_DATA_ROOT`

Valori tipici:

- `../portal-private` nel modello a checkout affiancati
- `./private-data` nel modello a submodule

Comando:

```bash
PRIVATE_DATA_ROOT=../portal-private \
PIPELINE_RUNTIME_DIR=../portal-runtime \
npm run pipeline:private
```

Effetto:

- esegue la pipeline pubblica sui dati privati
- scrive intermedi solo nel dominio privato o nel runtime effimero
- fallisce subito se il path privato non e presente o contiene classi inattese

## Script npm raccomandati

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

Responsabilita di `run-pipeline.ts`:

1. leggere config e mode
2. risolvere il data root corretto
3. eseguire i passi `ingest -> distill -> build-kb -> draft -> composition-check -> final -> site-data`
4. scrivere artifact nel target coerente con la mode
5. emettere un manifest macchina-leggibile di esecuzione

## Workflow operativo completo

### Fase A: authoring e approvazione privata

1. L'operatore aggiorna i dati in `portal-private/raw/`.
2. Esegue `npm run pipeline:private` dal repo pubblico.
3. Gli output vengono aggiornati in `deep-knowledge/`, `knowledge-base/`, `hypercv/drafts/` e `site-data/` secondo le regole di stage.
4. La revisione umana approva o corregge draft, composition e final.

### Fase B: validazione di rilascio privata

1. Il sistema rileva composition stale rispetto alle revisioni referenziate.
2. Esegue gates:
   - schema validation
   - revision traceability
   - stale detection
   - publish eligibility
   - localization parity
   - leakage checks
   - secret scanning
3. Se tutto passa, genera:
   - `site-data` finale
   - search index
   - release evidence
   - package statico in `portal-private/release/deployable/<release-id>/`

### Fase C: deploy pubblico

1. Il package statico validato viene deployato su hosting/CDN.
2. Il dominio privato registra il riferimento di rilascio in `portal-private/manifests/releases/`.
3. Il repository pubblico non riceve dati di produzione; riceve solo eventuali cambi di codice, configurazione o fixture safe tramite normale workflow Git.

## Modello HyperCV da supportare

HyperCV e un catalogo CV gerarchico composto da:

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

Regole importanti:

- esiste revision log su `cv-experience`, `cv-project` e `cv-star`
- `hypercv-final` e privato e materializzato
- `hypercv-composition` e separato da `hypercv-final`
- `site-data` introduce lingua, percorsi, citation target e persona profiles pubblici

## Publish manifest minimo

Ogni rilascio dovrebbe emettere un manifest simile:

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

Questo manifest va mantenuto nel dominio privato; un estratto sanitizzato puo essere esportato nella release evidence pubblicabile se utile.

## Regole di implementazione importanti

1. Il repo pubblico non deve mai scrivere output intermedi sensibili nel proprio tree Git.
2. La pipeline privata non deve leggere da output pubblici deployati per ricostruire il workflow raw.
3. Ogni output pubblico deve essere riproducibile da `publicCodeSha + privateDataRevision + schemaVersion`.
4. I test automatici del repo pubblico devono usare solo fixture synthetic o sanitized.
5. Il codice pubblico deve degradare chiaramente quando `PRIVATE_DATA_ROOT` non e presente, non fallire in modo opaco.
6. Se cambia una revisione referenziata da una composition, il final derivato va trattato come stale fino a nuova review.

## Cosa implementerei per primo

Ordine consigliato:

1. `config/content-pipeline.ts` con supporto a `showcase` e `private` mode.
2. `scripts/pipeline/run-pipeline.ts` come orchestratore unico.
3. `scripts/pipeline/materialize-hypercv-final.ts` e `scripts/pipeline/build-site-data.ts`.
4. `scripts/pipeline/detect-stale-compositions.ts`.
5. `scripts/release/verify-no-private-leakage.ts`.
6. `scripts/release/build-publish-manifest.ts` e `scripts/release/build-static-package.ts`.
7. Una fixture sanitized completa per rendere il repo pubblico realmente dimostrabile.

## Proposta breve da portare al team

> Implementiamo il sistema con un'unica codebase pubblica e una sorgente dati privata separata. In locale o su runner sicuro la codebase pubblica viene eseguita contro il dominio privato tramite un workspace composto. Tutte le trasformazioni dati avvengono nel privato fino a `site-data`, e solo il package statico validato viene pubblicato nel runtime pubblico.