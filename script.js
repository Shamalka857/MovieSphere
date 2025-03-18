fetch('movies.json')
    .then(response => response.json())
    .then(movies => {
        function displayMovies(category, containerId) {
            const container = document.getElementById(containerId);
            container.innerHTML = '';

            movies.forEach(movie => {
                if (movie.categories.includes(category) || category === 'home') {
                    const movieItem = document.createElement('div');
                    movieItem.classList.add('movie-item');

                    const movieHtml = `
                        <img src="${movie.poster}" alt="${movie.title}">
                        <div class="movie-logo-overlay"></div>
                        <h3>${movie.title}</h3>
                        <p class="movie-rating">${movie.rating}</p>
                    `;

                    movieItem.innerHTML = movieHtml;
                    container.appendChild(movieItem);
                }
            });
        }

        displayMovies('new-items', 'new-items-grid');
        displayMovies('new-releases', 'releases-container');

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
