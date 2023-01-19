import {
  LOAD_FILMS_SUCCESS,
  LOAD_FILM_SUCCESS,
  LOAD_FILMS_SEARCH_SUCCESS,
} from '../actions/types'

const initialState = {
  filmsResult: {},
  films: [],
  film: null,
}

const films = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_FILMS_SUCCESS:
      return {
        ...state,
        filmsResult: payload,
        films: state.films.concat(payload.results),
      }
    case LOAD_FILMS_SEARCH_SUCCESS:
      return {
        ...state,
        filmsResult: payload,
        films: payload.results,
      }
    case LOAD_FILM_SUCCESS:
      return {
        ...state,
        film: payload,
      }
    default:
      return state
  }
}

export default films
