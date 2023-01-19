import { createTheme } from '@material-ui/core/styles'

export default createTheme({
  palette: {
    primary: {
      main: '#3CBCC3',
    },
    secondary: {
      main: '#1D1D2C',
    },
    error: {
      main: '#E40C2B',
    },
    info: {
      main: '#EBA63F',
    },
    success: {
      main: '#438945',
    },
  },
  typography: {
    fontFamily: ['Oswald', 'sans-serif'].join(','),
  },
})
