import { combineReducers } from 'redux'
import planets from './planetReducer'
import spaceships from './spaceshipReducer'
import films from './filmReducer'
import people from './peopleReducer'
import vehicles from './vehicleReducer'
import species from './speciesReducer'
import requests from './requestReducer'
import wookiee from './wookieeReducer'

const appReducer = combineReducers({
  planets,
  spaceships,
  films,
  people,
  vehicles,
  species,
  requests,
  wookiee,
})

const reducers = (state, action) => {
  return appReducer(state, action)
}

export default reducers
