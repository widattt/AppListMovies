
const intialState = {
  movies: [],
  hasMore: true
};

export const movieReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case 'getListMovies': {
      if(payload.length === 0) {
        state.hasMore = false
      }
      return { ...state, movies: [...state.movies, ...payload] };
    }
    case 'updateLike': {
      const result = state.movies
      const check = state.movies[payload.index].likes.find(dd => dd === payload.idUser)
      if(check) {
        const resultLike = state.movies[payload.index].likes.filter(dd => dd !== payload.idUser)
        result[payload.index].likes = resultLike
      } else {
        result[payload.index].likes.push(payload.idUser)
        
      }
      return {...state, movies: result}
    }
    default:
      return state;
  }
};

