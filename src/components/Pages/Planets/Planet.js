import { CircularProgress, Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchPlanet } from '../../../actions/planetAction'
import { makeStyles } from '@mui/styles'
import ResponsiveCardDetails from '../../Common/ResponsiveCardDetails'
import { requestEnum } from '../../../enums/requestEnum'
import { namedRequestsInProgress } from '../../../actions/requestSelector'
import { omit } from 'lodash'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { mapInfo, mapLink } from '../../../utils/utils'

const useStyles = makeStyles({
  loading: {
    marginBottom: '3rem',
    marginTop: '5rem',
  },
})

const Planet = () => {
  const { planetId } = useParams()
  const dispatch = useDispatch()
  const classes = useStyles()
  const navigate = useNavigate()

  const planet = useSelector((state) => state.planets.planet)
  const requests = useSelector((state) => state.requests.requests)
  const isWookiee = useSelector((state) => state.wookiee.isWookiee)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPlanetLoading = namedRequestsInProgress(requests, [
      requestEnum.fetchPlanet,
    ])
    setLoading(fetchPlanetLoading)
  }, [requests])

  useEffect(() => {
    dispatch(fetchPlanet(planetId, isWookiee))
  }, [isWookiee, dispatch, planetId])

  const planetInformation = () => {
    if (isWookiee) {
      return mapInfo(
        omit(planet, ['rcwocahwawowhaoc', 'whrascwo', 'wwahanscc'])
      )
    } else {
      return mapInfo(omit(planet, ['residents', 'films', 'name']))
    }
  }

  const planetHeader = (details) => {
    return {
      title: details.name ? details.name : 'N/A',
      createdAt: details.created
        ? moment(details.created).format('MMMM DD, YYYY')
        : 'N/A',
    }
  }

  const planetResidents = (residents) => {
    if (residents && residents.length) {
      return mapLink(residents, 'people', navigate)
    } else {
      return 'N/A'
    }
  }

  const planetFilms = (films) => {
    if (films && films.length) {
      return mapLink(films, 'films', navigate)
    } else {
      return 'N/A'
    }
  }

  return (
    <Fragment>
      {planet && !loading ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {isWookiee ? (
              <ResponsiveCardDetails
                cardHeader={planetHeader({
                  name: planet.whrascwo,
                  created: null,
                })}
                information={planetInformation()}
                residents={planetResidents(planet.rcwocahwawowhaoc)}
                films={planetFilms(planet.wwahanscc)}
              />
            ) : (
              <ResponsiveCardDetails
                cardHeader={planetHeader(planet)}
                information={planetInformation()}
                residents={planetResidents(planet.residents)}
                films={planetFilms(planet.films)}
              />
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

export default Planet
