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
  const searchResults = results;
  const mainContainer = document.querySelector('#main');

  // append results container to main section element
  const searchResultsContainer = document.createElement('div');
  searchResultsContainer.classList.add('container', 'box');
  searchResultsContainer.innerHTML = `
    <h2 class="title m-2">Search Results</h2>
    <div id="search-results"class="columns is-mobile is-flex-wrap-wrap">
    </div>
  `;
  mainContainer.prepend(searchResultsContainer);

  // loop results and generate thumbnails
  results.forEach((result) => {
    // target element
    const searchResultsContainer = document.querySelector('#search-results');
    // create div
    let newDiv = document.createElement('div');
    // add classes
    newDiv.classList.add('column', 'is-2', 'is-one-third-mobile');
    // add internalHTML
    newDiv.innerHTML = `
    <figure class="image is2by3">
    <img
      src="${result.Poster}"
    />
    </figure>
  `;
    // append to container
    searchResultsContainer.append(newDiv);
  });
}

// TEST EXAMPLE
searchForMovies('matrix').then((searchResults) =>
  searchResultsBuilder(searchResults)
);

// searchResultsBuilder();
