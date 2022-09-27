import './App.css';
import React from 'react';
import AssociatesView from './components/AssociatesView';

function App() {
  return (
    <div>
      <h2 id='header'>Asociación Cultural Costarricense Catalana</h2>
      <h3>Administración de Socios</h3>
      <AssociatesView/>
    </div>
  );
}

export default App;
