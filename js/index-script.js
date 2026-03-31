// --- Navigation & UI Elements ---
const configSection = document.getElementById('config');
const sectorsSection = document.getElementById('setores');
const configTitle = document.getElementById('configTitle');
const kanbanColumns = document.getElementById('kanbanColumns');
const kanbanSectors = document.getElementById('kanbanSetores');
const trashBtn = document.querySelector('.trashButton');
const body = document.querySelector('body');
const redirectToOptions = document.querySelector('.redirectToOptions');

// NAVIGATION LOGIC

// Return to dashboard/index
redirectToOptions.onclick = () => {
    window.location.href = 'index.html';
};

// INITIALIZATION
renderKanbanColumns();

// PAGE SELECTION & VIEW TOGGLING

// Start with sectors hidden
hideItem(sectorsSection);

// Toggle from Config to Sectors view
document.getElementById('setoresButton').addEventListener('click', () => {
    hideItem(configSection);
    hideItem(configTitle);
    showItem(sectorsSection);
});

// Redirect to Employees management
document.getElementById('colaboradoresButton').onclick = () => {
    window.location.href = 'employees.html';
};

