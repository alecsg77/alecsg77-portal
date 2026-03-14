---
stepsCompleted: [1, 2, 3, 4, 5, 6]
workflowCompleted: true
inputDocuments: ["_bmad-output/brainstorming/brainstorming-session-2026-02-25.md"]
date: 2026-02-27
author: Alessio
---

# Product Brief: alecsg77-portal

## Executive Summary

Il progetto alecsg77-portal mira a risolvere il problema del "sovraccarico informativo" e del "mancato allineamento di contesto" nel processo di recruiting e di valutazione tecnica per profili senior. Attraverso un portale B2B innovativo, l'esperienza professionale decennale e variegata di Alessio viene trasformata in una base di conoscenza interrogabile dinamicamente. Un assistente IA conversazionale, agendo come "Manager Digitale", funge da intermediario intelligente: estrae, filtra e presenta solo le informazioni rilevanti per le specifiche esigenze del potenziale cliente (CTO, Hiring Manager), superando i limiti del curriculum vitae statico e dimostrando sul campo competenze architetturali avanzate.

---

## Core Vision

### Problem Statement

I professionisti IT con molti anni di esperienza e background eterogenei faticano a comunicare efficacemente il proprio valore tramite formati statici come il CV. Un documento esaustivo risulta troppo lungo e dispersivo, mentre versioni ridotte rischiano di omettere esperienze cruciali per specifici contesti aziendali. Questo crea un problema di comunicazione bidirezionale: il candidato deve indovinare quali informazioni selezionare senza conoscere a fondo le dinamiche interne dell'azienda, e il recruiter/CTO deve faticare per filtrare i dati rilevanti per la propria Job Description o per il proprio core business.

### Problem Impact

- **Per il candidato:** Perdita di tempo nella personalizzazione continua dei CV, rischio di essere scartati per omissione di dettagli rilevanti, difficoltà nel posizionarsi come "problem solver" a tutto tondo.
- **Per l'azienda (Recruiter/CTO):** Difficoltà nell'individuare il "fit" perfetto tra le competenze del candidato e le sfide tecniche specifiche dell'azienda, allungamento dei tempi di valutazione, rischio di perdere talenti validi a causa di una comunicazione inefficace.

### Why Existing Solutions Fall Short

Le soluzioni attuali (CV statici, profili LinkedIn, portfolio tradizionali) si basano su un paradigma di comunicazione "push" e unidirezionale. Richiedono all'utente di leggere passivamente e fare lo sforzo cognitivo di mappare le esperienze del candidato sui propri problemi. Non offrono interattività, non si adattano dinamicamente al contesto di chi legge e non permettono di esplorare le competenze in modo multidimensionale.

### Proposed Solution

Un portale B2B interattivo che funge da hub per la lead generation, alimentato da un motore di estrazione dati (HyperCV) e da un assistente IA conversazionale. L'IA, posizionata come "Manager Digitale" di Alessio, permette agli utenti di interrogare la sua base di esperienze in linguaggio naturale. Il sistema analizza le richieste (es. una Job Description o una specifica sfida architetturale) e restituisce solo i casi studio, le competenze e le "lessons learned" pertinenti, offrendo un'esperienza personalizzata, multilingua e altamente focalizzata sul valore.

### Key Differentiators

- **Interattività Context-Aware (Zero Friction):** L'uso di LLM per estrarre dinamicamente informazioni rilevanti in base al contesto specifico dell'utente. L'interfaccia offre suggerimenti di prompt pre-compilati per azzerare l'attrito iniziale. Inoltre, per chi preferisce un approccio tradizionale, **il CV classico in PDF è sempre disponibile** per il download (tramite form email per lead generation), garantendo che il portale sia un'espansione dell'esperienza e non un ostacolo.
- **Esplorazione Multidimensionale (Drill-Down):** Oltre alla chat, il portale offre una modalità "drill-down" manuale. L'utente può filtrare l'HyperCV per tag (tecnologie, ruoli, sfide). In questa modalità, l'IA agisce solo come classificatore a monte: i frammenti di esperienza presentati mantengono la loro forma originale (es. framework STAR), garantendo sintesi ed esaustività senza alterazioni narrative.
- **Il "Manager Digitale" (Trust by Design):** L'IA non finge di essere il candidato, ma agisce come un agente professionale che presenta oggettivamente i dati. È istruita per citare sempre le fonti e per ammettere chiaramente quando un'informazione non è presente nella base di conoscenza, eliminando il rischio di allucinazioni.
- **Trasparenza Radicale (Open Source):** Il portale stesso è una "Libreria di Pattern Architetturali Vivente". L'intero progetto, inclusi i dati grezzi (Markdown) e il codice sorgente, è **open-source e linkato al repository GitHub**. Questo dimostra concretamente le capacità tecniche di Alessio e prova in modo inconfutabile che l'IA non inventa nulla, ma si limita a riprocessare e classificare informazioni reali.

<!-- Content will be appended sequentially through collaborative workflow steps -->
## Target Users

### Primary Users

**Il Valutatore Tecnico (Il "Time-Poor Reviewer")**
- **Profilo & Contesto:** Può essere un CTO, un VP of Engineering, un Tech Lead o un futuro collega incaricato del colloquio tecnico. Valutare candidati non è il suo lavoro principale: è un'interruzione della sua attività quotidiana. È a corto di tempo, ha un'elevata competenza tecnica e una bassa tolleranza per il "fluff" o le risposte puramente manualistiche.
- **Esperienza del Problema:** È frustrato dai CV tradizionali lunghi o dai profili standard. Per lui scovare informazioni specifiche (es. "capisce davvero le implicazioni di sicurezza nel refactoring di sistemi legacy?") in un PDF passivo richiede troppo tempo. Teme di perdere tempo in interviste con candidati che conoscono la teoria ma mancano di esperienza sul campo ("cicatrici di battaglia"). Esibisce una forte **"Ansia da Risposta Generica"**: teme che l'IA filtri troppo la cruda realtà tecnica, offrendo risposte valide in teoria ma vuote in pratica.
- **Visione di Successo:** Entra sul portale di Alessio, non deve leggere un papiro, ma interroga direttamente l'IA o filtra la dashboard a card ("Hai mai scalato un sistema con questa architettura?"). In pochi secondi riceve casi studio reali (formato STAR) integrati da **Proof of Work** concrete e inequivocabili (fallimenti superati e lezioni apprese). Ottiene l'informazione cruda che gli serve per validare la competenza e torna al suo lavoro con la certezza di volerlo incontrare.

### Secondary Users

**Il Talent Sourcer / Recruiter (Il "Matchmaker")**
- **Profilo & Contesto:** Fa il primo screening per un'azienda cliente o per il reparto HR interno. Deve filtrare molti candidati e fare corrispondere i profili a Job Description (JD) molto tecniche e dettagliate di cui spesso non domina appieno il linguaggio.
- **Esperienza del Problema:** Deve indovinare se l'esperienza pregressa di un candidato si traduce nei requisiti specifici di una nuova JD, rischiando di scartare i migliori o avanzare profili non adatti per via della barriera linguistica. Inoltre, soffre della **"Sindrome del Deliverable Mancante"**: anche se trova il candidato perfetto, ha bisogno di un documento formale e strutturato da inviare agli stakeholder interni o al cliente finale per giustificare la sua scelta. Un'ottima interazione con l'IA non basta.
- **Visione di Successo:** Arriva sul portale, interagisce con il "Manager Digitale" e dà in input la Job Description usandolo come "traduttore". L'IA non solo gli conferma il match, ma gli permette di scaricare un **"Executive Match Report"** (un artefatto generato dinamicamente, es. in PDF) che evidenzia esattamente in base a quali esperienze Alessio soddisfa la JD. Ha il suo deliverable pronto per essere inoltrato.

### Excluded Users (Anti-Personas / Out of Scope)

**Lo Studente / Sviluppatore Junior ("Il Muro di Gomma")**
- **Profilo:** Cerca mentoring gratuito su come diventare un Cloud Architect, usando il portale B2B come tutor per imparare tecnologie o best-practices di settore.
- **Comportamento del Sistema ("Gatekeeping"):** Il "Manager Digitale" è istruito per scoraggiare gentilmente l'utilizzo non-B2B, specificando i limiti commerciali del suo mandato: "Il mio compito è illustrare le competenze di Alessio per potenziali collaborazioni o assunzioni. Per supporto didattico ti suggerisco la documentazione ufficiale".

### User Journey

**Il "Fast-Track" del Valutatore Tecnico e del Recruiter**
1. **Discovery:** L'utente arriva tramite un link generato appositamente per una candidatura (che pre-contestualizza l'IA) o tramite ricerca organica focalizzata su una specifica sfida tecnica.
2. **Onboarding (Zero Attrito):** Atterra su un'interfaccia pulita. Nessun "muro di testo" da leggere. Il "Manager Digitale" (l'IA in terza persona) si presenta in modo professionale e offre opzioni rapide atte a costruire da subito la fiducia (es. "Vuoi caricare la tua Job Description per un matching?").
3. **Core Usage (Drill-Down / Dialogo per l'Autenticità):** L'utente interagisce in base al proprio profilo:
   - Il CTO fa domande esplorative e tecniche sul come sono stati affrontati specifici problemi; se non soddisfatto approfondisce usando i filtri "avanzati" della UI sulle tecnologie usate. **Fondamentale: Il Manager Digitale utilizza un approccio "Anti-Fluff" e il framework STAR Invertito (Risultato -> Problema -> Azione)** per le domande di troubleshooting. Se un CTO chiede di un fallimento o di una criticità, salta i preamboli e fornisce bullet point scansionabili.
   - Il Recruiter fornisce il contesto (JD/azienda) chiedendo una valutazione di compatibilità oggettiva al Manager Digitale di Alessio.
4. **Success Moment (Trust building & Gestione Limiti Dati):**
   - **Scenario Happy Path:** Il CTO apprezza l'onestà intellettuale del "Manager Digitale" e si sofferma positivamente sulle sezioni "Fail Fast / Lessons Learned" che provano le cicatrici "sul campo". Il Recruiter visualizza in pochi secondi il matching perfetto.
   - **Scenario "Mis-Match" Elegante:** Se il Recruiter presenta una JD su domini totalmente esterni alla Knowledge Base aggiornata di Alessio, **l'IA non emette sentenze definitive o di scarto**. Risponde in modo umile e commerciale: *"Sulla base dei dati in mio possesso al momento, non ho trovato tracce di esperienze documentate su questa specifica combinazione di tecnologie nel portfolio di Alessio. Tuttavia, potrebbe aver trattato sfide simili o acquisito conoscenze recenti non ancora indicizzate in questo portale. Ti consiglio di contattarlo direttamente per una verifica accurata tramite call."*
5. **Generazione Lead e Conclusione (Il Deliverable Esportabile):** Convinto dall'esperienza (e/o tramite la generazione di un Executive Match Report in PDF), l'utente compila un breve form o prenota direttamente una call conoscitiva con Alessio, in un processo di vera e propria lead-gen avanzata e pre-filtrata.

## Success Metrics

Il successo di `alecsg77-portal` non si misura in metriche di vanità generaliste (es. "visite totali della pagina"), ma sulla qualità dell'interazione (Leading Indicators) e sull'effettiva generazione di opportunità di alto livello (Lagging Indicators).

### User Success Metrics (Leading Indicators)

Queste metriche ci dicono se il nostro approccio interagente e l'IA "Anti-Fluff" stanno funzionando:

*   **Positive Feedback Rate:** Percentuale di "Helpful" / (Helpful + Unhelpful) forniti dagli utenti tramite i pulsanti di feedback sui singoli messaggi del "Manager Digitale". Target iniziale: \> 80%.
*   **Conversation Depth / Engagement:** Numero medio di domande consecutive poste al chatbot dall'utente. Un numero troppo basso (1) indica "rimbalzo"; un numero equilibrato (3-5) indica un reale interesse e "drill-down" del valutatore.
*   **Time-to-Next-Action (Reactivity):** Tempo medio tra la risposta dell'IA e la successiva query dell'utente. Tempi bassi uniti a interazioni multiple indicano un flusso ad alto ingaggio e risposte chiare (scansionabili).
*   **Artefact Generation Rate:** Percentuale di sessioni chat che si concludono con il download dell' "Executive Match Report" (particolarmente rilevante per il profilo Recruiter).
*   **Retry Rate:** Frequenza di utilizzo del tasto "Riprova/Rigenera" su singola risposta. Un tasso molto alto indica che l'IA non sta centrando il livello di dettaglio o il "tone of voice" desiderato (es. forse mancano i "Fail Fast" nelle risposte).

### Business Objectives (Lagging Indicators)

Queste metriche confermano che il prodotto sta risolvendo il vero problema di Alessio (migliorare la lead generation qualificata e saltare gli step intermedi di screaning del cv standard):

*   **Obiettivo a 6 mesi:** Dimostrare la fattibilità del modello, stabilendo l'hub personale come "prova tangibile" di competenza.
*   **Obiettivo a 12 mesi:** Ridurre drasticamente il tempo investito in colloqui iniziali inutili usando l'hub B2B per pre-filtrare e profilare le aziende con richieste più qualificate.

### Key Performance Indicators (KPIs)

Indicatori di prestazione specifici misurabili mensilmente:

*   **Lead Generation Qualificata:** Numero di contatti/richieste ricevuti tramite il portale ogni mese per colloqui (ruoli Senior/Staff/Principal) e per consulenze (Advisory B2B).
*   **Conversion Rate (MQL/SQL):** Percentuale di visite (visitatori unici che interagiscono con il manager digitale) che si convertono in una richiesta di contatto qualificato o nel download del match report.
## MVP Scope

La strategia inziale si concentra sull'**abbattimento dell'attrito di sviluppo e infrastruttura**, privilegiando un Time-To-Market rapido (max. 4-6 settimane). L'MVP è progettato per validare l'interesse degli utenti (*Time-Poor Reviewer* e *Matchmaker*) per il modello multidimensionale delle competenze (l'HyperCV), senza dover implementare architetture RAG complesse e costose dal primo giorno.

### Core Features (Minimum Viable Product)

*   **Motore HyperCV Offline (Agent Editor STAR Invertito):** Un agente AI locale (script pipeline) eseguito unicamente durante la build del sito. Legge file narrativi o appunti grezzi sui progetti e non si limita ad estrarre dimensioni (Tecnologie, Ruoli, Lessons Learned), ma le "normalizza/riscrive" attivamente applicando il **Framework STAR Invertito** o un copy esplicitamente **Anti-Fluff**. Costringe i blocchi testuali ad andare dritti al sodo (Risultato -> Problema -> Architettura di Soluzione). Costituendo un processo separato assicura la precisione umana pre-rilascio per mezzo di semplice revisione Markdown.
*   **Architettura SSG (Static Site Generation):** Il portale genererà pagine HTML statiche a partire dai dati strutturati e riscritti forniti dall'agente HyperCV, assicurando caricamenti istantanei asincroni, immunità ad attacchi hacker diretti server-side e costi di hosting tendenti allo zero in Vercel/Netlify.
*   **Presenza Narrativa del Digital Manager ("Alpha/Read-Only" mode):** Per mantenere la promessa esperienziale del portale, l'Hero della pagina presenterà un saluto statico ma curato a cura del Digital Manager di Alessio. Gestirà le aspettative dichiarando in modo radicalmente trasparente la sua natura in via di apprendimento offline ("sto catalogando le esperienze passate, sfoglia ciò che ho indicizzato").
*   **UI Dinamica a "Domande Guidate" (Preset Intenzionali):** Un'interfaccia single-page che previene il "blocco del foglio bianco". Invece di filtri vuoti che richiedono sforzo, l'utente clicca su trigger UI a forma di domanda diretta (es. "🛡️ Mostrami come ha risolto disastri legacy", "🚀 Mostrami i successi Cloud-Native"). Le card progetto vengono istantaneamente ri-renderizzate client-side.
*   **Sistema di Telemetria Cloud Native:** Logging degli eventi essenziali (tramite layer gestito come AWS Pinpoint/Azure App Insights integrato asincronamente) per misurare interazioni e conversion form senza oneri complessi sui database.

### Out of Scope for MVP (Non previsti per la V1)

*   **Chatbot Conversazionale Real-RAG:** Nessuna interazione LLM live lato server o prompt a testo libero per gli utenti finali (il bot non "risponde vocalmente" nel browser). Questo azzera i rischi di brand reputation derivanti da allucinazioni non volute su query tecniche fuori target. Se ne discuterà solo superata la validazione V1.
*   **Pagine Dinamiche Pre-Compilate (Referral Personalizzati URL-Param):** Sviluppo di URL univoci generati su specifiche associazioni JD/cliente (es. `/?target_company=X&jd_id=Y`) per pre-adattare le pagine. Nella V1 tutti gli utenti avranno a disposizione lo stesso set di insight di base.
*   **Generazione Auto-PDF dell'"Executive Match Report":** La generazione documentale On-Demand o lo scaricamento di pacchetti "Resume dinamico per HR" è posticipato a feature successive. Resta garantito un form base di contatto diretto "Call to Action".

### MVP Success Criteria

La V1 dell'MVP sarà considerata un successo e innescherà le approvazioni di investimento (tempo) per la V2 se:

1.  **Validazione Pipeline:** L'agente locale riesce, in un comando singolo, a eseguire parsing, format copy STAR, arricchimento frontmatter e attivazione dell'SSG senza rotture bloccanti e con revision post-build umana ridotta a under-5 min per inserzione.
2.  **Validazione Traffico (Engagement a "Domanda Guidata"):** Almeno il 15% degli utenti che non fanno Bounce immediato cliccano intenzionalmente i Preset delle domande e analizzano Card di profondità (non solo la prima top down).
3.  **Deployment Pratico Estremo:** Piattaforma distribuita in Production con tempi Cloud di calcolo pari a zero in request handling (Full Cache).

### Future Vision (Versioni V2+)

*   **Implementazione Full Conversational (Il "Digital Manager" Live RAG):** Chat in tempo reale dove l'AI elabora live i dati HyperCV indicizzati in un database vettoriale, mantenendo in modo autonomo il tono "anti-fluff" senza necessità di preset hard-coded, con risposte puntuali su "How-To pregressi".
*   **Deep Customization Routing:** Connessione ad uno scraper di Link/In di Job Description lato recruiter col fine di istanziare Landing Page custom dedicate che incrociano il "Match Score" tra la JD estratta e le Card-skills su dominio pubblico.
*   **Generatore di Artefatti On-Demand:** Motore per un export nativo PDF che condensa chat session di successo in invii diretti formali a terze parti aziendali (come Executive Report).
