import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

const mapStateToProps = store => {
  return {
    movies: store.movies,
    watchList: store.watchList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateWatchList: watchList => {
      dispatch({ type: "UPDATE_WATCHLIST", watchList: watchList });
    }
  };
};

class WatchList extends Component {
  removeFromWatchList = (event, title) => {
    const watchList = this.props.watchList.filter(x => x.title !== title);
    //setTimeout(() => this.props.updateWatchList(watchList), 1000);
    this.props.updateWatchList(watchList);
  };
  render() {
    const tooltipClass = "tooltip expand";
    const watchList = this.props.watchList;
    if (watchList.length === 0) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <h2>My WatchList:</h2>
        <label className="homepage-url">
          &lt;<Link to="/">Back to List</Link>
        </label>
        <div className="watchlist-container">
          <ul className="watchlist-movie-grid">
            {watchList.map((movie, index) => {
              return (
                <li
                  key={index}
                  className="movie-card"
                  onClick={event =>
                    this.removeFromWatchList(event, movie.title)
                  }
                >
                  <div className="movie-item">
                    <span className="movie-title">{movie.title}</span>
                    <span className="release-year">{movie.release_date}</span>
                  </div>
                  <img
                    className="thumbnail"
                    src={movie.poster_path}
                    alt="poster"
                    width="100%"
                    height="100%"
                  />
                  <label className={tooltipClass} data-title={movie.overview} />
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchList);
