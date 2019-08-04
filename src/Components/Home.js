import React, { Component } from "react";
import * as api from "../utils/api.js";
import trendingIcon from "../images/trending-icon.png";
import closeIcon from "../images/close.png";
import LikeMovie from "./LikeMovie";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export function Popularity(props) {
  return (
    <div className="popularity">
      <img
        className="trending-icon"
        src={trendingIcon}
        alt="popularity"
        width="100%"
      />
      <label>{Math.floor(props.popularity) + "%"}</label>
    </div>
  );
}

const mapStateToProps = store => {
  return {
    loading: store.loading,
    state: store,
    page: store.page,
    movies: store.movies,
    movieCount: store.movieCount,
    watchList: store.watchList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMovies: movies => {
      dispatch({ type: "UPDATE_MOVIES", movies: movies });
    },
    setLoading: loading => {
      dispatch({ type: "SET_LOADING", loading: loading });
    },
    changePage: page => {
      dispatch({ type: "CHANGE_API_PAGE", page: page });
    },
    increaseMovieCount: movieCount => {
      dispatch({ type: "INCREASE_MOVIE_COUNT", movieCount: movieCount });
    },
    addToWatchList: movie => {
      dispatch({ type: "ADD_TO_WATCHLIST", movie: movie });
    },
    addMoviesToList: movies => {
      dispatch({ type: "ADD_MOVIES", movies: movies });
    }
  };
};

class Home extends React.PureComponent {
  componentWillMount() {
    api.fetchUpcomingMovies(this.props.page).then(data => {
      this.props.updateMovies(data);
      this.props.setLoading(false);
    });
  }

  getDate = month => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return months[Number(month) - 1];
  };

  nextMovie = action => {
    const movieCount = this.props.movieCount;
    if (action === "add") {
      this.props.addToWatchList(this.props.movies[movieCount]);
    }
    // console.log(this.props.movies[movieCount]);
    if (movieCount > this.props.movies.length / 2) {
      api.fetchUpcomingMovies(this.props.page + 1).then(data => {
        this.props.increaseMovieCount(movieCount + 1);
        this.props.changePage(this.props.page + 1);
        this.props.addMoviesToList(data);
      });
    } else {
      this.props.increaseMovieCount(movieCount + 1);
    }
  };
  render() {
    const loading = this.props.loading;
    const movies = this.props.movies;
    const movieCount = this.props.movieCount;
    if (loading) {
      return <p>Loading...</p>;
    }

    var movieOverview = movies[movieCount].overview;
    if (movieOverview.length > 420) {
      movieOverview = movieOverview.substring(0, 380) + " [...]";
    }
    const release_date =
      this.getDate(movies[movieCount].release_date.split("-")[1]) +
      " - " +
      movies[movieCount].release_date.split("-")[0];
    return (
      <>
        <h2>Popular Movies of the Year</h2>
        <div className="container">
          <div className="movie-grid">
            <div className="image-container">
              <img alt="poster" src={movies[movieCount].poster_path} />
            </div>
            <Popularity popularity={movies[movieCount].popularity} />
            <div className="movie-details">
              <ul>
                <li>
                  <span className="title">{movies[movieCount].title}</span>
                </li>
                <li>
                  <span>{release_date}</span>
                </li>
                <li>{movieOverview}</li>
              </ul>
            </div>
          </div>
          <div className="panel">
            <img
              src={closeIcon}
              alt="close"
              width="50px"
              onClick={() => this.nextMovie("remove")}
            />
            <LikeMovie likeMovie={this.nextMovie} />
          </div>
          <label className="watchlist-tile">
            {this.props.watchList.length > 0 && (
              <Link to="./watch-list">Watch List</Link>
            )}
          </label>
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
