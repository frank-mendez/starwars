import { fetchSwapiData, fetchSwapiDirect } from '../api'
import { requestEnum } from '../enums/requestEnum'
import { requestHelper } from './requestHelper'
import {
  LOAD_PEOPLE_SUCCESS,
  LOAD_PERSON_SUCCESS,
  LOAD_PEOPLE_SEARCH_SUCCESS,
} from './types'

export const fetchPeople = () => async (dispatch) => {
  return await requestHelper(dispatch, requestEnum.fetchPeople, async () => {
    const people = await fetchSwapiData('/people')
    dispatch({
      type: LOAD_PEOPLE_SUCCESS,
      payload: people.data,
    })
  })
}

export const fetchPeopleDirect = (endpoint) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchPeopleDirect,
    async () => {
      const people = await fetchSwapiDirect(endpoint)
      dispatch({
        type: LOAD_PEOPLE_SUCCESS,
        payload: people.data,
      })
    }
  )
}

export const fetchPeopleSearch = (value) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestEnum.fetchPeopleSearch,
    async () => {
      const people = await fetchSwapiData(`people/?search=${value}`)
      dispatch({
        type: LOAD_PEOPLE_SEARCH_SUCCESS,
        payload: people.data,
      })
    }
  )
}

export const fetchPerson = (id, isWookiee) => async (dispatch) => {
  return await requestHelper(dispatch, requestEnum.fetchPerson, async () => {
    const person = await fetchSwapiData(
      `/people/${id}/${isWookiee ? '?format=wookiee' : ''}`
    )
    dispatch({
      type: LOAD_PERSON_SUCCESS,
      payload: person.data,
    })
  })
}
