import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './styles/GlobalStyle.jsx';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
