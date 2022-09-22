import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import CustomerProvider from './providers/CustomerProvider';
import Router from './routes/Router';

function App() {
  return (
    <BrowserRouter>
      <CustomerProvider>
        <Router />
      </CustomerProvider>
    </BrowserRouter>
  );
}

export default App;
