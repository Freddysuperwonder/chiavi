// ...existing code...

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.riconsegna-chiave').forEach(button => {
        button.addEventListener('click', function() {
            // ...existing code...

            // Ottieni l'ID della casa associata al pulsante
            const casaId = this.dataset.casaId;

            // Incrementa le chiavi in ufficio
            incrementaChiaviInUfficio(casaId);

            // ...existing code...
        });
    });
});

// Funzione per incrementare le chiavi in ufficio
function incrementaChiaviInUfficio(casaId) {
    const casaRow = document.querySelector(`#caseTable tbody tr[data-id="${casaId}"]`);
    if (casaRow) {
        const chiaviInUfficioCell = casaRow.querySelectorAll('td')[1];
        console.log(`Chiavi in ufficio prima dell'incremento: ${chiaviInUfficioCell.innerText}`);
        chiaviInUfficioCell.innerText = parseInt(chiaviInUfficioCell.innerText) + 1;
        console.log(`Chiavi in ufficio dopo l'incremento: ${chiaviInUfficioCell.innerText}`);
    } else {
        console.error(`Casa con ID ${casaId} non trovata.`);
    }
}

// Funzione per aggiornare le chiavi in ufficio dopo il caricamento di un file di archivio
function aggiornaChiaviInUfficio() {
    const caseData = getCaseData();
    caseData.forEach(casa => {
        const casaRow = document.querySelector(`#caseTable tbody tr[data-id="${casa.id}"]`);
        if (casaRow) {
            const chiaviInUfficioCell = casaRow.querySelectorAll('td')[1];
            chiaviInUfficioCell.innerText = casa.chiaviInUfficio;
        }
    });
}

// ...existing code...
