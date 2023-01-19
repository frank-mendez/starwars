import React, { useEffect, useState } from 'react'
import { CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPlanets,
  fetchPlanetsDirect,
  fetchPlanetSearch,
} from '../../../actions/planetAction'
import LoadingButton from '@mui/lab/LoadingButton'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { makeStyles } from '@mui/styles'
import ResponsiveCardGrid from '../../Common/ResponsiveCardGrid'
import { requestEnum } from '../../../enums/requestEnum'
import { namedRequestsInProgress } from '../../../actions/requestSelector'

const useStyles = makeStyles({
  planet: {
    paddingBottom: '10rem',
    marginTop: '3rem',
  },
  loading: {
    marginBottom: '3rem',
  },
})

const Planet = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const planetsResult = useSelector((state) => state.planets.planetsResult)
  const planets = useSelector((state) => state.planets.planets)
  const requests = useSelector((state) => state.requests.requests)

  const [loading, setLoading] = useState(false)

  const { next } = planetsResult

  useEffect(() => {
    const fetchPlanetsLoading = namedRequestsInProgress(requests, [
      requestEnum.fetchPlanets,
      requestEnum.fetchPlanetsDirect,
      requestEnum.fetchPlanetSearch,
    ])
    setLoading(fetchPlanetsLoading)
  }, [requests])

  useEffect(() => {
    dispatch(fetchPlanets())
  }, [dispatch])

  useEffect(() => {
    window.onscroll = function (ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (next) {
          dispatch(fetchPlanetsDirect(next))
        }
      }
    }
  }, [planetsResult, next, dispatch])

  const handleSearch = (e) => {
    dispatch(fetchPlanetSearch(e.target.value))
  }

  const handleScrollDown = () => {
    dispatch(fetchPlanetsDirect(next))
    window.scrollTo(0, document.body.scrollHeight)
  }

  return (
    <div className={classes.planet}>
      {planets.length || planets.length === 0 ? (
        <Grid container justifyContent="flex-end">
          <TextField onChange={handleSearch} label="Search" />
        </Grid>
      ) : null}
      <Grid sx={{ marginTop: 5, marginBottom: 10 }} container spacing={2}>
        {planets.length
          ? planets.map((result, index) => (
              <ResponsiveCardGrid
                key={index}
                index={index}
                result={result}
                url={'planets'}
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
      {planets.length && next ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <LoadingButton
              onClick={handleScrollDown}
              loading={loading}
              loadingIndicator="Loading..."
              variant="outlined"
              startIcon={<ArrowDownwardIcon />}
            >
              Scroll down to load more planets
            </LoadingButton>
          </Grid>
        </Grid>
      ) : null}
      {planets.length && !next ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography>All Done</Typography>
          </Grid>
        </Grid>
      ) : null}
      {planets.length === 0 && !loading ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography>No Results Found</Typography>
          </Grid>
        </Grid>
      ) : null}
    </div>
  )
}

export default Planet
