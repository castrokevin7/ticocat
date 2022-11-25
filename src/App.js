import './App.css';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'assets/theme';
import HeaderThree from 'HeaderThree';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderThree />
    </ThemeProvider>
  );
}

export default App;
