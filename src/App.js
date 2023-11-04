import './App.css';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'assets/theme';
import { Hub, DataStore } from 'aws-amplify';

import Main from 'sections/main/Main';

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import EventsPage from 'sections/events/EventsPage';
import EventView from 'sections/events/EventView';
import BenefitsPage from 'sections/benefits/BenefitsPage';
import BenefitView from 'sections/benefits/BenefitView';
import FAQsPage from 'sections/faqs/FAQsPage';
import FAQView from 'sections/faqs/FAQView';
import AssociatePage from 'sections/associate/AssociatePage';
import AssociateView from 'sections/associate/AssociateView';

function App() {
  const { pathname } = useLocation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    const removeListener = Hub.listen("datastore", async (capsule) => {
      const {
        payload: { event, data },
      } = capsule;

      console.log("DataStore event", event, data);

      if (event === "ready") {
        console.log("DataStore is ready!");
        setIsReady(true);
      }
    });

    DataStore.start();

    return () => {
      removeListener();
    };
  }, [pathname]);

  if (!isReady) {
    return (<div style={{ padding: '10px', display: 'flex' }}>
      <div className="spinner-container">
        <div className="loading-spinner" />
      </div>
    </div>);
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route exact path={"/es/eventos"} element={<EventsPage />} />;
        <Route exact path={"/cat/eventos"} element={<EventsPage />} />;
        
        <Route exact path={"/es/evento/:eventId"} element={<EventView />} />;
        <Route exact path={"/cat/evento/:eventId"} element={<EventView />} />;

        <Route exact path={"/es/beneficios"} element={<BenefitsPage />} />;
        <Route exact path={"/cat/beneficios"} element={<BenefitsPage />} />;

        <Route exact path={"/es/beneficio/:benefitId"} element={<BenefitView />} />;
        <Route exact path={"/cat/beneficio/:benefitId"} element={<BenefitView />} />;

        <Route exact path={"/es/faqs"} element={<FAQsPage />} />;
        <Route exact path={"/cat/faqs"} element={<FAQsPage />} />;

        <Route exact path={"/es/faq/:faqId"} element={<FAQView />} />;
        <Route exact path={"/cat/faq/:faqId"} element={<FAQView />} />;

        <Route exact path={"/es/socio"} element={<AssociatePage />} />;
        <Route exact path={"/cat/socio"} element={<AssociatePage />} />;

        <Route exact path={"/es/socio/:associateId"} element={<AssociateView />} />;
        <Route exact path={"/cat/socio/:associateId"} element={<AssociateView />} />;

        <Route path="*" element={<Navigate to="/" />} />
        <Route exact path="/" element={<Navigate to="/es" />} />
        <Route path="/es" element={<Main />} />
        <Route path="/cat" element={<Main />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
