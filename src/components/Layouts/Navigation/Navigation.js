import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { makeStyles } from '@mui/styles'
import { createBrowserHistory } from 'history'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  navigation: {
    marginTop: '5rem',
  },
})

const Navigation = () => {
  const classes = useStyles()
  const history = createBrowserHistory({ window })
  const navigate = useNavigate()
  const [paths, setPaths] = useState([
    {
      name: 'Home',
      link: '/',
    },
  ])

  useEffect(() => {}, [history])

  const handleLink = (link) => {
    navigate(link)
  }

  return (
    <div className={classes.navigation}>
      <Breadcrumbs aria-label="breadcrumb">
        {paths.map((path) => (
          <Link key={path} onClick={() => handleLink(path.link)}>
            {path.name}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  )
}

export default Navigation
