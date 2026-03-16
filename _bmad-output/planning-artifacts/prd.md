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
  - step-e-01-discovery
  - step-e-02-review
  - step-e-03-edit
inputDocuments:
  - /workspaces/alecsg77-portal/_bmad-archive/planning-artifacts/product-brief-alecsg77-portal-2026-02-27.md
  - /workspaces/alecsg77-portal/_bmad-output/brainstorming/brainstorming-session-2026-02-25.md
  - /workspaces/alecsg77-portal/_bmad-output/brainstorming/brainstorming-session-2026-03-15-0620.md
date: '2026-02-27'
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
productVision:
  vision: Trasformare l'esperienza lavorativa in una knowledge base pubblica esplorabile, capace di esporre fatti tangibili e lessons learned oggettive tramite discovery guidata e contenuti strutturati verificabili.
  differentiator: "Un HyperCV alimentato da una pipeline privata offline-first che distilla memorie e note grezze in artifact canonici validati umanamente, poi pubblicati in un portale statico bilingue ad alta leggibilita."
  insight: L'obiettivo non e sostituire il colloquio con un assistente che parli al posto del candidato, ma ridurre l'attrito della valutazione esponendo un database reale di esperienze consultabile con navigazione, ricerca e progressive disclosure.
  oneLiner: "Un portale pubblico statico che rende la carriera consultabile come una knowledge base, alimentato da una pipeline privata che distilla contenuti verificabili."
lastEdited: '2026-03-16'
editHistory:
  - date: '2026-03-08'
    changes: 'Refocused requirements for measurability, traceability, web-app coverage, and abstract provenance/regeneration language'
  - date: '2026-03-08'
    changes: 'Tightened BMAD rigor across success criteria, transition architecture, selected FRs, and release-evidence terminology'
  - date: '2026-03-16'
    changes: 'Aligned PRD with system brainstorming: clarified private/public boundary, canonical content model, HyperCV governance, and publish-safety requirements'
  - date: '2026-03-16'
    changes: 'Refined flagged FRs and NFRs after validation to improve measurability, evidence, and abstraction level'
  - date: '2026-03-16'
    changes: 'Closed final validation gaps by tightening canonical-governance FRs and evidence-oriented acceptance language'
workflowType: 'prd'
workflow: 'edit'
---

# Product Requirements Document - alecsg77-portal

**Author:** Alessio
**Date:** 2026-02-27

## Executive Summary

HyperCV è una web app che trasforma il CV statico in una knowledge base esplorabile. Il problema da risolvere è duplice: un CV tradizionale comprime troppo il contesto per recruiter e valutatori tecnici, mentre un portfolio narrativo richiede troppo tempo per arrivare al punto utile. La V1 risponde a questo gap con un portale pubblico statico bilingue, progettato per offrire discovery guidata, ricerca sul corpus statico e progressive disclosure su contenuti verificabili. Il valore del portale deriva da una pipeline privata offline-first che mantiene nel dominio privato sia i materiali di lavoro sia il contenuto canonico, e che pubblica verso il dominio pubblico solo artefatti statici approvati e sanitizzati. Le funzionalita conversazionali e il matching real-time restano esplicitamente fuori dal MVP.

### What Makes This Special

Il differenziatore è la separazione tra preparazione privata del contenuto e consultazione pubblica:

1. **Private canonical model:** l'Autore raccoglie input grezzi, li consolida in contenuto privato persistito e li converte in un catalogo HyperCV canonico soggetto a review umana.
2. **Public engine, private data boundary:** il repository pubblico resta autorevole per engine, contratti e frontend, mentre i dati reali e i layer canonici restano nel dominio privato; il boundary si applica ai dati, non al codice.
3. **Safe static publication:** il portale espone solo output statici bilingui approvati, con controlli di publication safety e assenza di leakage come vincoli di rilascio.
4. **Contextual progressive disclosure:** l'esperienza pubblica mostra prima la domanda rilevante e poi il frammento strutturato, facilitando valutazione rapida e copy-paste operativo.

**Core Insight:** *"Un portale pubblico statico che rende la carriera consultabile come una knowledge base, alimentato da un dominio privato che consolida contenuto canonico verificabile e pubblica solo output statici sicuri."*

## Project Classification

* **Project Type:** Web App (SPA/PWA)
* **Domain:** General 
* **Complexity Level:** Low (nessuna compliance di settore, si applica GDPR base per la conservazione Dati Raw)
* **Project Context:** Greenfield 

## Success Criteria

### User Success (Il Recruiter)
Il successo per l'utente coincide con tre esiti osservabili nella stessa sessione:
* raggiunge un frammento rilevante entro 15 secondi;
* espande almeno un approfondimento utile;
* ottiene testo riutilizzabile per screening o handoff interni senza riformattazione sostanziale.

### Business Success (L'Autore/Candidato)
Il successo business dell'Autore e dimostrato da due segnali misurabili di qualificazione e ritorno:
* **Generazione d'interesse circolare:** Stabilire un volano di traffico in cui i visitatori del profilo LinkedIn accedono al portale e almeno il 5% delle visite uniche del portale genera un click di ritorno verso LinkedIn o una CTA di contatto professionale.
* **Qualificazione del contatto:** Almeno il 50% dei contatti professionali generati dal portale deve arrivare dopo la consultazione di almeno un approfondimento tecnico o metodologico tracciato negli analytics o confermato nel contesto del contatto.

### Technical Success
La V1 raggiunge il successo tecnico se rispetta simultaneamente cinque condizioni di rilascio:
* costi di erogazione pubblica entro il budget operativo approvato per la V1 e con scostamento mensile non superiore al 10% in condizioni di traffico comparabili;
* interazioni pubbliche principali entro 100 ms dopo il caricamento iniziale;
* cambio lingua entro 500 ms nei browser supportati;
* punteggio Lighthouse di almeno 95 sulle pagine benchmark di release, senza dipendenze runtime critiche per la consultazione del contenuto pubblico;
* evidenza di release che conferma assenza di leakage di dati privati o materiali di lavoro nel package pubblico.

### Measurable Outcomes
* **Time-to-Value (TTV) < 15 secondi:** L'utente esplora le tassonomie e raggiunge il suo primo livello di approfondimento entro i primi secondi.
* **Deep-Dive Engagement (>40%):** Il 40% delle visite uniche deve arrivare ad espandere le descrizioni metodologiche (S.T.A.R) e non restare sulla Root List.
* **Conversion / Click-through-Rate (CTR) >= 5%:** Almeno il 5% delle visite uniche del portale deve generare un click in uscita verso la CTA professionale primaria, con tracciamento separato del traffico in entrata da LinkedIn e del traffico di ritorno dal portale.

Questi obiettivi impongono una scelta architetturale conservativa per la V1: contenuti verificabili, costi operativi bassi e massima leggibilità pubblica prima di introdurre capacità real-time più costose e rischiose.

## Product Scope

### MVP - Minimum Viable Product
Costruisce il valore minimo riducendo costo, rischio di allucinazione e superficie d'attacco:
* Private pipeline offline-first per trasformare input effimeri in contenuto privato persistito, knowledge base curata e catalogo HyperCV finale soggetto a review.
* Portale pubblico statico bilingue con navigazione gerarchica come modalita primaria e ricerca sul corpus statico come supporto secondario.
* **Progressive Disclosure:** i link espongono domande contestuali e aprono frammenti S.T.A.R. leggibili e copiabili.
* Analytics per TTV, deep-dive engagement e CTR verso LinkedIn.
* Publication workflow con evidence package, controlli di safety e promozione verso il pubblico consentita solo per output statici approvati.
* Esclusioni esplicite del MVP: nessun chatbot runtime, nessun job matching live, nessun report dinamico generato on demand, nessuna autenticazione.

### Growth Features (Post-MVP)
Estende la stessa knowledge base canonica con capacità real-time e governance operativa:
* Autenticazione e gating delle funzionalita avanzate.
* Retrieval e matching contestuale su Job Description dietro login.
* Esperienze conversazionali e output dinamici generati a runtime.
* Dashboard amministrativa per ingestione, validazione e aggiornamento dei contenuti.

Lo scope dell'MVP e sufficiente se dimostra che discovery guidata, copy-paste operativo e consultazione rapida generano valore reale prima di introdurre capacita AI in tempo reale.

### Canonical Content Boundary
Il prodotto distingue quattro layer a livello di requisito, senza trasformare il PRD in un design tecnico dettagliato:
* **Input effimeri:** note e vocali di lavoro usati per l'ingestione iniziale, non destinati alla pubblicazione.
* **Contenuto privato persistito:** memoria ricca, knowledge base curata e materiali editoriali che restano fuori dal dominio pubblico.
* **Catalogo HyperCV canonico:** rappresentazione privata approvata di esperienze, progetti e casi S.T.A.R. usata come sorgente autorevole per il publish.
* **Output pubblico derivato:** site-data e pagine statiche bilingui generate dal catalogo approvato e sanitizzate prima del rilascio.

Il MVP richiede che solo l'output pubblico derivato attraversi il boundary verso il sito pubblicato; i layer privati restano sempre esclusi dal package pubblico.

## User Journeys

In questa fase MVP, l'esperienza e static-first: la navigazione gerarchica e il pattern principale, mentre la ricerca globale sul corpus statico serve come acceleratore secondario per il recupero di contenuti noti. Le informazioni vengono organizzate in percorsi coerenti e declinate contestualmente in base al nodo di navigazione.

Il pattern di interazione primario è la **Progressive Disclosure**: una richiesta contestuale mostra prima la domanda rilevante e poi il frammento di risposta strutturato, in modo da favorire lettura rapida e copia del contenuto utile.

### 1. Il Valutatore Tecnico (CTO / Tech Lead)
* **Goal:** Validare le competenze (es. architettura, problem solving) in modo approfondito ma senza perdere tempo in test narrativi noiosi.
* **Journey:** L'utente atterra sul portale e naviga attraverso le categorie tecniche o per progetto. Quando individua uno stack o una competenza di interesse, richiama il contesto relativo e poi espande il caso di studio nel formato S.T.A.R. inverso ("Risultato -> Problema -> Azione"), ottimizzato per la lettura tecnica veloce e per permettere di copiare dati quantitativi senza riformattazione manuale.

### 2. Il Talent Sourcer (Recruiter / HR)
* **Goal:** Capire rapidamente se il profilo merita approfondimento e raccogliere elementi chiari da condividere con gli Hiring Manager.
* **Journey:** Il recruiter accede senza barriere o login, legge un executive summary chiaro e usa navigazione e ricerca per trovare stack, risultati e contesti rilevanti. Espande i dettagli di interesse e usa i frammenti formattati a schermo per un rapido copia e incolla in ATS, email o note di screening.

### 3. L'Autore (Alessio / Admin)
* **Goal:** Inserire e mantenere aggiornato il proprio vissuto professionale riducendo l'attrito e massimizzando la qualità del dato, usando una private pipeline **completamente locale** composta da uno o più agenti o processi offline.
* **Journey (Backend Offline):**
  1. **Input iniziale:** Alessio registra un vocale o appunta note destrutturate dopo una giornata di lavoro.
  2. **Consolidamento privato:** processi locali trasformano gli input in contenuto privato persistito, mantenendo il contesto utile alla revisione futura.
  3. **Knowledge base curatoriale:** il contenuto consolidato viene distillato in una knowledge base curata, integrabile anche con contributi manuali nativi.
  4. **Draft e composizione HyperCV:** la pipeline produce e rifinisce draft di esperienze, progetti e casi S.T.A.R., poi li converte in un catalogo HyperCV finale pronto per la review.
  5. **Human validation:** Alessio revisiona, approva o corregge il contenuto finale prima che diventi sorgente pubblicabile.
  6. **Projection e publish safety:** processi locali generano site-data e pagine statiche bilingui, eseguono i controlli di safety e preparano l'evidence package di release.
  7. **Aggiornamento pubblico:** solo il package statico approvato viene distribuito, senza introdurre interazioni runtime complesse nel MVP.

Questi journey mostrano perche il prodotto combina un'esperienza pubblica leggibile e veloce con un ciclo editoriale privato governato dall'Autore.

## Innovation & Novel Patterns

### Detected Innovation Areas
* **Offline-First AI Pipeline:** la distillazione avviene a monte, fuori dal runtime pubblico, riducendo costi, rischio di leakage e allucinazioni.
* **Canonical HyperCV Catalog:** il CV non e un documento statico ma una vista derivata da un catalogo privato approvato di esperienze, progetti e casi S.T.A.R. riutilizzabili in piu percorsi.
* **Public Engine / Private Data Split:** il motore del sito e della pipeline puo restare pubblico e ispezionabile, mentre i dati reali e i layer editoriali restano nel dominio privato.
* **Contextual Progressive Disclosure:** la navigazione espone prima la domanda e poi la risposta strutturata, favorendo lettura rapida e copy-paste operativo.

### Market Context & Competitive Landscape
Le alternative oggi sono polarizzate tra portfolio statici poco interrogabili e chatbot su CV con rischio di allucinazione, costi runtime e fiducia limitata. HyperCV si posiziona tra questi estremi: esperienza esplorativa guidata, ma con contenuti precompilati, verificabili e serviti da infrastruttura statica.

### Validation Approach
Il modello è stato validato tramite First Principles Analysis: separa chiaramente esigenze di recruiter e valutatori tecnici, senza introdurre complessità cloud nella V1. L'ipotesi verrà considerata valida se il prodotto supera il 40% di deep-dive engagement oltre la view iniziale.

### Risk Mitigation
* **Rischio:** la pipeline locale diventa troppo onerosa da mantenere e rallenta gli aggiornamenti.
* **Mitigazione:** il sistema deve prevedere fallback manuale e automazione minima. Poiché il nucleo resta basato su file editabili localmente, l'Autore può continuare a pubblicare anche in assenza degli agenti AI.

## Web App Specific Requirements & Architecture

### Browser Support Matrix

* La V1 supporta le ultime due major release stabili di Chrome, Edge, Firefox e Safari su desktop.
* La V1 supporta Safari iOS e Chrome Android su smartphone moderni, mantenendo accessibili i flussi core di discovery, cambio lingua, approfondimento e CTA.
* Se un enhancement secondario non e disponibile in un browser supportato, la consultazione del contenuto pubblico deve restare possibile senza perdita del percorso principale.

### Responsive Design

* I flussi core del MVP devono restare utilizzabili da viewport mobili a partire da 360 px di larghezza fino a layout desktop ampi, senza perdita di contenuto essenziale o scroll orizzontale nei contenuti principali.
* Navigazione, ricerca, progressive disclosure, cambio lingua e CTA devono preservare la stessa gerarchia logica su mobile e desktop.

### Architettura di Transizione (V1 $\rightarrow$ V2)

Questa sezione definisce un vincolo di decisione, non una soluzione tecnica definitiva: la V1 deve restare statica e a basso rischio; la Growth puo introdurre runtime e servizi aggiuntivi solo dopo validazione del valore e del costo operativo.

Il principio operativo emerso dalla discovery di sistema e che il contratto chiave non e tra due repository specifici, ma tra un **motore pubblico** e un **dominio dati privato**. Il codice della pipeline, le regole di validazione e il frontend possono restare pubblici; i dati reali, i materiali editoriali e il catalogo canonico restano privati.

#### Fase V1 (Minimum Viable Product):
* **Boundary:** esperienza pubblica statica con contenuti approvati prima del publish.
* **Decision Driver:** massimizzare leggibilita, SEO, semplicita operativa e prevedibilita del rilascio.
* **Esperienza Utente Core:** navigazione gerarchica primaria, ricerca sul corpus statico come modalita secondaria e progressive disclosure su contenuti pubblici in inglese e italiano, mantenute coerenti su desktop e mobile nei browser supportati.
* **Promotion Chain del contenuto:** catalogo HyperCV finale privato -> projection site-data -> static site deployato, con controlli allowlist-based prima di ogni rilascio.
* **Promotion Chain del motore:** evoluzione separata del codice pubblico di pipeline, contratti e frontend, consumabile dal workspace privato senza richiedere che i dati reali entrino nel repository pubblico.

#### Fase 2 (Growth & Backend Migration):
* **Activation Condition:** introduzione opzionale di runtime o servizi aggiuntivi solo dopo validazione della V1.
* **Decision Driver:** il pattern definitivo della Growth resta aperto finche costo operativo e valore delle feature avanzate non sono stati misurati.
* **Capacita aggiuntive:** autenticazione, gating, matching contestuale e altre funzionalita AI runtime.
* **Invariante da preservare:** anche in Growth il confine dati privati -> contenuto pubblico resta governato da policy di publication safety e review esplicita.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy
**MVP Approach:** *Problem-Solving MVP.* L'obiettivo della prima iterazione è dimostrare il valore del formato strutturato S.T.A.R. interattivo, riducendo l'attrito per i veri recruiter che hanno poco tempo. L'assunzione zero è che un portale velocissimo con informazioni condensate pragmaticamente batta un portale narrativo tradizionale. Se l'MVP statico converte (alto tasso di ingaggio in deep-dive), è autorizzato a procedere verso un'architettura backend avanzata (V2).

### Scope Boundaries (In vs Out)

#### Fase 1: Minimum Viable Product (Static Publish)
* **[IN SCOPE] Dominio Privato:** contenuto persistito, knowledge base curata, draft editoriali e catalogo HyperCV finale gestiti esclusivamente nella private pipeline locale dell'Autore.
* **[IN SCOPE] Front-end Web:** generatore statico distribuito come esperienza pubblica a basso costo operativo.
* **[IN SCOPE] Localizzazione Pubblica:** pubblicazione delle pagine statiche in inglese e italiano a partire dalla knowledge base canonica approvata.
* **[IN SCOPE] Esperienza Utente (UX):** dinamica esplorativa a progressive disclosure con contesto esplicito e approfondimento a richiesta.
* **[IN SCOPE] Search sul corpus statico:** ricerca globale su indice statico come modalita secondaria di discovery.
* **[IN SCOPE] Governance di Publish:** release evidence package, review umana dei contenuti modificati e controlli automatici di publication safety prima del deploy.
* **[OUT OF SCOPE]** Nessun database in cloud. Nessun backend operativo live. Nessun log-in. Nessun retrieval semantico, chatbot o inferenza LLM prodotta dalle interazioni degli utenti a run-time.
* **[OUT OF SCOPE]** Pubblicazione di materiali raw, knowledge base private, draft editoriali o altre sorgenti strutturate interne al dominio privato.

#### Fase 2: Growth (Backend Evaluation)
* **[IN SCOPE]** Introduzione di backend e servizi gestiti solo dopo validazione V1.
* **[IN SCOPE]** Autenticazione per gating delle funzionalita avanzate.
* **[IN SCOPE]** Attivazione di inferenza AI real-time per matching e retrieval contestuale.
* **[OUT OF SCOPE]** Sistemi multi-tenancy (se il portale non apre ad altri utenti/portfolio esterni).

## Functional Requirements (MVP V1)

Le sezioni precedenti definiscono il problema, il modello di prodotto, i journey da servire e l'architettura minima che rende credibile la V1. I seguenti requisiti rappresentano quindi il capability contract della V1. Da questo punto il documento passa dalle decisioni di scope ai comportamenti richiesti del sistema e, subito dopo, agli attributi di qualità che ne vincolano l'implementazione.

### Data Ingestion & Distillation (Offline AI Pipeline)
* **FR1:** L'Autore può inserire "memorie" destrutturate (note di testo o vocali) relative alla propria carriera nell'ambiente locale.
* **FR2:** La pipeline locale può consolidare gli input in contenuto privato persistito, preservando il contesto necessario a review e aggiornamenti futuri.
* **FR3:** L'Agente Distillatore (locale) può derivare dal contenuto persistito una knowledge base curata riutilizzabile per il catalogo HyperCV canonico e per le projection pubbliche approvate della stessa release.
* **FR4:** L'Autore può leggere, editare e approvare manualmente i contenuti generati e i contributi manuali nativi che confluiscono nel catalogo canonico.

### Content Assembly & Generation
* **FR5:** La pipeline locale può organizzare il contenuto approvato in un catalogo HyperCV composto da esperienze, progetti e casi S.T.A.R. pronti per la pubblicazione.
* **FR6:** L'Agente Generatore (locale) può riutilizzare lo stesso contenuto canonico approvato nei diversi nodi di navigazione approvati del portale mantenendo coerenza semantica, collegamento alla stessa fonte canonica e assenza di divergenze testuali non approvate tra le viste pubblicate della stessa release.
* **FR7:** Il Sistema locale può pubblicare l'output statico del portale tramite la pipeline di hosting pubblico.
* **FR8:** L'Autore può aggirare gli Agenti (degradazione manuale) ed editare direttamente i contenuti approvati prima della pubblicazione.

### Navigation & Discovery (UX)
* **FR9:** Il Visitatore può accedere a un Executive Summary generale e navigare la carriera tramite cluster logici.
* **FR10:** Il Visitatore può richiamare il contesto di uno stack o di una competenza e vedere la domanda esatta a cui quel contenuto risponde.
* **FR11:** Il Visitatore può eseguire un "click" (Progressive Disclosure) sull'elemento per far espandere il blocco di testo contenente il caso di studio S.T.A.R.
* **FR12:** Il Visitatore può selezionare e copiare i frammenti S.T.A.R. a schermo preservando heading, paragrafi e blocchi elenco sufficienti al riuso in strumenti terzi senza riformattazione sostanziale.
* **FR13:** Il Visitatore può utilizzare una barra di ricerca globale sul corpus statico come modalita secondaria per interrogare l'indice del CV.

### Accessibility, SEO & AI Ingestion
* **FR14:** Il Visitatore con disabilita, cosi come gli strumenti assistivi non visivi, può navigare l'intera alberatura del sito e accedere ai contenuti contestuali e agli approfondimenti.
* **FR15:** Sistemi esterni di crawling e retrieval documentale possono leggere il contenuto pubblico strutturato e recuperare il contenuto principale delle pagine benchmark di release senza dipendere dall'esecuzione di JavaScript client-side.
* **FR16:** I motori di ricerca pubblici possono indicizzare i contenuti professionali esposti in modo che le pagine benchmark di release risultino eleggibili per query professionali prioritarie definite dall'Autore.

### Analytics & Conversion
* **FR17:** Il Sistema web traccia l'engagement misurando percentualmente i visitatori che espandono le descrizioni (Deep-Dive).
* **FR18:** Il Sistema web traccia il "Time-to-Value", calcolando il tempo intercorso al momento del primo click esplorativo.
* **FR19:** Il Visitatore può cliccare su una Call-to-Action primaria di contatto professionale a fine pagina per atterrare direttamente sul profilo LinkedIn.

### Canonical Knowledge, Localization & Reprocessing
* **FR20:** L'Autore può acquisire dati raw in italiano e inglese; lingue ulteriori sono ammesse solo quando il workflow editoriale attivo dichiara supporto esplicito.
* **FR21:** Il sistema di distillazione può creare un catalogo HyperCV canonico monolingua solo a partire da sorgenti eterogenee e contributi manuali che, per la release corrente, abbiano stato `approved`, review umana completata e assenza di finding bloccanti di publishability.
* **FR22:** Il sistema può mantenere un collegamento verificabile tra il catalogo canonico, i contributi che lo compongono e le sorgenti che ne supportano la revisione in modo che, durante la review, l'Autore possa risalire da ogni elemento canonico ad almeno una sorgente o contributo approvato con revisione identificabile.
* **FR23:** L'Autore può ispezionare provenienza, stato di review e componenti approvate del contenuto canonico durante review e decisioni di publish.
* **FR24:** Il sistema di generazione statica può pubblicare varianti di pagina in inglese e italiano a partire dal catalogo canonico approvato, senza esporre i layer editoriali privati.
* **FR25:** Il Visitatore può cambiare lingua mantenendo, quando disponibile, lo stesso contenuto logico o nodo di navigazione.
* **FR26:** Il sistema può rilevare prima del rilascio pubblico placeholder non tradotti, varianti mancanti per pagine richieste e incoerenze manifeste tra nodi equivalenti che impediscono una pubblicazione coerente.
* **FR27:** L'Autore può avviare una rigenerazione selettiva o completa quando cambiano input sorgente o regole di trasformazione approvate.
* **FR28:** Il sistema può pubblicare soltanto uno stato del corpus che sia stato revisionato come coerente per il rilascio pubblico previsto.
* **FR29:** Il sistema può distinguere contenuti gestiti principalmente dalla knowledge base, contenuti manuali e contenuti ibridi assegnando a ogni contenuto una sola classificazione attiva tra `knowledge-base-managed`, `manual-managed` o `hybrid-managed`, visibile in review e rispettata in fase di rigenerazione.
* **FR30:** Il sistema può associare una revisione verificabile ai contenuti canonici e ai riferimenti usati per comporli.
* **FR31:** Il sistema può segnalare quando una composizione approvata diventa stale a causa del cambiamento di una revisione referenziata.
* **FR32:** L'Autore può ispezionare quali revisioni e quali contributi sono stati materializzati nel contenuto pronto per la pubblicazione.

## Non-Functional Requirements

### Performance
* Le interazioni pubbliche principali di navigazione, ricerca sul corpus statico e progressive disclosure devono completarsi entro 100 ms dopo il caricamento iniziale della pagina, misurate nei browser supportati su build di release.
* Le principali pagine pubbliche di benchmark release (homepage, una pagina esperienza rappresentativa e un percorso bilingue con cambio lingua) devono raggiungere un punteggio Lighthouse almeno pari a 95 su mobile e desktop nelle verifiche pre-release.
* Una nuova release pubblica non deve peggiorare di oltre il 10% i tempi di interazione o il peso pagina rispetto alla release pubblica precedente, misurato nel release evidence package.
* Il cambio lingua deve completarsi entro 500 ms su pagine pubbliche gia caricate nei browser supportati.

### Security & Boundary Enforcement
* I controlli pre-publish devono verificare su tutti i contenuti modificati che dati raw, knowledge base private, draft editoriali e materiali di lavorazione non siano inclusi nel package pubblico.
* La build pubblica deve includere soltanto contenuti e projection marcati come pubblicabili tramite policy allowlist-based; ogni elemento privo di approvazione deve essere escluso dal bundle di release, come verificato nel release evidence package per il 100% dei contenuti modificati.
* Il numero di riferimenti privati non autorizzati nel layer pubblico deve essere pari a 0 in ogni review di rilascio.
* Il release evidence package deve confermare che metadata sensibili, riferimenti interni, dettagli coperti da NDA e layer strutturati non destinati alla pubblicazione siano assenti dalle pagine pubbliche modificate.

### Governance & Traceability
* Ogni contenuto pubblicato deve avere uno stato di review, una provenienza verificabile e una revisione identificabile prima del rilascio, come attestato per il 100% dei contenuti modificati dalla checklist di release o da evidenza equivalente allegata al release evidence package.
* L'Autore deve poter risalire da un contenuto approvato ad almeno una sorgente o contributo di supporto durante la review pre-publish.
* Se una revisione referenziata cambia dopo l'approvazione, il contenuto derivato deve essere trattato come stale finché non viene riesaminato.
* Il release evidence package deve verificare stato di review, collegamento di provenienza e revisioni materializzate per il 100% dei contenuti modificati in una release.

### Localization & Content Consistency
* Ogni pagina pubblica in inglese deve avere una variante italiana equivalente oppure un'eccezione esplicita approvata prima del rilascio.
* Il cambio lingua deve preservare lo stesso contenuto logico o nodo di navigazione nel 100% delle pagine bilingui verificate in release QA.
* I controlli pre-release devono rilevare il 100% dei placeholder non tradotti e dei contenuti palesemente incoerenti nelle pagine modificate.

### Accessibility & Machine Readability
* Tutte le interazioni pubbliche principali devono essere utilizzabili via tastiera nei browser supportati durante la QA di release.
* I template pubblici del MVP devono soddisfare WCAG 2.1 AA in review automatizzata e manuale prima della pubblicazione.
* Il release evidence package deve includere snapshot HTML o catture equivalenti con JavaScript disabilitato per homepage, una pagina esperienza rappresentativa e un percorso bilingue, dimostrando che il contenuto pubblico principale resta leggibile senza dipendere dall'esecuzione client-side.

### Validation & Publish Readiness
* I controlli pre-publish devono bloccare la release in presenza di leakage, metadata non ammessi o contenuti incompleti nelle pagine modificate.
* La review umana deve coprire il 100% delle pagine pubbliche modificate in una release.
* Il release evidence package deve dimostrare che il package pubblico non contiene dati raw né riferimenti privati non autorizzati.

### Operability
* Un aggiornamento standard del contenuto pubblicabile deve poter essere completato da un singolo autore-operatore in meno di 30 minuti, esclusa la stesura delle note raw, durante una dry run di processo.
* Un full rebuild del corpus deve poter essere eseguito tramite una checklist end-to-end documentata, senza interventi manuali non descritti e con esito verificabile in dry run completata con successo almeno una volta per ogni modifica sostanziale del workflow.
* Il workflow operativo deve poter essere eseguito in un workspace privato che consuma il motore pubblico senza richiedere che i dati reali entrino nel repository pubblico.
* Il release evidence package e la checklist di rebuild, review e publish devono poter essere eseguiti da un singolo autore usando la documentazione del repository come unica guida operativa.
