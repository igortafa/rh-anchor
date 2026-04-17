// --- Employee Management & UI Logic ---

// DOM ELEMENTS
const exitAccountBtn = document.getElementById('exitAccountButton');
const employeeModal = document.getElementById('employeeModal');
const openAddEmployeeBtn = document.getElementById('abrirAdicionarColaboradorBtn');
const activeTable = document.getElementById('ativosTable');
const modalTitle = document.getElementById('modalTitle');
const modalButtons = document.getElementById('modalButtons');
const modalContent = employeeModal.querySelector('.modalContent');
const alertBox = document.getElementById('alert');
const offboardingModal = document.getElementById('desligamentoModal');
const offboardingForm = document.getElementById('desligarForm');
const employeesBody = document.querySelector('body');

// SECTIONS & VIEWS
const openEmployeesBtn = document.getElementById('abrirColaboradores');
const openDismissedBtn = document.getElementById('abrirDesligados');
const activeEmployeesView = document.getElementById('colaboradoresAtivos');
const dismissedEmployeesView = document.getElementById('colaboradoresDesligados');
const employeesOptionsView = document.getElementById('colaboradoresOptions');

// DATABASE REFERENCES
const dbEmployees = database.ref(`Users/0/colaboradores`);

// INITIALIZATION
let employeeForm = '';
renderEmployees();

// NAVIGATION LOGIC
document.querySelectorAll('.redirectToOptions').forEach(el => el.onclick = () => window.location.href = 'index.html');
document.querySelectorAll('.redirectToColaboradores').forEach(el => el.onclick = () => window.location.href = 'employees.html');

openEmployeesBtn.onclick = () => {
    hideItem(employeesOptionsView);
    showFlexItem(activeEmployeesView);
};

openDismissedBtn.onclick = () => {
    hideItem(employeesOptionsView);
    showFlexItem(dismissedEmployeesView);
};

// CORE FUNCTIONS

// Render active employees table
function renderEmployees() {
    returnArrayFromDatabase(dbEmployees).then((array) => {
        renderTable('ativosTable', array, configColaboradores);
    });
}

// Modal Toggle Functions
const openEmployeeModal = () => showFlexItem(employeeModal);
const closeEmployeeModal = () => hideItem(employeeModal);
const closeAlert = () => hideItem(alertBox);

// Build employee form dynamically
function createEmployeeForm(mode) {
    employeeForm = createFormElement(formConfig);
    
    // Clean previous form if exists
    if (modalContent.lastElementChild.tagName === 'FORM') {
        modalContent.removeChild(modalContent.lastElementChild);
    }
    
    modalContent.append(employeeForm);
    employeeForm.matricula.required = true;

    const formButtonsContainer = employeeForm.querySelector('.modalButtons');
    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.classList.add('light-button');

    if (mode === 'add') {
        submitBtn.innerHTML = 'Add Employee';
        employeeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveEmployee('add');
        });
        formButtonsContainer.append(submitBtn);
    }

    // Dynamic Role Loading based on Sector selection
    employeeForm.setor.addEventListener('change', e => {
        const sectorName = e.target.value;
        dbsetores.once('value', snapshot => {
            snapshot.forEach(sector => {
                if (sector.val().nome === sectorName) {
                    const rolesArray = Object.values(sector.child('cargos').val() || {});
                    employeeForm.cargo.innerHTML = '';
                    rolesArray.forEach(role => {
                        const option = document.createElement('option');
                        option.innerHTML = role;
                        employeeForm.cargo.append(option);
                    });
                }
            });
        });
    });
}

// Open modal for new employee
openAddEmployeeBtn.addEventListener('click', () => {
    createEmployeeForm('add');
    modalTitle.innerHTML = 'New Employee';
    openEmployeeModal();
});

// OFFBOARDING LOGIC

offboardingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const employeeName = employeeForm.name.value;
    
    alertBox.innerHTML = `
        <div class="alert">
            <p>Do you want to remove <strong>${employeeName}</strong> from active staff?</p>
            <div class="alertButtons">
                <button class="dangerBtn" id='cancelOffboarding'>Cancel</button>
                <button class="light-button" id='confirmOffboarding'>Confirm</button>
            </div>
        </div>`;

    const offboardingData = objectFromForm(offboardingForm);
    document.getElementById('cancelOffboarding').onclick = closeAlert;
    document.getElementById('confirmOffboarding').onclick = () => activeToDismissed(offboardingData);
    
    hideItem(offboardingModal);
    showFlexItem(alertBox);
});

// Transfer data from Active to Dismissed node
function activeToDismissed(offboardingData) {
    const employeeData = objectFromForm(employeeForm);
    const id = employeeData['matricula'];
    
    employeeData['vinculo'] = 'Dismissed';
    const finalData = { ...employeeData, ...offboardingData };
    
    const origin = database.ref(`Users/0/colaboradores/${id}`);
    const destiny = database.ref(`Users/0/desligados/${id}`);
    
    registerTransfer(origin, destiny, finalData);
    renderEmployees();
    closeEmployeeModal();
    hideItem(offboardingModal);
    closeAlert();
}

// SAVE / UPDATE LOGIC
function saveEmployee(mode) {
    const newEmployee = objectFromForm(employeeForm);
    const id = newEmployee['matricula'];
    const path = database.ref('Users/0/colaboradores/' + id);

    if (mode === 'add') {
        isOnDatabase(id, 'matricula', dbEmployees).then(exists => {
            if (!exists) {
                path.set(newEmployee).then(() => {
                    smallAlert('Employee Added!', 'alert-light', employeesBody);
                    renderEmployees();
                });
            } else {
                smallAlert('Employee ID already exists!', 'alert-danger', employeesBody);
            }
        });
    } else {
        path.set(newEmployee).then(() => {
            smallAlert('Employee Updated!', 'alert-light', employeesBody);
            renderEmployees();
        });
    }
    closeEmployeeModal();
}

// AUTHENTICATION & LOGOUT

const logout = () => {
    firebase.auth().signOut().then(() => {
        window.location.href = 'auth.html';
    }).catch(err => console.error(err));
};

exitAccountBtn.addEventListener('click', () => logout());

