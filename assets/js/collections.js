// file to add movies from search results into collection
// pass to function that fetches omdb movie information
let imdbID = 'tt1285016';

function getFilmInformation(imdbID) {
  fetch(`${omdbUrl}i=${imdbID}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('received info:', data);
    });
}

// getFilmInformation(imdbID);
// create object from information received
// push the element into an array
// store the array into local storage so it's visible
