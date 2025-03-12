# Gestione Chiavi in Magazzino

Questo programma gestisce le chiavi in un magazzino, tenendo traccia delle chiavi disponibili, assegnandole ai collaboratori e mantenendo uno storico delle assegnazioni.

## Funzioni Principali

### Home
- **Benvenuto**: Pagina principale di benvenuto.

### Case
- **Visualizzazione**: Elenco delle case con chiavi disponibili.
- **Aggiungi**: Aggiunta di una nuova casa.
- **Modifica**: Modifica dei dettagli di una casa esistente.
- **Cancella**: Rimozione di una casa dall'elenco.

### Collaboratori
- **Visualizzazione**: Elenco dei collaboratori.
- **Aggiungi**: Aggiunta di un nuovo collaboratore.

### Assegnazioni
- **Visualizzazione**: Elenco delle assegnazioni di chiavi.
- **Assegna**: Assegnazione di una chiave a un collaboratore.
- **Convalida**: Conferma dell'assegnazione e aggiornamento dello storico.

### Dati
- **Salva**: Esportazione dei dati in un file JSON.
- **Carica**: Importazione dei dati da un file JSON.
- **Percorso**: Impostazione del percorso dei dati (da implementare).

### Storico
- **Visualizzazione**: Storico delle assegnazioni e riconsegne delle chiavi.

## Script Principali

### Navigazione
- **showPage(pageId)**: Mostra la pagina corrispondente all'ID e nasconde le altre.

### Case
- **showAddCasaForm()**: Mostra il modulo per aggiungere una nuova casa.
- **addCasa()**: Aggiunge una nuova casa all'elenco.
- **editCasa(id)**: Modifica i dettagli di una casa esistente.
- **deleteCasa(id)**: Rimuove una casa dall'elenco.

### Collaboratori
- **addCollaboratore()**: Aggiunge un nuovo collaboratore.

### Assegnazioni
- **showAssegnaChiaveForm()**: Mostra il modulo per assegnare una chiave.
- **assegnaChiave()**: Genera un report dell'assegnazione e mostra la sezione del report.
- **convalidaAssegnazione(casaId, collaboratoreId, dataAssegnazione, quantitaAssegnata)**: Convalida l'assegnazione di una chiave e aggiorna lo storico.
- **returnKey(casaId, dataAssegnazione)**: Aggiorna il numero di chiavi in ufficio e registra la data di riconsegna nello storico.

### Utilità
- **populateDropdowns()**: Popola i menu a discesa con i dati delle case e dei collaboratori.
- **getCaseData()**: Recupera i dati delle case.
- **getCollaboratoriData()**: Recupera i dati dei collaboratori.
- **getAssegnazioniData()**: Recupera i dati delle assegnazioni.
- **getStoricoData()**: Recupera i dati dello storico.
- **setCaseData(data)**: Imposta i dati delle case.
- **setCollaboratoriData(data)**: Imposta i dati dei collaboratori.
- **setAssegnazioniData(data)**: Imposta i dati delle assegnazioni.
- **setStoricoData(data)**: Imposta i dati dello storico.
