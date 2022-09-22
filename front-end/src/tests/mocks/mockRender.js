import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CustomerProvider from '../../providers/CustomerProvider';

const renderWithRouter = (component, container) => {
  const router = render(
    <BrowserRouter>
      { component }
    </BrowserRouter>,
    container,
  );

  return router;
};

const renderWithContext = (component, container) => {
  const router = render(
    <BrowserRouter>
      <CustomerProvider>
        { component }
      </CustomerProvider>
    </BrowserRouter>,
    container,
  );

  return router;
};

export {
  renderWithRouter,
  renderWithContext,
};
