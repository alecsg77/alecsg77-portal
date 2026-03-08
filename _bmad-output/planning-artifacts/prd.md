---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-04-user-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-01b-continue
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
inputDocuments:
  - /workspaces/alecsg77-portal/_bmad-output/planning-artifacts/product-brief-alecsg77-portal-2026-02-27.md
  - /workspaces/alecsg77-portal/_bmad-output/brainstorming/brainstorming-session-2026-02-25.md
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
productVision:
  vision: Rendi l'esperienza lavorativa in un database interrogabile per estrarre informazioni mirate, inclusi fatti tangibili e lessons learned oggettive. Il sistema agisce da ponte proattivo tra le competenze reali (mappate anche in format S.T.A.R) del professionista e le specifiche Job Description (JD).
  differentiator: "Un 'HyperCV' alimentato da un duplice flusso automatizzato: Agenti AI proattivi che intervistano l'utente per far emergere memorie e sfide profonde (l'output base è un dato grezzo verificabile, riprocessabile e soggetto a human-validation obbligatoria), e un sistema di ricerca documentale semantica tramite linguaggio naturale che filtra un sito web statico pubblico (con feature AI dietro login per evitare abusi)."
  insight: L'obiettivo non è sostituire il colloquio con un "yes-man" automatizzato, ma usare l'AI come "agente di ricerca virtuale" che esponga il vero DB delle mie esperienze. Questo elimina i recruiter pigri senza valore aggiunto, premiando chi ha vero interesse ad approfondire. Se l'Agente non capisce le sottigliezze tecniche della JD, è istruito per restituire un sincero "Chiedi ad Alessio per approfondire".
  oneLiner: "L'AI Mode per la tua carriera: un portale formato da un CV interattivo pubblico e un 'Agente di Ricerca Virtuale' privato dietro login, istruito sui dati grezzi della tua carriera pre-validati umanamente."
workflowType: 'prd'
---

# Product Requirements Document - alecsg77-portal

**Author:** Alessio
**Date:** 2026-02-27

## Executive Summary

HyperCV è una web app che trasforma il CV statico in una knowledge base interrogabile. Il prodotto combina un portale pubblico statico, ottimizzato per performance e trust, con una futura area privata autenticata dedicata alla ricerca semantica e al job matching contestuale.

### What Makes This Special

Il differenziatore è la separazione tra acquisizione del dato grezzo, distillazione canonica e presentazione pubblica:

1. **Private pipeline:** l'Autore conserva memorie raw persistenti, multilingua e non filtrate. Uno o più agenti o processi privati le trasformano in artifact strutturati, verificabili, versionabili e soggetti a validazione umana.
2. **Public presentation pipeline:** il portale pubblico espone contenuti statici bilingui ad alta leggibilità; la futura area privata userà gli artifact canonici per matching su Job Description e retrieval semantico, evitando sintesi narrative non verificabili.

**Core Insight:** *"L'AI Mode per la tua carriera: un portale formato da un CV interattivo pubblico e un 'Agente di Ricerca Virtuale' privato abilitato al matching contestuale sulle JD, istruito su memorie documentali e interviste proattive a format S.T.A.R."*

## Project Classification

* **Project Type:** Web App (SPA/PWA)
* **Domain:** General 
* **Complexity Level:** Low (nessuna compliance di settore, si applica GDPR base per la conservazione Dati Raw)
* **Project Context:** Greenfield 

## Success Criteria

### User Success (Il Recruiter)
Il successo per l'utente ("Aha! moment") coincide con la velocità e la pulizia con cui reperisce un'informazione profonda su un'esperienza altrimenti introvabile incrociando parole chiave o analizzando una navigazione logica. Il Recruiter sa di aver trovato valore quando il sistema risponde senza filtri all'esigenza: "Mostrami esattamente dove, come e con che risultati ha usato questa competenza".

### Business Success (L'Autore/Candidato)
Essendo un hub personale, il ROI (Return on Investment) dell'Autore trascende il solo esercizio accademico per atterrare sul Personal Branding e la visibilità:
* **Generazione d'interesse circolare:** Stabilire un volano di traffico in cui i visitatori del profilo LinkedIn accedono al portale e i visitatori organici del portale convertono ritornando all'account LinkedIn per un contatto professionale.
* Elevare la qualità percepita del profilo tecnico durante i follow-up o i contatti da parte di HR/Hiring Manager top-tier.

### Technical Success
L'infrastruttura di erogazione e di navigazione deve risultare fulminea, solida, prevedibile nei costi operativi (consumo token LLM severamente sotto controllo tramite generazione statica pre-processata). Nessuna interruzione di servizio.

### Measurable Outcomes
* **Time-to-Value (TTV) < 15 secondi:** L'utente esplora le tassonomie e raggiunge il suo primo livello di approfondimento entro i primi secondi.
* **Deep-Dive Engagement (>40%):** Il 40% delle visite uniche deve arrivare ad espandere le descrizioni metodologiche (S.T.A.R) e non restare sulla Root List.
* **Conversion / Click-through-Rate (CTR):** Tracciamento quantitativo del volume di traffico cross-canale in entrata (da LinkedIn al Portal) e soprattutto in "Uscita" (Click sulla CTA "Contattami su LinkedIn" posta sul portale al temine delle esperienze).

Questi obiettivi impongono una scelta architetturale conservativa per la V1: contenuti verificabili, costi operativi bassi e massima leggibilità pubblica prima di introdurre capacità real-time più costose e rischiose.

## Product Scope

### MVP - Minimum Viable Product
Costruisce il valore minimo riducendo costo, rischio di allucinazione e superficie d'attacco:
* Private pipeline offline-first per trasformare raw in artifact strutturati validati.
* Portale pubblico statico bilingue con navigazione gerarchica e ricerca lato client.
* **Progressive Disclosure:** i link espongono domande contestuali e aprono frammenti S.T.A.R. leggibili e copiabili.
* Analytics per TTV, deep-dive engagement e CTR verso LinkedIn.

### Growth Features (Post-MVP)
Estende la stessa knowledge base canonica con capacità real-time e governance operativa:
* Autenticazione e gating delle funzionalità avanzate.
* Retrieval e matching contestuale su Job Description dietro login.
* Dashboard amministrativa per ingestione, validazione e aggiornamento dei contenuti.
* Evoluzioni future come input vocali e agenti conversazionali guidati dal contesto.

Lo scope dell'MVP è quindi sufficiente se dimostra che discovery guidata, copy-paste operativo e consultazione rapida generano valore reale per recruiter, valutatori tecnici e Autore.

## User Journeys

In questa fase MVP, l'architettura è puramente SSG (Static Site Generation), eliminando la stretta necessità di una barra di ricerca globale a favore di un'architettura dell'informazione rigorosa (sezioni e sottogruppi) che intercetta i principali intenti di navigazione. Le informazioni vengono duplicate e declinate contestualmente dall'Agente Generatore in base al percorso in cui si trovano. 

Il pattern di interazione primario è la **Progressive Disclosure**: hover su un link = mostra la *domanda* a cui quel link risponderà (es. "In quali progetti è stato usato React e per risolvere quale problema?"); click = mostra il *frammento di risposta* formattato per facilitare il copia e incolla.

### 1. Il Valutatore Tecnico (CTO / Tech Lead)
* **Goal:** Validare le competenze (es. architettura, problem solving) in modo approfondito ma senza perdere tempo in test narrativi noiosi.
* **Journey:** L'utente atterra sul portale e naviga attraverso le categorie tecniche o per progetto. Quando individua uno stack o una competizione di interesse, passa il mouse sull'elemento. Il tooltip gli prospetta un quesito specifico. Cliccando, espande il caso di studio nel formato S.T.A.R. Inverso ("Risultato -> Problema -> Azione"), ottimizzato per la lettura tecnica veloce e per permettere di copiare facilmente dati quantitativi. 

### 2. Il Talent Sourcer (Recruiter / HR)
* **Goal:** Trovare corrispondenze con le Job Description e creare rapidamente summary condivisibili con gli Hiring Manager.
* **Journey:** Il recruiter accede (senza barriere/login per l'MVP). Trova un executive summary chiaro. Invece di dover cercare manualmente (grazie alla struttura ben clusterizzata), esplora i percorsi guidati e individua le metodologie e i risultati chiave. Clicca sui dettagli di interesse ed utilizza l'output ben formattato a schermo per un rapido "copia e incolla" da inserire nell'ATS o da inoltrare via email. 

### 3. L'Autore (Alessio / Admin)
* **Goal:** Inserire e mantenere aggiornato il proprio vissuto professionale riducendo l'attrito e massimizzando la qualità del dato, usando una private pipeline **completamente locale** composta da uno o più agenti o processi offline.
* **Journey (Backend Offline):**
  1. **Input Grezzo:** Alessio registra un vocale o appunta delle note destrutturate dopo una giornata di lavoro.
  2. **Distillazione privata:** uno o più agenti o processi locali prendono i dati grezzi, li interrogano proattivamente ed estraggono artifact neutri in formato JSON/Markdown, organizzati secondo la logica S.T.A.R. inversa.
  3. **Human Validation (SSOT):** Alessio revisiona, approva o modofica manualmente il Markdown generato (Single Source of Truth).
  4. **Assemblaggio e publish:** uno o più processi locali prendono gli artifact approvati dalla Canonical Knowledge Base, li organizzano in corpus version coerenti e generano il sito statico bilingue. Se una competenza o esperienza è rilevante in più percorsi, il sistema la espone nel front-end in modo semanticamente appropriato a ciascun nodo di navigazione.
  5. **Deployment Automatico:** Il prodotto statico aggiornato va in produzione, invisibile e in background per gli utenti finali.

Questi journey mostrano perché il prodotto richiede sia un differenziatore di esperienza, sia una struttura tecnica che mantenga trust, costi bassi e controllo editoriale sull'intero ciclo di pubblicazione.

## Innovation & Novel Patterns

### Detected Innovation Areas
* **Offline-First AI Pipeline:** la distillazione avviene a monte, fuori dal runtime pubblico, riducendo costi, rischio di leakage e allucinazioni.
* **Canonical Knowledge Base:** il CV non è un documento statico ma una vista derivata da artifact validati, versionabili a livello di corpus e riutilizzabili in più percorsi.
* **Contextual Progressive Disclosure:** la navigazione espone prima la domanda e poi la risposta strutturata, favorendo lettura rapida e copy-paste operativo.

### Market Context & Competitive Landscape
Le alternative oggi sono polarizzate tra portfolio statici poco interrogabili e chatbot su CV con rischio di allucinazione, costi runtime e fiducia limitata. HyperCV si posiziona tra questi estremi: interazione esplorativa e retrieval guidato, ma con contenuti precompilati, verificabili e serviti da infrastruttura statica.

### Validation Approach
Il modello è stato validato tramite First Principles Analysis: separa chiaramente esigenze di recruiter e valutatori tecnici, senza introdurre complessità cloud nella V1. L'ipotesi verrà considerata valida se il prodotto supera il 40% di deep-dive engagement oltre la view iniziale.

### Risk Mitigation
* **Rischio:** la pipeline locale diventa troppo onerosa da mantenere e rallenta gli aggiornamenti.
* **Mitigazione:** il sistema deve prevedere fallback manuale e automazione minima. Poiché il nucleo resta basato su file editabili localmente, l'Autore può continuare a pubblicare anche in assenza degli agenti AI.

## Web App Specific Requirements & Architecture

### Architettura di Transizione (V1 $\rightarrow$ V2)

La roadmap architetturale affronta una sfida specifica: lanciare il prodotto il prima possibile a zero-cost per validarlo (V1), ma prevedere un'evoluzione solida e sicura per le feature avanzate (V2), utilizzandolo contestualmente come strumento di *Showcase Tecnico*.

Il modello scelto prevede una V1 statica e conservativa, seguita da una possibile V2 con backend reale solo dopo validazione dei costi operativi e del valore delle feature avanzate:

#### Fase V1 (Minimum Viable Product):
* **Tipologia:** applicazione pre-renderizzata SSG per massimizzare SEO, semplicità operativa e Web Vitals.
* **Hosting:** CDN statica come Cloudflare Pages o equivalente.
* **Origine Dati:** artifact strutturati generati nella private pipeline locale, approvati e organizzati in corpus version coerenti prima del publish.
* **Esperienza Utente Core:** navigazione gerarchica, ricerca lato client e progressive disclosure su contenuti pubblici in inglese e italiano.

#### Fase 2 (Growth & Backend Migration):
* **Tipologia:** introduzione opzionale di un backend reale dopo validazione della V1.
* **Scelta Strategica:** il pattern definitivo della V2 resta congelato fino a quando il costo operativo della V1 e il valore delle feature avanzate non saranno misurati.
* **Migrazione Asset:** la pipeline locale potrà evolvere verso servizi backend e storage dedicato.
* **Accesso:** autenticazione standard per sbloccare feature avanzate come matching e retrieval real-time.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy
**MVP Approach:** *Problem-Solving MVP.* L'obiettivo della prima iterazione è dimostrare il valore del formato strutturato S.T.A.R. interattivo, riducendo l'attrito per i veri recruiter che hanno poco tempo. L'assunzione zero è che un portale velocissimo con informazioni condensate pragmaticamente batta un portale narrativo tradizionale. Se l'MVP statico converte (alto tasso di ingaggio in deep-dive), è autorizzato a procedere verso un'architettura backend avanzata (V2).

### Scope Boundaries (In vs Out)

#### Fase 1: Minimum Viable Product (Static Publish)
* **[IN SCOPE] Dati Sorgente:** JSON e file Markdown validati umanamente (SSOT) derivati da agenti o processi eseguiti esclusivamente nella private pipeline locale dell'Autore.
* **[IN SCOPE] Front-end Web:** Generatore Statico SSG distribuito su CDN in configurazione serverless totale (nessun costo computazionale attivo in produzione).
* **[IN SCOPE] Localizzazione Pubblica:** Pubblicazione delle pagine statiche in inglese e italiano a partire dalla Canonical Knowledge Base.
* **[IN SCOPE] Esperienza Utente (UX):** Dinamica esplorativa a "Progressive Disclosure" guidata da tooltip interrogativi ed espansione al click. 
* **[IN SCOPE] Search lato client:** Al fine di non alienare l'esperienza UX dei Talent Sourcer e veicolare precocemente il feel di knowledge base interrogabile, viene implementata in Fase 1 un'interfaccia di ricerca globale operante sull'indice statico SSG, senza ausilio di server o backend remoti.
* **[OUT OF SCOPE]** Nessun database in cloud. Nessun backend operativo live. Nessun log-in. Nessun retrieval semantico o inferenza LLM prodotta dalle interazioni degli utenti a run-time.

#### Fase 2: Growth (Backend Evaluation)
* **[IN SCOPE]** Invasione del Backend (decisione pattern strutturale congelata in attesa di test V1).
* **[IN SCOPE]** Passaggio da repository-based trigger ad ingestione real-time su Blob-Storage per le note vocali/testuali dell'Autore.
* **[IN SCOPE]** Autenticazione Oauth2/LinkedIn per gating.
* **[IN SCOPE]** Attivazione Inferenza AI Real-time (Job Matching). 
* **[OUT OF SCOPE]** Sistemi multi-tenancy (se il portale non apre ad altri utenti/portfolio esterni).

## Functional Requirements (MVP V1)

Le sezioni precedenti definiscono il problema, il modello di prodotto, i journey da servire e l'architettura minima che rende credibile la V1. I seguenti requisiti rappresentano quindi il capability contract della V1. Da questo punto il documento passa dalle decisioni di scope ai comportamenti richiesti del sistema e, subito dopo, agli attributi di qualità che ne vincolano l'implementazione.

### Data Ingestion & Distillation (Offline AI Pipeline)
* **FR1:** L'Autore può inserire "memorie" destrutturate (note di testo o vocali) relative alla propria carriera nell'ambiente locale.
* **FR2:** L'Agente Distillatore (locale) può estrarre fatti tangibili dai dati destrutturati per formattarli in una rigorosa struttura "S.T.A.R. inversa" (Risultato -> Problema -> Azione).
* **FR3:** L'Agente Distillatore (locale) può salvare l'esperienza strutturata in file di testo piatti e neutrali (JSON/Markdown).
* **FR4:** L'Autore può leggere, editare e approvare manualmente i file generati, stabilendoli come Single Source of Truth (SSOT).

### Content Assembly & Generation
* **FR5:** L'Agente Generatore (locale) può inglobare tutti i file S.T.A.R. approvati per compilarli nel codice sorgente del generatore statico web.
* **FR6:** L'Agente Generatore (locale) può duplicare e declinare semanticamente la stessa S.T.A.R. in più nodi di navigazione (es. "Competenze Backend" e "Progetto X").
* **FR7:** Il Sistema locale può dispiegare l'output statico (HTML/JS/CSS) nel repository preposto al deploy su CDN esterna.
* **FR8:** L'Autore può aggirare gli Agenti (degradazione manuale) ed editare a mano i file Markdown come in un classico file system Headless CMS.

### Navigation & Discovery (UX)
* **FR9:** Il Visitatore può accedere a un Executive Summary generale e navigare la carriera tramite cluster logici.
* **FR10:** Il Visitatore può eseguire un'azione di "hover" (passaggio del mouse) o focus (tastiera) su uno stack o competenza per visualizzare un tooltip contenente l'esatta domanda di contesto legata a quell'elemento.
* **FR11:** Il Visitatore può eseguire un "click" (Progressive Disclosure) sull'elemento per far espandere il blocco di testo contenente il caso di studio S.T.A.R.
* **FR12:** Il Visitatore può selezionare e copiare agilmente i frammenti S.T.A.R. a schermo per esportarli in ATS terzi.
* **FR13:** Il Visitatore può utilizzare una barra di ricerca globale lato-client che effettua ricerche istantanee sull'indice statico dell'app limitando il perimetro al CV.

### Accessibility, SEO & AI Ingestion
* **FR14:** Il Visitatore con disabilità (e i bot non visivi) può navigare l'intera alberatura del sito, inclusi i tooltip generati dinamicamente, godendo del pieno supporto e attributi ARIA.
* **FR15:** Qualsiasi Agente AI di terze parti (es. GPT-bot esterni, Perplexity) usato dai recruiter può eseguire il "crawling" documentale delle informazioni strutturate senza incontrare ostacoli javascript rendering e ricevendo risposte formattate e semanticamente taggate.
* **FR16:** Il Motore di Ricerca Pubblico (Google) può indicizzare i file S.T.A.R. esposti in funzione di determinate keyword scelte per rankare in alto il naming "Alessio / Autore + [Stack]".

### Analytics & Conversion
* **FR17:** Il Sistema web traccia l'engagement misurando percentualmente i visitatori che espandono le descrizioni (Deep-Dive).
* **FR18:** Il Sistema web traccia il "Time-to-Value", calcolando il tempo intercorso al momento del primo click esplorativo.
* **FR19:** Il Visitatore può cliccare su una Call-to-Action pertinente a fine pagina per atterrare direttamente sul profilo LinkedIn.

### Canonical Knowledge, Localization & Reprocessing
* **FR20:** L'Autore può acquisire dati raw in qualunque lingua, inclusi italiano e inglese.
* **FR21:** Il sistema di distillazione può creare artifact canonici in inglese a partire da una o più sorgenti raw eterogenee.
* **FR22:** Il sistema può associare ciascun artifact distillato a più sorgenti raw e ciascuna sorgente raw a più artifact distillati.
* **FR23:** L'Autore può ispezionare la provenance di un artifact distillato identificando le sorgenti raw che lo hanno alimentato.
* **FR24:** Il sistema di generazione statica può pubblicare varianti di pagina in inglese e italiano a partire dalla knowledge base canonica approvata.
* **FR25:** Il Visitatore può cambiare lingua mantenendo, quando disponibile, lo stesso contenuto logico o nodo di navigazione.
* **FR26:** Il sistema può tracciare lo stato di localizzazione di ciascun contenuto e bloccare la pubblicazione di varianti incomplete o incoerenti.
* **FR27:** L'Autore può rigenerare selettivamente artifact distillati o rigenerare l'intero corpus quando cambiano agente, prompt, modello o strategia di organizzazione.
* **FR28:** Il sistema può creare versioni coerenti del corpus distillato e confrontarle prima della pubblicazione.

## Non-Functional Requirements

### Performance
* Il portale statico deve mantenere tempi di risposta percepiti come immediati per navigazione, ricerca lato client e progressive disclosure, con interazioni ordinarie sotto i 100 ms.
* Gli asset pubblici devono essere distribuiti via CDN con metriche Core Web Vitals in fascia verde e target Lighthouse superiore a 95 per le principali pagine pubbliche.
* La pubblicazione di una nuova corpus version non deve introdurre regressioni sensibili di performance rispetto alla release pubblica precedente.
* Il supporto bilingue non deve introdurre degradi percepibili nella navigazione, nella ricerca o nel cambio lingua.

### Security & Boundary Enforcement
* I dati raw devono risiedere esclusivamente in un Raw Vault privato, segregato dal repository e dalla pipeline del portale pubblico.
* Gli artifact intermedi, i manifest di derivazione e gli output tecnici di lavorazione devono risiedere in una Staging/Distillation Zone privata distinta dal Raw Vault e dal layer pubblico.
* La build pubblica deve operare in modalità allowlist-only, includendo soltanto artifact esplicitamente marcati come pubblicabili.
* Nessun raw, artifact intermedio o metadata di provenance completa può essere esposto nel layer pubblico senza trasformazione e validazione esplicita.
* I metadata pubblici devono essere minimizzati per prevenire leakage di informazioni sensibili, riferimenti interni o dettagli coperti da NDA.

### Artifact Lifecycle & State Governance
* Ogni artifact del sistema deve avere uno stato esplicito coerente con il proprio livello di maturità operativa, ad esempio raw, staged, distilled, validated, localized, publishable, published o retired.
* Le transizioni di stato devono essere controllate da validation gates espliciti e verificabili.
* Nessun artifact deve avanzare verso il publish pubblico in assenza di stato e provenance coerenti.
* Le regole di transizione tra zone e stati devono essere semplici, limitate e non ambigue.

### Persistence, Traceability & Manifest Integrity
* Il Raw Vault deve essere persistente, non distruttivo e idoneo alla conservazione storica completa delle sorgenti originali.
* Il modello dati deve supportare relazioni many-to-many tra raw sources e artifact distillati.
* Ogni artifact distillato deve essere associato a un derivation manifest privato e versionato che registri almeno source_ids, lingue sorgente, canonical language, prompt version, agent version, model version, processed_at, validation status e corpus version.
* Deve essere possibile risalire da ogni artifact distillato a tutte le sorgenti raw che lo hanno generato e, inversamente, verificare in quali artifact distillati una sorgente è stata utilizzata.
* Il derivation manifest deve essere trattato come artifact critico del sistema, con integrità preservata e accesso limitato.
* La provenance deve essere facilmente interrogabile senza richiedere ispezione dispersiva manuale di file o metadata.

### Reprocessability, Diffability & Corpus Versioning
* Il sistema deve supportare sia il riprocessamento selettivo sia la rigenerazione completa dell'intera base distillata.
* Il full rebuild del corpus deve essere considerato un'operazione ordinaria prevista dall'architettura quando cambiano agente, prompt, modello o strategia di clustering e organizzazione semantica.
* Ogni full rebuild deve produrre una nuova corpus version coerente, auditabile e confrontabile con le versioni precedenti.
* Ogni pubblicazione deve derivare da una corpus version completa e validata, non da un insieme arbitrario di file approvati in tempi diversi.
* Il sistema deve offrire meccanismi comprensibili di confronto tra corpus versions per supportare review, audit e approvazione del rebuild.
* La rigenerazione completa non deve compromettere segregazione, auditabilità, rollback logico o capacità di analizzare regressioni.

### Content Identity & Canonical Consistency
* Il sistema deve distinguere tra content identity logica e artifact instance generata in una specifica corpus version.
* Le riorganizzazioni del corpus non devono compromettere la continuità concettuale dei contenuti nel tempo.
* Deve essere possibile determinare se un contenuto è stato mantenuto, sostituito, fuso, frammentato o ritirato tra due corpus versions.
* La knowledge base distillata deve mantenere una forma canonica coerente in inglese.

### Localization Governance
* Le varianti localizzate pubbliche in inglese e italiano devono derivare esclusivamente dalla knowledge base canonica, non direttamente dalle raw sources.
* Ogni variante localizzata deve essere associata alla medesima content identity canonica del contenuto di origine.
* Il sistema deve tracciare lo stato di localizzazione di ogni contenuto almeno come missing, stale o verified.
* Il publish deve impedire la pubblicazione di localizzazioni incomplete, placeholder non tradotti o varianti linguistiche incoerenti rispetto alla corpus version di origine, salvo override esplicito.
* Il cambio lingua nel layer pubblico deve preservare, quando disponibile, l'equivalenza logica del contenuto o del nodo di navigazione.

### Accessibility & Machine Readability
* Tutte le interazioni pubbliche, inclusi tooltip, progressive disclosure, cambio lingua e ricerca lato client, devono essere accessibili via tastiera e compatibili con screen reader secondo WCAG 2.1 AA.
* Il markup pubblico deve restare semanticamente leggibile da crawler e agenti AI di terze parti senza dipendere da rendering fragile lato client.
* La struttura pubblica deve favorire la fruizione umana e l'estrazione machine-readable dei contenuti professionali senza esporre provenance privata o dati non pubblicabili.

### Validation & Publish Readiness
* Il sistema deve applicare validation gates distinti per acquisizione raw, staging, distillazione, localizzazione, corpus assembly e packaging pubblico.
* I controlli automatici devono intercettare leakage, metadata non ammessi, placeholder non tradotti, incongruenze di stato e violazioni delle publish policy prima della review umana.
* La review umana deve concentrarsi su accuratezza semantica, reputazione, chiarezza e publish readiness, non su difetti meccanici rilevabili automaticamente.
* Deve essere possibile dimostrare, tramite artifact e manifest privati, che il package pubblico non contiene dati raw né riferimenti privati non autorizzati.

### Operability
* Il sistema deve restare governabile da un singolo autore-operatore senza richiedere processi manuali fragili o conoscenza tacita eccessiva.
* Le zone operative, i tipi di artifact ammessi e i passaggi di transizione devono essere abbastanza semplici da evitare la proliferazione di cartelle ibride, shortcut non governati o eccezioni permanenti.
* Il costo cognitivo di ispezione, rebuild, review e publish deve rimanere compatibile con un workflow regolare di aggiornamento del corpus.
