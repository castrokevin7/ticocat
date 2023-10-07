import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Hub, DataStore } from 'aws-amplify';
import './App.css';
import AssociatesView from './components/associates/AssociatesView';
import EventsView from './components/events/EventsView';
import BenefitsView from './components/benefits/BenefitsView';
import FAQsView from './components/faqs/FAQsView';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function App() {
  const [value, setValue] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
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
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };

  if (!isReady) {
    return (
      <div style={{ padding: '10px', display: 'flex' }}>
        <div className="spinner-container">
          <div className="loading-spinner" />
        </div>
      </div>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <h2 id='header'>Asociación Cultural Costarricense Catalana</h2>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="application tabs">
          <Tab sx={{ color: 'gray' }} label="Socios" {...a11yProps(0)} />
          <Tab sx={{ color: 'gray' }} label="Eventos" {...a11yProps(1)} />
          <Tab sx={{ color: 'gray' }} label="Beneficios" {...a11yProps(2)} />
          <Tab sx={{ color: 'gray' }} label="FAQs" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <h3>Administración de Socios</h3>
        <AssociatesView />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h3>Administración de Eventos</h3>
        <EventsView />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h3>Administración de Beneficios</h3>
        <BenefitsView />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h3>Administración de FAQs</h3>
        <FAQsView />
      </TabPanel>
    </Box>
  );
}
