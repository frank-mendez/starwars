import {
  LOAD_SPACESHIPS_SUCCESS,
  LOAD_SPACESHIP_SUCCESS,
  LOAD_SPACESHIPS_SEARCH_SUCCESS,
} from '../actions/types'

const initialState = {
  spaceshipResult: {},
  spaceships: [],
  spaceship: null,
}

const spaceships = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_SPACESHIPS_SUCCESS:
      return {
        ...state,
        spaceshipResult: payload,
        spaceships: state.spaceships.concat(payload.results),
      }
    case LOAD_SPACESHIPS_SEARCH_SUCCESS:
      return {
        ...state,
        spaceshipResult: payload,
        spaceships: payload.results,
      }
    case LOAD_SPACESHIP_SUCCESS:
      return {
        ...state,
        spaceship: payload,
      }
    default:
      return state
  }
}

export default spaceships
