// --- Database Path Configuration ---
const DB_PATHS = {
    sectors: {
        all: 'Users/0/configuracoes/setores',
        roles: (key) => `Users/0/configuracoes/setores/${key}/cargos`,
        sector: (key) => `Users/0/configuracoes/setores/${key}`
    },
    trainings: {
        all: 'Users/0/configuracoes/treinamentos',
        roles: (key) => `Users/0/configuracoes/setores/${key}/cargos`,
        sectors: (key) => `Users/0/configuracoes/treinamentos/${key}`
    } 
};

// --- Role Card Management ---

// Create and configure a new role card within a column
function createCard(column, sectorKey, isExisting = false, roleKey) {
    const newCard = document.createElement('div');
    newCard.classList.add('kanbanCard');
    newCard.setAttribute('draggable', true);
    newCard.innerHTML = `<input type="text" class="kanbanCardInput" placeholder="Role Name">`;
    
    const box = column.querySelector('.kanbanCardBox');
    box.append(newCard);

    const input = newCard.querySelector('.kanbanCardInput');
    
    if (!isExisting) {
        input.select();
    } else {
        input.setAttribute('readonly', 'readonly');
    }

    const dbRolePath = database.ref(DB_PATHS.sectors.roles(sectorKey));
    input.dataset.isExisting = isExisting;
    input.dataset.roleKey = roleKey;

    // Handle data saving on focus out
    input.addEventListener('focusout', (event) => {
        if (event.target.getAttribute('readonly') !== 'readonly') {
            if (event.target.value !== '' && event.target.value !== undefined) {
                const roleName = event.target.value;
                
                if (isExisting !== 'true') {
                    // Create new role in Firebase
                    const addedRole = dbRolePath.push();
                    addedRole.set(roleName);
                    isExisting = 'true';
                    roleKey = addedRole.key;
                    input.dataset.firebaseKey = roleKey;
                } else {  
                    // Update existing role
                    dbRolePath.child(roleKey).set(input.value);
                }
                
                newCard.classList.remove('noValue');
                event.currentTarget.setAttribute('readonly', 'readonly');
            } else {
                if (isExisting !== 'true') newCard.remove();
            }
        } else {
            input.setAttribute('readonly', 'readonly');
        }
    });

    // Drag and Drop listeners
    newCard.addEventListener('dragstart', () => {
        newCard.classList.add('dragging');
        column.classList.add('draggingColumn');
    });

    newCard.addEventListener('dragend', () => {
        newCard.classList.remove('dragging');
        column.classList.remove('draggingColumn');
    });

    // Hover effect
    newCard.addEventListener('mouseover', () => {
        if (!newCard.classList.contains('editableCard')) {
            input.style.minWidth = '80%';
        }
    });

    // Context Menu and UI Controls
    const menu = document.querySelector('.cardMenu');
    let currentValue = '';

    const exitMenu = () => {
        menu.style.display = 'none'; 
        newCard.classList.remove('editableCard');
        if (input.value === '') input.value = currentValue;
        input.blur();
    };

    input.addEventListener('keyup', e => {
        if (e.key === 'Enter') exitMenu();
    });

    const deleteBtn = document.querySelector('.excluirCartaoButton');
// Handle right-click to show delete/edit menu
newCard.addEventListener('contextmenu', e => {
    e.preventDefault(); // Prevent default browser menu
    
    currentValue = input.value;
    const rect = newCard.getBoundingClientRect();
    
    // Position and show the menu
    menu.style.display = 'flex';
    deleteBtn.style.left = `${rect.right + 10}px`;
    deleteBtn.style.top = `${rect.top}px`;
    
    // Add visual feedback to the card being edited
    newCard.classList.add('editableCard');
    input.removeAttribute('readonly');
    input.select();

    // CRITICAL: Use a one-time assignment for the delete action
    deleteBtn.onclick = (event) => {
        event.stopPropagation(); // Prevent menu from flickering
        
        // Remove from Firebase and DOM
        dbRolePath.child(roleKey).remove()
            .then(() => {
                newCard.remove();
                menu.style.display = 'none'; // Hide menu after deletion
                smallAlert('Role deleted successfully', 'alert-light', body);
            })
            .catch(error => {
                smallAlert('Error deleting role', 'alert-danger', body);
                console.error("Delete failed: ", error);
            });
    };
});

    return newCard;
}

// --- Kanban Column Management ---

// Render all sector columns from Firebase
function renderKanbanColumns() {
    const dbSectors = database.ref(DB_PATHS.sectors.all);
    kanbanColumns.innerHTML = '';

    dbSectors.once('value').then(snapshot => {
        snapshot.forEach(sector => {
            const sectorData = sector.val();
            const sectorKey = sector.key;
            const currentColumn = addNewColumn(sectorData.nome, sectorKey, true);
            
            const dbRoles = database.ref(DB_PATHS.sectors.roles(sectorKey)); 
            dbRoles.once('value').then(snapshotRoles => {
                snapshotRoles.forEach(node => {
                    const currentCard = createCard(currentColumn, sectorKey, 'true', node.key);
                    currentCard.querySelector('.kanbanCardInput').value = node.val();
                });
            });
        });
    });
}

// Delete sector column if it has no active roles
function deleteColumn(column) {
    const cardBox = column.querySelector('.kanbanCardBox');
    const roleCount = cardBox.children.length;

    if (roleCount > 0) {
        smallAlert('The sector contains active roles!', 'alert-danger', body);
    } else {
        const key = column.dataset.key;
        const sectorPath = database.ref(DB_PATHS.sectors.sector(key));
        
        column.remove();
        sectorPath.remove();
        
        smallAlert('Sector removed successfully!', 'alert-light', body);
    }
}

// Create and setup a new Kanban column
function addNewColumn(name, key, isExisting = false) {
    const newColumn = document.createElement('div');
    newColumn.innerHTML = ` 
        <div class="kanbanColumn">
            <input type="text" name="sectorName" class="kanbanColumnTitle" placeholder="Sector Name" >
            <div class="kanbanCardBox"></div>
            <button class="kanbanColumnButton"><i class="fa-solid fa-plus"></i> Add a role</button>
            <button class="kanbanColumnButton trashColumn"><i class="fa-solid fa-x"></i></button>
        </div>`;
    kanbanColumns.append(newColumn);

    const titleInput = newColumn.querySelector('.kanbanColumnTitle');
    titleInput.value = name || '';

    if (!isExisting) titleInput.select();
    newColumn.dataset.key = key;

    // Save title changes to Firebase
    function submitTitleChanges() {
        titleInput.blur();
        const formattedText = formatText(titleInput.value);
        const dbSectorRef = database.ref(DB_PATHS.sectors.all);
        const sectorConfig = { nome: titleInput.value, id: formattedText };

        if (!isExisting) {
            if (titleInput.value === '') {
                newColumn.remove();
            } else {
                const newRef = dbSectorRef.push();
                key = newRef.key;
                newColumn.dataset.key = key;
                newRef.set(sectorConfig);
                isExisting = true;
            }
        } else {
            if (titleInput.value === '') {
                titleInput.value = name;
            } else {
                dbSectorRef.child(key).update(sectorConfig);
            }
        }
    }

    newColumn.querySelector('.kanbanColumnButton').addEventListener('click', () => {
        createCard(newColumn, key);
    });

    titleInput.addEventListener('focusout', () => submitTitleChanges());
    titleInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') titleInput.blur();
    });

    newColumn.querySelector('.trashColumn').onclick = () => deleteColumn(newColumn);
    
    return newColumn;
}

// Global listener for adding new columns
const addColumnBtn = document.getElementById('kanbanAddColumn');
addColumnBtn.addEventListener('click', () => {
    addNewColumn();
});