import axios from 'axios'

export const fetchSwapiData = async (endpoint) => {
  const response = await axios(`https://swapi.dev/api/${endpoint}`)
  return response
}

export const fetchSwapiDirect = async (endpoint) => {
  const response = await axios(endpoint)
  return response
}
