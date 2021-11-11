//! Utilized
import '@fontsource/inter';
import '@fontsource/karla';
import '@fontsource/barlow';
import { createTheme } from '@material-ui/core/styles';
// import './theme.css'
// const green = '#7920ff'
// const darkGreen = '#7920ff'
const tan = '#FECEA8';
const lightRed = '#FF847C';
const red = '#E84A5F';
const offBlack = '#2A363B';
const grey = '#747474';

export const LightMode = createTheme({});

export const DarkMode = createTheme({});

const theme = createTheme({
  palette: {},
  typography: {
    fontFamily: 'Barlow',

    h1: {
      fontSize: '5.00rem',
      fontFamily: 'Inter',
      fontStyle: 'normal',
      // fontWeight: 700,
      letterSpacing: '-4px',
      // color: '#7920ff',
    },

    body1: {
      fontFamily: 'Barlow',
      fontWeight: 400,
      fontSize: '1.5rem',
    },
    body2: {
      fontFamily: 'Barlow',
      fontWeight: 400,
      fontSize: '1.5rem',
    },
  },
  overrides: {
    MuiChip: {
      root: {
        backgroundColor: '#000033',
      },
      label: {
        fontFamily: 'Public Sans',
        fontSize: '1.5rem',
        color: '#fff',
        fontWeight: 400,
      },
    },
  },
});

export default theme;
