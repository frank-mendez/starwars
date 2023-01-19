import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPeople,
  fetchPeopleSearch,
  fetchPeopleDirect,
} from '../../../actions/peopleAction'
import { CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ResponsiveCardGrid from '../../Common/ResponsiveCardGrid'
import LoadingButton from '@mui/lab/LoadingButton'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { namedRequestsInProgress } from '../../../actions/requestSelector'
import { requestEnum } from '../../../enums/requestEnum'

const useStyles = makeStyles({
  people: {
    paddingBottom: '10rem',
    marginTop: '3rem',
  },
  loading: {
    marginBottom: '3rem',
  },
})

const People = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const people = useSelector((state) => state.people.people)
  const peopleResult = useSelector((state) => state.people.peopleResult)
  const requests = useSelector((state) => state.requests.requests)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPeopleLoading = namedRequestsInProgress(requests, [
      requestEnum.fetchPeople,
      requestEnum.fetchPeopleDirect,
      requestEnum.fetchPeopleSearch,
    ])
    setLoading(fetchPeopleLoading)
  }, [requests])

  useEffect(() => {
    dispatch(fetchPeople())
  }, [dispatch])

  const { next } = peopleResult

  const handleSearch = (e) => {
    dispatch(fetchPeopleSearch(e.target.value))
  }

  useEffect(() => {
    window.onscroll = function (ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (next) {
          dispatch(fetchPeopleDirect(next))
        }
      }
    }
  }, [peopleResult, next, dispatch])

  const handleScrollDown = () => {
    dispatch(fetchPeopleDirect(next))
    window.scrollTo(0, document.body.scrollHeight)
  }

  return (
    <div className={classes.people}>
      {people.length || people.length === 0 ? (
        <Grid container justifyContent="flex-end">
          <TextField onChange={handleSearch} label="Search" />
        </Grid>
      ) : null}
      <Grid sx={{ marginTop: 5, marginBottom: 10 }} container spacing={2}>
        {people.length
          ? people.map((result, index) => (
              <ResponsiveCardGrid
                key={index}
                index={index}
                result={result}
                url={'people'}
              />
            ))
          : null}
      </Grid>
      {loading && (
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
      {people.length && next ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <LoadingButton
              onClick={handleScrollDown}
              loading={loading}
              loadingIndicator="Loading..."
              variant="outlined"
              startIcon={<ArrowDownwardIcon />}
            >
              Scroll down to load more people
            </LoadingButton>
          </Grid>
        </Grid>
      ) : null}
      {people.length && !next ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography>All Done</Typography>
          </Grid>
        </Grid>
      ) : null}
      {people.length === 0 && !loading ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography>No Results Found</Typography>
          </Grid>
        </Grid>
      ) : null}
    </div>
  )
}

export default People
