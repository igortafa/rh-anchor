// --- Navigation & UI Elements ---
const configSection = document.getElementById('config');
const sectorsSection = document.getElementById('setores');
const configTitle = document.getElementById('configTitle');
const kanbanColumns = document.getElementById('kanbanColumns');
const kanbanSectors = document.getElementById('kanbanSetores');
const trashBtn = document.querySelector('.trashButton');
const body = document.querySelector('body');
const redirectToOptions = document.querySelector('.redirectToOptions');
const burguer = document.getElementById('optionBurguer')


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




//Mobile UI functions
burguer.onclick = () =>{
    
 burguer.querySelector('#line1').onclick = () =>{}
  burguer.querySelector('#line2').onclick = () =>{}
   burguer.querySelector('#line3').onclick = () =>{}
 


if(burguer.classList.contains('active')){
    burguer.querySelector('#line1').onclick = () =>{
     hideItem(configSection);
    hideItem(configTitle);
    hideItem(burguer)
    showItem(sectorsSection);
}

burguer.querySelector('#line2').onclick = () =>{
      window.location.href = 'employees.html';
}
burguer.querySelector('#line3').onclick = () =>{
      window.location.href = 'training-matrix.html';
}
}
burguer.classList.add('active')
}


window.addEventListener('click', (event)=>{
    if (!event.target.closest('#optionBurguer')){
       burguer.classList.remove('active')

    }
})
