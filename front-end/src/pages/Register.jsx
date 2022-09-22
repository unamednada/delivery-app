import React from 'react';
import { RegisterCard } from '../templates';
import './styles';
import logo from './styles/Logo-App-Delivery.png';

export default function Register() {
  return (
    <main className="container-page-login container-page-login--register">
      <section
        className="container-page-login__items
        container-page-login__items--register"
      >
        <h2 className="container-page-login__text"> Cadastre-se agora!</h2>
        <img className="container-page-login__logo" src={ logo } alt="logo" />
        <h1 className="container-page-login__title">Delivery App</h1>
        <i>Pediu, chegou!</i>
      </section>
      <section
        className="container-page-login__card
        container-page-login__card--register"
      >
        <h2 className="container-page-login__text"> Cadastro</h2>
        <RegisterCard />
      </section>
    </main>
  );
}
