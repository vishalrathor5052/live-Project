import { createTheme } from '@mui/material';

export default createTheme({
  palette: {
    primary: {
      main: '#3A7C92',
      dark: '#3A7C92',
      light: '#36C4E1',
    },
    secondary: {
      main: '#E67700',
    },
    mode: 'light',
  },
  typography: {
    fontFamily: 'League spartan',
    h2: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '30px',
    },
    h3: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '25px',
    },
    h4: {
      fontSize: '20px',
      fontFamily: "'lato', sans-serif",
    },
    h5: {
      fontSize: '16px',
      fontFamily: "'lato', sans-serif",
    },
  },

  // typography: {
  // fontFamily: 'League spartan',
  // },
  unstable_strictMode: true,
});
