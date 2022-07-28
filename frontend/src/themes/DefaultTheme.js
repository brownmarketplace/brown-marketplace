import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#0c3b85',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
          default: '#eeeeee',
        },
      },
});

export default defaultTheme;