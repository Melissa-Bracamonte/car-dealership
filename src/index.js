import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ContextUser from './components/context/ContextUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextUser>
    <Router>
      <App />
    </Router>
  </ContextUser>
);
