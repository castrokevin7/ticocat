import './App.css';
import React from 'react';
import AssociatesView from './components/AssociatesView';

function App() {
  return (
    <div>
      <h1 id='header'>Aso TicoCat</h1>
      <h2>Administración de Socios</h2>
      <AssociatesView/>
    </div>
  );
}

export default App;
