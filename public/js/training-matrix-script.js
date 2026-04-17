// --- Training Matrix Management ---
// Handles CRUD operations, requirement settings, and Firebase integration.

// DOM ELEMENTS
const cardsContainer = document.getElementById('cardsContainer');
const trainingModal = document.getElementById('trainingModal');
const addTrainingBtn = document.querySelector('.plusCard');
const body = document.querySelector('body');
const trainingContent = document.getElementById('trainingContent');
const complianceSection = document.getElementById('complianceSection');
const sectorsComplianceSection = document.getElementById('sectorsComplianceSection');
const rolesComplianceSection = document.getElementById('rolesComplianceSection');
const openComplianceSectionBtn = document.getElementById('openComplianceSectionBtn');



// DATABASE REFERENCES
const dbTrainings = database.ref('Users/0/configuracoes/treinamentos');
const dbEmployees = database.ref('Users/0/colaboradores/');

// UI NAVIGATION
// Redirect to Matrix page
document.querySelectorAll('.redirectToTreinamentos').forEach(el => {
    el.onclick = () => window.location.href = 'training-matrix.html';
});

// Redirect to Index page
document.querySelectorAll('.redirectToOptions').forEach(el => {
    el.onclick = () => window.location.href = 'index.html';
});

// FORM SETUP

const trainingForm = createFormElement(formTreinamentosConfig);

// Set validation requirements
trainingForm.name.required = true;
trainingForm.descricao.required = true;
trainingForm.validade.required = true;

// Append form and submit button to Modal
const modalContent = trainingModal.querySelector('.modalContent');
modalContent.append(trainingForm);

const submitBtn = document.createElement('button');
submitBtn.className = "light-button submitButton";
submitBtn.innerHTML = 'Add Training';
submitBtn.setAttribute('type', 'button');
submitBtn.onclick = saveTraining;

trainingForm.querySelector('.modalButtons').append(submitBtn);

// INITIALIZATION
renderTrainings();

// CORE FUNCTIONS

// Render all training cards from Firebase
function renderTrainings() {
    returnArrayFromDatabase(dbTrainings).then(() => {
        const allCards = Array.from(cardsContainer.children);
        allCards.forEach(card => {
            if (!card.classList.contains('plusCard')) card.remove();
        });

        dbTrainings.once('value', snapshot => {
            snapshot.forEach(training => {
                newCard(training.val(), training.key);
            });
        });
    });
}

// Display training details and action listeners
function openTraining(key) {
    const dbCurrentTraining = database.ref(`Users/0/configuracoes/treinamentos/${key}`);

    // Action button listeners
    trainingContent.querySelector('#openTrainingEditBtn').onclick = () => openTrainingEdit(key, dbCurrentTraining);
    trainingContent.querySelector('#openDeleteConfirmBtn').onclick = () => openDeleteConfirm(key, dbCurrentTraining);
    openComplianceSectionBtn.onclick = () => openTrainingControl(key);

    dbCurrentTraining.once('value', snapshot => {
        const current = snapshot.val();

        openRequirementsSectionBtn.onclick = () => openRequirements(current.nome, key);
        document.querySelector('.trainingTitle').innerHTML = current.nome;

        hideItem(document.querySelector('main'));
        hideItem(complianceSection);
        hideItem(sectorsComplianceSection);
        hideItem(rolesComplianceSection);
        showFlexItem(trainingContent);
    });
}

// Manage training compliance and mandatory roles
async function openTrainingControl(key) {
    const tableBody = document.getElementById('complianceSectionTable').querySelector('tbody');
    tableBody.innerHTML = '';

    const dbRef = database.ref(`Users/0/configuracoes/treinamentos/${key}`);
    const dbControl = database.ref(`Users/0/configuracoes/treinamentos/${key}/complianceSection/colaboradores/`);

    const trainingSnap = await dbRef.once('value');
    const trainingData = trainingSnap.val();
    
    const title = complianceSection.querySelector('.complianceSectionTrainingTitle');
    console.log(title)
    title.innerHTML = trainingData.nome;
    title
    title.onclick = () => openTraining(key);

    const sectors = Object.values(trainingData.complianceSection?.setores || {});
    
    for (const sector of sectors) {
        const employeeSnap = await dbEmployees.orderByChild('setor').equalTo(sector.nome).once('value');
        const employeeArray = Object.values(employeeSnap.val() || {});
        const mandatoryRoles = Object.keys(sector.cargos || {});

        for (const employee of employeeArray) {
            if (mandatoryRoles.includes(employee.cargo)) {
                const statusData = {
                    dataTreinamento: 'No Date',
                    dataVencimento: 'No Date',
                    situacao: 'Pending',
                    status: 'Not Completed',
                    obrigatorio: 'Yes',
                    ...employee
                };
                dbControl.child(employee.matricula).set(statusData);
            } else {
                dbControl.child(employee.matricula).remove();
            }
        }
    }

    const controlSnap = await dbControl.once('value');
    const controlList = Object.values(controlSnap.val() || {});
    renderTable('complianceSectionTable', controlList, configComplianceTable);

    hideItem(trainingContent);
    showFlexItem(complianceSection);
}

// Save new training to Firebase
function saveTraining() {
    const trainingObject = {
        nome: trainingForm.name.value,
        descricao: trainingForm.descricao.value,
        validade: trainingForm.validade.value,
        iconHTML: trainingForm.querySelector('.selectedIcon i').outerHTML
    };

    const newRef = dbTrainings.push();
    newRef.set(trainingObject);
    hideItem(trainingModal);
    newCard(trainingObject, newRef.key);
}

// Confirm and delete training
function openDeleteConfirm(key, path) {
    const confirmModal = document.createElement('div');
    confirmModal.className = 'modalContainer';
    confirmModal.style.display = 'flex';
    confirmModal.innerHTML = `
        <div class="alert">
            <h4>Delete this training?</h4>
            <div class="alertButtons">
                <button class="dangerBtn cancelar">Cancel</button>
                <button class="light-button excluir">Confirm</button>
            </div>
        </div>`;
    
    body.append(confirmModal);

    confirmModal.querySelector('.cancelar').onclick = () => confirmModal.remove();
    confirmModal.querySelector('.excluir').onclick = () => {
        dbTrainings.child(key).remove();
        window.location.href = 'training-matrix.html';
    };
}

// --- CARD & MODAL UI ---

// Create and append a new training card to the container
function newCard(cardObject, trainingKey) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    card.innerHTML = `
        ${cardObject.iconHTML}
        <h3>${cardObject.nome}</h3>
    `;
    
    cardsContainer.append(card);
    
    card.addEventListener('click', () => {
        openTraining(trainingKey);
    });
}

// Open the modal for creating a new training
 addTrainingBtn.onclick = e =>{
    displayTrainingModal()
}
function displayTrainingModal() {
    trainingForm.reset()
    showFlexItem(trainingModal)
    ;
}

// --- EDIT & COMPLIANCE LOGIC ---

// Open the edit form with pre-filled training data
function openTrainingEdit(key, path) {
    path.once('value', snapshot => {
        const current = snapshot.val();
        const titleEl = document.querySelector('.trainingTitle');
        
        titleEl.innerHTML = `${current.nome} (${current.descricao})`;
        showFlexItem(trainingModal);
        
        trainingModal.querySelector('h1').innerHTML = 'Edit Training';
        trainingForm.name.value = current.nome;
        trainingForm.descricao.value = current.descricao;
        trainingForm.validade.value = current.validade;

        const icons = Array.from(trainingForm.querySelector('.iconGrid').children);
        icons.forEach(icon => {
            const isSelected = icon.querySelector('i').outerHTML === current.iconHTML;
            icon.classList.toggle('selectedIcon', isSelected);
        });

        const submitBtnEdit = trainingModal.querySelector('.submitButton');
        submitBtnEdit.innerHTML = 'Confirm Changes';
        submitBtnEdit.onclick = () => {
            const updateData = {
                nome: trainingForm.name.value,
                descricao: trainingForm.descricao.value,
                validade: trainingForm.validade.value,
                iconHTML: trainingForm.querySelector('.selectedIcon i').outerHTML
            };
            
            dbTrainings.child(key).update(updateData);
            hideItem(trainingModal);
            openTraining(key);
            smallAlert('Training updated!', 'alert-light', body);
        };
    });
}

// Close modal listener
trainingModal.querySelector('.closeBtn').addEventListener('click', () => {
    hideItem(trainingModal);
});

// Display sectors to define training requirements
function openRequirements(name, key) {
    const titleEl = document.querySelector('.setorTreinamentoTitle');
    titleEl.innerHTML = name;
    titleEl.onclick = () => openTraining(key);

    const sectorsContainer = sectorsComplianceSection.querySelector('.sectorsContainer');
    sectorsContainer.innerHTML = '';
    
    hideItem(trainingContent);
    hideItem(rolesComplianceSection);
    showFlexItem(sectorsComplianceSection);

    dbsetores.once('value', snapshot => {
        snapshot.forEach(sector => {
            const sectorData = sector.val();
            const sectorCard = document.createElement('div');
            sectorCard.className = 'setupOption';
            
            sectorCard.innerHTML = `
                <i class="fa-solid fa-location-crosshairs"></i>
                <div style="display: flex; flex-direction: column;">
                    <h5>${sectorData.nome}</h5>
                    <h6>Click to view roles</h6> 
                </div>
                <icon><i class="fa-solid fa-chevron-right arrow"></i></icon>
            `;

            sectorCard.onclick = () => openRoleSelection(name, key, sector.key, sectorData.nome);
            sectorsContainer.append(sectorCard);
        });
    });
}

// Manage mandatory roles for a specific sector and training
function openRoleSelection(name, trainingKey, sectorKey, sectorName) {
    const dbTrainingRoles = database.ref(`Users/0/configuracoes/treinamentos/${trainingKey}/complianceSection/setores/${sectorKey}/cargos`);
    const dbTrainingSector = database.ref(`Users/0/configuracoes/treinamentos/${trainingKey}/complianceSection/setores/${sectorKey}`);
    const dbSectorRoot = database.ref(`Users/0/configuracoes/setores/${sectorKey}`);
    const dbRoles = database.ref(`Users/0/configuracoes/setores/${sectorKey}/cargos/`);

    document.querySelector('.cargosTreinamentoTitle').innerHTML = name;
    document.querySelector('.cargosTreinamentoTitle').onclick = () => openTraining(trainingKey);
    document.querySelector('.setoresTitle').onclick = () => openRequirements(name, trainingKey);
    document.querySelector('.nomeSetorTitle').innerHTML = sectorName;

    const rolesContainer = document.querySelector('.cargos');
    rolesContainer.innerHTML = '';

    dbRoles.once('value', snapshot => {
        snapshot.forEach(role => {
            const roleName = role.val();
            const roleCard = document.createElement('div');
            roleCard.className = 'setupOption cargo';
            
            roleCard.innerHTML = `
                <i class="fa-regular fa-square"></i>
                <div style="display: flex; flex-direction: column;">
                    <p>${roleName}</p> 
                </div>
            `;

            returnArrayKeysFromDatabase(dbTrainingRoles).then(array => {
                if (array.includes(roleName)) {
                    roleCard.classList.add('cargoObrigatorio');
                    roleCard.querySelector('i').className = 'fa-regular fa-square-check';
                }
            });

            roleCard.onclick = () => {
                const isMandatory = roleCard.classList.toggle('cargoObrigatorio');
                const icon = roleCard.querySelector('i');
                
                icon.className = isMandatory ? 'fa-regular fa-square-check' : 'fa-regular fa-square';

                if (isMandatory) {
                    dbTrainingRoles.update({ [roleName]: role.key });
                    dbSectorRoot.once('value', snap => {
                        dbTrainingSector.update({ nome: snap.val().nome });
                    });
                } else {
                    dbTrainingRoles.child(roleName).remove();
                }
            };

            rolesContainer.append(roleCard);
        });
    });

    hideItem(complianceSection);
    hideItem(sectorsComplianceSection)
    showFlexItem(rolesComplianceSection);
}