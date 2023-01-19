import { CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSpaceships,
  fetchSpaceshipSearch,
  fetchSpaceshipsDirect,
} from '../../../actions/spaceshipAction'
import LoadingButton from '@mui/lab/LoadingButton'
import { makeStyles } from '@mui/styles'
import ResponsiveCardGrid from '../../Common/ResponsiveCardGrid'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { namedRequestsInProgress } from '../../../actions/requestSelector'
import { requestEnum } from '../../../enums/requestEnum'

const useStyles = makeStyles({
  spaceship: {
    paddingBottom: '10rem',
    marginTop: '3rem',
  },
  loading: {
    marginBottom: '3rem',
  },
})

const Spaceship = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const spaceships = useSelector((state) => state.spaceships.spaceships)
  const spaceshipResult = useSelector(
    (state) => state.spaceships.spaceshipResult
  )
  const requests = useSelector((state) => state.requests.requests)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSpaceshipLoading = namedRequestsInProgress(requests, [
      requestEnum.fetchSpaceships,
      requestEnum.fetchSpaceshipsDirect,
      requestEnum.fetchSpaceshipSearch,
    ])
    setLoading(fetchSpaceshipLoading)
  }, [requests])

  useEffect(() => {
    dispatch(fetchSpaceships())
  }, [dispatch])

  const { next } = spaceshipResult

  const handleSearch = (e) => {
    dispatch(fetchSpaceshipSearch(e.target.value))
  }

  useEffect(() => {
    window.onscroll = function (ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (next) {
          dispatch(fetchSpaceshipsDirect(next))
        }
      }
    }
  }, [spaceshipResult, next, dispatch])

  const handleScrollDown = () => {
    dispatch(fetchSpaceshipsDirect(next))
    window.scrollTo(0, document.body.scrollHeight)
  }

  return (
    <div className={classes.spaceship}>
      {spaceships.length || spaceships.length === 0 ? (
        <Grid container justifyContent="flex-end">
          <TextField onChange={handleSearch} label="Search" />
        </Grid>
      ) : null}
      <Grid sx={{ marginTop: 5, marginBottom: 10 }} container spacing={2}>
        {spaceships.length
          ? spaceships.map((result, index) => (
              <ResponsiveCardGrid
                key={index}
                index={index}
                result={result}
                url={'spaceships'}
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
      {spaceships.length && next ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <LoadingButton
              onClick={handleScrollDown}
              loading={loading}
              loadingIndicator="Loading..."
              variant="outlined"
              startIcon={<ArrowDownwardIcon />}
            >
              Scroll down to load more spaceships
            </LoadingButton>
          </Grid>
        </Grid>
      ) : null}
      {spaceships.length && !next ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography>All Done</Typography>
          </Grid>
        </Grid>
      ) : null}
      {spaceships.length === 0 && !loading ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography>No Results Found</Typography>
          </Grid>
        </Grid>
      ) : null}
    </div>
  )
}

export default Spaceship
