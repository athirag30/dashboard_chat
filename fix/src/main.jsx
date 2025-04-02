import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Must be App, not ProcessPlanningSoftware
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
