import { REQUEST_FAILED, REQUEST_FINISHED, REQUEST_STARTED } from './types'

export const requestStarted = (requestName) => ({
  type: REQUEST_STARTED,
  payload: {
    requestName,
    inProgress: true,
  },
})

export const requestFinished = (requestName) => ({
  type: REQUEST_FINISHED,
  payload: {
    requestName,
    inProgress: false,
  },
})

export const requestFailed = ({ requestName, error }) => ({
  type: REQUEST_FAILED,
  payload: {
    requestName,
    inProgress: false,
    error,
  },
})
