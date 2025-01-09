document.addEventListener("DOMContentLoaded", () => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => {
        const container = document.getElementById("categories-container");
  
        data.forEach((category) => {
          const categoryDiv = document.createElement("div");
          categoryDiv.className = "category";
  
          const categoryTitle = document.createElement("h3");
          categoryTitle.textContent = category.category;
          categoryDiv.appendChild(categoryTitle);
  
          const movieGrid = document.createElement("div");
          movieGrid.className = "movie-grid";
  
          category.movies.forEach((movie) => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";
  
            const poster = document.createElement("img");
            poster.src = `images/${movie.poster}`;
            poster.alt = `${movie.title} Poster`;
            movieCard.appendChild(poster);
  
            const title = document.createElement("h4");
            title.textContent = movie.title;
            movieCard.appendChild(title);
  
            const downloadLink = document.createElement("a");
            downloadLink.href = `movies/${movie.downloadLink}`;
            downloadLink.textContent = "Download";
            downloadLink.className = "download-btn";
            downloadLink.download = "";
            movieCard.appendChild(downloadLink);
  
            movieGrid.appendChild(movieCard);
          });
  
          categoryDiv.appendChild(movieGrid);
          container.appendChild(categoryDiv);
        });
      })
      .catch((error) => console.error("Error loading movies:", error));
  });