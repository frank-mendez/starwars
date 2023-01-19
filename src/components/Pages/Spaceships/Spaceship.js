import { CircularProgress, Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchSpaceship } from '../../../actions/spaceshipAction'
import { makeStyles } from '@mui/styles'
import ResponsiveCardDetails from '../../Common/ResponsiveCardDetails'
import { namedRequestsInProgress } from '../../../actions/requestSelector'
import { requestEnum } from '../../../enums/requestEnum'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { mapInfo, mapLink } from '../../../utils/utils'
import { omit } from 'lodash'

const useStyles = makeStyles({
  loading: {
    marginBottom: '3rem',
    marginTop: '5rem',
  },
})

const Spaceship = () => {
  const { spaceshipId } = useParams()
  const dispatch = useDispatch()
  const classes = useStyles()
  const navigate = useNavigate()

  const spaceship = useSelector((state) => state.spaceships.spaceship)
  const requests = useSelector((state) => state.requests.requests)
  const isWookiee = useSelector((state) => state.wookiee.isWookiee)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSpaceshipLoading = namedRequestsInProgress(requests, [
      requestEnum.fetchSpaceship,
    ])
    setLoading(fetchSpaceshipLoading)
  }, [requests])

  useEffect(() => {
    dispatch(fetchSpaceship(spaceshipId, isWookiee))
  }, [isWookiee, dispatch, spaceshipId])
  const spaceshipInformation = (spaceshipInfo) => {
    return mapInfo(spaceshipInfo)
  }

  const spaceshipHeader = (details) => {
    console.log('details', details)
    return {
      title: details.name ? details.name : 'N/A',
      createdAt: details.created
        ? moment(details.created).format('MMMM DD, YYYY')
        : 'N/A',
    }
  }

  const spaceshipPilots = (pilots) => {
    if (pilots && pilots.length) {
      return mapLink(pilots, 'people', navigate)
    } else {
      return 'N/A'
    }
  }

  const spaceshipFilms = (films) => {
    if (films && films.length) {
      return mapLink(films, 'films', navigate)
    } else {
      return 'N/A'
    }
  }

  return (
    <Fragment>
      {spaceship && !loading ? (
        <Grid x={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            {isWookiee ? (
              <ResponsiveCardDetails
                cardHeader={spaceshipHeader({
                  name: spaceship.whrascwo,
                  created: spaceship.rcooaoraaoahoowh_akworcahoowa,
                })}
                information={spaceshipInformation(
                  omit(spaceship, ['rcwocahwawowhaoc', 'whrascwo', 'wwahanscc'])
                )}
                pilots={spaceshipPilots(spaceship.rcwocahwawowhaoc)}
                films={spaceshipFilms(spaceship.wwahanscc)}
              />
            ) : (
              <ResponsiveCardDetails
                cardHeader={spaceshipHeader(spaceship)}
                information={spaceshipInformation(
                  omit(spaceship, ['pilots', 'films', 'name'])
                )}
                pilots={spaceshipPilots(spaceship.pilots)}
                films={spaceshipFilms(spaceship.films)}
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

export default Spaceship
