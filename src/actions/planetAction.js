import { fetchSwapiData, fetchSwapiDirect } from '../api'
import { requestEnum } from '../enums/requestEnum'
import { requestHelper } from './requestHelper'
import {
  LOAD_PLANETS_SUCCESS,
  LOAD_PLANET_SUCCESS,
  LOAD_PLANETS_SEARCH_SUCCESS,
} from './types'

export const fetchPlanets = () => async (dispatch) => {
  return await requestHelper(dispatch, requestEnum.fetchPlanets, async () => {
    const planets = await fetchSwapiData('/planets')
    dispatch({
      type: LOAD_PLANETS_SUCCESS,
      payload: planets.data,
    })
  })
}

export const fetchPlanetsDirect = (endpoint) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchPlanetsDirect,
    async () => {
      const planets = await fetchSwapiDirect(endpoint)
      dispatch({
        type: LOAD_PLANETS_SUCCESS,
        payload: planets.data,
      })
    }
  )
}

export const fetchPlanetSearch = (value) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchPlanetSearch,
    async () => {
      const planets = await fetchSwapiData(`planets/?search=${value}`)
      dispatch({
        type: LOAD_PLANETS_SEARCH_SUCCESS,
        payload: planets.data,
      })
    }
  )
}

export const fetchPlanet = (planetId, isWookiee) => async (dispatch) => {
  return await requestHelper(dispatch, requestEnum.fetchPlanet, async () => {
    const planet = await fetchSwapiData(
      `/planets/${planetId}/${isWookiee ? '?format=wookiee' : ''}`
    )
    dispatch({
      type: LOAD_PLANET_SUCCESS,
      payload: planet.data,
    })
  })
}
