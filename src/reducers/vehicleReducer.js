import {
  LOAD_VEHICLES_SUCCESS,
  LOAD_VEHICLE_SUCCESS,
  LOAD_VEHICLES_SEARCH_SUCCESS,
} from '../actions/types'

const initialState = {
  vehicleResult: {},
  vehicles: [],
  vehicle: null,
}

const vehicles = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_VEHICLES_SUCCESS:
      return {
        ...state,
        vehicleResult: payload,
        vehicles: state.vehicles.concat(payload.results),
      }
    case LOAD_VEHICLES_SEARCH_SUCCESS:
      return {
        ...state,
        vehicleResult: payload,
        vehicles: payload.results,
      }
    case LOAD_VEHICLE_SUCCESS:
      return {
        ...state,
        vehicle: payload,
      }
    default:
      return state
  }
}

export default vehicles
