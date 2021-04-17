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
}

// getFilmInformation(imdbID);
// create object from information received
// push the element into an array
// store the array into local storage so it's visible
