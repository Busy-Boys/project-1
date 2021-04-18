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
    targetElement = document.querySelector('#stage-card-left');
  } else {
    targetElement = document.querySelector('#stage-card-right');
  }
  // clear out stageCard if contains content
  if (targetElement.innerHTML !== '') {
    targetElement.innerHTML = '';
  }

  // start building card with card div
  let newCard = document.createElement('div');
  newCard.classList.add('card');
  // add the inner html
  newCard.innerHTML = `
  <div class="card-content">
  <div class="media mb-1">
    <div class="media-left">
      <figure class="movie-poster image is-128x128">
        <img
          src="${selectedFilm.posterUrl}"
          alt="Movie Poster"
        />
      </figure>
    </div>
    <div class="media-content">
      <p class="title is-4 is-family-monospace">${selectedFilm.title}</p>
      <p class="subtitle is-5 mb-0 is-family-monospace">
        <b>Year: </b>${selectedFilm.year}
      </p>
      <p class="subtitle is-6 mb-0 is-family-monospace">
        <b>Rating: </b>${selectedFilm.contentRating}
      </p>
      <p class="subtitle is-6 mb-0 is-family-monospace">
        <b>Runtime: </b>${selectedFilm.runtime}
      </p>
      <p class="subtitle is-6 mb-0 is-family-monospace">
        <b>Director: </b>${selectedFilm.director}
      </p>
      <p class="subtitle is-6 mb-0 is-family-monospace">
        <b>IMDB Ratting: </b>${selectedFilm.imdbRating}
      </p>
      <p class="subtitle is-6 mb-0 is-family-monospace">
        <b>Rotten Tomatoes : </b>${selectedFilm.rottenRating}
      </p>
      <p class="subtitle is-6 mb-0 is-family-monospace">
        <b>Metacritic : </b>${selectedFilm.metacriticRating}
      </p>
    </div>
  </div>

  <div class="content">
    <p>${selectedFilm.shortPlot}</p>
  </div>
</div>
  `;
  // append to target container
  targetElement.appendChild(newCard);
}

// stageCardDomBuilder('tt0068646', 'left');
