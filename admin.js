// Initialize Firebase
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Upload form submission
document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const movieTitle = document.getElementById('movieTitle').value;
  const movieDescription = document.getElementById('movieDescription').value;
  const movieRating = document.getElementById('movieRating').value;
  const moviePoster = document.getElementById('moviePoster').value;
  const movieDownloadLink = document.getElementById('movieDownloadLink').value;

  const movieData = {
    title: movieTitle,
    description: movieDescription,
    rating: movieRating,
    poster: moviePoster,
    downloadLink: movieDownloadLink
  };

  // Save to Firestore
  db.collection("movies").add(movieData).then(() => {
    alert('Movie uploaded successfully!');
    loadMovies();  // Reload the list of movies
  }).catch(error => {
    console.error("Error uploading movie:", error);
  });
});

// Load all movies from Firestore
function loadMovies() {
  const moviesList = document.getElementById('moviesList');
  moviesList.innerHTML = ''; // Clear current movies

  db.collection("movies").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const movie = doc.data();
      const movieId = doc.id;

      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-card');
      
      movieDiv.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title} Poster">
        <h4>${movie.title}</h4>
        <p>${movie.description}</p>
        <p>Rating: ${movie.rating}</p>
        <a href="${movie.downloadLink}" class="download-btn" target="_blank">Download</a>
        <button onclick="editMovie('${movieId}')">Edit</button>
        <button onclick="deleteMovie('${movieId}')">Delete</button>
      `;
      
      moviesList.appendChild(movieDiv);
    });
  }).catch(error => {
    console.error("Error loading movies:", error);
  });
}

// Delete movie
function deleteMovie(movieId) {
  db.collection("movies").doc(movieId).delete().then(() => {
    alert('Movie deleted successfully');
    loadMovies();
  }).catch(error => {
    console.error("Error deleting movie:", error);
  });
}

// Edit movie
function editMovie(movieId) {
  db.collection("movies").doc(movieId).get().then((doc) => {
    const movie = doc.data();

    document.getElementById('movieTitle').value = movie.title;
    document.getElementById('movieDescription').value = movie.description;
    document.getElementById('movieRating').value = movie.rating;
    document.getElementById('moviePoster').value = movie.poster;
    document.getElementById('movieDownloadLink').value = movie.downloadLink;

    // Change form submit to update movie
    document.getElementById('uploadForm').onsubmit = function(event) {
      event.preventDefault();

      const updatedMovieData = {
        title: document.getElementById('movieTitle').value,
        description: document.getElementById('movieDescription').value,
        rating: document.getElementById('movieRating').value,
        poster: document.getElementById('moviePoster').value,
        downloadLink: document.getElementById('movieDownloadLink').value
      };

      // Update the movie document in Firestore
      db.collection("movies").doc(movieId).update(updatedMovieData).then(() => {
        alert('Movie updated successfully!');
        loadMovies();
      }).catch(error => {
        console.error("Error updating movie:", error);
      });
    };
  }).catch(error => {
    console.error("Error loading movie for editing:", error);
  });
}

// Load movies when the page loads
loadMovies();
