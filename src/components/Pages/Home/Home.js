import { makeStyles } from '@mui/styles'
import React, { Fragment } from 'react'

const useStyles = makeStyles({
  home: {
    marginTop: '3rem',
  },
})

const Home = () => {
  const classess = useStyles()

  return (
    <Fragment>
      <div className={classess.home}>Home</div>
    </Fragment>
  )
}

export default Home
