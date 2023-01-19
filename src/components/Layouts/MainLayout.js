import { Container, CssBaseline } from '@mui/material'
import React, { Fragment } from 'react'
import MainRoutes from '../Routes/MainRoutes'
import Header from './Header/Header'
const MainLayout = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <Container maxWidth="sm">
        <MainRoutes />
      </Container>
    </Fragment>
  )
}

export default MainLayout
