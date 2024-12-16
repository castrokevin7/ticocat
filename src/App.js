import './App.css';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'assets/theme';
import { Hub, DataStore } from 'aws-amplify';
import Main from 'views/informative/main/Main';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import EventsPage from 'views/informative/events/EventsPage';
import EventView from 'views/informative/events/EventView';
import BenefitsPage from 'views/informative/benefits/BenefitsPage';
import BenefitView from 'views/informative/benefits/BenefitView';
import FAQsPage from 'views/informative/faqs/FAQsPage';
import FAQView from 'views/informative/faqs/FAQView';
import AssociateVerificationPage from 'views/informative/associate-verification/AssociateVerificationPage';
import AssociateConfirmationView from 'views/informative/associate-verification/AssociateConfirmationView';
import TermsAndConditionsPage from 'views/informative/terms-and-conditions/TermsAndConditionsPage';
import LoginPage from 'views/social-network/login/LoginPage';
import AccountConfigurationPage from 'views/social-network/account-configuration/AccountConfigurationPage';
import CommunityPage from 'views/social-network/community/CommunityPage';
import ProfileViewPage from 'views/social-network/profile/ProfileViewPage';
import { Authenticator } from '@aws-amplify/ui-react';
import { getLang } from 'utils/Translator';
import MKButton from 'components/MKButton';
import Icon from '@mui/material/Icon';

function getLangUrl() {
  const origin = window.location.origin;

  let pathnameParts = window.location.pathname.split("/");
  if (pathnameParts.length > 0 && pathnameParts[0] === "") {
    pathnameParts = pathnameParts.slice(1);
  }

  pathnameParts = pathnameParts.slice(1);
  const destinationLanguage = getLang() === "es" ? "cat" : "es";
  return [origin, destinationLanguage].concat(pathnameParts).join("/");
}

function App() {
  const { pathname } = useLocation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    const removeListener = Hub.listen("datastore", async (capsule) => {
      const {
        // eslint-disable-next-line
        payload: { event, data },
      } = capsule;

      if (event === "ready") {
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

        {/* TICOCAT Social */}
        <Route exact path={"/es/social/comunidad"} element={<CommunityPage />} />;
        <Route exact path={"/cat/social/comunidad"} element={<CommunityPage />} />;

        <Route exact path={"/es/social/configuracion"} element={<AccountConfigurationPage />} />;
        <Route exact path={"/cat/social/configuracion"} element={<AccountConfigurationPage />} />;

        <Route exact path={"/es/social/perfil/:associateId"} element={<ProfileViewPage />} />;
        <Route exact path={"/cat/social/perfil/:associateId"} element={<ProfileViewPage />} />;
        <Route exact path={"/es/social/perfil"} element={<ProfileViewPage />} />;
        <Route exact path={"/cat/social/perfil"} element={<ProfileViewPage />} />;

        <Route path="*" element={<Navigate to="/" />} />
        <Route exact path="/" element={<Navigate to="/es" />} />
        <Route path="/es" element={<Main />} />
        <Route path="/cat" element={<Main />} />
      </Routes>

      <div style={{ position: "fixed", bottom: "25px", right: "25px" }}>
        <a href={
          getLangUrl()
        }>
          <MKButton 
            sx={{ borderRadius: '50%', width: '40px', height: '60px' }}
            color="info" 
            size="small"
          >
            <Icon sx={{ mr: 1 }}>translate_rounded</Icon>
            {getLang() === "es" ? "CAT" : "ESP"}
          </MKButton>
        </a>
      </div>
    </ThemeProvider>
  );
}

// eslint-disable-next-line
export default () => (
  <Authenticator.Provider>
    <App />
  </Authenticator.Provider>
);
