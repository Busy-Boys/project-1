// stage card DOM Builder Function
// takes in two arguments imdb #, stage side (left or right)

function stageCardDomBuilder(imdb, side) {
  // define variables
  const imdbID = imdb;
  const stageSide = side;
  // access collection on local storage and parse
  let myCollection = localStorage.getItem('Collection');
  myCollection = JSON.parse(myCollection);
  // get movie data out of localStorage from given imdb
  let selectedFilm = {};
  for (let i = 0; i < myCollection.length; i++) {
    const movie = myCollection[i];
    if (movie.imdbID === imdbID) {
      selectedFilm = movie;
      break;
    }
  }
  // check which side the card is going to and assign target Element
  let targetElement = '';
  if (stageSide === 'left') {
  }
}

stageCardDomBuilder('tt0068646', 'left');
