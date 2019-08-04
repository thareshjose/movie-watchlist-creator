const initialState = {
  displayData: [],
  movies: [],
  watchList: [],
  movieCount: 0,
  loading: true,
  page: 1
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_MOVIES":
      return Object.assign({}, state, {
        movies: action.movies
      });
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading
      };
    case "CHANGE_API_PAGE":
      return {
        ...state,
        page: action.page
      };
    case "ADD_MOVIES":
      return {
        ...state,
        movies: [...state.movies, ...action.movies]
      };
    case "LIKE_MOVIE":
      return {
        ...state,
        count: state.count + action.value,
        history: state.history.concat({ count: state.count + action.value })
      };
    case "DISLIKE_MOVIE":
      return {
        ...state,
        count: state.count - action.value,
        history: state.history.concat({ count: state.count - action.value })
      };
    case "INCREASE_MOVIE_COUNT":
      return {
        ...state,
        movieCount: action.movieCount
      };
    case "ADD_TO_WATCHLIST":
      return {
        ...state,
        watchList: [...state.watchList, action.movie]
      };
    case "UPDATE_WATCHLIST":
      return {
        ...state,
        watchList: action.watchList
      };
    default:
      return state;
  }
};

export default reducer;
