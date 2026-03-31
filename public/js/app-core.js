// --- Global Configurations & Utility Functions (app.js) ---

let dbsetores = firebase.database().ref('Users/0/configuracoes/setores');
let filtrosAtivos = {
    teste: 'teste'
};

// SYSTEM CONFIGURATIONS

// Employee table columns
let configColaboradores = [
    { label: 'Name', key: 'name' },
    { label: 'ID', key: 'matricula' },
    { label: 'Sector', key: 'setor' },
    { label: 'Role', key: 'cargo' },
    { label: 'Manager', key: 'gestor' },
    { label: 'Hire Date', key: 'admissao' },
    { label: 'Status', key: 'vinculo' }
];

// Training control table columns
let configComplianceTable = [
    { label: 'Name', key: 'name' },
    { label: 'ID', key: 'matricula' },
    { label: 'Sector', key: 'setor' },
    { label: 'Role', key: 'cargo' },
    { label: 'Manager', key: 'gestor' },
    { label: 'Hire Date', key: 'admissao' },
    { label: 'Training Date', key: 'dataTreinamento' },
    { label: 'Expiration', key: 'dataVencimento' },
    { label: 'Status', key: 'status' },
    { label: 'Mandatory', key: 'obrigatorio' },
    { label: 'Link', key: 'vinculo' }
];

// Dismissed employees table columns
let configDesligados = [
    { label: 'Name', key: 'name' },
    { label: 'ID', key: 'matricula' },
    { label: 'Role', key: 'cargo' },
    { label: 'Manager', key: 'gestor' },
    { label: 'Hire Date', key: 'admissao' },
    { label: 'Termination', key: 'dataDesligamento' },
    { label: 'Reason', key: 'motivoDesligamento' }
];

let setoresNames = [];
let setoresGlobal = [];
let cargos = ['','Role 1', 'Role 2'];
let gestores = ['','Manager 1', 'Manager 2'];
let motivosDesligamento = ['','Reason 1', 'Reason 2'];
let validade = [ '', '1 year', '2 years', '3 years', 'Modification', 'No expiration'];

// GLOBAL ICONS ARRAY
let icones = [
    '<i class="fa-solid fa-helmet-safety"></i>', '<i class="fa-solid fa-business-time"></i>',
    '<i class="fa-solid fa-person-digging"></i>', '<i class="fa-brands fa-envira"></i>',
    '<i class="fa-solid fa-file-excel"></i>', '<i class="fa-solid fa-truck"></i>', '<i class="fa-solid fa-bolt"></i>',
    '<i class="fa-solid fa-book"></i>', '<i class="fa-solid fa-circle-exclamation"></i>', '<i class="fa-solid fa-fire"></i>',
    '<i class="fa-solid fa-code"></i>', '<i class="fa-solid fa-city"></i>', '<i class="fa-solid fa-wifi"></i>', '<i class="fa-solid fa-gears"></i>',
    '<i class="fa-solid fa-sliders"></i>', '<i class="fa-solid fa-compass"></i>', '<i class="fa-solid fa-dumpster-fire"></i>',
    '<i class="fa-solid fa-brush"></i>', '<i class="fa-solid fa-paint-roller"></i>', '<i class="fa-solid fa-chevron-up"></i>',
    '<i class="fa-solid fa-circle"></i>', '<i class="fa-solid fa-circle-arrow-up"></i>', '<i class="fa-regular fa-circle-check"></i>',
    '<i class="fa-solid fa-circle-exclamation"></i>', '<i class="fa-solid fa-clipboard-check"></i>', '<i class="fa-solid fa-comment"></i>',
    '<i class="fa-solid fa-computer"></i>', '<i class="fa-solid fa-cube"></i>', '<i class="fa-solid fa-cubes-stacked"></i>', '<i class="fa-solid fa-dolly"></i>',
    '<i class="fa-solid fa-elevator"></i>', '<i class="fa-solid fa-faucet-drip"></i>', '<i class="fa-solid fa-flask-vial"></i>',
    '<i class="fa-solid fa-industry"></i>', '<i class="fa-solid fa-lightbulb"></i>', '<i class="fa-solid fa-lock"></i>', '<i class="fa-solid fa-screwdriver-wrench"></i>',
    '<i class="fa-solid fa-fill"></i>', '<i class="fa-solid fa-wrench"></i>', '<i class="fa-solid fa-helmet-safety"></i>',
    '<i class="fa-solid fa-stairs"></i>', '<i class="fa-solid fa-helmet-safety"></i>', '<i class="fa-solid fa-plug-circle-bolt"></i>',
    '<i class="fa-solid fa-bolt"></i>', '<i class="fa-solid fa-heart"></i>'
];

// FORM CONFIGURATIONS

let formConfig = [
    { label: 'Name:', type: 'text', placeholder: 'Type name...', name: 'name' },
    { label: 'ID:', type: 'text', placeholder: 'Type registration ID...', name: 'matricula' },
    { label: 'Sector:', type: 'select', placeholder: 'Select Sector', options: setoresNames, name: 'setor' },
    { label: 'Role:', type: 'select', placeholder: 'Select Role', options: cargos, name: 'cargo' },
    { label: 'Manager:', type: 'select', placeholder: 'Select Manager', options: gestores, name: 'gestor' },
    { label: 'Hire Date:', type: 'date', placeholder: 'Hire Date', name: 'admissao' },
    { label: 'Status:', type: 'select', placeholder: 'Select Status', options: ['Active', 'Leave'], name: 'vinculo' }
];

let formDesligadosConfig = [
    { label: 'Name:', type: 'text', placeholder: 'Type name...', name: 'name' },
    { label: 'ID:', type: 'text', placeholder: 'Type registration ID...', name: 'matricula' },
    { label: 'Role:', type: 'select', placeholder: 'Select Role', options: cargos, name: 'cargo' },
    { label: 'Manager:', type: 'select', placeholder: 'Select Manager', options: gestores, name: 'gestor' },
    { label: 'Hire Date:', type: 'date', placeholder: 'Hire Date', name: 'admissao' },
    { label: 'Termination:', type: 'date', placeholder: 'Termination Date', name: 'dataDesligamento' },
    { label: 'Reason:', type: 'select', placeholder: 'Termination Reason', options: motivosDesligamento, name: 'motivoDesligamento' }
];

let formTreinamentosConfig = [
    { label: 'Name:', type: 'text', placeholder: 'Name', name: 'name' },
    { label: 'Description:', type: 'text', placeholder: 'Description', name: 'descricao' },
    { label: 'Validity:', type: 'select', placeholder: 'Validity', options: validade, name: 'validade' },
    { label: 'Icon:', type: 'icon-grid', placeholder: 'Select icon', options: icones, name: 'icones' }
];

carregarSetores();

// HELPER FUNCTIONS

function percorrerArray() {
    setoresGlobal.forEach(setor => {
        setoresNames.push(setor.name);
    });
}

async function carregarSetores() {
    const snapshot = await dbsetores.once('value');
    snapshot.forEach(setor => {
        setoresGlobal.push({ key: setor.key, name: setor.val().nome });
    });
    percorrerArray();
}

// Returns a promise with an array from Firebase
async function returnArrayFromDatabase(path) {
    let finalArray = [];
    let snapshot = await path.once('value');
    snapshot.forEach((item) => {
        finalArray.push(item.val());
    });
    return finalArray;
}

async function returnArrayKeysFromDatabase(path) {
    let finalArray = [];
    let snapshot = await path.once('value');
    snapshot.forEach((item) => {
        finalArray.push(item.key);
    });
    return finalArray;
}

document.addEventListener('click', e => {
    FiltersOnClickOut(e);
});

function hideFilters() {
    const filters = Array.from(document.querySelectorAll('.dropdown'));
    filters.forEach(filter => {
        filter.classList.remove('unhidden');
    });
}

function FiltersOnClickOut(e) {
    const filters = Array.from(document.querySelectorAll('.dropdown'));
    if (!(e.target.classList.contains('showDropdown'))) {
        filters.forEach(filter => {
            if (!filter.contains(e.target)) {
                filter.classList.remove('unhidden');
            }
        });
    }
}

// DROPDOWN FILTER LOGIC

function showDropdownFilter(th, dropDown, array, tableId) {
    hideFilters();
    const rect = th.querySelector('i').getBoundingClientRect();
    dropDown.style.position = 'absolute';
    dropDown.style.left = `${rect.left}px`;
    dropDown.style.top = `${rect.bottom}px`;

    dropDown.classList.toggle('unhidden');

    dropDown.innerHTML = `<div class="dropdownContent">
        <div class="checkBoxFilter">
            <input type="text" placeholder="Search name..." id="checkboxFilter">
            <div class="clearFilterButton" id="clearFilter">Clear Filter</div>
            <div class="checkboxItem" id="selectAllBox">
                    <input type="checkbox" name="selectAll" id="selectAll" checked="false" >
                <label for="nome">(Select All)</label></div>
            <div class="dropdownCheckBoxes">
            </div>
            <button class="filterButton">Filter</button>
        </div>
    </div>`;

    const arrayCriterio = array.map(data => data[`${th.getAttribute('name')}`]);
    const tableRows = Array.from(document.getElementById(`${tableId}`).querySelector('tbody').children);

    dropDown.querySelector('#clearFilter').onclick = (e) => {
        if (filtrosAtivos[`${th.getAttribute('name')}`]) {
            delete filtrosAtivos[`${th.getAttribute('name')}`];
            console.log('deleted');
        }
        dropDown.classList.remove('unhidden');
        filterTable();
    };

    let arrayDinamic = [];
    const Entries = Object.entries(filtrosAtivos);

    tableRows.forEach(row => {
        let flag = true;
        const dataList = Array.from(row.children);
        for (const [col, names] of Entries) {
            if (col != th.getAttribute('name')) {
                dataList.forEach(td => {
                    if (td.getAttribute('name') == col) {
                        if (!Object.values(names).includes(td.innerHTML)) {
                            flag = false;
                        } else (flag = true);
                    }
                });
            }
        }
        if (flag) {
            const dataList = Array.from(row.children);
            dataList.forEach(td => {
                if (td.getAttribute('name') == th.getAttribute('name')) { arrayDinamic.push(td.innerHTML) }
            });
        }
    });

    console.log(filtrosAtivos);
    if (th.getAttribute('name') == 'admissao') {
        const datas = arrayDinamic.map(date => {
            return new Date(date);
        });
    }

    const arrayPossibleNames = [...new Set(arrayDinamic)];
    const arrayFiltrado = [...new Set(arrayCriterio)];

    function filterCheckboxes(arrayFiltrado) {
        dropDown.querySelector('.dropdownCheckBoxes').innerHTML = '';
        arrayFiltrado.forEach(data => {
            const checkboxItem = document.createElement('div');
            checkboxItem.classList.add('checkboxItem');
            checkboxItem.innerHTML = `
        <input type="checkbox"  id="${formatText(data)}">
        <label for="${formatText(data)}">${data}</label>
        `;
            if (filtrosAtivos[`${th.getAttribute('name')}`]) {
                if (Object.values(filtrosAtivos[`${th.getAttribute('name')}`]).includes(data)) {
                    checkboxItem.querySelector('input').checked = true;
                    dropDown.querySelector('#selectAll').checked = false;
                }
            } else {
                checkboxItem.querySelector('input').checked = true;
            }
            dropDown.querySelector('.dropdownCheckBoxes').append(checkboxItem);
            checkboxItem.onclick = (e) => {
                if (!checkboxItem.querySelector('input').checked) {
                    dropDown.querySelector('#selectAll').checked = false;
                } else {
                    selectAll();
                }
            };
        });
    }

    function selectAll() {
        let selectAll = true;
        const currentBoxes = Array.from(dropDown.querySelector('.dropdownCheckBoxes').children);
        currentBoxes.forEach(child => {
            if (!child.querySelector('input').checked) {
                selectAll = false;
            }
        });
        if (selectAll) {
            dropDown.querySelector('#selectAll').checked = true;
        } else {
            dropDown.querySelector('#selectAll').checked = false;
        }
    }

    selectAll();
    filterCheckboxes(arrayPossibleNames);

    const boxes = Array.from(dropDown.querySelector('.dropdownCheckBoxes').children);
    const selectAllBox = dropDown.querySelector('#selectAllBox');
    selectAllBox.onclick = (e) => {
        if (selectAllBox.querySelector('input').checked) {
            boxes.forEach(box => {
                box.querySelector('input').checked = true;
            });
        } else {
            boxes.forEach(box => {
                box.querySelector('input').checked = false;
            });
        }
    };

    dropDown.querySelector('#checkboxFilter').onkeyup = (e) => {
        const newArray = arrayFiltrado.filter(data => data.toLowerCase().includes(e.target.value.toLowerCase()));
        const filterBoxes = Array.from(dropDown.querySelector('.dropdownCheckBoxes').children);
        filterBoxes.forEach(box => {
            if (!newArray.includes(box.querySelector('label').innerHTML)) {
                hideItem(box);
            } else { showFlexItem(box) }
        });
    };

    function filterTable() {
        const filterEntries = Object.entries(filtrosAtivos);
        tableRows.forEach(row => {
            let show = true;
            const dataList = Array.from(row.children);
            for (const [col, names] of filterEntries) {
                dataList.forEach(td => {
                    if (td.getAttribute('name') == col) {
                        if (td.getAttribute('name') != 'admissao') {
                            if (!Object.values(names).includes(td.innerHTML)) {
                                show = false;
                            }
                        } else {
                            console.log('date');
                            const dateEntries = Object.entries(names);
                            for (const [year, month] of filterEntries) { }
                        }
                    }
                });
            }
            if (show) { row.classList.remove('startHidden') } else { row.classList.add('startHidden') }
        });

        if (filtrosAtivos[`${th.getAttribute('name')}`]) { th.querySelector('i').classList.add('activeFilter') } else { th.querySelector('i').classList.remove('activeFilter') }
        dropDown.classList.remove('unhidden');
    }

    dropDown.querySelector('button').onclick = (e) => {
        const selectedNames = boxes.filter(box => {
            return box.querySelector('input').checked;
        }).map(box => {
            return box.querySelector('label').innerHTML;
        });

        const unselectedNames = boxes.filter(box => {
            return !box.querySelector('input').checked;
        }).map(box => {
            return box.querySelector('label').innerHTML;
        });

        unselectedNames.forEach(name => {
            if (filtrosAtivos[`${(th.getAttribute('name'))}`]) {
                delete filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${name}`];
            }
        });

        if (th.getAttribute('name') != 'admissao') {
            selectedNames.forEach(name => {
                if (filtrosAtivos[`${formatText(th.getAttribute('name'))}`]) {
                    filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${name}`] = name;
                } else {
                    filtrosAtivos[`${formatText(th.getAttribute('name'))}`] = {};
                    filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${name}`] = name;
                }
            });
        } else {
            const dates = selectedNames.map(name => {
                return new Date(name);
            });
            dates.forEach(date => {
                if (filtrosAtivos[`${formatText(th.getAttribute('name'))}`]) {
                    if (filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`]) {
                        if (filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`][`${date.toLocaleString('pt-BR', { month: 'long' })}`]) {
                            filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`][`${date.toLocaleString('pt-BR', { month: 'long' })}`].push(date.getDay());
                        } else {
                            filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`][`${date.toLocaleString('pt-BR', { month: 'long' })}`] = [];
                            filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`][`${date.toLocaleString('pt-BR', { month: 'long' })}`].push(date.getDay());
                        }
                    } else {
                        filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`] = {};
                        filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`][`${date.toLocaleString('pt-BR', { month: 'long' })}`] = [`${date.getDay()}`];
                    }
                } else {
                    filtrosAtivos[`${formatText(th.getAttribute('name'))}`] = {};
                    if (filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`]) {
                        if (filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`][`${date.toLocaleString('pt-BR', { month: 'long' })}`]) {
                            filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`][`${date.toLocaleString('pt-BR', { month: 'long' })}`].push(date.getDay());
                        } else {
                            filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`][`${date.toLocaleString('pt-BR', { month: 'long' })}`] = [];
                            filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`][`${date.toLocaleString('pt-BR', { month: 'long' })}`].push(date.getDay());
                        }
                    } else {
                        filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`] = {};
                        filtrosAtivos[`${formatText(th.getAttribute('name'))}`][`${date.getFullYear()}`][`${date.toLocaleString('pt-BR', { month: 'long' })}`] = [`${date.getDay()}`];
                    }
                }
            });
        }
        filterTable();
        dropDown.classList.remove('unhidden');
    };
}

// RENDER TABLE FUNCTION

function renderTable(tableId, dataArray, tableConfig, rowEvent = function () { }) {
    let table = document.getElementById(tableId);
    let tableBody = table.querySelector('tbody');
    tableBody.innerHTML = '';
    let theader = table.querySelector('thead tr');

    theader.innerHTML = tableConfig.map(col =>
        `<th name=${col.key}>${col.label}<i class="fa-solid fa-caret-down showDropdown"></i></th>`
    ).join('');

    let titleColumns = Array.from(theader.children);
    titleColumns.forEach(th => {
        const dropDown = document.createElement('div');
        dropDown.classList.add('dropdown');
        table.append(dropDown);
        th.querySelector('i').onclick = () => {
            showDropdownFilter(th, dropDown, dataArray, tableId);
        }
    });

    dataArray.forEach((item) => {
        let tr = document.createElement('tr');
        tr.addEventListener('click', rowEvent);
        tableConfig.forEach((col) => {
            let td = document.createElement('td');
            let id = col.key;
            td.innerHTML = `${item[`${id}`]}`;
            td.setAttribute('name', id);
            tr.append(td);
        });
        tableBody.append(tr);
    });
}

// FORM CREATION LOGIC

function createFormElement(formConfig, submitEvent = () => { }) {
    let form = document.createElement('form');

    formConfig.forEach((field) => {
        let fieldType = field.type;
        let currentField = '';
        let label = document.createElement('label');
        label.setAttribute('for', field.name);
        label.innerHTML = `${field.label}`;
        let formItem = document.createElement('div');
        formItem.classList.add('formItem');
        formItem.append(label);
        form.append(formItem);

        switch (fieldType) {
            case 'text':
                {
                    currentField = document.createElement('input');
                    currentField.setAttribute('name', `${field.name}`);
                    currentField.setAttribute('type', `${field.type}`);
                    currentField.addEventListener('focus', e=>{
                    currentField.classList.add('onFocusEmpty')
            
                    })
                    currentField.addEventListener('focusout', e=>{
                        if(currentField.value == ''){
                            currentField.classList.remove('onFocusEmpty')
                        }
                    
       
                    })
            

                    break;
                }
            case 'select':
                {
                    currentField = document.createElement('select');
                    field.options.forEach((option) => {
                        let currentOption = document.createElement('option');
                        currentOption.innerHTML = option;
                        currentField.append(currentOption);
                        currentField.setAttribute('name', `${field.name}`);
                          currentField.addEventListener('focus', e=>{
                    currentField.classList.add('onFocusEmpty')
            
                    })
                    currentField.addEventListener('focusout', e=>{
                        if(currentField.value == ''){
                            currentField.classList.remove('onFocusEmpty')
                        }
                    
       
                    })
                        
                    });
                    
                    break;
                }
            case 'date':
                {
                    currentField = document.createElement('input');
                    currentField.setAttribute('type', 'date');
                    currentField.setAttribute('name', `${field.name}`);
                    break;
                }
            case 'icon-grid':
                {
                    currentField = document.createElement('div');
                    currentField.classList.add('iconContainer');
                    let content = document.createElement('div');
                    content.classList.add('iconGrid');
                    currentField.append(content);

                    field.options.forEach(option => {
                        let icon = document.createElement('div');
                        icon.classList.add('icon');
                        icon.innerHTML = option;
                        content.append(icon);
                    });
                    let icons = Array.from(content.children);
                    icons[0].classList.add('selectedIcon');
                    icons.forEach(currentIcon => currentIcon.addEventListener('click', e => {
                        icons.forEach(icon => icon.classList.remove('selectedIcon'));
                        e.currentTarget.classList.add('selectedIcon');
                    }));
                    currentField.setAttribute('name', `${field.name}`);
                    break;
                }
        }
        formItem.append(currentField);
    });

    let modalButtons = document.createElement('div');
    modalButtons.classList.add('modalButtons');
    form.append(modalButtons);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        submitEvent();
    });
    form.classList.add('modalForm');
    return form;
}

// UTILITY FUNCTIONS

function objectFromForm(form) {
    const formData = new FormData(form);
    const dataObject = Object.fromEntries(formData);
    return dataObject;
}

function fillFormFromRow(row, form) {
    const cells = Array.from(row.children);
    cells.forEach(cell => {
        const fieldName = cell.getAttribute('name');
        if (form.elements[fieldName]) {
            form.elements[fieldName].value = cell.innerText;
        }
    });
}

function registerTransfer(origin, destiny, data) {
    destiny.set(data)
        .then(() => {
            origin.remove();
        })
        .catch(error => console.error("Transfer failed:", error));
}

async function isOnDatabase(value, atributte, path) {
    let array = await returnArrayFromDatabase(path);
    let arrayAttribute = array.map(colaborador => {
        return colaborador[`${atributte}`];
    });
    if (arrayAttribute.includes(value)) {
        return true;
    } else {
        return false;
    }
}

function showTemporary(element, time) {
    showFlexItem(element);
    setTimeout(() => { hideItem(element) }, time);
}

function smallAlert(content, type, body) {
    let alert = document.createElement('div');
    alert.classList.add('small-alert');
    alert.classList.add(`${type}`);
    hideItem(alert);

    let text = document.createElement('p');
    text.innerHTML = content;

    alert.append(text);
    body.append(alert);
    showTemporary(alert, 3000);
}

function formatText(text) {
    return text.toLowerCase().replace(' ', '').replace(/[^\p{L}\p{N}\s]/gu, "").replace(' ', '');
}