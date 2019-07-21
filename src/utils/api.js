import Axios from "axios";

export function fetchMovieData() {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var encodedURI = window.encodeURI(
    proxyUrl + "http://starlord.hackerearth.com/movies"
  );

  return Axios.get(encodedURI).then(function(response) {
    console.log(response.data);
    response.data.sort(function(a, b) {
      return a.movie_title - b.movie_title;
    });
    return response.data;
  });
}

export function fetchUpcomingMovies(pageNo) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var encodedURI = window.encodeURI(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=b8a01b08435296af2949eae9b705f289&language=en-US&page=" +
      pageNo
  );

  return Axios.get(encodedURI).then(function(response) {
    response.data.results.sort(function(a, b) {
      return b.vote_count - a.vote_count;
    });
    response.data.results.map((item, index) => {
      item["poster_path"] =
        "https://image.tmdb.org/t/p/w300" + item["poster_path"];
    });
    //console.log(response.data.results);
    return response.data.results;
  });
}

export function sampleData() {
  return [
    {
      movie_title: "Avatar ",
      director_name: "James Cameron",
      actor_1_name: "CCH Pounder",
      actor_2_name: "Joel David Moore",
      genres: "Action|Adventure|Fantasy|Sci-Fi",
      language: "English",
      country: "USA",
      content_rating: "PG-13",
      budget: "237000000",
      title_year: "2009",
      plot_keywords: "avatar|future|marine|native|paraplegic",
      movie_imdb_link: "http://www.imdb.com/title/tt0499549/?ref_=fn_tt_tt_1",
      poster: "https://images-na.ssl-images-amazon.com/images/I/41kTVLeW1CL.jpg"
    },
    {
      actor_1_name: "Johnny Depp",
      actor_2_name: "Orlando Bloom",
      budget: "300000000",
      content_rating: "PG-13",
      country: "USA",
      director_name: "Gore Verbinski",
      genres: "Action|Adventure|Fantasy",
      language: "English",
      movie_imdb_link: "http://www.imdb.com/title/tt0449088/?ref_=fn_tt_tt_1",
      movie_title: "Pirates of the Caribbean: At World's End ",
      plot_keywords:
        "goddess|marriage ceremony|marriage proposal|pirate|singapore",
      poster: "https://image.tmdb.org/t/p/w300/bXb00CkHqx7TPchTGG131sWV59y.jpg",
      title_year: "2007"
    },
    {
      actor_1_name: "Christoph Waltz",
      actor_2_name: "Rory Kinnear",
      budget: "245000000",
      content_rating: "PG-13",
      country: "UK",
      director_name: "Sam Mendes",
      genres: "Action|Adventure|Thriller",
      language: "English",
      movie_imdb_link: "http://www.imdb.com/title/tt2379713/?ref_=fn_tt_tt_1",
      movie_title: "Spectre ",
      plot_keywords: "bomb|espionage|sequel|spy|terrorist",
      poster: "https://image.tmdb.org/t/p/w300/hE24GYddaxB9MVZl1CaiI86M3kp.jpg",
      title_year: "2015"
    },
    {
      actor_1_name: "Tom Hardy",
      actor_2_name: "Christian Bale",
      budget: "250000000",
      content_rating: "PG-13",
      country: "USA",
      director_name: "Christopher Nolan",
      genres: "Action|Thriller",
      language: "English",
      movie_imdb_link: "http://www.imdb.com/title/tt1345836/?ref_=fn_tt_tt_1",
      movie_title: "The Dark Knight Rises ",
      plot_keywords:
        "deception|imprisonment|lawlessness|police officer|terrorist plot",
      poster: "https://image.tmdb.org/t/p/w300/dEYnvnUfXrqvqeRSqvIEtmzhoA8.jpg",
      title_year: "2012"
    }
  ];
}

export function getImage(id) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var encodedURI = window.encodeURI(
    proxyUrl +
      "https://api.themoviedb.org/3/find/" +
      id +
      "?api_key=14a29c47d793fddf713896c543694bf3&language=en-US&external_source=imdb_id"
  );

  return Axios.get(encodedURI).then(function(response) {
    // console.log(response.data.movie_results[0]);
    return response.data.movie_results[0];
  });
}
