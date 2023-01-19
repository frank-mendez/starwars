import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import startCase from 'lodash/startCase'

const ResponsiveCardGrid = (props) => {
  const { index, result, url } = props
  const navigate = useNavigate()

  const link = (url) => {
    const last = url.split('/')
    const id = last[last.length - 2]
    return (
      <Button onClick={() => handleLearnMore(id)} size="small">
        Learn More
      </Button>
    )
  }

  const handleLearnMore = (id) => {
    navigate(`/${url}/${id}`)
  }

  const cardProperty = (data) => {
    const properties = []
    for (const [key, value] of Object.entries(data)) {
      properties.push({ key, value })
    }
    const mappedProperties = properties.map((prop) => (
      <Typography key={prop.key} variant="body2">
        {startCase(prop.key)}: {prop.value}
      </Typography>
    ))
    return mappedProperties.slice(1, 6)
  }

  return (
    <Grid key={index} item xs={12} xl={4} lg={4}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="name">
              {result.name ? result.name.charAt(0) : result.title.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={result.name ? result.name : result.title}
          subheader={
            'Created: ' + moment(result.created).format('MMMM DD, YYYY')
          }
        />
        <CardContent>{cardProperty(result)}</CardContent>
        <CardActions>{link(result.url)}</CardActions>
      </Card>
    </Grid>
  )
}

export default ResponsiveCardGrid
