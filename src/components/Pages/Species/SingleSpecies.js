import { CircularProgress, Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchSingleSpecies } from '../../../actions/speciesAction'
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

const SingleSpecies = () => {
  const { speciesId } = useParams()
  const dispatch = useDispatch()
  const classes = useStyles()
  const navigate = useNavigate()

  const singleSpecies = useSelector((state) => state.species.singleSpecies)
  const requests = useSelector((state) => state.requests.requests)
  const isWookiee = useSelector((state) => state.wookiee.isWookiee)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchspeciesLoading = namedRequestsInProgress(requests, [
      requestEnum.fetchSingleSpecies,
    ])
    setLoading(fetchspeciesLoading)
  }, [requests])

  useEffect(() => {
    dispatch(fetchSingleSpecies(speciesId, isWookiee))
  }, [isWookiee, dispatch, speciesId])

  const speciesInformation = (speciesInfo) => {
    return mapInfo(speciesInfo)
  }

  const speciesHeader = (details) => {
    return {
      title: details.name ? details.name : 'N/A',
      createdAt: details.created
        ? moment(details.created).format('MMMM DD, YYYY')
        : 'N/A',
    }
  }

  const speciesResidents = (residents) => {
    if (residents && residents.length) {
      return mapLink(residents, 'people', navigate)
    } else {
      return 'N/A'
    }
  }

  const speciesFilms = (films) => {
    if (films && films.length) {
      return mapLink(films, 'films', navigate)
    } else {
      return 'N/A'
    }
  }

  return (
    <Fragment>
      {singleSpecies && !loading ? (
        <Grid x={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            {isWookiee ? (
              <ResponsiveCardDetails
                cardHeader={speciesHeader({
                  name: singleSpecies.whrascwo,
                  created: singleSpecies.rcooaoraaoahoowh_akworcahoowa,
                })}
                information={speciesInformation(
                  omit(singleSpecies, [
                    'akwoooakanwo',
                    'wwahanscc',
                    'wwahanscc',
                  ])
                )}
                people={speciesResidents(singleSpecies.akwoooakanwo)}
                films={speciesFilms(singleSpecies.wwahanscc)}
              />
            ) : (
              <ResponsiveCardDetails
                cardHeader={speciesHeader(singleSpecies)}
                information={speciesInformation(
                  omit(singleSpecies, ['people', 'films', 'name'])
                )}
                people={speciesResidents(singleSpecies.people)}
                films={speciesFilms(singleSpecies.films)}
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

export default SingleSpecies
