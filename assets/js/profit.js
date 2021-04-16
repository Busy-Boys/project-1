// Calling TMDb API
function getFinancialInfo(imdbID) {
  // API url #1. Takes imdbID.
  var TMDbUrl =
    'https://api.themoviedb.org/3/find/' +
    imdbID +
    '?api_key=d38648803859bebf97aabe61377bba3c&language=en-US&external_source=imdb_id';

  const TMDbFetch = fetch(TMDbUrl); // Returns object with TMDb id
  TMDbFetch.then((response) => {
    return response.json();
  }).then((TMDbData) => {
    var TMDbID = TMDbData.movie_results[0].id;
    console.log(TMDbData);
    var TMDbUrl2 = // Second API URL. Takes the TMDb URL found above.
      'https://api.themoviedb.org/3/movie/' +
      TMDbID +
      '?api_key=d38648803859bebf97aabe61377bba3c&language=en-US';

    const TMDbFetch2 = fetch(TMDbUrl2); // Returns object containing revenue, budget and overview (among other things).
    TMDbFetch2.then((response) => {
      return response.json();
    }).then((TMDbData2) => {
      console.log(TMDbData2);
      var budget = TMDbData2.budget;

      var revenue = TMDbData2.revenue;

      var overview = TMDbData2.overview;

      var financials = { Revenue: revenue, Budget: budget, Overview: overview }; // Creating an object
      console.log(financials);
    });
  });
}

var imdbID1 = 'tt0117951'; // Testing above function with a few imdb ID's
var imdbID2 = 'tt0120338';
var imdbID3 = 'tt0169547';

getFinancialInfo(imdbID1);
getFinancialInfo(imdbID2);
getFinancialInfo(imdbID3);
