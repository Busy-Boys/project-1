// file to add movies from search results into collection
// pass to function that fetches omdb movie information
let imdbID = 'tt1285016';

if (localStorage.getItem('Collection') === null) {
  // write a blank array in, otherwise push wont work later.
  let collection = [];
  localStorage.setItem('Collection', JSON.stringify(collection));
}

// construct the html regardless of fetch request consequence
constructCollectionHTML();

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
      console.log('fetch data', data);
      let selectedFilm = {
        title: data.Title ? data.Title : 'N/A',
        year: data.Year ? data.Year : 'N/A',
        imdbRating: data.imdbRating ? data.imdbRating : 'N/A',
        rottenRating: data.Ratings[1] ? data.Ratings[1].Value : 'N/A',
        metacriticRating: data.Ratings[2] ? data.Ratings[2].Value : 'N/A',
        director: data.Director ? data.Director : 'N/A',
        shortPlot: data.Plot ? data.Plot : 'N/A',
        posterUrl: data.Poster ? data.Poster : 'N/A',
        contentRating: data.Rated ? data.Rated : 'N/A',
        runtime: data.Runtime ? data.Runtime : 'N/A',
        imdbID: imdbID,
      };
      collection.push(selectedFilm);
    })
    .then(() => {
      console.log('i got here');
      // store into collection array
      // store into localStorage
      localStorage.setItem('Collection', JSON.stringify(collection));
      constructCollectionHTML();
    });
  // .catch(() =>
  //   console.error('something went wrong getting movie information')
  // );
}

function constructCollectionHTML() {
  // reading collection from localStorage and assigning to variable
  let collection = localStorage.getItem('Collection');
  collection = JSON.parse(collection);
  // console.log('mycollection:', collection);
  // clear div
  if (document.querySelector('#my-collection-container')) {
    document.querySelector('#my-collection-container').remove();
  }

  // DH - made some changes to build My Collection DOM here, not on page load.
  if (collection.length > 0) {
    // Turn off welcome-hero
    if (document.querySelector('#welcome-hero')) {
      document.querySelector('#welcome-hero').remove();
    }

    //DH to comment
    if (!document.querySelector('#my-collection-continer')) {
      let MyCollectionContainer = document.createElement('div');
      MyCollectionContainer.classList.add('container', 'box');
      MyCollectionContainer.id = 'my-collection-container';
      MyCollectionContainer.innerHTML = `
      <h2 class="title m-2">My Collection</h2>
      <div class="columns is-mobile is-flex-wrap-wrap" id="my-collection"></div>
    <div id="stage" class="container">
      <div class="columns">
        <!-- DH - added id's to target the build of stagecards -->
        <div id="stage-card-left" class="column is-half"></div>
        <!-- DH added id to stage card right -->
        <div id="stage-card-right" class="column is-half">

        </div>
      </div>
      <div class="card"></div>
    </div>
      `;
      // append above to DOM
      document.querySelector('#main').appendChild(MyCollectionContainer);
      // clear div
      document.querySelector('#my-collection').innerHTML = '';
    }
  }

  console.log('construct called');

  // selecting my-collection div by id
  let container = document.querySelector('#my-collection');

  for (let i = 0; i < collection.length; i++) {
    // console.log(collection);
    let collectionDiv = document.createElement('div');
    collectionDiv.classList.add('column', 'is-2', 'is-one-third-mobile');
    collectionDiv.innerHTML = `<figure class="image is2by3">
    <center>
      <img
        src="${collection[i].posterUrl}"
      />
      <div id="collection-buttons" class="buttons has-addons is-centered is-medium m-2">
        <button id="compare-left-${i}" class="button is-small is-size-6-tablet" data-imdb="${collection[i].imdbID}">
          <span class="icon is-small">
            <i class="fas fa-chevron-down"></i>
          </span>
        </button>
        <button id="delete-${i}" class="button is-danger is-small is-size-6-tablet" data-imdb="${collection[i].imdbID}">
          <span class="icon is-small">
            <i class="fas fa-trash-alt"></i>
          </span>
        </button>
        <button id="compare-right-${i}" class="button is-small is-size-6-tablet " data-imdb="${collection[i].imdbID}">
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

    // add event listener to compare-left button
    let compareLeftButton = document.querySelector(`#compare-left-${i}`);
    compareLeftButton.addEventListener('click', () => {
      const imdbID = document.querySelector(`#compare-left-${i}`).dataset.imdb;
      // Dave's function goes here!!
      stageCardDomBuilder(imdbID, 'left');
      console.log('comp-left-button-click', imdbID);
      getFinancialInfo(imdbID, 'left');
    });
    // add event listener compare right button
    let compareRightButton = document.querySelector(`#compare-right-${i}`);
    compareRightButton.addEventListener('click', () => {
      const imdbID = document.querySelector(`#compare-right-${i}`).dataset.imdb;
      // Dave's function goes here!!
      stageCardDomBuilder(imdbID, 'right');
      console.log('comp-right-click', imdbID);
      getFinancialInfo(imdbID, 'right');
    });

    let deleteButton = document.querySelector(`#delete-${i}`);
    deleteButton.addEventListener('click', () => {
      const imdbID = document.querySelector(`#delete-${i}`).dataset.imdb;
      // remove movie from collection when delete is clicked
      deleteMovieFromCollection(collection, imdbID);
      console.log('delete-click', imdbID);
    });
  }
}

function deleteMovieFromCollection(collection, imdbID) {
  for (let i = 0; i < collection.length; i++) {
    if (collection[i].imdbID === imdbID) {
      // delete element from array
      collection.splice(i, 1);
      // update the localStorage array
      localStorage.clear();
      localStorage.setItem('Collection', JSON.stringify(collection));
      // rebuild the page with updated array
      constructCollectionHTML();
      // console.log('updated upon deletion:', collection);
    }
  }
}
