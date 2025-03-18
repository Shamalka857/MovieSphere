// Firebase Config (Replace with yours)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Login Functionality
if (window.location.pathname.includes("admin-login.html")) {
    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = "admin-dashboard.html";
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}

// Admin Dashboard Functionality
if (window.location.pathname.includes("admin-dashboard.html")) {
    // Add Movie
    document.getElementById("movie-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const rating = parseFloat(document.getElementById("rating").value);
        const posterFile = document.getElementById("poster").files[0];
        const category = document.getElementById("category").value;

        if (posterFile) {
            const storageRef = storage.ref(`posters/${posterFile.name}`);
            storageRef.put(posterFile).then((snapshot) => {
                snapshot.ref.getDownloadURL().
