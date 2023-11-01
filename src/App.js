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
        <Route exact path={"/eventos"} element={<EventsPage />} />;
        <Route exact path={"/es/eventos"} element={<EventsPage />} />;
        <Route exact path={"/cat/esdeveniments"} element={<EventsPage />} />;
        
        <Route exact path={"/evento/:eventId"} element={<EventView />} />;
        <Route exact path={"/es/evento/:eventId"} element={<EventView />} />;
        <Route exact path={"/cat/esdeveniment/:eventId"} element={<EventView />} />;

        <Route exact path={"/beneficios"} element={<BenefitsPage />} />;
        <Route exact path={"/es/beneficios"} element={<BenefitsPage />} />;
        <Route exact path={"/cat/beneficis"} element={<BenefitsPage />} />;

        <Route exact path={"/beneficio/:benefitId"} element={<BenefitView />} />;
        <Route exact path={"/es/beneficio/:benefitId"} element={<BenefitView />} />;
        <Route exact path={"/cat/benefici/:benefitId"} element={<BenefitView />} />;

        <Route exact path={"/faqs"} element={<FAQsPage />} />;
        <Route exact path={"/es/faqs"} element={<FAQsPage />} />;
        <Route exact path={"/cat/faqs"} element={<FAQsPage />} />;

        <Route exact path={"/faqs/:faqId"} element={<FAQView />} />;
        <Route exact path={"/es/faqs/:faqId"} element={<FAQView />} />;
        <Route exact path={"/cat/faqs/:faqId"} element={<FAQView />} />;

        <Route path="/" element={<Main />} />
        <Route path="/es" element={<Main />} />
        <Route path="/cat" element={<Main />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
