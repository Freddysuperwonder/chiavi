let caseId = 1;
let collaboratoriId = 1;
let assegnazioniId = 1;
let dataPath = 'data.json';

const caseTable = document.getElementById('caseTable').getElementsByTagName('tbody')[0];
const collaboratoriTable = document.getElementById('collaboratoriTable').getElementsByTagName('tbody')[0];
const assegnazioniTable = document.getElementById('assegnazioniTable').getElementsByTagName('tbody')[0];

let caseOptions = [];
let collaboratoriOptions = [];
let assegnazioniOptions = [];

function addCasa() {
    const nome = prompt("Inserisci nome casa");

    if (nome) {
        const chiaviInUfficio = 1;
        const chiaviInCasa = 1;
        caseOptions.push({ id: caseId++, nome, chiaviInUfficio, chiaviInCasa });
        renderCaseTable();
        updateCaseOptions();
        saveData();
    }
}

function editCasa(button) {
    const row = button.parentNode.parentNode;
    const id = parseInt(row.cells[0].innerText);
    const nome = prompt("Modifica nome casa", row.cells[1].innerText);
    const chiaviInUfficio = prompt("Modifica numero chiavi in ufficio", row.cells[2].innerText);
    const chiaviInCasa = prompt("Modifica numero chiavi in casa", row.cells[3].innerText);

    const caseOption = caseOptions.find(option => option.id === id);
    if (caseOption) {
        caseOption.nome = nome;
        caseOption.chiaviInUfficio = chiaviInUfficio;
        caseOption.chiaviInCasa = chiaviInCasa;
        renderCaseTable();
        updateCaseOptions();
        saveData();
    }
}

function deleteCasa(button) {
    const row = button.parentNode.parentNode;
    const id = parseInt(row.cells[0].innerText);
    const index = caseOptions.findIndex(option => option.id === id);
    if (index !== -1) caseOptions.splice(index, 1);
    renderCaseTable();
    updateCaseOptions();
    saveData();
}

function renderCaseTable() {
    caseTable.innerHTML = '';
    caseOptions.sort((a, b) => a.nome.localeCompare(b.nome));
    caseOptions.forEach(option => {
        const row = caseTable.insertRow();
        row.insertCell(0).innerText = option.id;
        row.insertCell(1).innerText = option.nome;
        row.insertCell(2).innerText = option.chiaviInUfficio;
        row.insertCell(3).innerText = option.chiaviInCasa;
        const actionsCell = row.insertCell(4);
        actionsCell.innerHTML = `<button onclick="editCasa(this)">Modifica</button>
                                <button onclick="deleteCasa(this)">Cancella</button>`;
    });
}

function addCollaboratore() {
    const nome = prompt("Inserisci nome collaboratore");
    if (nome) {
        collaboratoriOptions.push({ id: collaboratoriId++, nome });
        renderCollaboratoriTable();
        updateCollaboratoriOptions();
        saveData();
    }
}

function editCollaboratore(button) {
    const row = button.parentNode.parentNode;
    const id = parseInt(row.cells[0].innerText);
    const nome = prompt("Modifica nome collaboratore", row.cells[1].innerText);

    const collaboratoreOption = collaboratoriOptions.find(option => option.id === id);
    if (collaboratoreOption) {
        collaboratoreOption.nome = nome;
        renderCollaboratoriTable();
        updateCollaboratoriOptions();
        saveData();
    }
}

function deleteCollaboratore(button) {
    const row = button.parentNode.parentNode;
    const id = parseInt(row.cells[0].innerText);
    const index = collaboratoriOptions.findIndex(option => option.id === id);
    if (index !== -1) collaboratoriOptions.splice(index, 1);
    renderCollaboratoriTable();
    updateCollaboratoriOptions();
    saveData();
}

function renderCollaboratoriTable() {
    collaboratoriTable.innerHTML = '';
    collaboratoriOptions.sort((a, b) => a.nome.localeCompare(b.nome));
    collaboratoriOptions.forEach(option => {
        const row = collaboratoriTable.insertRow();
        row.insertCell(0).innerText = option.id;
        row.insertCell(1).innerText = option.nome;
        const actionsCell = row.insertCell(2);
        actionsCell.innerHTML = `<button onclick="editCollaboratore(this)">Modifica</button>
                                <button onclick="deleteCollaboratore(this)">Cancella</button>`;
    });
}

function showAssegnaChiaveForm() {
    document.getElementById('assegnaChiaveForm').style.display = 'flex';
    updateCaseSelect('casaSelect');
    updateCollaboratoreSelect('collaboratoreSelect');
}

function assegnaChiave() {
    const casaSelect = document.getElementById('casaSelect');
    const collaboratoreSelect = document.getElementById('collaboratoreSelect');
    const quantitaAssegnata = 1; // Imposta automaticamente 1

    if (casaSelect.value && collaboratoreSelect.value) {
        const casaId = parseInt(casaSelect.value);
        const casaRow = caseOptions.find(option => option.id === casaId);
        const chiaviInUfficio = parseInt(casaRow.chiaviInUfficio);
        if (chiaviInUfficio >= quantitaAssegnata) {
            casaRow.chiaviInUfficio = chiaviInUfficio - quantitaAssegnata;
            renderCaseTable();

            assegnazioniOptions.push({
                id: assegnazioniId++,
                casa: casaSelect.options[casaSelect.selectedIndex].text,
                collaboratore: collaboratoreSelect.options[collaboratoreSelect.selectedIndex].text,
                data: new Date().toISOString().slice(0, 19).replace('T', ' '),
                quantita: quantitaAssegnata
            });
            renderAssegnazioniTable();
            saveData();

            document.getElementById('assegnaChiaveForm').style.display = 'none';
        } else {
            alert("Non ci sono abbastanza chiavi in ufficio.");
        }
    }
}

function renderAssegnazioniTable() {
    assegnazioniTable.innerHTML = '';
    assegnazioniOptions.sort((a, b) => a.casa.localeCompare(b.casa));
    assegnazioniOptions.forEach(option => {
        const row = assegnazioniTable.insertRow();
        row.insertCell(0).innerText = option.id;
        row.insertCell(1).innerText = option.casa;
        row.insertCell(2).innerText = option.collaboratore;
        row.insertCell(3).innerText = option.data;
        row.insertCell(4).innerText = option.quantita;
        row.insertCell(5).innerHTML = `<button onclick="riconsegnaChiave(this)">Riconsegna</button>`;
    });
}

function riconsegnaChiave(button) {
    const row = button.parentNode.parentNode;
    const id = parseInt(row.cells[0].innerText);
    const casaNome = row.cells[1].innerText;
    const quantita = parseInt(row.cells[4].innerText);

    const casaOption = caseOptions.find(option => option.nome === casaNome);
    if (casaOption) {
        casaOption.chiaviInUfficio = parseInt(casaOption.chiaviInUfficio) + quantita;
        renderCaseTable();
    }

    const index = assegnazioniOptions.findIndex(option => option.id === id);
    if (index !== -1) assegnazioniOptions.splice(index, 1);
    renderAssegnazioniTable();
    saveData();
}

function createSelect(options) {
    const select = document.createElement("select");
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.id;
        opt.text = option.nome;
        select.appendChild(opt);
    });
    return select;
}

function updateCaseSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = '';
    caseOptions.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.id;
        opt.text = option.nome;
        select.appendChild(opt);
    });
}

function updateCollaboratoreSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = '';
    collaboratoriOptions.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.id;
        opt.text = option.nome;
        select.appendChild(opt);
    });
}

function saveData() {
    const data = {
        caseOptions,
        collaboratoriOptions,
        assegnazioniOptions
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = dataPath;
    a.click();
}

function exportData() {
    const data = {
        case: getCaseData(),
        collaboratori: getCollaboratoriData(),
        assegnazioni: getAssegnazioniData()
    };
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
}

function loadData(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.caseOptions && data.collaboratoriOptions && data.assegnazioniOptions) {
                setCaseData(data.caseOptions);
                setCollaboratoriData(data.collaboratoriOptions);
                setAssegnazioniData(data.assegnazioniOptions);
            } else {
                throw new Error("Formato JSON non valido");
            }
        } catch (error) {
            alert("Errore nel caricamento del file: formato non valido.");
        }
    };
    reader.readAsText(file);
}

function getCaseData() {
    // Implement this function to gather data from the "case" table
}

function getCollaboratoriData() {
    // Implement this function to gather data from the "collaboratori" table
}

function getAssegnazioniData() {
    // Implement this function to gather data from the "assegnazioni" table
}

function setCaseData(caseData) {
    caseOptions = caseData;
    renderCaseTable();
    updateCaseOptions();
}

function setCollaboratoriData(collaboratoriData) {
    collaboratoriOptions = collaboratoriData;
    renderCollaboratoriTable();
    updateCollaboratoriOptions();
}

function setAssegnazioniData(assegnazioniData) {
    assegnazioniOptions = assegnazioniData;
    renderAssegnazioniTable();
}

function setDataPath() {
    const path = prompt("Inserisci il percorso completo della cartella dove salvare i dati (incluso il nome del file)", dataPath);
    if (path) {
        dataPath = path;
        alert(`Percorso dati impostato su: ${dataPath}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCaseTable();
    renderCollaboratoriTable();
    renderAssegnazioniTable();
    setActiveNav();
});

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = page.id === pageId ? 'block' : 'none';
    });
}

function setActiveNav() {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// All the existing functions from the inline script
function showAddCasaForm() {
    document.getElementById('addCasaForm').style.display = 'block';
}

function addCasa() {
    const nome = document.getElementById('newCasaNome').value;

    if (nome) {
        const id = Date.now().toString(); // Generate a unique ID based on the current timestamp
        const tbody = document.querySelector('#caseTable tbody');
        const row = document.createElement('tr');
        row.setAttribute('data-id', id);
        row.innerHTML = `
            <td>${nome}</td>
            <td>1</td>
            <td>1</td>
            <td>
                <button onclick="editCasa('${id}')">Modifica</button>
                <button onclick="deleteCasa('${id}')">Cancella</button>
            </td>
        `;
        tbody.appendChild(row);

        sortTableAlphabetically('#caseTable');

        document.getElementById('addCasaForm').style.display = 'none';
        document.getElementById('newCasaNome').value = '';
        
        // Auto-save when adding a new casa
        exportData();
    } else {
        alert('Compila tutti i campi');
    }
}

// Copy all other existing functions from the inline script in index.html
// ...

// Add auto-save functionality to key operations
function deleteCasa(id) {
    const row = document.querySelector(`#caseTable tbody tr[data-id="${id}"]`);
    if (row) {
        row.remove();
        exportData(); // Auto-save after deletion
    }
}

function editCasa(id) {
    const row = document.querySelector(`#caseTable tbody tr[data-id="${id}"]`);
    if (row) {
        const cells = row.querySelectorAll('td');
        const nome = prompt('Modifica Nome:', cells[0].innerText);
        const chiaviInUfficio = prompt('Modifica Chiavi in Ufficio:', cells[1].innerText);
        const chiaviInCasa = prompt('Modifica Chiavi in Casa:', cells[2].innerText);

        if (nome !== null) cells[0].innerText = nome;
        if (chiaviInUfficio !== null) cells[1].innerText = chiaviInUfficio;
        if (chiaviInCasa !== null) cells[2].innerText = chiaviInCasa;
        
        exportData(); // Auto-save after edit
    }
}

// ... copy other existing functions and add exportData() calls to key operations

function addCollaboratore() {
    // ... existing code ...
    
    // Add auto-save
    exportData();
}

function deleteCollaboratore(id) {
    // ... existing code ...
    
    // Add auto-save
    exportData();
}

function convalidaAssegnazione(casaId, collaboratoreId, dataAssegnazione, quantitaAssegnata) {
    // ... existing code ...
    
    // Add auto-save
    exportData();
}

function returnKey(casaId, dataAssegnazione) {
    // ... existing code ...
    
    // Add auto-save
    exportData();
}
