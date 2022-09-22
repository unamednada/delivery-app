import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { postRequest } from '../services/APIRequests';
import { Button, TextInput } from '../components';
import CustomerContext from '../contexts/CustomerContext';
import '../components/styles';
import './styles';

export default function RegisterCard() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedRegister, setFailedRegister] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const { setUser } = useContext(CustomerContext);

  const enableButton = () => {
    const NAME_MIN_LENGTH = 12;
    const PASSWORD_MIN_LENGTH = 6;

    return !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/.test(email)
      && password.length >= PASSWORD_MIN_LENGTH
      && name.length >= NAME_MIN_LENGTH);
  };

  const register = async (event) => {
    event.preventDefault();

    try {
      await postRequest('/register', { name, email, password });

      const { data } = await postRequest('/login', { email, password });

      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setName('');
      setEmail('');
      setPassword('');
      setIsLogged(true);
    } catch (error) {
      setFailedRegister(true);
      setIsLogged(false);
    }
  };

  useEffect(() => setFailedRegister(false), [name, email, password]);

  if (isLogged) return <Navigate to="/customer/products" />;

  return (
    <section>
      <form className="login-card">
        <TextInput
          className="text-input text-input__login"
          name="name"
          onChange={ ({ target: { value } }) => setName(value) }
          type="text"
          value={ name }
          dataTestId="common_register__input-name"
          placeholder="Name"
          labelText="Name"
        />
        <TextInput
          className="text-input text-input__login"
          name="email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          type="email"
          value={ email }
          dataTestId="common_register__input-email"
          placeholder="Email"
          labelText="Email"
        />
        <TextInput
          className="text-input text-input__login"
          name="password"
          onChange={ ({ target: { value } }) => setPassword(value) }
          type="password"
          value={ password }
          dataTestId="common_register__input-password"
          placeholder="Password"
          labelText="Password"
        />
        <Button
          name="Register"
          handleClick={ (event) => register(event) }
          className="button button__login button__login--acess"
          dataTestId="common_register__button-register"
          disabled={ enableButton() }
          type="submit"
        />
      </form>
      <section>
        {
          failedRegister && (
            <p data-testid="common_register__element-invalid_register">
              Dados inválidos!
            </p>
          )
        }
      </section>
    </section>

  );
}
