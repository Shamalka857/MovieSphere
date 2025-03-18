// Firebase Configuration (Replace with your actual config)
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
const db = firebase.firestore();

// Load Movies Function
function loadMovies(category, containerId) {
    db.collection("movies").where("category", "==", category).get().then((querySnapshot) => {
        const container = document.getElementById(containerId);
        container.innerHTML = ""; // Clear previous content
        querySnapshot.forEach((doc) => {
            const movie = doc.data();
            const movieHtml = `
                <div class="movie-item">
                    <img src="${movie.posterUrl}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <p class="movie-rating">${movie.rating}</p>
                </div>
            `;
            container.innerHTML += movieHtml;
        });
    });
}

// Load Releases (Initially New Releases)
loadMovies("new-releases", "releases-container");

// Tab Functionality
document.querySelectorAll(".tabs button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        const category = button.dataset.category;
        loadMovies(category, "releases-container");
    });
});

// Load New Items (Example)
loadMovies("new-items", "new-items-grid");
