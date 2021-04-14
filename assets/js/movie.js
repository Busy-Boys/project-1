// omdb API key DH
const omdbApiKey = '4be7587f';
const omdbUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&`;

// function to retreive basic movie information from omdbi
function searchForMovies(title) {
  return new Promise((resolve, reject) => {
    fetch(`${omdbUrl}s=${title}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          resolve(data.Search);
        } else {
          reject('error');
        }
      });
  });
}

function searchResultsBuilder(results) {
  const autocomplete = document.querySelector('.auto-complete');
  const searchResults = results;

  // append results dropdown
  autocomplete.innerHTML = `
  <div class="dropdown is-active">
    <div class="dropdown-menu">
      <div class="dropdown-content">
        <a href="#" class="dropdown-item">
          Dropdown item
        </a>
        <a class="dropdown-item">
          Other dropdown item
        </a>
        <a href="#" class="dropdown-item is-active">
          Active dropdown item
        </a>
        <a href="#" class="dropdown-item">
          Other dropdown item
        </a>
        <hr class="dropdown-divider">
        <a href="#" class="dropdown-item">
          With a divider
        </a>
      </div>
    </div>
  </div>
  `;
}

// TEST EXAMPLE
searchForMovies('matrix').then((searchResults) => console.log(searchResults));

searchResultsBuilder();
