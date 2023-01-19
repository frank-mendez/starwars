import {
  LOAD_SPECIES_SUCCESS,
  LOAD_SINGLE_SPECIES_SUCCESS,
  LOAD_SPECIES_SEARCH_SUCCESS,
} from '../actions/types'

const initialState = {
  speciesResult: {},
  species: [],
  singleSpecies: null,
}

const species = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_SPECIES_SUCCESS:
      return {
        ...state,
        speciesResult: payload,
        species: state.species.concat(payload.results),
      }
    case LOAD_SPECIES_SEARCH_SUCCESS:
      return {
        ...state,
        speciesResult: payload,
        species: payload.results,
      }
    case LOAD_SINGLE_SPECIES_SUCCESS:
      return {
        ...state,
        singleSpecies: payload,
      }
    default:
      return state
  }
}

export default species
