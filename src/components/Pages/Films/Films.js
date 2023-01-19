import { CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchFilms,
  fetchFilmsDirect,
  fetchFilmsSearch,
} from '../../../actions/filmAction'
import { makeStyles } from '@mui/styles'
import ResponsiveCardGrid from '../../Common/ResponsiveCardGrid'
import LoadingButton from '@mui/lab/LoadingButton'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { namedRequestsInProgress } from '../../../actions/requestSelector'
import { requestEnum } from '../../../enums/requestEnum'

const useStyles = makeStyles({
  film: {
    paddingBottom: '10rem',
    marginTop: '3rem',
  },
  loading: {
    marginBottom: '3rem',
  },
})

const Films = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const films = useSelector((state) => state.films.films)
  const requests = useSelector((state) => state.requests.requests)
  const filmsResult = useSelector((state) => state.films.filmsResult)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFilmsLoading = namedRequestsInProgress(requests, [
      requestEnum.fetchFilms,
      requestEnum.fetchFilmsDirect,
      requestEnum.fetchFilmsSearch,
    ])
    setLoading(fetchFilmsLoading)
  }, [requests])

  useEffect(() => {
    dispatch(fetchFilms())
  }, [dispatch])

  const { next } = filmsResult

  const handleSearch = (e) => {
    dispatch(fetchFilmsSearch(e.target.value))
  }

  useEffect(() => {
    window.onscroll = function (ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (next) {
          dispatch(fetchFilmsDirect(next))
        }
      }
    }
  }, [filmsResult, dispatch, next])

  const handleScrollDown = () => {
    dispatch(fetchFilmsDirect(next))
    window.scrollTo(0, document.body.scrollHeight)
  }

  return (
    <div className={classes.film}>
      {films.length || films.length === 0 ? (
        <Grid container justifyContent="flex-end">
          <TextField onChange={handleSearch} label="Search" />
        </Grid>
      ) : null}
      <Grid sx={{ marginTop: 5, marginBottom: 10 }} container spacing={2}>
        {films.length
          ? films.map((result, index) => (
              <ResponsiveCardGrid
                key={index}
                index={index}
                result={result}
                url={'films'}
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
      {films.length && next ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <LoadingButton
              onClick={handleScrollDown}
              loading={loading}
              loadingIndicator="Loading..."
              variant="outlined"
              startIcon={<ArrowDownwardIcon />}
            >
              Scroll down to load more films
            </LoadingButton>
          </Grid>
        </Grid>
      ) : null}
      {films.length && !next ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography>All Done</Typography>
          </Grid>
        </Grid>
      ) : null}
      {films.length === 0 && !loading ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography>No Results Found</Typography>
          </Grid>
        </Grid>
      ) : null}
    </div>
  )
}

export default Films
