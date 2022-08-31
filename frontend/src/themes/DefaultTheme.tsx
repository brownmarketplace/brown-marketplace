import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0c3b85',
    },
    secondary: {
      main: '#f7f8fd',
    },
    background: {
      default: '#fafafa',
    },
  },
});

export default defaultTheme;