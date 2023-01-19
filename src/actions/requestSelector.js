export const requestsInProgress = (state) => {
  return state.filter((request) => request.inProgress).length > 0
}

//get requests in progress either by single requestName or by requestNames array
export const namedRequestsInProgress = (
  state,
  requestName // RequestsEnum | RequestsEnum[]
) => {
  const singleNamedRequestInProgress = (singleRequestName) =>
    state.find((request) => request.requestName === singleRequestName && request.inProgress) !==
    undefined

  if (Array.isArray(requestName)) {
    return requestName.some(singleNamedRequestInProgress)
  }

  return singleNamedRequestInProgress(requestName)
}

export const namedRequestError = (state, requestName) => {
  return state.find((request) => request.name === requestName && request.error !== null).error
}
