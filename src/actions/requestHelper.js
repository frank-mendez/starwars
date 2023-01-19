import { requestFailed, requestFinished, requestStarted } from './requestAction'

export const requestHelper = async (dispatch, requestName, request) => {
  dispatch(requestStarted(requestName))
  try {
    const result = await request()
    dispatch(requestFinished(requestName))
    return result
  } catch (error) {
    dispatch(requestFailed({ requestName, error }))
    return Promise.reject(error)
  }
}
