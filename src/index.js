import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js'
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import {AmplifyProvider} from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AmplifyProvider>
      <App />
    </AmplifyProvider>
  </React.StrictMode>
);
