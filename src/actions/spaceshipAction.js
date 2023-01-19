import { fetchSwapiData, fetchSwapiDirect } from '../api'
import { requestEnum } from '../enums/requestEnum'
import { requestHelper } from './requestHelper'
import {
  LOAD_SPACESHIPS_SUCCESS,
  LOAD_SPACESHIP_SUCCESS,
  LOAD_SPACESHIPS_SEARCH_SUCCESS,
} from './types'

export const fetchSpaceships = () => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchSpaceships,
    async () => {
      const starships = await fetchSwapiData('/starships')
      dispatch({
        type: LOAD_SPACESHIPS_SUCCESS,
        payload: starships.data,
      })
    }
  )
}

export const fetchSpaceshipsDirect = (endpoint) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchSpaceshipsDirect,
    async () => {
      const starships = await fetchSwapiDirect(endpoint)
      dispatch({
        type: LOAD_SPACESHIPS_SUCCESS,
        payload: starships.data,
      })
    }
  )
}

export const fetchSpaceshipSearch = (value) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchSpaceshipSearch,
    async () => {
      const starships = await fetchSwapiData(`starships/?search=${value}`)
      dispatch({
        type: LOAD_SPACESHIPS_SEARCH_SUCCESS,
        payload: starships.data,
      })
    }
  )
}

export const fetchSpaceship = (id, isWookiee) => async (dispatch) => {
  return await requestHelper(dispatch, requestEnum.fetchSpaceship, async () => {
    const spaceship = await fetchSwapiData(
      `/starships/${id}/${isWookiee ? '?format=wookiee' : ''}`
    )
    dispatch({
      type: LOAD_SPACESHIP_SUCCESS,
      payload: spaceship.data,
    })
  })
}
