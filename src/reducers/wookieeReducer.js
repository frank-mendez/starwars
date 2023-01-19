import { SET_WOOKIEE } from '../actions/types'

const initialState = {
  isWookiee: false,
}

const wookiee = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_WOOKIEE:
      return {
        ...state,
        isWookiee: payload,
      }
    default:
      return state
  }
}

export default wookiee
