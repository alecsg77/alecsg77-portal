# Definizione della pipeline privata

Questo documento descrive il modello logico della pipeline privata. Non e' una specifica implementativa: serve a fissare classi, boundary, transizioni e vincoli semantici.

L'idea centrale e' questa: la `knowledge-base` e' il centro del sistema; l'HyperCV e' una sua proiezione editoriale privata; `site-data` e' la proiezione privata per il web; il deployed static site e' l'unico artefatto pubblico.

## Modello di validazione

Le validazioni di questo documento vanno lette come classi di controllo riusabili, non come una famiglia separata e duplicata per ogni singola classe di dati.

Regole generali:

- `raw` ha solo controlli minimi di ingestione; le vere validazioni governate iniziano da `deep-knowledge` in poi
- le classi di validazione gia' emerse in questo modello sono: ingestione minima, strutturale, lineage e provenance, qualita' semantica, consistenza logica e disambiguazione, review e approval, policy e governance, content safety, projection integrity, publish safety, release coherence, accessibilita' e performance
- ogni classe di dati dichiara quali classi di validazione sono rilevanti per il proprio ruolo e puo' aggiungere vincoli piu' specifici o piu' restrittivi senza introdurre una tassonomia parallela
- le pipeline e le trasformazioni possono riusare le stesse classi di validazione, ma lo fanno in forma contestuale alla transizione: verificano precondizioni, invarianti locali e postcondizioni minime necessarie a produrre il risultato
- la validazione di trasformazione e' per definizione parziale rispetto alla validazione completa della classe target: puo' controllare solo il sottoinsieme necessario a trasformare e a rendere reviewable il risultato intermedio
- non e' ammesso un contrasto semantico tra trasformazione e classe target: una trasformazione puo' essere meno completa o piu' locale, ma non puo' dichiarare valido un artefatto che la classe target considererebbe invalido o fuori perimetro
- dopo ogni trasformazione vanno rieseguite le validazioni rilevanti della classe risultante; eventuali restrizioni aggiuntive della classe prevalgono sempre sui controlli parziali della pipeline
- in review conta sempre la validita' completa della classe revisionata, non il solo fatto che la trasformazione a monte sia terminata senza errori
- negli obiettivi di validazione di classi e transizioni, le stesse etichette vanno lette come applicazioni locali di questa tassonomia comune: non ne ridefiniscono il significato generale, ma precisano solo il ruolo specifico nel punto della pipeline
- `projection integrity` non e' una proprieta' astratta valida in assenza di una sorgente confrontabile: appartiene prima di tutto alle transizioni, e resta come vincolo di classe solo dove il layer richiede per definizione una fonte persistita e verificabile
- `qualita' semantica` valuta chiarezza, densita' utile e riusabilita' del contenuto nel ruolo della classe; non sostituisce i controlli di fedelta' alla sorgente, di non contraddizione o di sicurezza del contenuto
- `consistenza logica e disambiguazione` verifica che un artefatto non contenga contraddizioni interne, sovrapposizioni semanticamente ambigue o formulazioni che un LLM non possa trattare in modo affidabile e non ambiguo
- `content safety` e' una classe distinta da `qualita' semantica`: governa vincoli generali di linguaggio e contenuto non ammissibile indipendentemente dalla qualita' informativa; diventa obbligatoria dal punto in cui un contenuto entra nel flusso governato per riuso, proiezione o pubblicazione

## Classi

### 1. `raw`

Materiale di ingresso non ancora convertito: audio, note, trascrizioni, frammenti copiati, sottotitoli o altri input non strutturati.

Non e' una classe persistita governata, non e' fonte di verita' downstream e non e' pubblicabile.

Obiettivi di validazione:

- strutturale: materiale gia' in markdown oppure convertibile a markdown con un meccanismo definito, senza ricostruzione manuale arbitraria
- policy e governance: impedire che l'input grezzo venga trattato come boundary governato o fonte autorevole downstream

### 2. `deep-knowledge`

Primo boundary persistito e governato del sistema. E' memoria privata append-only in markdown, utile quando serve sedimentare materiale sparso prima della vera compressione.

Sottoclassi:

- `deep-knowledge-current`: materiale ancora da processare verso `knowledge-base-candidate`
- `deep-knowledge-archived`: materiale gia' processato e archiviato per tracciabilita'

Non e' un layer obbligatorio. Serve quando conviene mantenere una memoria privata persistita, ampia e anche ridondante, prima del consolidamento.

Obiettivi di validazione:

- strutturale: contenuto persistito in una forma markdown stabile e leggibile come boundary durevole
- policy e governance: mantenere `deep-knowledge` nel ruolo di memoria persistita privata senza riclassificarla come contenuto canonico

### 3. `knowledge-base-candidate`

Layer privato di proposta: contenuto abbastanza pulito e strutturato da poter essere revisionato, ma non ancora approvato per il downstream.

Puo' ricevere contributi derivati da `deep-knowledge` o contributi manuali gia' abbastanza maturi da entrare direttamente in review.

Il candidato non e' necessariamente atomico: puo' contenere piu' unita' o porzioni valutabili separatamente, e la review puo' promuovere, deprecare o scartare anche solo parti del contributo.

Esiti possibili:

- promozione totale o parziale a `knowledge-base-current`
- promozione totale o parziale a `knowledge-base-deprecated`
- scarto totale o parziale

Obiettivi di validazione:

- strutturale: contributo abbastanza consistente da entrare in review senza ricostruzione implicita
- lineage e provenance: candidato ricondotto a monte a un livello adeguato a giustificarne il contenuto
- qualita' semantica: contenuto gia' abbastanza chiaro e pulito da poter essere riusato downstream se approvato
- review e approval: promozione, deprecazione o scarto solo tramite review governata, anche frammentata per parti del contributo
- content safety: impedire che nella review governata entrino contenuti non ammissibili

### 4. `knowledge-base`

Spazio privato governato e riusabile che costituisce il centro del sistema. Il suo cuore e' l'informazione, non una forma obbligatoria unica.

Sottoclassi:

- `knowledge-base-current`: parte assertiva approvata per il downstream
- `knowledge-base-deprecated`: parte negativa governata che registra cio' che non deve rientrare nel downstream

Le due partizioni hanno pari dignita' semantica, ma ruoli diversi. `current` fornisce contenuto positivo; `deprecated` fornisce esclusioni, vincoli e controlli di non reintroduzione.

La knowledge-base non dovrebbe ricevere editing manuale diretto: i contributi manuali passano da `knowledge-base-candidate`. Possono viverci anche frammenti, draft o predecessori orientati all'HyperCV, ma solo se restano conoscenza privata governata e riusabile oltre un singolo output finale. Se invece un intervento rappresenta una scelta editoriale locale, una formulazione target o una correzione valida solo per uno specifico HyperCV generato, appartiene a `hypercv-base` o a `hypercv-refinement`, non alla knowledge-base.

La regola pratica e' questa: se un intervento cambia cio' che il sistema deve sapere, affermare, negare o impedire nel downstream, allora e' manutenzione della knowledge-base; se cambia solo composizione, ordine, sintesi o formulazione di contenuto gia' supportato, allora e' refinement.

Obiettivi di validazione:

- strutturale: forma forte, governata e non ambigua, maneggiabile da un LLM senza ricostruzione implicita del significato
- lineage e provenance: ogni elemento ricondotto a monte a un livello adeguato a sostenerne uso e manutenzione
- qualita' semantica: contenuto stabile, chiaro e davvero riusabile nel downstream, non rumore o draft mascherato
- consistenza logica e disambiguazione: nessuna contraddizione interna, collisione interpretativa o ambiguita' che renda la classe non affidabile; se presenti, la classe e' invalida
- review e approval: rendere esplicito e governato il confine tra cio' che e' `current` e cio' che e' `deprecated`
- policy e governance: impedire che la knowledge-base diventi un'area di editing manuale fuori dal flusso di review
- content safety: applicare i vincoli generali di sicurezza al materiale governato che entra nel centro riusabile del sistema

### 5. `hypercv-base`

Prima materializzazione privata dell'HyperCV, generata direttamente dalla knowledge-base secondo il `hypercv-docs-spec`, il `hypercv-distillation-profile` e le regole del software.

E' la base rigenerabile su cui si applicano le raffinazioni. Non e' ancora il contenuto canonico finale e non deve diventare il luogo di editing manuale persistito.

Per essere davvero spiegabile, `hypercv-base` deve portare almeno provenance minima sufficiente a ricostruire da che cosa nasce: revisione o snapshot della knowledge-base usata, versione del `hypercv-docs-spec`, versione del `hypercv-distillation-profile` applicato e riferimenti minimi ai vincoli rilevanti ereditati dalla parte deprecated quando questi hanno inciso sull'esclusione di contenuti.

Obiettivi di validazione:

- strutturale: conformita' di `hypercv-base` al `hypercv-docs-spec`; le sezioni presenti devono rispettarne l'obiettivo. Parti mancanti sono ammesse solo se non compromettono riconoscibilita' o valore; un documento vuoto o irriconoscibile e' invalido
- lineage e provenance: registrare revisioni e input necessari a spiegare da quale knowledge-base, spec e profilo la base nasce
- review e approval: rendere la base revisionabile come artefatto generato, senza confonderla con un final approvato
- policy e governance: mantenere `hypercv-base` distinguibile sia dalle regole pubbliche di generazione sia dal contenuto finale canonico
- qualita' semantica: base coerente come primo distillato della knowledge-base, non riscrittura arbitraria
- content safety: impedire che la base introduca o mantenga formulazioni non ammissibili

### 6. `hypercv-refinement`

Layer privato che persiste le modifiche editoriali riapplicabili da `hypercv-base` a `hypercv-final`.

Le raffinazioni non sono editing libero del final: sono patch semantiche governate e riapplicabili su una nuova base rigenerata. Possono intervenire su tono, ordine, enfasi, aggregazione, sintesi e micro-riformulazioni, ma non introducono nuova conoscenza e non sostituiscono la manutenzione della knowledge-base.

La loro rappresentazione operativa dipende dalla `patch-grammar`, ma il vincolo semantico resta interno a questo modello: una patch puo' rifinire forma e organizzazione, non ampliare il perimetro di conoscenza supportato. Il test pratico e' semplice: togliendo la patch deve restare intatto cio' che il sistema considera valido e deve cambiare solo come quel contenuto viene composto, ordinato, sintetizzato o formulato.

La patch valida e' sempre quella corrente tra ultima `hypercv-base` e ultimo `hypercv-final` approvato. Patch precedenti possono esistere come storico o contesto ausiliario per intenti ricorrenti, diagnosi di conflitti o riconoscimento di pattern, ma non sono normative: non possono essere riapplicate implicitamente, cumulate come fonte parallela o usate per estendere il contenuto ammesso oltre knowledge-base e patch corrente.

Se la stessa classe di correzione ricompare in modo stabile su piu' basi rigenerate e la sua giustificazione non dipende da nuova conoscenza privata, il problema non appartiene piu' solo al refinement: diventa evidenza per una modifica del `hypercv-distillation-profile` oppure, se tocca la forma canonica del documento o il significato delle sezioni, del `hypercv-docs-spec`.

Obiettivi di validazione:

- strutturale: ogni raffinazione deve essere rappresentabile nella `patch-grammar`, applicabile a punti o blocchi riconoscibili della base e compatibile con la struttura attesa dell'HyperCV
- lineage e provenance: tracciare ogni patch rispetto alla revisione di `hypercv-base` su cui e' nata
- review e approval: rendere ogni raffinazione ispezionabile come differenza editoriale esplicita e non come modifica opaca del final
- policy e governance: imporre che la rigenerazione segnali i conflitti invece di perdere o assorbire modifiche editoriali
- qualita' semantica: impedire che il refinement introduca contenuto non supportato dalla knowledge-base
- consistenza logica e disambiguazione: impedire che l'insieme delle patch produca contraddizioni o incompatibilita' con struttura e vincoli dell'HyperCV
- content safety: impedire che il refinement introduca, mantenga o amplifichi contenuti non ammissibili

### 7. `hypercv-final`

Materializzazione canonica privata usata come fonte di verita' per pubblicazione e riuso.

Nasce da `hypercv-base` piu' `hypercv-refinement`. Non ammette modifiche manuali dirette.

Le leve di cambiamento sono quattro e non sono equivalenti:

- cambiare la knowledge-base significa cambiare i dati privati sorgente
- cambiare il `hypercv-docs-spec` significa cambiare il contratto strutturale e semantico della famiglia documentale HyperCV
- cambiare il `hypercv-distillation-profile` significa cambiare le regole pubbliche di generazione del base entro quel contratto
- cambiare `hypercv-refinement` significa cambiare le correzioni editoriali private riapplicabili

Il risultato non deve essere identico parola per parola a ogni rigenerazione, ma deve restare semanticamente stabile. Piccole variazioni lessicali sono accettabili; drift semantico, cambi di scope, enfasi o contenuto no. In pratica, le differenze tra due final lessicalmente diversi si leggono cosi':

- ammissibili: cambiano formulazione, fluidita', micro-sintesi o ordine locale senza cambiare claim, copertura o gerarchia semantica del contenuto
- sospette: cambiano macro-ordine, peso relativo, livello di enfasi o grado di sintesi in modo tale da richiedere review esplicita per confermare che il significato resti equivalente
- non ammissibili: introducono o rimuovono claim, alterano scope, cambiano fatti, spostano confini interpretativi o degradano il contenuto supportato dalla knowledge-base

`hypercv-final` deve restare tracciabile almeno a revisione di `hypercv-base`, revisione di `hypercv-refinement`, versione del `hypercv-docs-spec` e versione del `hypercv-distillation-profile`.

Obiettivi di validazione:

- strutturale: piena compatibilita' di `hypercv-final` con struttura e semantica di sezione definite dal `hypercv-docs-spec`, senza parti obbligatorie mancanti o sezioni semanticamente improprie
- lineage e provenance: registrare le revisioni rilevanti necessarie a ricostruire come il final e' stato prodotto
- review e approval: confermare che il final sia approvabile e quindi usabile per pubblicazione e riuso
- policy e governance: mantenere `hypercv-final` come unica fonte canonica privata senza editing diretto fuori flusso
- qualita' semantica: coerenza del contenuto finale sul piano semantico, non solo testuale
- consistenza logica e disambiguazione: impedire contraddizioni, collisioni interpretative o riempimenti sezione-contenuto semanticamente incompatibili
- content safety: applicare i vincoli generali di sicurezza prima di considerare il final idoneo a pubblicazione e riuso

### 8. `site-data`

Proiezione web privata bilingue derivata da `hypercv-final`.

Risolve route, locale, rendering, search e superfici pubbliche prima del delivery frontend. E' rigenerabile, subordinata a `hypercv-final` e non e' un layer di authoring. La sua forma concreta puo' dipendere dalla `user-persona`, ma non puo' alterare il contenuto canonico da cui deriva.

Obiettivi di validazione:

- strutturale: `site-data` deve avere una forma coerente con route, locale, rendering e search richiesti dal delivery
- lineage e provenance: ogni elemento rilevante deve restare tracciabile a `hypercv-final`
- projection integrity: la proiezione non puo' introdurre semantica pubblicabile non supportata dal canonico
- publish safety: il layer deve essere gia' adatto al rendering frontend senza semantic repair nel delivery
- policy e governance: evitare che `site-data` venga trattato come source of truth invece che come proiezione rigenerabile
- content safety: garantire che il layer proiettato rispetti i vincoli generali di sicurezza prima del delivery pubblico

### 9. `deployed static site`

Unico artefatto runtime pubblico della pipeline.

E' puro delivery del contenuto gia' deciso a monte e non deve contenere classi private.

Obiettivi di validazione:

- strutturale: verificare che il package risultante sia effettivamente deployabile come artefatto runtime pubblico
- publish safety: garantire che il delivery contenga solo artefatti pubblici ammessi ed escluda materiale privato
- release coherence: confermare che l'artefatto soddisfi le aspettative minime di una release coerente

## Dipendenze esterne

I concetti qui sotto non fanno parte del modello dati della private pipeline. Questa sezione dichiara solo l'interfaccia minima con cui la pipeline privata consuma o subisce dipendenze dal lato pubblico del sistema.

### `user-persona`

Concetto esterno che guida il passaggio da `hypercv-final` a `site-data`.

Decide esposizione, percorsi e livelli di dettaglio. Agisce solo nella proiezione verso `site-data`, non nella generazione canonica di `hypercv-final` ne' nella semantica della knowledge-base. Puo' cambiare presentazione, selezione di superfici e granularita' espositiva, ma non il contenuto canonico o i claim supportati.

### `patch-grammar`

Concetto esterno del software pubblico che definisce quali operazioni editoriali sono rappresentabili, estraibili, riapplicabili e validabili.

`hypercv-refinement` dipende da questa grammatica. La replayability richiede operazioni ancorate alla struttura del base, non modifiche libere non ricostruibili; le operazioni ammesse devono restare compatibili con il vincolo che la patch non introduce nuova conoscenza. La definizione generale resta fuori scope.

### `hypercv-docs-spec`

Concetto esterno del software pubblico che definisce il contratto strutturale e semantico della famiglia documentale HyperCV.

In una tassonomia piu' generale, questo concetto va letto come il caso specifico HyperCV della famiglia `docs-spec`. In questo documento il nome normativo e unico e' `hypercv-docs-spec`; non vengono introdotti alias concorrenti.

Lo spec governa almeno tipologie documentali ammissibili, sezioni ammissibili, obiettivo dichiarato di ogni sezione, vincoli di riempimento, cardinalita', obbligatorieta', relazioni tra sezioni e criteri minimi con cui un artefatto puo' essere riconosciuto come documento HyperCV valido nel proprio tipo. La struttura di significato delle sezioni appartiene a questo layer, non al profilo di distillazione. Per il modello privato conta che lo spec sia versionato e abbastanza stabile da rendere verificabile la conformita' strutturale e semantica sia di `hypercv-base` sia di `hypercv-final`. La famiglia generale delle specifiche documentali resta fuori scope.

### `hypercv-distillation-profile`

Concetto esterno del software pubblico che definisce le regole di generazione di `hypercv-base` a partire dalla knowledge-base per il caso specifico HyperCV.

La distillazione verso HyperCV dipende da questo profilo versionato e dal `hypercv-docs-spec` a cui il profilo deve conformarsi. Il profilo governa almeno selezione, prioritizzazione, ordinamento, sintesi, densita', strategie di aggregazione e vincoli editoriali stabili del base generato. Non definisce la forma canonica dell'HyperCV, ma il comportamento con cui la knowledge-base viene trasformata in una prima materializzazione compatibile con lo spec documentale. Per il modello privato conta che il profilo sia identificabile come input di generazione e abbastanza stabile da rendere spiegabile perche' un certo base e' nato in quella forma. La famiglia generale dei profili di distillazione resta fuori scope.

## Transizioni

Non tutte le transizioni sono obbligatorie in ogni scenario. In particolare `deep-knowledge` e `knowledge-base-candidate` restano layer opzionali. Quando una transizione esiste deve avere un senso preciso e validazioni proprie.

Le validazioni di transizione non sostituiscono quelle della classe di arrivo: verificano precondizioni, coerenza minima del risultato e reviewability, mentre la classe target conserva sempre il giudizio completo di validita'.

### 1. `raw` -> `deep-knowledge-current`

Conversione del materiale grezzo nel primo boundary persistito, con significato preservato e senza nuova semantica.

Questa e' una trasformazione di formato, non una riscrittura. Deve preservare il significato e, per quanto possibile, anche la forma verbale del contenuto.

Va mantenuta tutta l'informazione della sorgente. Si possono rimuovere solo marker tecnici o ridondanze di formato che non aggiungono informazione utile nel boundary di arrivo. Per esempio, da un VTT si possono eliminare intestazioni tecniche, numerazioni di cue, spezzature artificiali di riga, duplicazioni di formato e timestamp non necessari; il testo risultante deve restare aderente al contenuto verbale della sorgente. Da audio a markdown vanno mantenuti intercalari, esitazioni, ripetizioni e autocorrezioni quando fanno parte di cio' che e' stato detto; pause e silenzi non informativi non devono essere rappresentati.

Obiettivi di validazione:

- strutturale minima: conversione o normalizzazione in markdown persistibile tramite un meccanismo definito, rimuovendo solo la struttura ridondante del formato sorgente
- policy e governance: garantire che l'ingresso in `deep-knowledge-current` non promuova impropriamente il contenuto a classe governata downstream
- projection integrity: la conversione deve preservare significato e contenuto verbale della sorgente senza introdurre nuova semantica, parafrasi, pulizia stilistica o omissioni non giustificate; sono ammessi solo marker tecnici o ridondanze rimossi e l'assenza di pause o silenzi non informativi

### 2. `deep-knowledge` -> `knowledge-base-candidate`

Compressione iniziale del materiale persistito in contributi piu' puliti e governabili.

La base primaria e' `deep-knowledge-current`; il resto della knowledge-base serve come contesto per deduplicazione, rilevanza ed esclusione. `knowledge-base-deprecated` agisce come veto semantico. Il risultato deve portare informazione nuova o un arricchimento realmente utile, non un duplicato mascherato.

Obiettivi di validazione:

- strutturale: risultato abbastanza pulito e governabile da poter entrare in review come candidato
- lineage e provenance: mantenere ricostruibile il legame tra il candidato e il materiale persistito da cui deriva
- qualita' semantica: la compressione deve produrre un contributo piu' chiaro e riusabile senza degradare il significato utile
- review e approval: risultato adatto a un esito governato di approvazione, deprecazione o scarto anche per parti distinte del contributo
- policy e governance: evitare che questa compressione venga trattata come approvazione implicita o come bypass del flusso di review
- projection integrity: impedire che la trasformazione aggiunga semantica nuova non giustificata dal materiale a monte
- content safety: impedire che la compressione renda candidabili contenuti che violano le policy generali

### 3. `knowledge-base-candidate` -> `knowledge-base-current` / `knowledge-base-deprecated` / scarto

Chiusura del flusso di review.

`current` raccoglie cio' che e' utile nel downstream presente; `deprecated` raccoglie cio' che deve restare governato come escluso o non piu' ammissibile; lo scarto elimina cio' che non merita persistenza governata. La review puo' operare in modo non atomico: un singolo candidato puo' essere spezzato in porzioni con esiti diversi, pur mantenendo un'unica decisione governata e ricostruibile.

Obiettivi di validazione:

- review e approval: esito del candidato esplicito e governato tra promozione, deprecazione e scarto
- policy e governance: solo il contenuto realmente approvato entra in `knowledge-base-current`; il resto viene trattato coerentemente
- lineage e provenance: preservare la motivazione e la ricostruibilita' della decisione presa sul candidato
- qualita' semantica: cio' che viene promosso o deprecato deve avere un perimetro semantico chiaro e coerente
- consistenza logica e disambiguazione: impedire che la review promuova o deprechi porzioni che introdurrebbero contraddizioni o ambiguita' chiare
- content safety: applicare i vincoli generali di sicurezza alle porzioni che entrano nelle partizioni governate della knowledge-base

### 4. `knowledge-base` -> `hypercv-base`

Generazione diretta della prima base HyperCV a partire dalla knowledge-base tramite `hypercv-docs-spec` e `hypercv-distillation-profile` versionati.

`knowledge-base-current` fornisce il contenuto assertivo; `knowledge-base-deprecated` continua a operare come vincolo negativo e controllo di non reintroduzione. Quando il lato deprecated ha escluso contenuti che sarebbero altrimenti candidabili nel distillato, la provenance minima della base deve renderlo ricostruibile.

Obiettivi di validazione:

- strutturale: la distillazione deve produrre una `hypercv-base` conforme al `hypercv-docs-spec` e riconoscibile come artefatto generato, non come editing manuale nascosto
- lineage e provenance: registrare snapshot, spec, profilo e vincoli rilevanti necessari a spiegare come la base e' stata generata
- qualita' semantica: il distillato deve restare coerente come primo output editoriale riusabile e non degradare il valore informativo selezionato
- projection integrity: assicurare che la distillazione non introduca nuova semantica non supportata dalla knowledge-base, inclusi i vincoli negativi del lato deprecated
- review e approval: rendere la base revisionabile come primo risultato HyperCV prima delle raffinazioni
- policy e governance: impedire che il passaggio dissolva la separazione tra conoscenza privata governata e output editoriale generato
- content safety: garantire che la generazione non faccia emergere nel base formulazioni non ammissibili

### 5. `hypercv-base` + `hypercv-refinement` -> `hypercv-final`

Applicazione delle raffinazioni persistite alla base rigenerata fino a ottenere il contenuto canonico finale.

La rigenerazione deve poter riapplicare le patch sulla nuova base entro i vincoli rappresentazionali della `patch-grammar`. Se l'operazione non e' pulita, il conflitto deve essere segnalato esplicitamente e il final non e' approvabile finche' non viene risolto. La persistenza di correzioni dello stesso tipo attraverso rigenerazioni successive e basi diverse e' un segnale di confine: puo' indicare che la regola deve migrare dal solo refinement a una modifica del `hypercv-distillation-profile` oppure, se tocca il contratto del documento, del `hypercv-docs-spec`.

Obiettivi di validazione:

- strutturale: base e refinement devono potersi combinare in modo valido e ripetibile per materializzare un final pienamente compatibile con la struttura attesa
- lineage e provenance: mantenere tracciabili le revisioni di base, patch, spec e profilo che hanno prodotto il final
- review e approval: confermare che il risultato rigenerato sia ancora approvabile come contenuto canonico
- policy e governance: imporre che conflitti o riapplicazioni non pulite emergano esplicitamente invece di essere nascosti dal processo
- qualita' semantica: il final risultante deve restare semanticamente equivalente al contenuto supportato
- consistenza logica e disambiguazione: impedire che la combinazione di base e refinement produca contraddizioni, ambiguita' strutturali o riempimenti semanticamente impropri
- content safety: confermare che il final rigenerato resti conforme alle policy generali di sicurezza

### 6. `hypercv-final` + `user-persona` -> `site-data`

Proiezione del contenuto canonico privato in un layer web-oriented, localizzato e renderabile.

`user-persona` guida la proiezione, ma non introduce nuova semantica e non puo' alterare claim o contenuto canonico.

Obiettivi di validazione:

- strutturale: la proiezione deve produrre un layer web-oriented coerente con localizzazione, route e rendering richiesti
- lineage e provenance: ogni elemento proiettato deve restare riconducibile al final canonico da cui deriva
- projection integrity: impedire che l'uso di `user-persona` alteri claim o introduca nuova semantica
- publish safety: il risultato deve essere pronto per il frontend senza correggere il significato nel delivery
- policy e governance: mantenere `site-data` subordinato a `hypercv-final` e non trasformarlo in un nuovo layer autorevole
- content safety: confermare che la proiezione non reintroduca contenuti non ammissibili o formulazioni contrarie alle policy generali

### 7. `site-data` -> `deployed static site`

Passaggio dal layer web privato all'unico artefatto runtime pubblico.

Obiettivi di validazione:

- publish safety: garantire che il sito deployato esponga solo contenuto pubblico ammesso
- accessibilita' e performance: verificare che il runtime pubblico soddisfi le aspettative minime di fruibilita' tecnica
- release coherence: confermare che l'artefatto pubblicato sia coerente con la release che intende rappresentare
