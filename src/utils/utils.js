import { Link, Typography } from '@mui/material'
import startCase from 'lodash/startCase'
import React from 'react'

export const linkHandler = (link, route, navigate) => {
  const last = link.split('/')
  const id = last[last.length - 2]
  navigate(`/${route}/${id}`)
}

export const mapInfo = (info) => {
  const properties = []
  for (const [key, value] of Object.entries(info)) {
    properties.push({ key, value })
  }
  return properties.map((prop) => (
    <Typography key={prop.key} variant="body2">
      {startCase(prop.key)}: {prop.value}
    </Typography>
  ))
}

export const mapLink = (links, linkRoute, navigate) => {
  return links.map((link) => (
    <Link key={link} onClick={() => linkHandler(link, linkRoute, navigate)}>
      <Typography variant="body2">{link}</Typography>
    </Link>
  ))
}
