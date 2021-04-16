// file to add movies from search results into collection
// pass to function that fetches omdb movie information
let imdbID = 'tt1285016';

let collection = [];

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
};

function getFilmInformation(imdbID) {
  fetch(`${omdbUrl}i=${imdbID}`)
    .then((response) => response.json())
    .then((data) => {
      // copying relevant information from received data will go here
      console.log('searched information:', data);
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
      // store into collection array
      collection.push(selectedFilm);
      // store into localStorage
      localStorage.setItem('Collection', JSON.stringify(collection));
    })
    .then(() => {
      // console log information to test our object has been successfully stored
      console.log('In js environment:', collection);
      // in localStorage, needs parsing into java object in order to be usable
      // as everything is stored as a JSON string of text
      let storedCollection = localStorage.getItem('Collection');
      console.log('As stored object:', storedCollection);
    });
}

// getFilmInformation(imdbID);
// create object from information received
// push the element into an array
// store the array into local storage so it's visible
