import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login, Products, Register, Checkout, Orders, OrderDetails } from '../pages';

export default function Router() {
  return (
    // Switch, Redirect e component defasados, usa-se Routes, Navigate e element, respectivamente
    <Routes>
      <Route
        exact
        path="/"
        element={ <Navigate to="/login" /> }
      />
      <Route
        exact
        path="/login"
        element={ <Login /> }
      />
      <Route
        exact
        path="/register"
        element={ <Register /> }
      />
      <Route
        exact
        path="/customer/products"
        element={ <Products client="customer" /> }
      />
      <Route
        exact
        path="/customer/checkout"
        element={ <Checkout /> }
      />
      <Route
        exact
        path="/customer/orders"
        element={ <Orders client="customer" /> }
      />
      <Route
        exact
        path="/customer/orders/:id"
        element={ <OrderDetails client="customer" /> }
      />
      <Route
        exact
        path="/seller/orders"
        element={ <Orders client="seller" /> }
      />
      <Route
        exact
        path="/seller/orders/:id"
        element={ <OrderDetails client="seller" /> }
      />
    </Routes>
  );
}
