import { CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSpecies,
  fetchSpeciesSearch,
  fetchSpeciesDirect,
} from '../../../actions/speciesAction'
import LoadingButton from '@mui/lab/LoadingButton'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { makeStyles } from '@mui/styles'
import ResponsiveCardGrid from '../../Common/ResponsiveCardGrid'
import { namedRequestsInProgress } from '../../../actions/requestSelector'
import { requestEnum } from '../../../enums/requestEnum'

const useStyles = makeStyles({
  species: {
    paddingBottom: '10rem',
    marginTop: '3rem',
  },
  loading: {
    marginBottom: '3rem',
  },
})

const Species = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const species = useSelector((state) => state.species.species)
  const speciesResult = useSelector((state) => state.species.speciesResult)
  const requests = useSelector((state) => state.requests.requests)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSpeciesLoading = namedRequestsInProgress(requests, [
      requestEnum.fetchSpecies,
      requestEnum.fetchSpeciesDirect,
      requestEnum.fetchSpeciesSearch,
    ])
    setLoading(fetchSpeciesLoading)
  }, [requests])

  useEffect(() => {
    dispatch(fetchSpecies())
  }, [dispatch])

  const { next } = speciesResult

  const handleSearch = (e) => {
    dispatch(fetchSpeciesSearch(e.target.value))
  }

  useEffect(() => {
    window.onscroll = function (ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (next) {
          dispatch(fetchSpeciesDirect(next))
        }
      }
    }
  }, [speciesResult, next, dispatch])

  const handleScrollDown = () => {
    dispatch(fetchSpeciesDirect(next))
    window.scrollTo(0, document.body.scrollHeight)
  }

  return (
    <div className={classes.species}>
      {species.length || species.length === 0 ? (
        <Grid container justifyContent="flex-end">
          <TextField onChange={handleSearch} label="Search" />
        </Grid>
      ) : null}
      <Grid sx={{ marginTop: 5, marginBottom: 10 }} container spacing={2}>
        {species.length
          ? species.map((result, index) => (
              <ResponsiveCardGrid
                key={index}
                index={index}
                result={result}
                url={'species'}
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
      {species.length && next ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <LoadingButton
              onClick={handleScrollDown}
              loading={loading}
              loadingIndicator="Loading..."
              variant="outlined"
              startIcon={<ArrowDownwardIcon />}
            >
              Scroll down to load more species
            </LoadingButton>
          </Grid>
        </Grid>
      ) : null}
      {species.length && !next ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography>All Done</Typography>
          </Grid>
        </Grid>
      ) : null}
      {species.length === 0 && !loading ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography>No Results Found</Typography>
          </Grid>
        </Grid>
      ) : null}
    </div>
  )
}

export default Species
