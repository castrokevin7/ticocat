import './App.css';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'assets/theme';
import Navbar from 'sections/Navbar';
import Home from 'sections/Home';
import About from 'sections/About';
import Team from 'sections/Team';
import Associates from 'sections/Associates';
import Footer from 'sections/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Home />
      <About />
      <Team />
      <Associates />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
