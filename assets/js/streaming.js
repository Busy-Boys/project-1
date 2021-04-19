function getStreamingInfo(imdbID) {
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

    var streamingServiceName = UTellyData.collection.locations[0].display_name;
    var streamingServiceLink = UTellyData.collection.locations[0].url;
    var streamingServiceLogo = UTellyData.collection.locations[0].icon;

    var UTellyObject = {
      name: streamingServiceName,
      link: streamingServiceLink,
      logo: streamingServiceLogo,
    };

    console.log(UTellyObject);
  });
}
