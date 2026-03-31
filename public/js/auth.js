// --- Authentication Logic ---
// Handles login, user registration, and password recovery via Firebase.

// EVENT LISTENERS
authForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = authForm.email.value;
    const password = authForm.password.value;

    // Check if the form is in "Login" or "Register" mode
    if (submitAuthForm.value === 'Login') {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User logged in successfully');
                showUserContent();
            })
            .catch((error) => {
                console.error('Login Error: ' + error.message);
            });
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('User registered:', userCredential.user);
            })
            .catch((error) => {
                console.error('Registration Error: ' + error.message);
            });
    }
});

// PASSWORD RECOVERY
function sendPasswordResetEmail() {
    const email = prompt('Reset Password! Enter your email:');
    
    if (email) {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert('A password reset email has been sent to ' + email + '.');
            })
            .catch((error) => {
                console.error('Reset Error: ' + error.message);
            });
    }
}

// AUTH STATE OBSERVER
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        showUserContent(user);
    }
});