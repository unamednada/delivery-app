import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { LoginCard } from '../../templates';
import { renderWithContext } from '../mocks/mockRender';
import api from '../../services/APIRequests';

const inputEmail = 'input[name="email"]';
const inputPassword = 'input[name="password"]';
const dataTestId = 'data-testid';
const buttonTypeSubmit = 'button[type="submit"]';
const johnDoeEmail = 'john@doe.com';

describe('<LoginCard />', () => {
  let container = null;
  let loginCard;

  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterAll(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  beforeEach(() => {
    act(() => {
      renderWithContext(
        <LoginCard />,
        container,
      );
    });

    loginCard = container.querySelector('form');
  });

  it('should render a form', () => {
    expect(loginCard).toBeTruthy();
  });

  it('should contain a text input for the email', () => {
    const emailInput = loginCard.querySelector(inputEmail);
    expect(emailInput).toBeTruthy();
    expect(emailInput.getAttribute('type')).toBe('email');
    expect(emailInput.getAttribute('placeholder')).toBe('Email');
    expect(emailInput.getAttribute(dataTestId)).toBe('common_login__input-email');
    expect(emailInput.getAttribute('class')).toBe('email-input');
    expect(emailInput.previousSibling.getAttribute('for')).toBe('email');
    // need test the handlechange function
  });

  it('should contain a text input for the password', () => {
    const passwordInput = loginCard.querySelector(inputPassword);
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.getAttribute('type')).toBe('password');
    expect(passwordInput.getAttribute('placeholder')).toBe('Password');
    expect(passwordInput.getAttribute(dataTestId)).toBe('common_login__input-password');
    expect(passwordInput.getAttribute('class')).toBe('password-input');
    expect(passwordInput.previousSibling.getAttribute('for')).toBe('password');
    // need test the handlechange function
  });

  it('should contain a submit button', () => {
    const submitButton = loginCard.querySelector(buttonTypeSubmit);
    expect(submitButton).toBeTruthy();
    expect(submitButton.getAttribute(dataTestId)).toBe('common_login__button-login');
    expect(submitButton.getAttribute('class')).toBe('login-button');
    expect(submitButton.textContent).toBe('Login');
  });

  it('should contain a link to the register page', () => {
    const registerLink = loginCard.querySelector('button[name="Register"]');
    expect(registerLink).toBeTruthy();
    expect(registerLink.getAttribute(dataTestId)).toBe('common_login__button-register');
    expect(registerLink.getAttribute('class')).toBe('register-button');
    expect(registerLink.textContent).toBe('Register');
  });

  it('should keep the submit disabled when the email or password are invalid', () => {
    const emailInput = loginCard.querySelector(inputEmail);
    const passwordInput = loginCard.querySelector(inputPassword);
    const submitButton = loginCard.querySelector(buttonTypeSubmit);
    expect(submitButton).toBeDisabled();

    act(() => {
      Simulate.change(emailInput, { target: { value: 'invalid' } });
      Simulate.change(passwordInput, { target: { value: '' } });
    });

    expect(emailInput.value).toBe('invalid');
    expect(passwordInput.value).toBe('');

    expect(submitButton).toBeDisabled();

    act(() => {
      Simulate.change(emailInput, { target: { value: johnDoeEmail } });
      Simulate.change(passwordInput, { target: { value: 'validp' } });
    });

    expect(emailInput.value).toBe(johnDoeEmail);
    expect(passwordInput.value).toBe('validp');

    expect(submitButton).not.toBeDisabled();
  });

  it('shouldn\'t render the failed login message', () => {
    const failedLoginMessage = loginCard.querySelector('p');
    expect(failedLoginMessage).toBeFalsy();
  });

  it('should render the failed login message if data is not authorized', async () => {
    const emailInput = loginCard.querySelector(inputEmail);
    const passwordInput = loginCard.querySelector(inputPassword);

    act(() => {
      Simulate.change(emailInput, { target: { value: johnDoeEmail } });
      Simulate.change(passwordInput, { target: { value: 'validpass123' } });
    });

    expect(emailInput.value).toBe(johnDoeEmail);
    expect(passwordInput.value).toBe('validpass123');

    const submitButton = loginCard.querySelector(buttonTypeSubmit);
    expect(submitButton).not.toBeDisabled();

    const spyPost = jest.spyOn(api, 'post')
      .mockRejectedValue({ error: new Error('Error') });

    await act(async () => {
      await submitButton.click();
    });

    expect(spyPost).toHaveBeenCalled();
    expect(spyPost)
      .toHaveBeenCalledWith('/login', { email: johnDoeEmail, password: 'validpass123' }, { headers: { 'Authorization': undefined } });

    const failedLoginMessage = loginCard.querySelector('p');
    expect(failedLoginMessage).toBeTruthy();
    expect(failedLoginMessage.getAttribute(dataTestId))
      .toBe('common_login__element-invalid-email');
    expect(failedLoginMessage.textContent).toBe('Dados inválidos!');
  });
});
