// script.js
fetch('movies.json')
    .then(response => response.json())
    .then(movies => {
        // Function to display movies based on category
        function displayMovies(category, containerId) {
            const container = document.getElementById(containerId);
            container.innerHTML = ''; // Clear previous content

            movies.forEach(movie => {
                if (movie.categories.includes(category) || category === 'home') {
                    const movieHtml = `
                        <div class="movie-item">
                            <img src="${movie.poster}" alt="${movie.title}">
                            <div class="movie-logo-overlay"></div>
                            <h3>${movie.title}</h3>
                            <p class="movie-rating">${movie.rating}</p>
                        </div>
                    `;
                    container.innerHTML += movieHtml;
                }
            });
        }

        // Display new items
        displayMovies('new-items', 'new-items-grid');

        // Display new releases (default)
        displayMovies('new-releases', 'releases-container');

        // Tab functionality
        const tabs = document.querySelectorAll('.tabs button');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const category = tab.dataset.category;
                displayMovies(category, 'releases-container');
            });
        });
    })
    .catch(error => console.error('Error loading movies:', error));
