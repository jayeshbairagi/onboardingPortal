import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#007ac3',
    },
    secondary: {
      main: '#85bc20',
    },
    error: {
      main: red.A400,
    },
  },
  // components: {
  //   // Name of the component
  //   MuiContainer: {
  //     defaultProps: {
  //       maxWidth: '100%',
  //     },
  //   },
  // },
});

export default theme;