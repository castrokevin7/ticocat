import './App.css';
import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'assets/theme';
import Main from 'sections/main/Main';

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import EventsPage from 'sections/events/EventsPage';
import EventView from 'sections/events/EventView';
import BenefitsPage from 'sections/benefits/BenefitsPage';
import BenefitView from 'sections/benefits/BenefitView';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route exact path={"/eventos"} element={<EventsPage />} />;
        <Route exact path={"/evento/:eventId"} element={<EventView />} />;
        <Route exact path={"/beneficios"} element={<BenefitsPage />} />;
        <Route exact path={"/beneficio/:benefitId"} element={<BenefitView />} />;
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
