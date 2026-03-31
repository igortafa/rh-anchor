// --- FIREBASE CONFIGURATION ---

// Hey, never push your real API keys to a public repository!

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig);

// DATABASE REFERENCES
const database = firebase.database();
const dbRefUsers = database.ref('users');