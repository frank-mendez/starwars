import { SET_WOOKIEE } from './types'

export const setWookiee = (value) => (dispatch) => {
  dispatch({
    type: SET_WOOKIEE,
    payload: value,
  })
}
