import './App.css';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'assets/theme';
import Header from 'sections/Header';
import Team from 'sections/Team';
import Footer from 'sections/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Team />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
