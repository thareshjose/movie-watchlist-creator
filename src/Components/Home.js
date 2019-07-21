import React, { Component } from "react";
import * as api from "../utils/api.js";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayData: [],
      movieCount: 0,
      loading: true,
      page: 1
    };
  }

  componentWillMount() {
    api.fetchUpcomingMovies(this.state.page).then(data => {
      this.setState({ movies: data, loading: false });
    });
  }

  nextMovie = () => {
    const state = { ...this.state };
    if (state.movieCount > state.movies.length / 2) {
      state.page++;
      console.log("here");
      api.fetchUpcomingMovies(state.page).then(data => {
        this.setState({
          movies: [...this.state.movies, ...data],
          movieCount: state.movieCount + 1,
          page: state.page
        });
      });
    } else {
      this.setState({
        movieCount: state.movieCount + 1
      });
    }
  };
  render() {
    const state = { ...this.state };
    console.log(state.movies);
    if (state.loading) {
      return <p>Loading...</p>;
    }
    return (
      <div className="container">
        <div className="movie-grid">
          <div className="image-container">
            <img
              alt="poster"
              src={state.movies[state.movieCount].poster_path}
              onClick={() => this.nextMovie()}
            />
          </div>
          <div className="movie-details">
            <ul>
              <li>
                <span className="black title">Title: </span>
                <span>{state.movies[state.movieCount].title}</span>
              </li>
              <li>
                <span className="black">Popularity: </span>
                <span>{state.movies[state.movieCount].popularity}</span>
              </li>
              <li>
                <span className="black title">Release Date: </span>
                <span>{state.movies[state.movieCount].release_date}</span>
              </li>
              <li>{state.movies[state.movieCount].overview}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
