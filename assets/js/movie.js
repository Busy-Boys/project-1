// omdb API key DH
const omdbApiKey = '4be7587f';
const omdbUrl = `https://www.omdbapi.com/?apikey=${omdbApiKey}&`;

// target Elements
const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');

// function to retreive basic movie information from omdbi <-- I think I have a double promise here
function searchForMovies(title) {
  return new Promise((resolve, reject) => {
    fetch(`${omdbUrl}s=${title}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          resolve(data.Search);
          console.log(data);
        } else {
          reject('error');
        }
      });
  });
}

// builds the search results container
function searchResultsBuilder(results) {
  // remove welcome if displaying
  if (document.querySelector('#welcome-hero')) {
    document.querySelector('#welcome-hero').remove();
  }
  let searchResults = results;
  // check if not a movie and delete -- had to add decrementor to account for the array length changing
  for (let i = 0; i < searchResults.length; i++) {
    if (searchResults[i].Type !== 'movie') {
      searchResults.splice(i, 1);
      i--;
    }
  }
  // delete movies that DONT have cover art -- seem to be 'off-brand' anyway
  for (let i = 0; i < searchResults.length; i++) {
    if (searchResults[i].Poster === 'N/A') {
      searchResults.splice(i, 1);
      i--;
    }
  }

  // slice search results to six
  if (searchResults.length > 6) {
    searchResults = searchResults.slice(0, 6);
  }
  const mainContainer = document.querySelector('#main');

  // delete old search results if they exist
  const existingSearchResults = document.querySelector('.search-results');
  if (existingSearchResults) {
    existingSearchResults.remove();
  }

  // append results container to main section element
  const searchResultsContainer = document.createElement('div');
  searchResultsContainer.classList.add('search-results', 'container', 'box');
  searchResultsContainer.innerHTML = `
    <h2 class="title m-2">Search Results</h2>
    <div id="search-results"class="columns is-mobile is-flex-wrap-wrap">
    </div>
  `;
  mainContainer.prepend(searchResultsContainer);

  // RD added this code, talk about to discuss tonight -- Seems like duplication removal?
  function uniqBy(results, key) {
    var seen = {};
    return results.filter(function (item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  newResults = uniqBy(searchResults, JSON.stringify);

  // loop results and generate thumbnails
  newResults.forEach((result, i) => {
    // target element
    const searchResultsContainer = document.querySelector('#search-results');
    // create div
    let newDiv = document.createElement('div');
    // add classes
    newDiv.classList.add('column', 'is-2', 'is-one-third-mobile');
    // add internalHTML
    newDiv.innerHTML = `
    <figure class="image is2by3">
      <center>
        <img
          src="${result.Poster}"
        />
        <button data-imdb="${result.imdbID}" id="add-collection-${i}" class="button is-primary mt-2 is-size-10-tablet">
          <span class="icon is-small">
          <i class="fas fa-plus"></i>
          </span>
          <span>
            Add
          </span>
        </button>
        <p class="is-family-monospace has-text-weight-semibold">${result.Title}</p>
        <p class="is-family-monospace">${result.Year}</p>
      </center>
    </figure>
  `;
    // append to container
    searchResultsContainer.append(newDiv);
    // add event listener to add button
    let addButtonSelector = document.querySelector(`#add-collection-${i}`);
    addButtonSelector.addEventListener('click', () => {
      const imdbID = document.querySelector(`#add-collection-${i}`).dataset
        .imdb;
      //Ritz's function goes HERE!!
      getFilmInformation(imdbID);
      console.log(imdbID);
    });
  });
}

// Event Listener on search button
searchButton.addEventListener('click', () => {
  const title = searchInput.value;
  console.log(title);
  searchForMovies(title)
    .then((searchResults) => searchResultsBuilder(searchResults))
    .catch(() => console.error('Movie Not Found or API Down'));
});

// Event Listener of Enter Key
searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const title = searchInput.value;
    console.log(title);
    searchForMovies(title)
      .then((searchResults) => searchResultsBuilder(searchResults))
      .catch(() => console.error('Movie Not Found or API Down'));
  }
});

// TEST - AUTOGEN for quick UI CHanges

// searchForMovies('the godfather').then((searchResults) =>
//   searchResultsBuilder(searchResults)
// );
