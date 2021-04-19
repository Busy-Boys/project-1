function getStreamingInfo(imdbID, side) {
  //API URL. Takes imdbID.
  var UTellyURL =
    'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=' +
    imdbID +
    '&source=imdb&country=us';

  const UTellyFetch = fetch(UTellyURL, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'ccec4ce7b6msh798a7bc7988f7c2p110316jsne9dc9b843b67',
      'x-rapidapi-host':
        'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
    },
  }); //Returns UTelly URL.
  UTellyFetch.then((response) => {
    return response.json();
  }).then((UTellyData) => {
    console.log(UTellyData);

    let streamingInfo = UTellyData.collection.locations;
    console.log(streamingInfo);
    streamDataDomBuilder(streamingInfo, side);
  });
}

function streamDataDomBuilder(streamData, side) {
  // get stage side variable and get targetElement
  let stageSide = side;
  let targetElement = '';
  if (stageSide === 'left') {
    targetElement = document.querySelector('#inner-card-left');
  } else {
    targetElement = document.querySelector('#inner-card-right');
  }

  // create new card footer
  let newFooter = document.createElement('div');
  newFooter.classList.add('card-footer');
  // build inner html from array
  let innerHTMLContent = '';
  streamData.forEach((service) => {
    innerHTMLContent += `
    <p class="card-footer-item">
      <span>
      <a href="${service.url}" alt="link to movie on streaming service" target="_blank">
        <img src="${service.icon}" alt="streaming service icon">
      </a>
     </span>
    </p>
  `;
  });
  // write built html to element
  newFooter.innerHTML = innerHTMLContent;
  // append element
  targetElement.appendChild(newFooter);
}
