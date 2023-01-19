import React from 'react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import store from '../store'
import theme from '../theme'
import { ThemeProvider } from '@mui/material/styles'
import MainLayout from './Layouts/MainLayout'

const App = () => {
  const history = createBrowserHistory({ window })

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HistoryRouter history={history}>
          <MainLayout />
        </HistoryRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
