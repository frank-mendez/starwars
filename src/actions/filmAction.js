import { fetchSwapiData, fetchSwapiDirect } from '../api'
import { requestEnum } from '../enums/requestEnum'
import { requestHelper } from './requestHelper'
import {
  LOAD_FILMS_SUCCESS,
  LOAD_FILM_SUCCESS,
  LOAD_FILMS_SEARCH_SUCCESS,
} from './types'

export const fetchFilms = () => async (dispatch) => {
  return await requestHelper(dispatch, requestEnum.fetchFilms, async () => {
    const films = await fetchSwapiData('/films')
    dispatch({
      type: LOAD_FILMS_SUCCESS,
      payload: films.data,
    })
  })
}

export const fetchFilmsDirect = (endpoint) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchFilmsDirect,
    async () => {
      const films = await fetchSwapiDirect(endpoint)
      dispatch({
        type: LOAD_FILMS_SUCCESS,
        payload: films.data,
      })
    }
  )
}

export const fetchFilmsSearch = (value) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchFilmsSearch,
    async () => {
      const films = await fetchSwapiData(`films/?search=${value}`)
      dispatch({
        type: LOAD_FILMS_SEARCH_SUCCESS,
        payload: films.data,
      })
    }
  )
}

export const fetchFilm = (id) => async (dispatch) => {
  return await requestHelper(dispatch, requestEnum.fetchFilm, async () => {
    const film = await fetchSwapiData(`/films/${id}/`)
    dispatch({
      type: LOAD_FILM_SUCCESS,
      payload: film.data,
    })
  })
}
