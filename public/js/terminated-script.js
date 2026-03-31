// --- OFFBOARDING UI ELEMENTS ---
const dismissedTable = document.getElementById('desligadosTable');
const dismissedTableRows = Array.from(dismissedTable.children[1].children);
const dismissedModal = document.getElementById('desligadoModal');
const submitChangesBtn = document.getElementById('submitDesligadosChanges');
const dismissedAlert = document.getElementById('alertDesligados');
const activateEmployeeBtn = document.getElementById('ativarColaboradorBtn');
const body = document.querySelector('body');

// DATABASE REFERENCES
const dbDismissed = database.ref('Users/0/desligados');

// MODAL CONTENT & FORMS
const dismissedModalContent = dismissedModal.querySelector('.modalContentDesligados');
let dismissedForm = '';

// INITIALIZATION
renderDismissedTable();

// CORE FUNCTIONS

// Load and render the dismissed employees table
function renderDismissedTable() {
    returnArrayFromDatabase(dbDismissed).then((array) => {
        renderTable('desligadosTable', array, configDesligados);
    });
}
