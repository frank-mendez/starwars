import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  data: {
    marginTop: '3rem',
    marginBottom: '3rem',
  },
})

const ResponsiveCardDetails = (props) => {
  const {
    cardHeader,
    information,
    residents,
    films,
    pilots,
    vehicles,
    spaceships,
    species,
  } = props
  const classes = useStyles()

  return (
    <Card className={classes.data}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">{cardHeader.title.charAt(0)}</Avatar>
        }
        title={cardHeader.title}
        subheader={cardHeader.createdAt}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid sx={{ mb: 3 }} item xs={12} lg={4} xl={4}>
            {information}
          </Grid>
          <Grid sx={{ mb: 3 }} item xs={12} lg={4} xl={4}>
            <Typography variant="h4">Residents</Typography>
            {residents}
          </Grid>
          <Grid sx={{ mb: 3 }} item xs={12} lg={4} xl={4}>
            <Typography variant="h4">Films</Typography>
            {films}
          </Grid>
          <Grid sx={{ mb: 3 }} item xs={12} lg={4} xl={4}>
            <Typography variant="h4">Pilots</Typography>
            {pilots}
          </Grid>
          <Grid sx={{ mb: 3 }} item xs={12} lg={4} xl={4}>
            <Typography variant="h4">Vehicles</Typography>
            {vehicles}
          </Grid>
          <Grid sx={{ mb: 3 }} item xs={12} lg={4} xl={4}>
            <Typography variant="h4">Spaceships</Typography>
            {spaceships}
          </Grid>
          <Grid sx={{ mb: 3 }} item xs={12} lg={4} xl={4}>
            <Typography variant="h4">Species</Typography>
            {species}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ResponsiveCardDetails
