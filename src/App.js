import './App.css';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'assets/theme';
import { Hub, DataStore } from 'aws-amplify';

import Main from 'views/main/Main';

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import EventsPage from 'views/events/EventsPage';
import EventView from 'views/events/EventView';
import BenefitsPage from 'views/benefits/BenefitsPage';
import BenefitView from 'views/benefits/BenefitView';
import FAQsPage from 'views/faqs/FAQsPage';
import FAQView from 'views/faqs/FAQView';
import AssociateVerificationPage from 'views/associate-verification/AssociateVerificationPage';
import AssociateConfirmationView from 'views/associate-verification/AssociateConfirmationView';
import TermsAndConditionsPage from 'views/terms-and-conditions/TermsAndConditionsPage';
import LoginPage from 'views/login/LoginPage';
import AccountPage from 'views/account/AccountPage';
import SocialNetworkPage from 'views/social-network/SocialNetworkPage';
import AssociateView from 'views/social-network/AssociateView';
import { Authenticator } from '@aws-amplify/ui-react';


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

        <Route exact path={"/es/socios"} element={<AssociateVerificationPage />} />;
        <Route exact path={"/cat/socios"} element={<AssociateVerificationPage />} />;

        <Route exact path={"/es/socio/:associateId"} element={<AssociateConfirmationView />} />;
        <Route exact path={"/cat/socio/:associateId"} element={<AssociateConfirmationView />} />;

        <Route exact path={"/es/terminos-condiciones"} element={<TermsAndConditionsPage />} />;
        <Route exact path={"/cat/terminos-condiciones"} element={<TermsAndConditionsPage />} />;

        <Route exact path={"/es/acceso"} element={<LoginPage />} />;
        <Route exact path={"/cat/acceso"} element={<LoginPage />} />;

        <Route exact path={"/es/cuenta"} element={<AccountPage />} />;
        <Route exact path={"/cat/cuenta"} element={<AccountPage />} />;

        <Route exact path={"/es/social"} element={<SocialNetworkPage />} />;
        <Route exact path={"/cat/social"} element={<SocialNetworkPage />} />;

        <Route exact path={"/es/social/usuario/:associateId"} element={<AssociateView />} />;
        <Route exact path={"/cat/social/usuario/:associateId"} element={<AssociateView />} />;

        <Route path="*" element={<Navigate to="/" />} />
        <Route exact path="/" element={<Navigate to="/es" />} />
        <Route path="/es" element={<Main />} />
        <Route path="/cat" element={<Main />} />
      </Routes>
    </ThemeProvider>
  );
}

export default () => (
  <Authenticator.Provider>
    <App />
  </Authenticator.Provider>
);
