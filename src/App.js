import './App.css';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'assets/theme';
import Header from 'sections/Header';
import Team from 'sections/Team';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Team />
    </ThemeProvider>
  );
}

export default App;
