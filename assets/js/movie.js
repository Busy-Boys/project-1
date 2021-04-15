// omdb API key DH
const omdbApiKey = '4be7587f';
const omdbUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&`;

// target Elements
const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');
// function to retreive basic movie information from omdbi
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

  // RD added this code, talk about to discuss tonight -- Seems like duplication removal?
  function uniqBy(results, key) {
    var seen = {};
    return results.filter(function (item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  newResults = uniqBy(results, JSON.stringify);
  console.log(newResults);

  // loop results and generate thumbnails
  newResults.forEach((result) => {
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
    <p class="is-family-monospace">"${result.Title}"</p>
    <p class="is-family-monospace">"${result.Year}"</p>
    </figure>
  `;
    // append to container
    searchResultsContainer.append(newDiv);
  });
}

// TEST EXAMPLE
// searchForMovies('matrix').then((searchResults) =>
//   searchResultsBuilder(searchResults)
// );

//TEST event listen
searchButton.addEventListener('click', () => {
  const title = searchInput.value;
  console.log(title);
  searchForMovies(title).then((searchResults) =>
    searchResultsBuilder(searchResults)
  );
});
