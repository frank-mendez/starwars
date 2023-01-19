import { CircularProgress, Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchPerson } from '../../../actions/peopleAction'
import ResponsiveCardDetails from '../../Common/ResponsiveCardDetails'
import { makeStyles } from '@mui/styles'
import { namedRequestsInProgress } from '../../../actions/requestSelector'
import { requestEnum } from '../../../enums/requestEnum'
import { omit } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { mapInfo, mapLink } from '../../../utils/utils'
import moment from 'moment'

const useStyles = makeStyles({
  loading: {
    marginBottom: '3rem',
    marginTop: '5rem',
  },
})

const Person = () => {
  const { personId } = useParams()
  const dispatch = useDispatch()
  const classes = useStyles()
  const navigate = useNavigate()

  const person = useSelector((state) => state.people.person)
  const requests = useSelector((state) => state.requests.requests)
  const isWookiee = useSelector((state) => state.wookiee.isWookiee)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPersonLoading = namedRequestsInProgress(requests, [
      requestEnum.fetchPerson,
    ])
    setLoading(fetchPersonLoading)
  }, [requests])

  useEffect(() => {
    dispatch(fetchPerson(personId, isWookiee))
  }, [isWookiee, dispatch, personId])

  const personInformation = (personInfo) => {
    return mapInfo(personInfo)
  }

  const personHeader = (details) => {
    return {
      title: details.name ? details.name : 'N/A',
      createdAt: details.created
        ? moment(details.created).format('MMMM DD, YYYY')
        : 'N/A',
    }
  }

  const personFilms = (films) => {
    if (films && films.length) {
      return mapLink(films, 'films', navigate)
    } else {
      return 'N/A'
    }
  }

  const personSpecies = (species) => {
    if (species && species.length) {
      return mapLink(species, 'species', navigate)
    } else {
      return 'N/A'
    }
  }

  const personVehicles = (vehicles) => {
    if (vehicles && vehicles.length) {
      return mapLink(vehicles, 'vehicles', navigate)
    } else {
      return 'N/A'
    }
  }

  const personStarship = (starships) => {
    if (starships && starships.length) {
      return mapLink(starships, 'spaceships', navigate)
    } else {
      return 'N/A'
    }
  }

  return (
    <Fragment>
      {person && !loading ? (
        <Grid x={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            {isWookiee ? (
              <ResponsiveCardDetails
                cardHeader={personHeader({
                  name: person.whrascwo,
                  created: person.rcooaoraaoahoowh_akworcahoowa,
                })}
                information={personInformation(
                  omit(person, [
                    'whrascwo',
                    'wwahanscc',
                    'cakwooaahwoc',
                    'howoacahoaanwoc',
                    'caorarccacahakc',
                  ])
                )}
                species={personSpecies(person.wwahanscc)}
                vehicles={personVehicles(person.cakwooaahwoc)}
                spaceships={personStarship(person.howoacahoaanwoc)}
                films={personFilms(person.caorarccacahakc)}
              />
            ) : (
              <ResponsiveCardDetails
                cardHeader={personHeader(person)}
                information={personInformation(
                  omit(person, [
                    'name',
                    'species',
                    'vehicles',
                    'starships',
                    'films',
                  ])
                )}
                species={personSpecies(person.species)}
                vehicles={personVehicles(person.personVehicles)}
                spaceships={personStarship(person.starships)}
                films={personFilms(person.films)}
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

export default Person
