import {
  LOAD_PEOPLE_SUCCESS,
  LOAD_PERSON_SUCCESS,
  LOAD_PEOPLE_SEARCH_SUCCESS,
} from '../actions/types'

const initialState = {
  peopleResult: {},
  people: [],
  person: null,
}

const people = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_PEOPLE_SUCCESS:
      return {
        ...state,
        peopleResult: payload,
        people: state.people.concat(payload.results),
      }
    case LOAD_PEOPLE_SEARCH_SUCCESS:
      return {
        ...state,
        peopleResult: payload,
        people: payload.results,
      }
    case LOAD_PERSON_SUCCESS:
      return {
        ...state,
        person: payload,
      }
    default:
      return state
  }
}

export default people
