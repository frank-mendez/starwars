import { fetchSwapiData, fetchSwapiDirect } from '../api'
import { requestEnum } from '../enums/requestEnum'
import { requestHelper } from './requestHelper'
import {
  LOAD_SPECIES_SUCCESS,
  LOAD_SINGLE_SPECIES_SUCCESS,
  LOAD_SPECIES_SEARCH_SUCCESS,
} from './types'

export const fetchSpecies = () => async (dispatch) => {
  return await requestHelper(dispatch, requestEnum.fetchSpecies, async () => {
    const species = await fetchSwapiData('/species')
    dispatch({
      type: LOAD_SPECIES_SUCCESS,
      payload: species.data,
    })
  })
}

export const fetchSpeciesDirect = (endpoint) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchSpeciesDirect,
    async () => {
      const species = await fetchSwapiDirect(endpoint)
      dispatch({
        type: LOAD_SPECIES_SUCCESS,
        payload: species.data,
      })
    }
  )
}

export const fetchSpeciesSearch = (value) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchSpeciesSearch,
    async () => {
      const species = await fetchSwapiData(`species/?search=${value}`)
      dispatch({
        type: LOAD_SPECIES_SEARCH_SUCCESS,
        payload: species.data,
      })
    }
  )
}

export const fetchSingleSpecies = (id, isWookiee) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchSingleSpecies,
    async () => {
      const singleSpecies = await fetchSwapiData(
        `/species/${id}/${isWookiee ? '?format=wookiee' : ''}`
      )
      dispatch({
        type: LOAD_SINGLE_SPECIES_SUCCESS,
        payload: singleSpecies.data,
      })
    }
  )
}
