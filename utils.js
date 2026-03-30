//utils.js

//DOM Elements 
var authContainer = document.getElementById('authContainer')
var authForm = document.getElementById('authForm')
var authFormTitle = document.getElementById('authFormTitle')
var submitForm = document.getElementById('submitAuthForm')
var register = document.getElementById('register')
var reset = document.getElementById('reset')
var access = document.getElementById('access')
var createAccount = document.getElementById('createAccount')
var accessAccount = document.getElementById('accessAccount')
var resetPassword = document.getElementById('resetPassword')
var indexContent = document.getElementById('indexContent')



//--------------UI Toggle Functions-----------------
//Utility functions to toggle element visibility


//Display an element as a block
function showItem(item){
    item.style.display = 'block'
}

//Display an element as a flex container
function showFlexItem(item){
item.style.display = 'flex'
}

//Hide a DOM element
function hideItem(item){
    item.style.display = 'none'
}



// --- Auth Form Actions ---

//Reset all the input fields in the authentication form
function clearAuthForm(){
    authForm.email.value = ''
    authForm.password.value = ''
}




//Switch UI to Login mode
function showAuthContent(){
    clearAuthForm()
    submitAuthForm.value = 'Acessar'
    showItem(register)
    showItem(reset)
    hideItem(access)  
}
accessAccount.addEventListener('click', (event)=>{
    showAuthContent()
})


//Switch UI to Sign Up mode
function showCreateContent(){
    clearAuthForm()
    console.log('criando')
    submitAuthForm.value = 'Cadastrar'
    hideItem(register)
    hideItem(reset)
    showItem(access)  
}
createAccount.addEventListener('click', ()=>{
    console.log('registro')
    showCreateContent()
})

resetPassword.addEventListener('click', ()=>{
    sendPasswordResetEmail()
})


//Redirect to the home page
function showUserContent(){
    window.location.href='index.html'
}

//Redirect to the authentication page
function showAuthContainer(){
    clearAuthForm()
    window.location.href='auth.html'
}





