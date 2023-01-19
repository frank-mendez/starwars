import {
  LOAD_PLANETS_SUCCESS,
  LOAD_PLANET_SUCCESS,
  LOAD_PLANETS_SEARCH_SUCCESS,
} from '../actions/types'

const initialState = {
  planetsResult: {},
  planets: [],
  planet: null,
}

const planets = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_PLANETS_SUCCESS:
      return {
        ...state,
        planetsResult: payload,
        planets: state.planets.concat(payload.results),
      }
    case LOAD_PLANETS_SEARCH_SUCCESS:
      return {
        ...state,
        planetsResult: payload,
        planets: payload.results,
      }
    case LOAD_PLANET_SUCCESS:
      return {
        ...state,
        planet: payload,
      }
    default:
      return state
  }
}

export default planets
