import React from 'react';
import { LoginCard } from '../templates';
import './styles';
import logo from './styles/Logo-App-Delivery.png';

export default function Login() {
  return (
    <main className="container-page-login">
      <section className="container-page-login__items">
        <img className="container-page-login__logo" src={ logo } alt="logo" />
        <h1 className="container-page-login__title">Delivery App</h1>
        <i>Pediu, chegou!</i>
      </section>
      <section className="container-page-login__card">
        <LoginCard />
      </section>
    </main>
  );
}
