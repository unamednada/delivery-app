import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { postRequest } from '../services/APIRequests';
import { Button, TextInput } from '../components';
import CustomerContext from '../contexts/CustomerContext';
import '../components/styles';
import './styles';

export default function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedLogin, setFailedLogin] = useState(false);

  const {
    navigate,
    setUser,
    isLogged,
    setIsLogged,
    user: { role },
  } = useContext(CustomerContext);

  const enableButton = () => {
    const MIN_LENGTH = 6;

    return !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/.test(email)
      && password.length >= MIN_LENGTH);
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const { data } = await postRequest('/login', { email, password });

      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setEmail('');
      setPassword('');
      setIsLogged(true);
    } catch (error) {
      setFailedLogin(true);
      setIsLogged(false);
    }
  };

  useEffect(() => setFailedLogin(false), [email, password]);

  const pathTo = role === 'customer' ? 'products' : 'orders';

  if (isLogged) return <Navigate to={ `/${role}/${pathTo}` } />;

  return (
    <section>
      <form className="login-card">
        <TextInput
          className="text-input text-input__login"
          name="email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          type="email"
          value={ email }
          dataTestId="common_login__input-email"
          placeholder="Email"
          labelText="Login"
        />
        <TextInput
          className="text-input text-input__login"
          name="password"
          onChange={ ({ target: { value } }) => setPassword(value) }
          type="password"
          value={ password }
          dataTestId="common_login__input-password"
          placeholder="Password"
          labelText="Senha"
        />
        <Button
          name="Login"
          handleClick={ (event) => login(event) }
          className="button button__login button__login--acess"
          dataTestId="common_login__button-login"
          disabled={ enableButton() }
          type="submit"
        />
        <Button
          name="Ainda não tem conta?"
          handleClick={ () => navigate('/register') }
          className="button button__login button__login--register"
          dataTestId="common_login__button-register"
          type="button"
        />
      </form>
      <section>
        {
          failedLogin && (
            <p data-testid="common_login__element-invalid-email">
              Dados inválidos!
            </p>
          )
        }
      </section>
    </section>
  );
}
