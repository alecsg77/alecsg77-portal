# Proposta Operativa: Boundary Privato e Promotion Flow verso Canonical Pubblico

## Sintesi della decisione

La proposta raccomandata e' adottare un modello asimmetrico: il repository pubblico e' la codebase autorevole per pipeline, contratti, validazioni, publish workflow e frontend; il repository privato contiene solo dati sensibili, materiali raw e stato di lavoro non pubblicabile.

L'esecuzione reale della pipeline avviene in un workspace privato che combina:

- una revisione pinned del repository pubblico come codice eseguibile
- una sorgente dati privata come input

La promozione resta unidirezionale per i dati: dal privato al pubblico attraversano solo artifact canonical approvati, sanitizzati e validati. Il codice puo' invece fluire dal pubblico al privato, perche' e' proprio il motore pubblico a processare i dati sensibili.

Il brainstorming ha poi raffinato la natura degli artefatti gestiti:

- `raw-input` e' effimero e non persistito
- `deep-knowledge` e' la prima memoria persistita, append-only e non rigenerabile
- la knowledge base esiste come vista unificata di `knowledge-base-dk` e `knowledge-base-manual`
- `hypercv-candidates` sono rigenerabili e non canonici
- `editorial-resolution` e' persistita e canonica
- `hypercv-final` e' il documento pubblico materializzato
- `site-data` sono projection data derivate da `hypercv-final`

## Problema da risolvere

Servono due cose:

1. Un boundary operativo chiaro tra materiale privato e artifact canonical pubblicabili.
2. Un promotion flow che consenta di derivare artifact pubblici dal privato senza introdurre un flusso di ritorno di dati sensibili pubblico -> privato.

In piu', il codice della pipeline deve restare pubblico e dimostrabile come showcase, ma deve poter essere eseguito su dati privati reali senza assorbire quei dati nel repository pubblico.

## Pattern di riferimento

- Gatekeeper pattern: il passaggio tra i due domini e' mediato da un componente con privilegi limitati che valida e sanitizza.
- Artifact promotion: si promuovono output derivati e approvati, non il workspace sorgente intero.
- Public-code / private-data split: il codice puo' essere aperto e riusabile, mentre il boundary di sicurezza si applica alle classi di dato e ai permessi operativi.
- Trunk-based / short-lived branch sul repo pubblico: una volta promossi gli artifact, il repo pubblico resta il trunk operativo del dominio pubblico.
- Secrets detection pre-commit e in pipeline: il boundary non e' credibile se i secret possono entrare nella storia Git.

## Opzioni valutate

### 1. Monorepo con cartelle private e public

Pro:
- setup semplice
- un solo tooling

Contro:
- boundary debole: la separazione e' organizzativa, non architetturale
- alto rischio di leak accidentali
- difficile sostenere l'assunto "solo privato -> pubblico"

Verdetto: da scartare.

### 2. Repo privato con submodule del repo pubblico

Pro:
- sembra semplice perche' rende visibile il target pubblico dentro il privato
- facilita un export locale verso il working tree del repo pubblico

Contro:
- il submodule introduce forte accoppiamento operativo e fragilita' Git
- confonde il boundary: il target pubblico appare come parte del workspace privato
- rende piu' facile introdurre dipendenze indebite dal pubblico verso il privato
- non offre da solo sanitizzazione, validazione, o regole di promotion

Verdetto: utilizzabile solo come meccanica locale transitoria, non raccomandato come assetto target.

### 3. Repo pubblico per il codice + repo privato per i dati + export pipeline e PR sul repo pubblico

Pro:
- allinea il design con il requisito showcase: il codice resta pubblico
- boundary chiaro tra codebase pubblica e data source privata
- promotion flow unidirezionale per i dati
- audit trail completo: source revision privata, export manifest, PR/merge pubblica
- il repo pubblico resta autonomo e dimostrabile anche con fixture sanitize

Contro:
- richiede un po' di plumbing iniziale su pipeline e manifest
- impone disciplina sul contratto degli artifact e sul montaggio del workspace privato

Verdetto: raccomandato per l'MVP.

### 4. Bundle firmato dal privato e import nel pubblico

Pro:
- separazione ancora piu' forte
- ottimo per compliance e attestazioni future

Contro:
- maggiore complessita' operativa
- overhead non necessario per l'MVP se il team non ha gia' questa infrastruttura

Verdetto: ottima evoluzione successiva, non necessaria come primo passo.

## Modello raccomandato

### Topologia

- `repo-pubblico`: codebase autorevole per distillazione, normalizzazione, validazione, publish workflow, frontend e fixture showcase-safe.
- `repo-privato`: raw notes, working materials, dati sensibili, review material non pubblicabile, eventuale stato locale di authoring.
- `workspace-privato-di-esecuzione`: checkout del repo pubblico a una revisione pinned + accesso al repo privato o a una sua working copy.
- `promotion job`: processo eseguito nel contesto privato che usa il codice del repo pubblico, produce artifact pubblicabili e aggiorna il repo pubblico tramite PR.

### Boundary logico

Il boundary non e' tra due codebase equivalenti ma tra classi di dato. Tutto cio' che attraversa il confine dati deve essere:

1. esplicitamente ammesso da uno schema versionato
2. associato a uno stato di approvazione
3. sanitizzato da campi non pubblicabili
4. tracciato con provenance e manifest
5. validato prima di entrare nel repo pubblico

## Regole del boundary privato

1. Il repo pubblico e' la source of truth del codice di pipeline e dei contratti pubblicabili.
2. Il repo privato e' la source of truth dei dati sensibili: raw notes, working materials, prompt, appunti, review material, fonti non approvate e metadata riservati.
3. Il pubblico puo' essere input di codice per il privato; il privato non puo' essere input di dato grezzo per il pubblico.
4. Gli artifact esportabili devono essere derivati e dichiarati `publishable`, mai copiati in modo generico dal workspace privato.
5. Il contratto di export deve essere allowlist-based, non denylist-based: si esportano solo i campi ammessi.
6. Il repo pubblico non puo' contenere raw notes, campi di lavoro, commenti editoriali interni, riferimenti sensibili, secret, token, path interni o provenance non sanitizzata.
7. Ogni export deve essere riproducibile dalla coppia: revisione del repo pubblico + revisione privata dei dati + versione dello schema.
8. Ogni promotion deve fallire se trova secret, campi vietati, gap di localizzazione, stati non approvati o incoerenze di schema.

## Regole del boundary codice/dati

1. Il codice della pipeline vive nel repo pubblico e deve girare sia in showcase mode con fixture pubbliche sia in private mode con dati reali privati.
2. Il repo privato non deve contenere fork logici del codice pubblico, salvo configurazioni locali minime o bootstrap strettamente operativo.
3. L'esecuzione privata deve puntare a una revisione pinned del repo pubblico, cosi' ogni output e' attribuibile a un commit preciso del codice.
4. Il repo pubblico non deve assumere che i dati privati siano presenti nel tree Git; deve leggerli tramite path configurati, mount o checkout separato.
5. Nessuna trasformazione privata deve richiedere modifiche manuali persistenti al codice pubblico per funzionare su dati reali.

## Formato consigliato per il canonical artifact pubblico

Nota di convergenza: nel prosieguo del brainstorming il focus si e' spostato da un generico `canonical artifact` a una struttura piu esplicita per HyperCV e site-data. Il formato qui sotto resta utile come contratto minimo per artefatti pubblici, ma il modello di dominio finale e' stato raffinato in:

- `cv-experience`
- `cv-project`
- `cv-star`

con revision log obbligatorio sugli oggetti CV e contenuto finale STAR distinto da candidate ed editorial-resolution.

Usare artifact file-based, schema-versioned, con struttura minima simile a questa:

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

Regole importanti:

- `privateSourceRef` puo' esistere come riferimento tecnico, ma non deve rivelare percorsi, nomi interni o contenuto sensibile.
- Nessun campo libero tipo `notes`, `draft`, `internal_comments`, `source_excerpt_raw` deve essere presente nel formato pubblico.
- Gli artifact devono essere stabili e con ID duraturi, cosi' il repo pubblico puo' lavorare in modo indipendente sugli output generati.

## Promotion flow raccomandato

### Flusso standard

1. L'autore lavora nel repo privato sui materiali raw.
2. Il workspace privato checkouta il repo pubblico a una revisione pinned ed esegue la pipeline pubblica sui dati privati.
3. Il risultato della distillazione produce artifact canonical candidati nel contesto privato.
4. Un artifact passa a stato `approved` nel privato.
5. Il promotion job materializza solo gli artifact approvati in una workspace effimera del repo pubblico.
6. Il gatekeeper applica schema validation, leakage checks, secret scanning, publish eligibility, parity checks tra lingue e manifest generation.
7. Se tutto e' verde, il job apre una PR nel repo pubblico con soli artifact canonical e derivati ammessi.
8. La PR pubblica e' reviewable dal team del dominio pubblico/low-security.
9. Merge della PR su `main` del repo pubblico.
10. Il repo privato registra il riferimento dell'avvenuta promozione: `promotion_id`, `public_repo`, `public_commit_sha`, `public_code_sha_used_for_processing`.

### Modalita' di composizione del workspace privato

Le opzioni sane sono queste, in ordine di preferenza:

1. checkout separati affiancati: `public-code/` e `private-data/`
2. clone temporanea del repo pubblico dentro un workspace privato effimero
3. repo pubblico con submodule privato, usato solo come bootstrap del workspace
4. package/tool release del codice pubblico consumato dal privato

Il submodule e' quindi una variante praticabile, ma solo se resta confinato al bootstrap del workspace. Non deve diventare il cuore della governance, del boundary logico o dell'audit trail di promotion.

### Regola PR vs commit diretto

Per ora: PR di default.

Motivo:
- rende il confine osservabile dal team
- abbassa il rischio di publication accidentale
- crea un audit trail leggibile

Commit diretto su `main` del repo pubblico puo' essere introdotto solo piu' avanti, quando il gatekeeper sara' molto maturo e il rischio di leak sara' gia' stato abbassato con evidenza.

## Come si continua a lavorare nel repo pubblico

Il repo pubblico resta sempre il contesto di lavoro ordinario per:

- sviluppo della pipeline
- build del portale
- routing e rendering
- search indexing
- QA pubblica
- deploy statico

Nel contesto privato, lo stesso repo pubblico viene eseguito contro dati reali tramite composizione del workspace, non tramite copia dei dati nel repo.

Questo funziona se il codice pubblico e' progettato per leggere input privati esterni al proprio tree Git e se il repo pubblico resta eseguibile anche senza accesso a quei dati, usando fixture sanitize.

## Perche' evitare il ritorno pubblico -> privato

Il punto da preservare non e' evitare ogni uso del pubblico dentro il privato. Quello e' necessario e desiderabile, perche' il codice e' pubblico. Il punto e' evitare che dati sensibili o semantica raw ritornino nel pubblico senza passare per approvazione.

Se il pubblico iniziasse a contenere raw data o se il privato iniziasse a dipendere da canonical pubblici come sostituto della sorgente raw, il boundary collasserebbe: diventerebbe ambiguo dove nasce il significato e dove avviene la redazione.

La regola quindi e':

- dal pubblico al privato puo' fluire codice e configurazione pubblica
- dal privato al pubblico puo' fluire solo contenuto derivato, approvato e sanitizzato
- non deve esistere un ritorno di dati sensibili dal pubblico al privato per ricostruire il raw workflow

## Hardening minimo consigliato

1. Secret scanning pre-commit sul repo pubblico, sul repo privato e sul job di promotion.
2. Esecuzione privata su workspace composta o temporanea, non su copia persistente dei dati nel repo pubblico.
3. Allowlist esplicita dei file esportabili.
4. Manifest di release con hash file, schema version, code SHA pubblico usato per il processing, source refs privati e checks eseguiti.
5. Permessi distinti: chi puo' modificare raw privato non coincide necessariamente con chi puo' approvare la promotion pubblica.

## Decisione proposta al team

Proporrei questa formulazione:

> Manteniamo due repository separati. Il dominio privato resta la source of truth per materiale raw e distillazione; il dominio pubblico riceve solo artifact canonical approvati tramite una pipeline di promotion unidirezionale con gatekeeper, validazioni e PR di default. Il repo pubblico non rientra nel ciclo di authoring privato se non per metadata di audit della release.

Proporrei invece questa formulazione aggiornata:

> Manteniamo il repository pubblico come codebase autorevole della pipeline e del portale, cosi' il funzionamento resta ispezionabile e dimostrabile. Manteniamo il repository privato come sorgente dei dati sensibili e dei materiali raw. La pipeline pubblica viene eseguita in un contesto privato contro quei dati, ma nel repository pubblico entrano solo artifact canonical approvati tramite promotion governata, validazioni e PR di default.

## Passi successivi minimi

1. Definire l'interfaccia di esecuzione tra codice pubblico e dati privati: path, mount, config e revision pinning.
2. Definire lo schema `canonical artifact` v1 con allowlist campi.
3. Definire il `publish manifest` v1 includendo `public_code_sha_used_for_processing`.
4. Implementare il workspace privato di esecuzione che checkouta il repo pubblico e legge il repo privato senza assorbirlo nel tree pubblico.
5. Agganciare validazioni: schema, leakage, secret scan, locale parity.
6. Attivare promotion via PR sul repo pubblico.

La proposta implementativa concreta derivata da questa decisione e' documentata in `_bmad-output/implementation-artifacts/private-public-operational-implementation.md`.