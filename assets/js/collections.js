// file to add movies from search results into collection
// pass to function that fetches omdb movie information
let imdbID = 'tt1285016';

if (localStorage.getItem('Collection') === null) {
  // write a blank array in, otherwise push wont work later.
  let collection = [];
  localStorage.setItem('Collection', JSON.stringify(collection));
}

let selectedFilm = {
  title: '',
  year: '',
  imdbRating: '',
  rottenRating: '',
  metacriticRating: '',
  director: '',
  shortPlot: '',
  posterUrl: '',
  contentRating: '',
  runtime: '',
  imdbID: '',
};

function getFilmInformation(imdbID) {
  // get array from local
  let collection = localStorage.getItem('Collection');
  let isDuplicate = false;
  collection = JSON.parse(collection);
  // checking to for duplicate imdbID inside collection
  for (let i = 0; i < collection.length; i++) {
    if (collection[i].imdbID === imdbID) {
      isDuplicate = true;
      break;
    }
  }
  // early return to prevent api request from executing based on isDuplicate
  if (isDuplicate === true) {
    return;
  }
  fetch(`${omdbUrl}i=${imdbID}`)
    .then((response) => response.json())
    .then((data) => {
      // copying relevant information from received data will go here
      selectedFilm.title = data.Title;
      selectedFilm.year = data.Year;
      selectedFilm.imdbRating = data.imdbRating;
      selectedFilm.rottenRating = data.Ratings[1].Value;
      selectedFilm.metacriticRating = data.Ratings[2].Value;
      selectedFilm.director = data.Director;
      selectedFilm.shortPlot = data.Plot;
      selectedFilm.posterUrl = data.Poster;
      selectedFilm.contentRating = data.Rated;
      selectedFilm.runtime = data.Runtime;
      selectedFilm.imdbID = imdbID;
    })
    .then(() => {
      // store into collection array
      collection.push(selectedFilm);
      // store into localStorage
      localStorage.setItem('Collection', JSON.stringify(collection));
    });

  constructCollectionHTML();
}

function constructCollectionHTML() {
  let collection = localStorage.getItem('Collection');

  collection = JSON.parse(collection);
  console.log('mycollection:', collection);
  // selecting my-collection div by id
  let container = document.querySelector('#my-collection');

  // create a div
  let collectionDiv = document.createElement('div');

  // assign classes:
  // column is-2 is-one-third-mobile
  collectionDiv.classList.add('column', 'is-2', 'is-one-third-mobile');

  // change innerHTML to template
  // unsure if this loop is necessary, or if working at all
  for (let i = 0; i < collection.length; i++) {
    collectionDiv.innerHTML = `<figure class="image is2by3">
    <center>
      <img
        src="${collection[i].posterUrl}"
      />
      <div class="buttons has-addons is-centered is-medium m-2">
        <button class="button">
          <span class="icon is-small">
            <i class="fas fa-chevron-down"></i>
          </span>
        </button>
        <button class="button is-danger">
          <span class="icon is-small">
            <i class="fas fa-trash-alt"></i>
          </span>
        </button>
        <button class="button">
          <span class="icon is-small">
            <i class="fas fa-chevron-down"></i>
          </span>
        </button>
      </div>
      <p class="is-family-monospace has-text-weight-semibold">
        ${collection[i].title}
      </p>
      <p class="is-family-monospace">${collection[i].year}</p>
    </center>
  </figure>`;
    // append div created to my-collection
    container.append(collectionDiv);
  }
}

// getFilmInformation(imdbID);
// create object from information received
// push the element into an array
// store the array into local storage so it's visible
