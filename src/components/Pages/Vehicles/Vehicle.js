import { CircularProgress, Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchVehicle } from '../../../actions/vehicleAction'
import { makeStyles } from '@mui/styles'
import ResponsiveCardDetails from '../../Common/ResponsiveCardDetails'
import { namedRequestsInProgress } from '../../../actions/requestSelector'
import { requestEnum } from '../../../enums/requestEnum'
import omit from 'lodash/omit'
import { useNavigate } from 'react-router-dom'
import { mapInfo, mapLink } from '../../../utils/utils'
import moment from 'moment'

const useStyles = makeStyles({
  loading: {
    marginBottom: '3rem',
    marginTop: '5rem',
  },
})

const Vehicle = () => {
  const { vehicleId } = useParams()
  const dispatch = useDispatch()
  const classes = useStyles()
  const navigate = useNavigate()

  const vehicle = useSelector((state) => state.vehicles.vehicle)
  const requests = useSelector((state) => state.requests.requests)
  const isWookiee = useSelector((state) => state.wookiee.isWookiee)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchVehicleLoading = namedRequestsInProgress(requests, [
      requestEnum.fetchVehicle,
    ])
    setLoading(fetchVehicleLoading)
  }, [requests])

  useEffect(() => {
    dispatch(fetchVehicle(vehicleId, isWookiee))
  }, [isWookiee, dispatch, vehicleId])

  const vehicleInformation = () => {
    if (isWookiee) {
      return mapInfo(
        omit(vehicle, ['rcwocahwawowhaoc', 'whrascwo', 'wwahanscc'])
      )
    } else {
      return mapInfo(omit(vehicle, ['pilots', 'films', 'name']))
    }
  }

  const vehicleHeader = (details) => {
    return {
      title: details.name ? details.name : 'N/A',
      createdAt: details.created
        ? moment(details.created).format('MMMM DD, YYYY')
        : 'N/A',
    }
  }

  const vehiclePilots = (pilots) => {
    if (pilots && pilots.length) {
      return mapLink(pilots, 'people', navigate)
    } else {
      return 'N/A'
    }
  }

  const vehicleFilms = (films) => {
    if (films && films.length) {
      return mapLink(films, 'films', navigate)
    } else {
      return 'N/A'
    }
  }

  return (
    <Fragment>
      {vehicle && !loading ? (
        <Grid x={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            {isWookiee ? (
              <ResponsiveCardDetails
                cardHeader={vehicleHeader({
                  name: vehicle.whrascwo,
                  created: null,
                })}
                information={vehicleInformation()}
                pilots={vehiclePilots(vehicle.rcwocahwawowhaoc)}
                films={vehicleFilms(vehicle.wwahanscc)}
              />
            ) : (
              <ResponsiveCardDetails
                cardHeader={vehicleHeader(vehicle)}
                information={vehicleInformation()}
                pilots={vehiclePilots(vehicle.pilots)}
                films={vehicleFilms(vehicle.films)}
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

export default Vehicle
