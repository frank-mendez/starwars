import { CircularProgress, Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchFilm } from '../../../actions/filmAction'
import { makeStyles } from '@mui/styles'
import ResponsiveCardDetails from '../../Common/ResponsiveCardDetails'
import { namedRequestsInProgress } from '../../../actions/requestSelector'
import { requestEnum } from '../../../enums/requestEnum'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { mapInfo, mapLink } from '../../../utils/utils'
import { filmData } from '../../../model/filmModel'

const useStyles = makeStyles({
  loading: {
    marginBottom: '3rem',
    marginTop: '5rem',
  },
})

const Film = () => {
  const { filmId } = useParams()
  const dispatch = useDispatch()
  const classes = useStyles()
  const navigate = useNavigate()

  const film = useSelector((state) => state.films.film)
  const requests = useSelector((state) => state.requests.requests)
  const isWookiee = useSelector((state) => state.wookiee.isWookiee)

  const [loading, setLoading] = useState(false)
  const [filmDetails, setfilmDetails] = useState({})

  useEffect(() => {
    const fetchFilmLoading = namedRequestsInProgress(
      requests,
      requestEnum.fetchFilm
    )
    setLoading(fetchFilmLoading)
  }, [requests])

  useEffect(() => {
    dispatch(fetchFilm(filmId))
  }, [dispatch, filmId])

  useEffect(() => {
    if (!isEmpty(film)) {
      const mappedfilm = Object.assign(filmData, film)
      setfilmDetails(mappedfilm)
    }
  }, [film])

  const filmInformation = (filmInfo) => {
    return mapInfo(filmInfo)
  }

  const filmHeader = (details) => {
    return {
      title: details.name ? details.name : 'N/A',
      createdAt: details.created
        ? moment(details.created).format('MMMM DD, YYYY')
        : 'N/A',
    }
  }

  const filmResidents = (residents) => {
    if (residents && residents.length) {
      return mapLink(residents, 'people', navigate)
    } else {
      return 'N/A'
    }
  }

  const filmPlanets = (planets) => {
    if (planets && planets.length) {
      return mapLink(planets, 'planets', navigate)
    } else {
      return 'N/A'
    }
  }

  const filmSpecies = (species) => {
    if (species && species.length) {
      return mapLink(species, 'species', navigate)
    } else {
      return 'N/A'
    }
  }

  const filmVehicles = (vehicles) => {
    if (vehicles && vehicles.length) {
      return mapLink(vehicles, 'vehicles', navigate)
    } else {
      return 'N/A'
    }
  }

  const filmStarships = (starships) => {
    if (starships && starships.length) {
      return mapLink(starships, 'spaceships', navigate)
    } else {
      return 'N/A'
    }
  }

  return (
    <Fragment>
      {film && !loading ? (
        <Grid x={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            {!isWookiee ? (
              <ResponsiveCardDetails
                cardHeader={filmHeader({
                  name: filmDetails.title,
                  created: filmDetails.created,
                })}
                information={filmInformation(
                  omit(filmDetails, [
                    'name',
                    'characters',
                    'planets',
                    'species',
                    'vehicles',
                    'starships',
                  ])
                )}
                characters={filmResidents(filmDetails.characters)}
                planets={filmPlanets(filmDetails.planets)}
                species={filmSpecies(filmDetails.species)}
                vehicles={filmVehicles(filmDetails.vehicles)}
                spaceships={filmStarships(filmDetails.starships)}
              />
            ) : (
              'Wookiee is not available on Film'
            )}
          </Grid>
        </Grid>
      ) : (
        <Grid
          className={classes.loading}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
    </Fragment>
  )
}

export default Film
