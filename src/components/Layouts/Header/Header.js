import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import logo from '../../../asssets/img/logo.png'
import { makeStyles } from '@mui/styles'
import {
  Rocket,
  Class,
  DirectionsBus,
  Language,
  Movie,
  PeopleOutline,
} from '@mui/icons-material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { FormControlLabel, Switch } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { setWookiee } from '../../../actions/wookieeAction'

const useStyles = makeStyles({
  logo: {
    height: '3rem',
    cursor: 'pointer',
  },
  menuItem: {
    padding: '0.5rem',
  },
})

const Header = () => {
  const classess = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorElNav, setAnchorElNav] = useState(null)
  const isWookiee = useSelector((state) => state.wookiee.isWookiee)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null)
    const link = event.currentTarget.getAttribute('aria-label')
    link && navigate(link)
  }

  const handleHome = () => {
    navigate('/')
  }

  const pages = [
    { name: 'Planets', icon: <Language color="primary" />, link: '/planets' },
    {
      name: 'Spaceships',
      icon: <Rocket color="primary" />,
      link: '/spaceships',
    },
    {
      name: 'Vehicles',
      icon: <DirectionsBus color="primary" />,
      link: '/vehicles',
    },
    {
      name: 'People',
      icon: <PeopleOutline color="primary" />,
      link: '/people',
    },
    { name: 'Films', icon: <Movie color="primary" />, link: '/films' },
    { name: 'Species', icon: <Class color="primary" />, link: '/species' },
  ]

  const handleWookieeSwitch = () => {
    dispatch(setWookiee(!isWookiee))
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            onClick={handleHome}
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img alt="logo" className={classess.logo} src={logo} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  aria-label={page.link}
                  onClick={handleCloseNavMenu}
                >
                  {page.icon}
                  <Typography className={classess.menuItem} textAlign="center">
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            onClick={handleHome}
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img alt="mobile-logo" className={classess.logo} src={logo} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={RouterLink}
                to={page.link}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={isWookiee}
                  onChange={() => handleWookieeSwitch()}
                />
              }
              label="Wookiee"
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
