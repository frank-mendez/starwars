import { fetchSwapiData, fetchSwapiDirect } from '../api'
import { requestEnum } from '../enums/requestEnum'
import { requestHelper } from './requestHelper'
import {
  LOAD_VEHICLES_SUCCESS,
  LOAD_VEHICLE_SUCCESS,
  LOAD_VEHICLES_SEARCH_SUCCESS,
} from './types'

export const fetchVehicles = () => async (dispatch) => {
  return await requestHelper(dispatch, requestEnum.fetchVehicles, async () => {
    const vehicles = await fetchSwapiData('/vehicles')
    dispatch({
      type: LOAD_VEHICLES_SUCCESS,
      payload: vehicles.data,
    })
  })
}

export const fetchVehiclesDirect = (endpoint) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchVehiclesDirect,
    async () => {
      const vehicles = await fetchSwapiDirect(endpoint)
      dispatch({
        type: LOAD_VEHICLES_SUCCESS,
        payload: vehicles.data,
      })
    }
  )
}

export const fetchVehicleSearch = (value) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchVehicleSearch,
    async () => {
      const vehicles = await fetchSwapiData(`vehicles/?search=${value}`)
      dispatch({
        type: LOAD_VEHICLES_SEARCH_SUCCESS,
        payload: vehicles.data,
      })
    }
  )
}

export const fetchVehicle = (id, isWookiee) => async (dispatch) => {
  return await requestHelper(dispatch, requestEnum.fetchVehicle, async () => {
    const vehicle = await fetchSwapiData(
      `/vehicles/${id}/${isWookiee ? '?format=wookiee' : ''}`
    )
    dispatch({
      type: LOAD_VEHICLE_SUCCESS,
      payload: vehicle.data,
    })
  })
}
