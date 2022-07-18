// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ContextUser from './components/login/ContextUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextUser>
    <Router>
      <App />
    </Router>
  </ContextUser>
);
