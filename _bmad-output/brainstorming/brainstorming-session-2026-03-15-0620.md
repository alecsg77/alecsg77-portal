---
stepsCompleted: [1]
inputDocuments: []
session_topic: 'Boundary operativo tra dati canonici privati, engine pubblico e deploy statico; classi di dati, trasformazioni, validazione, HyperCV e promotion flow'
session_goals: 'Convergere su un modello dati e operativo plausibile per engine pubblico + dati canonici privati + deploy statico, con particolare attenzione a sicurezza, governabilita, review e publication safety'
selected_approach: 'AI-Recommended Techniques'
techniques_used: ['First Principles Thinking', 'Constraint Mapping', 'Cross-Pollination', 'Six Thinking Hats']
ideas_generated: ['Monorepo con cartelle private/public', 'Repo privato con submodule pubblico', 'Repo pubblico con clone operativo dei dati privati', 'Due repository separati con pipeline pubblica eseguita su dati privati', 'Candidate/editorial/final model per HyperCV']
context_file: ''
---

# Brainstorming Session Results

**Facilitator:** Alessio
**Date:** 2026-03-15

## Session Overview

**Topic:** Boundary operativo tra dati canonici privati, engine pubblico e deploy statico; classi di dati, trasformazioni, validazione, HyperCV e promotion flow.
**Goals:** Convergere su un modello dati e operativo plausibile per engine pubblico + dati canonici privati + deploy statico, con particolare attenzione a sicurezza, governabilita, review e publication safety.

### Session Setup

Il brainstorming e' partito da una domanda architetturale sulla promotion privata -> pubblica, ma si e' progressivamente spostato su un modello piu' profondo: classi di dati, trasformazioni tra classi, validatori, boundary di sicurezza, ruolo del repository pubblico, ruolo della parte privata, e struttura dell'HyperCV come artefatto canonico privato da cui derivare il sito pubblico statico.

L'approccio usato e' stato divergente all'inizio e progressivamente convergente. La parte finale della conversazione ha consolidato decisioni operative e semantiche abbastanza stabili da poter essere usate come fonte primaria per una successiva architecture review.

## Decision Summary

### 1. Modello repository e boundary pubblico/privato

Decisione:

- Il repository pubblico e' la codebase autorevole per pipeline, contratti, validazioni, publish workflow e frontend.
- Il dominio privato contiene tutti i dati reali, i materiali di lavoro, il contenuto canonico e gli artefatti intermedi.
- Il boundary di sicurezza si applica ai dati, non al codice.

Motivazione:

- Il codice della pipeline deve restare pubblico per ragioni di showcase e ispezionabilita.
- I dati reali devono poter essere processati dal motore pubblico senza entrare nel repository pubblico.
- Il rischio principale non e' che il codice pubblico sia visibile, ma che i dati canonici o le loro projection sorgente siano facilmente replicabili o attraversino il confine senza controllo.

Conseguenze operative:

- Dal pubblico al privato puo' fluire codice.
- Dal privato al pubblico possono fluire solo artefatti di deploy statico derivati, approvati e sanitizzati.
- Il ritorno di dati sensibili o raw dal pubblico al privato non deve diventare parte del workflow.

Decisione aggiuntiva maturata a fine brainstorming:

- Il repository pubblico non deve contenere i dati reali del sito, neppure quando quei dati descrivono contenuto pubblicabile.
- Il repository pubblico deve distribuire un engine riusabile; il repository privato resta il luogo in cui i dati reali vengono trasformati in output statico deployabile.
- Il contenuto pubblico online resta copiabile in quanto pubblicato, ma non e' necessario pubblicarne anche le sorgenti strutturate e i layer canonici.

### 2. Workspace privato di esecuzione

Decisione:

- Il workspace privato di esecuzione puo' essere composto operativamente in piu' modi.
- L'architettura target e' che il repository privato consumi il motore pubblico come dipendenza installabile.
- In sviluppo locale resta valido usare checkout affiancati di repository pubblico e repository privato per evitare di ripubblicare il package a ogni modifica.

Motivazione:

- Il processo deve dipendere da un contratto di esecuzione tra motore pubblico e dati privati, non da un meccanismo Git specifico.
- Il submodule e' tecnicamente possibile ma introduce metadata pubblici del repo privato, maggiore complessita' Git e piu' rischi di uso improprio.
- Un workspace locale con checkout affiancati soddisfa il requisito di sviluppo senza introdurre una dipendenza Git formale nel repository pubblico.

Vincolo di sicurezza:

- La presenza di checkout o mount locali del repository dati nel workspace di sviluppo non li rende pubblici.
- La protezione reale resta basata sui permessi del repository o storage privato e sulle credenziali dei workflow che lo leggono.

Varianti operative considerate:

1. package/tool pubblico consumato dal repository privato in automazione
2. checkout separati affiancati di repo pubblico e repo privato nello sviluppo locale
3. submodule del repo privato dentro il pubblico, tollerato solo come bootstrap locale

Conclusione:

- il processo deve dipendere da un contratto stabile tra engine pubblico e repository dati privato, non da una dipendenza Git formale
- il submodule non e' il boundary di sicurezza e non deve diventare il cuore della governance

### 3. Input raw

Decisione:

- I dati raw non sono una classe persistita del sistema.
- Sono input effimeri di ingestione, opzionali e transitori.

Motivazione:

- Non ha senso trattarli come patrimonio stabile del sistema.
- Non ha senso investirci in lineage forte, versioning o validazione semantica estesa.
- Il sistema inizia davvero a prendersi responsabilita persistite dal livello deep knowledge in poi.

Conseguenze:

- I raw hanno solo ingestion checks minimi, non veri class validators.
- Il passaggio `raw -> deep-knowledge` va pensato come ingestione, non come trasformazione tra due classi persistite equivalenti.

### 4. Classi di dati private

Nota strutturale importante:

- il modello distingue tra `classi` e `sottoclassi`
- le regole di classe si applicano a tutte le sottoclassi di quella classe
- le regole di sottoclasse raffinano o restringono il comportamento della classe padre

Classi e sottoclassi private consolidate:

- classe privata persistita `deep-knowledge`
- classe privata `knowledge-base`
	- sottoclasse `knowledge-base-dk`
	- sottoclasse `knowledge-base-manual`

Decisioni di classe e sottoclasse:

- `deep-knowledge`
	- persistita
	- append-only
	- immutabile
	- non rigenerabile

- `knowledge-base-dk`
	- generata dalla deep knowledge
	- rigenerabile
	- non modificabile direttamente senza rischio di perdere i cambiamenti al riprocessamento

- `knowledge-base-manual`
	- creata e modificata manualmente
	- persistita e versionabile
	- mai toccata dal riprocessamento della deep knowledge

Motivazione:

- La deep knowledge non e' una cache: e' memoria ricca privata consolidata.
- La knowledge base serve sia come derivato curato della deep knowledge sia come punto di ingresso di conoscenza manuale gia' pronta.
- Separare KB generata e KB manuale evita ambiguita' su cosa sia sovrascrivibile e cosa no.

Punto importante:

- La distinzione tra `knowledge-base-dk` e `knowledge-base-manual` smette di essere rilevante nella generazione di HyperCV e delle projection successive.
- Per i passi successivi esiste una vista logica unica della knowledge base, indipendentemente dalla sorgente.

### 5. Classi di dati derivate per HyperCV e sito

Classi e sottoclassi derivate consolidate:

- classe derivata privata `hypercv-draft`
	- draft KB per `cv-experience`, `cv-project`, `cv-star`
	- draft manuali per `cv-experience`, `cv-project`, `cv-star`
- classe privata separata `hypercv-composition`
	- composition per `cv-experience`, `cv-project`, `cv-star`
- classe canonica privata `hypercv-final`
	- `cv-experience`
	- `cv-project`
	- `cv-star`
- classe derivata privata `site-data`

Decisioni di classe e sottoclasse:

- `hypercv-draft`
	- famiglia di artefatti di draft per HyperCV
	- puo' contenere contributi KB e contributi manuali, anche parziali
	- i draft KB sono derivati dalla knowledge base; i draft manuali sono inseriti o corretti manualmente
	- non e' canonica
	- la persistenza e' utile per review, confronto e rigenerazione controllata

- `hypercv-composition`
	- classe separata dai draft
	- contiene le regole di convergenza tra contributi draft e i riferimenti alle revisioni approvate
	- puo' essere esplicita oppure implicita tramite i default del modello
	- diventa esplicita ogni volta che partecipa una sorgente KB o quando la convergenza non e' banale

- `hypercv-final`
	- contenuto canonico finale in formato CV/STAR
	- persistito e materializzato nel dominio privato
	- sorgente canonica della projection verso il sito
	- non deve mescolare al proprio interno logiche di draft o composition

- `site-data`
	- projection data per il sito statico
	- mai modificata a mano
	- rigenerabile
	- persistita solo come cache/materialization quando utile per build, DevOps e deploy
	- contiene i persona profiles pubblici e i path model derivati da essi

Motivazione:

- Serve separare chiaramente contenuto canonico privato, contributi draft, regole di composizione, projection per il web e output pubblico finale.
- Il sito statico deployato non deve coincidere con i layer sorgente del contenuto.

### 6. Trasformazioni tra classi

Decisioni:

1. `raw -> deep-knowledge`
	Tipo: ingestione / normalizzazione.
	Regola: e' ammesso ripulire rumore formale e ristrutturare; non e' ammessa perdita di significato rilevante.

2. `deep-knowledge -> knowledge-base-dk`
	Tipo: distillazione.
	Regola: si sintetizza, si deduplica, si rende LLM-friendly, si prova a rimuovere ridondanza e sensibilita; il processo deve poter essere rieseguito nel tempo.

3. `knowledge-base (vista unificata) -> hypercv-draft`
	Tipo: generazione di draft KB.
	Regola: si producono contributi draft derivati dalla knowledge base, anche parziali, destinati alla successiva convergenza editoriale.

4. `hypercv-draft + hypercv-composition -> hypercv-final`
	Tipo: materializzazione editoriale.
	Regola: il contenuto finale va generato esplicitamente a partire da draft e composition; non va dedotto informalmente e non va usato come contenitore di logica interna.

5. `hypercv-final -> site-data`
	Tipo: proiezione tecnica.
	Regola: si genera tutto da zero o comunque senza modifiche manuali dei site-data; qui nascono la doppia lingua, i persona profiles pubblici, le citation navigabili e la verticalizzazione per percorsi del sito.

6. `site-data -> static-site`
	Tipo: rendering statico.
	Regola: l'output pubblico e' il pacchetto statico deployato, non i dati sorgente o intermedi.

Regola trasversale di boundary:

- tutti i passaggi dal dominio dati privato all'output pubblico deployato devono essere allowlist-based, non denylist-based
- la publication safety deve essere verificata prima che un artefatto possa contribuire all'output pubblico statico

### 7. Validatori

Decisioni:

- I validatori veri partono da `deep-knowledge` in poi.
- Per i raw ci sono solo ingestion checks minimi.
- Per le classi persistite servono almeno questi domini validativi:
	- structure
	- lineage
	- safety
	- semantic-quality
	- consistency
	- publication-readiness

Principi di design:

- I validator non devono essere duplicati per classe se la stessa logica puo' essere riutilizzata.
- I validator appartengono a domini di controllo riusabili, non a una singola classe concreta.
- Ogni classe dichiara quali domini e quali validator riusabili sono pertinenti per i propri artefatti.
- Una pipeline puo' riusare gli stessi validator su classi diverse, applicandoli dove il dominio e' rilevante.
- La validazione e' separata dalla transformation e dalla promotion: descrive lo stato di un artefatto, non decide da sola il passaggio di pipeline.

Modello di output dei validator:

- I validator producono osservazioni diagnostiche, non severita operative.
- Ogni osservazione deve avere almeno un `code` stabile usato dalle policy e un'identita confrontabile nel tempo.
- Le policy di pipeline devono lavorare sui `code`, non sugli `observation_id`.
- Lo stesso `code` puo' essere emesso da rule diverse se rappresenta la stessa categoria semantica di problema per le policy.
- Una rule che non trova la condizione che controlla non emette nulla.

Modello di governance delle osservazioni:

- Le severity operative come `blocking`, `non-blocking` o equivalenti non fanno parte del validator: derivano dalla policy del contesto che consuma le osservazioni.
- Le suppression sono parte del design del sistema di validazione e devono poter agire a granularita diverse.
- L'identita di un'osservazione deve essere sufficientemente semantica da permettere confronto tra report e suppression mirate.
- Il formato esatto dell'`observation_id` e i dettagli di serializzazione sono decisioni implementative da rinviare.

Ruolo delle pipeline:

- Le pipeline automatiche verificano che l'input soddisfi le precondizioni richieste dalla trasformazione.
- Dopo la trasformazione, le pipeline rieseguono i validator pertinenti sulla classe di destinazione.
- La promotion non va usata come sinonimo generico di trasformazione: resta un concetto di governance applicato solo ai passaggi che alzano il livello di responsabilita, canonicalita o visibilita.

Linee guida della matrice per classe:

- `deep-knowledge`: privilegia `structure`, `lineage`, `safety`, `consistency`; `semantic-quality` resta utile ma non definisce da sola la validita del layer.
- `knowledge-base-dk` e `knowledge-base-manual`: richiedono soprattutto `structure`, `lineage`, `consistency`, `safety`; `semantic-quality` diventa piu rilevante per il valore editoriale dell'output.
- vista logica `knowledge-base`: deve essere validata come risultato di integrazione, quindi con forte enfasi su `lineage` e `consistency`.
- `hypercv-draft`: richiede validazioni che aiutino review e consolidamento; `publication-readiness` puo' essere osservata ma non e' ancora il criterio dominante.
- `hypercv-composition`: richiede validazioni orientate a coerenza, tracciabilita delle revisioni referenziate e preparazione alla materializzazione finale.
- `hypercv-final`: richiede tutti i domini rilevanti, inclusi quelli legati alla readiness per projection e deploy statico.
- `site-data`: richiede soprattutto controlli su integrita della projection, tracciabilita verso `hypercv-final` e assenza di leakage.

Linee guida per le sottoclassi HyperCV:

- `cv-experience`, `cv-project` e `cv-star` ereditano i domini del layer in cui vivono.
- Le sottoclassi possono aggiungere validator specifici del proprio ruolo catalografico senza introdurre una tassonomia separata.
- Le rule specifiche di sottoclasse andranno raffinate durante l'implementazione e le review reali, non chiuse in anticipo in questo brainstorming.

Conseguenza pratica:

- La matrice dei validator va intesa come guida architetturale sui domini di controllo attesi per classe e sottoclasse.
- Il catalogo concreto delle rule verra' affinato progressivamente quando emergeranno problemi reali da automatizzare.

### 8. HyperCV come catalogo CV, non solo come raccolta di STAR isolate

Decisione:

- HyperCV deve mantenere la natura di CV catalogato.
- La struttura finale non e' solo un elenco di documenti STAR indipendenti.
- Serve una gerarchia catalografica esplicita.

Catalogo deciso:

1. `cv-experience`
	Campi minimi obbligatori:
	- `experience_id`
	- `kind`
	- `label`
	- `role_label`
	- `period_from`
	- `summary`
	- `policy`

2. `cv-project`
	Campi minimi obbligatori:
	- `project_id`
	- `experience_id`
	- `label`
	- `summary`
	- `policy`

3. `cv-star`
	Campi minimi obbligatori:
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

Relazioni:

- una `cv-experience` contiene `1..n` `cv-project`
- un `cv-project` contiene `1..n` `cv-star`

Decisione aggiuntiva:

- i concetti di draft, composition, policy e revisioni si estendono non solo a `cv-star` ma anche a `cv-experience` e `cv-project`
- quindi il catalogo HyperCV e' interamente generabile e revisionabile a piu livelli, non solo nella parte narrativa STAR

### 9. Draft, composition e contenuto finale

Decisioni:

- Il contenuto finale HyperCV e' distinto dai draft e dalla composition.
- `hypercv-final` e' sempre un documento S.T.A.R. materializzato e canonico nel dominio privato.
- Draft e composition non devono contaminare il contenuto finale canonico.
- Il contenuto finale deve essere generato, non dedotto informalmente leggendo layer interni.
- La `hypercv-composition` e' una classe separata, legata a draft e final tramite lo stesso `artifact_id` logico.
- Ogni `hypercv-final` e' il risultato di una composition valida, esplicita o implicita.

### 10. Revisioni e stale detection

Decisioni:

- Tutti gli artefatti HyperCV devono avere un campo `revision` obbligatorio.
- Per i contributi generati (`*.kb.md`) e per i `hypercv-final` la revision iniziale puo' essere un timestamp `YYYYMMDDHHMMSS` della generazione.
- La `hypercv-composition` deve referenziare esplicitamente la revisione KB approvata e, quando presente, la revisione manuale a cui si riferisce.
- I vincoli sulle revisioni hanno precedenza sulla strategy di composition.
- Se cambia una revisione referenziata da una composition, la composition diventa `stale` e il `hypercv-final` non e' piu rigenerabile automaticamente senza nuova review.
- Per l'MVP il pinning delle revisioni puo' avvenire a livello di artifact, non di singolo campo.

Default della composition implicita:

- `manual revision`: `0..1`
- `kb revision`: `none`
- `section scope`: `all`
- `strategy`: `manual XOR kb`

Regole operative:

- La composition implicita e' semplicemente la composition ottenuta applicando tutti i default.
- Una composition esplicita puo' ridefinire solo i campi necessari, lasciando gli altri ai default.
- Se partecipa una sorgente KB, la composition deve referenziare esplicitamente la revisione KB approvata.
- Se esistono contributi multipli incompatibili o merge non banali, la composition deve essere esplicita.
- La composizione di default consente il caso manual-only non ambiguo; la KB non entra mai implicitamente nel final.

### 11. Contenuti manuali destinati al sito pubblico

Decisione:

- HyperCV ammette contenuti manuali nativi anche senza sorgente a monte nella KB.
- Questi casi sono considerati legittimi, anche se nel tempo si auspica una progressiva migrazione verso contenuti derivati dalla KB.

### 12. Politiche di gestione degli oggetti CV

Decisione:

- Tutti gli oggetti `cv-experience`, `cv-project` e `cv-star` possono essere trattati con policy come `kb-managed`, `manual-managed` o `hybrid`.

### 13. Lingua e localizzazione

Decisione:

- `hypercv-final` e' monolingua, presumibilmente italiano con eventuale terminologia inglese quando naturale per il dominio professionale.
- La doppia lingua nasce solo nel passaggio `hypercv-final -> site-data`.

### 14. Site-data

Decisione:

- I `site-data` non sono mai modificati manualmente.
- Eventuali correzioni vanno fatte su HyperCV o sulla pipeline di trasformazione.
- La rigenerazione deve poter azzerare ogni modifica manuale dei site-data.
- I `site-data` restano artefatti privati.
- I `site-data` sono rigenerabili da `hypercv-final` e non diventano source of truth.
- La persistenza dei `site-data` e' una scelta di cache/materialization, non di ownership canonica del contenuto.
- Il rendering HTML canonico parte da `site-data`, non direttamente da `hypercv-final`.
- `site-data` non e' un mirror del catalogo HyperCV: e' una projection specializzata per il web.
- Ogni content node significativo di `site-data` deve mantenere provenance interna rintracciabile verso uno o piu frammenti di `hypercv-final`, con almeno `artifact_id`, `revision` e selettore stabile del frammento sorgente.
- Le citation user-facing non devono risolvere verso `hypercv-final`, che resta privato e monolingua, ma verso target pubblici localizzati derivati nella projection web.
- I persona profiles sono entita pubbliche di primo livello nel modello `site-data`.
- I percorsi pubblici derivano dai persona profiles e dalla projection del contenuto canonico, non da una duplicazione autonoma del contenuto.
- Il contratto `hypercv-final -> site-data` richiede quindi quattro elementi stabili: provenance interna, target di citation localizzati, persona profiles pubblici e path derivation coerente con il canonico.

### 15. Determinismo e LLM

Decisione:

- Le trasformazioni LLM-driven devono essere rese il piu possibile deterministiche a livello operativo, usando temperature molto basse e istruzioni precise.
- Non viene pero' assunto un determinismo forte, perche' il comportamento dei modelli non e' completamente sotto controllo.

### 16. Sicurezza del submodule e delle credenziali

Decisioni:

- Un submodule privato dentro un repo pubblico non rende leggibile il contenuto del privato a chi non ha i permessi sul privato.
- Il submodule espone comunque metadata del repo privato e introduce piu' attrito operativo; per questo e' stato declassato da architettura target a variante possibile del workspace.
- Il vero rischio di sicurezza non e' il submodule in se, ma credenziali troppo ampie o workflow non trusted con accesso al privato.

Guardrail minimi emersi:

- secret scanning su repo pubblico, repo privato e job di release/deploy
- credenziali a privilegio minimo per leggere il privato
- nessun workflow pubblico non trusted deve poter leggere dati privati
- leakage checks espliciti prima del deploy dello `static-site` e prima delle release del motore pubblico
- il manifest di release/deploy resta la fonte di audit, non lo stato Git del mount o del submodule

### 17. Promotion flow

Decisione:

- Nel nuovo modello non esiste piu una promotion di dati dal repository privato al repository pubblico.
- Tutte le trasformazioni tra classi dati (`raw`, `deep-knowledge`, `knowledge-base`, `hypercv-*`, `site-data`) avvengono nel dominio privato.
- La promotion verso il pubblico coincide con il deploy dello `static-site` generato nel dominio privato.
- In parallelo esiste una promotion distinta del motore pubblico: release del codice, del package o del tool consumato dal repository privato.

Motivazione della governance esplicita:

- separa nettamente la release del motore dalla publication del contenuto
- rende osservabile il momento in cui si rilascia il motore pubblico o si aggiorna il workflow condiviso
- abbassa il rischio di publication accidentale e di drift tra motore usato e sito deployato

Due promotion distinte nel modello:

1. promotion del motore pubblico
	- avviene nel repository pubblico
	- produce una versione installabile del motore
	- e' rilevante per CI/CD, automazione e ambienti non locali

2. promotion del sito pubblico
	- avviene nel repository privato
	- usa una versione esplicita del motore pubblico
	- parte dai dati canonici privati e termina con il deploy dello `static-site`

Contratto operativo minimo emerso:

- il repo pubblico deve poter girare in `showcase mode` con sample/demo data senza accesso ai dati reali
- il runtime privato deve poter consumare il motore pubblico come package/tool installabile
- lo sviluppo locale deve poter usare checkout affiancati senza ripubblicare il package a ogni modifica
- lo `static-site` e' l'unico artefatto che attraversa il boundary verso il pubblico

Gate minimi della promotion del sito:

- selezione esplicita della versione del motore pubblico da usare
- validazione dei layer privati richiesti dal build
- applicazione dei controlli di publication safety e leakage
- generazione di `site-data` e rendering dello `static-site`
- evidenza di release, provenance e controlli eseguiti

Decisioni successive consolidate:

- il repository privato non promuove dati nel repository pubblico; promuove solo il deploy dello `static-site`
- `hypercv-final` e `site-data` restano nel lato privato anche quando contribuiscono all'output pubblico
- la versione del motore usata per generare il sito deve essere tracciabile
- il repository privato puo' usare checkout affiancati in locale, ma in automazione il contratto ufficiale resta il package/tool pubblico versionato

## Consolidated Model

1. `raw-input` effimero
2. `deep-knowledge` persistita e immutabile
3. `knowledge-base-dk` rigenerabile dalla deep knowledge
4. `knowledge-base-manual` modificabile manualmente
5. vista logica unificata della `knowledge-base`
6. `hypercv-draft` persistiti per review e convergenza editoriale
7. `hypercv-composition` come classe separata di convergenza
8. `hypercv-final` materializzato e canonico nel dominio privato
9. `site-data` generati, privati e mai editati a mano
10. `static-site` generato e deployato pubblicamente

## Closed Decisions

Decisioni chiuse in questa sessione:

- modello `public code + private data`
- repository pubblico come codebase autorevole
- repository pubblico come engine installabile consumato dal repository privato
- raw come input effimero e non come classe persistita
- `deep-knowledge` append-only, immutabile e non rigenerabile
- distinzione tra `knowledge-base-dk` e `knowledge-base-manual`
- vista logica unificata della knowledge base nella generazione di HyperCV
- `hypercv-draft` come famiglia di contributi KB e manuali, anche parziali
- `hypercv-composition` come classe separata, esplicita o implicita, che governa la convergenza verso il final
- `hypercv-final` come contenuto canonico privato materializzato
- `site-data` come projection privata derivata, rigenerabile e persistibile solo come cache/materialization
- `site-data` come projection web specializzata, con provenance interna, citation pubbliche localizzate e persona profiles pubblici
- output pubblico identificato con il sito statico deployato, non con i dati sorgente
- catalogo HyperCV `cv-experience -> cv-project -> cv-star`
- `revision` mandatory per gli artefatti HyperCV
- pinning della revisione KB nella composition e stato `stale` quando cambia una revisione referenziata
- doppia lingua solo nel passaggio `hypercv-final -> site-data`
- governance esplicita per release del motore pubblico e deploy del sito statico
- package/tool pubblico come contratto ufficiale per automazione, checkout affiancati come modalita pratica di sviluppo locale
- env var per-classe:
	- `DEEP_KNOWLEDGE_PATH`
	- `KNOWLEDGE_BASE_PATH`
	- `HYPERCV_PATH`
	- `SITE_DATA_PATH`
- una sola root dati canonica nel repository privato

## Open Questions Residue

Non restano open point architetturali nel perimetro di questo brainstorming.

Note rimaste, ma non piu considerate open point architetturali:

- la matrice dei validator e' chiusa a livello di brainstorming come guida di design; il catalogo concreto delle rule verra' raffinato in implementazione e review
- il dettaglio del contratto dati di `site-data` andra' raffinato a livello di schema o file layout in fase implementativa
- la strategia full rebuild vs delta rebuild e' una scelta implementativa
- il bootstrap del workspace (checkout affiancati, script di init, fallback operativi) e' una scelta implementativa

## Status

La sessione di brainstorming e' considerata chiusa.

Questo file e' la fonte primaria consolidata della sessione e puo' essere usato come input della successiva architecture review, della formalizzazione architetturale o della pianificazione implementativa.

Gli artefatti in `_bmad-output/implementation-artifacts/` restano utili come supporto storico o operativo, ma non sono piu necessari come fonte primaria.