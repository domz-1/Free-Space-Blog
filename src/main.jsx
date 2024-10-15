import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Afacad Flux", sans-serif',
  },
  palette: {
    primary: {
      main: '#795757',

    secondary: {
      main: '#FFF0D1', 
    },
  },
}});
// import React from 'react'
import { Provider } from 'react-redux'
import store from './rtk/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)