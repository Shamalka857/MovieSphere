// Firebase Config (Replace with yours)
const firebaseConfig = {
    const firebaseConfig = {
    apiKey: "AIzaSyCmBkZF75TXTUKjCoVuJuqcnm24apejusE",
    authDomain: "moviesphere-e4ccc.firebaseapp.com",
    projectId: "moviesphere-e4ccc",
    storageBucket: "moviesphere-e4ccc.firebasestorage.app",
    messagingSenderId: "498744384429",
    appId: "1:498744384429:web:ee1b5b950f15c1ff9fdf24"
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
