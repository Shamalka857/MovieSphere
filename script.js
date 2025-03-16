// Wait for the form submission
document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const movieTitle = document.getElementById('movieTitle').value;
  const movieDescription = document.getElementById('movieDescription').value;
  const movieRating = document.getElementById('movieRating').value;
  const moviePoster = document.getElementById('moviePoster').files[0];
  const movieFile = document.getElementById('movieFile').files[0];

  // Encrypt the movie file and metadata
  const movieData = {
    title: movieTitle,
    description: movieDescription,
    rating: movieRating,
    poster: moviePoster.name
  };

  const encryptionKey = 'your-secret-key'; // Use a secure key in a real-world scenario

  // Convert the movie file to a binary string for encryption
  const reader = new FileReader();
  reader.onload = function(e) {
    const movieBinaryData = e.target.result;
    
    // Encrypt the movie file
    const encryptedMovie = CryptoJS.AES.encrypt(CryptoJS.enc.Latin1.parse(movieBinaryData), encryptionKey).toString();

    // Encrypt metadata (simple example - you could choose to encrypt metadata as well)
    const encryptedMetadata = CryptoJS.AES.encrypt(JSON.stringify(movieData), encryptionKey).toString();

    // Store the encrypted movie data (as base64-encoded string) in the localStorage or JSON
    const movieMetadata = {
      encryptedMovie: encryptedMovie,
      encryptedMetadata: encryptedMetadata
    };

    // Store the encrypted data in local storage or you can save it to a file (simplified for the example)
    localStorage.setItem('movie_' + movieTitle, JSON.stringify(movieMetadata));

    alert("Movie and metadata encrypted and stored successfully!");

    // Optionally, update the UI with the movie data
    displayMovies();
  };

  // Read the movie file as binary string (for encryption)
  reader.readAsBinaryString(movieFile);
});

// Function to display movies from localStorage (decrypt them before displaying)
function displayMovies() {
  const movieContainer = document.getElementById('categories-container');
  movieContainer.innerHTML = ''; // Clear previous movies

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const movieMetadata = JSON.parse(localStorage.getItem(key));

    // Decrypt movie metadata
    const decryptedMetadata = CryptoJS.AES.decrypt(movieMetadata.encryptedMetadata, 'your-secret-key').toString(CryptoJS.enc.Utf8);
    const movieData = JSON.parse(decryptedMetadata);

    // Decrypt movie file
    const decryptedMovie = CryptoJS.AES.decrypt(movieMetadata.encryptedMovie, 'your-secret-key').toString(CryptoJS.enc.Latin1);

    // Now you can display the decrypted movie data
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `
      <img src="${movieData.poster}" alt="${movieData.title} Poster">
      <h4>${movieData.title}</h4>
      <p>${movieData.description}</p>
      <p>Rating: ${movieData.rating}</p>
      <a href="data:video/mp4;base64,${decryptedMovie}" download="${movieData.title}.mp4">Download Movie</a>
    `;

    movieContainer.appendChild(movieCard);
  }
}

// Call the function to display movies after page load
window.onload = displayMovies;
