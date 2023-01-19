import {
  REQUEST_FAILED,
  REQUEST_FINISHED,
  REQUEST_STARTED,
} from '../actions/types'

const initialState = {
  requests: [],
}

const requests = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case REQUEST_STARTED: {
      const existingCall = state.requests.find(
        (request) => payload.requestName === request.requestName
      )

      if (existingCall) {
        return {
          ...state,
          requests: state.requests.map((request) =>
            payload.requestName === request.requestName
              ? { ...request, inProgress: true, error: null }
              : request
          ),
        }
      }
      return {
        ...state,
        requests: [...state.requests, payload],
      }
    }
    case REQUEST_FINISHED: {
      return {
        ...state,
        requests: state.requests.filter(
          (request) => request.requestName !== payload.requestName
        ),
      }
    }
    case REQUEST_FAILED: {
      return {
        ...state,
        requests: state.requests.map((request) =>
          request.requestName === payload.requestName
            ? {
                ...request,
                error: request.request.error,
                inProgress: false,
              }
            : request
        ),
      }
    }
    default: {
      return state
    }
  }
}

export default requests
