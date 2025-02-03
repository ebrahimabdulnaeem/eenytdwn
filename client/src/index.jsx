import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import '@fontsource/cairo/300.css';
import '@fontsource/cairo/400.css';
import '@fontsource/cairo/500.css';
import '@fontsource/cairo/700.css';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: [
      'Cairo',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Cairo',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Cairo',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Cairo',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Cairo',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Cairo',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Cairo',
      fontWeight: 500,
    },
    body1: {
      fontFamily: 'Cairo',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Cairo',
      fontWeight: 400,
    },
    button: {
      fontFamily: 'Cairo',
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: '#673ab7',
    },
    background: {
      default: '#0a0a1a',
      paper: 'rgba(26, 26, 46, 0.8)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#673ab7 #1a1a2e",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#673ab7",
            border: "2px solid #1a1a2e",
          },
          "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
            borderRadius: 8,
            backgroundColor: "#1a1a2e",
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
); 