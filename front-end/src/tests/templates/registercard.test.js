import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { RegisterCard } from '../../templates';
import { renderWithContext } from '../mocks/mockRender';
import api from '../../services/APIRequests';

const inputEmail = 'input[name="email"]';
const inputPassword = 'input[name="password"]';
const dataTestId = 'data-testid';
const buttonTypeSubmit = 'button[type="submit"]';
const johnDoeEmail = 'john@doe.com';
const inputName = 'input[name="name"]';
const johnDoeName = 'John Doe Min';

describe('<RegisterCard />', () => {
  let container = null;
  let registerCard;

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
        <RegisterCard />,
        container,
      );
    });

    registerCard = container.querySelector('form');
  });

  it('should render a form', () => {
    expect(registerCard).toBeTruthy();
  });

  it('should contain a text input for the email', () => {
    const emailInput = registerCard.querySelector(inputEmail);
    expect(emailInput).toBeTruthy();
    expect(emailInput.getAttribute('type')).toBe('email');
    expect(emailInput.getAttribute('placeholder')).toBe('Email');
    expect(emailInput.getAttribute(dataTestId)).toBe('common_register__input-email');
    expect(emailInput.getAttribute('class')).toBe('email-input');
    expect(emailInput.previousSibling.getAttribute('for')).toBe('email');
    // need test the handlechange function
  });

  it('should contain a text input for the password', () => {
    const passwordInput = registerCard.querySelector(inputPassword);
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.getAttribute('type')).toBe('password');
    expect(passwordInput.getAttribute('placeholder')).toBe('Password');
    expect(passwordInput.getAttribute(dataTestId))
      .toBe('common_register__input-password');
    expect(passwordInput.getAttribute('class')).toBe('password-input');
    expect(passwordInput.previousSibling.getAttribute('for')).toBe('password');
    // need test the handlechange function
  });

  it('should render a text input for the name', () => {
    const nameInput = registerCard.querySelector(inputName);
    expect(nameInput).toBeTruthy();
    expect(nameInput.getAttribute('type')).toBe('text');
    expect(nameInput.getAttribute('placeholder')).toBe('Name');
    expect(nameInput.getAttribute(dataTestId)).toBe('common_register__input-name');
    expect(nameInput.getAttribute('class')).toBe('name-input');
    expect(nameInput.previousSibling.getAttribute('for')).toBe('name');
    // need test the handlechange function
  });

  it('should contain a submit button', () => {
    const submitButton = registerCard.querySelector(buttonTypeSubmit);
    expect(submitButton).toBeTruthy();
    expect(submitButton.getAttribute(dataTestId))
      .toBe('common_register__button-register');
    expect(submitButton.getAttribute('class')).toBe('register-button');
    expect(submitButton.textContent).toBe('Register');
  });

  it('should keep submit disabled when the email, name or password are invalid', () => {
    const emailInput = registerCard.querySelector(inputEmail);
    const passwordInput = registerCard.querySelector(inputPassword);
    const nameInput = registerCard.querySelector(inputName);
    const submitButton = registerCard.querySelector(buttonTypeSubmit);
    expect(submitButton).toBeDisabled();

    act(() => {
      Simulate.change(emailInput, { target: { value: 'invalid' } });
      Simulate.change(nameInput, { target: { value: '' } });
      Simulate.change(passwordInput, { target: { value: '' } });
    });

    expect(emailInput.value).toBe('invalid');
    expect(nameInput.value).toBe('');
    expect(passwordInput.value).toBe('');

    expect(submitButton).toBeDisabled();

    act(() => {
      Simulate.change(emailInput, { target: { value: johnDoeEmail } });
      Simulate.change(nameInput, { target: { value: johnDoeName } });
      Simulate.change(passwordInput, { target: { value: 'validp' } });
    });

    expect(emailInput.value).toBe(johnDoeEmail);
    expect(nameInput.value).toBe(johnDoeName);
    expect(passwordInput.value).toBe('validp');

    expect(submitButton).not.toBeDisabled();
  });

  it('shouldn\'t render the failed register message', () => {
    const failedRegisterMessage = registerCard.querySelector('p');
    expect(failedRegisterMessage).toBeFalsy();
  });

  it('should render the failed register message if data is not authorized', async () => {
    const emailInput = registerCard.querySelector(inputEmail);
    const passwordInput = registerCard.querySelector(inputPassword);
    const nameInput = registerCard.querySelector(inputName);

    act(() => {
      Simulate.change(emailInput, { target: { value: johnDoeEmail } });
      Simulate.change(nameInput, { target: { value: johnDoeName } });
      Simulate.change(passwordInput, { target: { value: 'validpass123' } });
    });

    expect(emailInput.value).toBe(johnDoeEmail);
    expect(nameInput.value).toBe(johnDoeName);
    expect(passwordInput.value).toBe('validpass123');

    const submitButton = registerCard.querySelector(buttonTypeSubmit);

    const spyPost = jest.spyOn(api, 'post')
      .mockRejectedValue({ error: new Error('Error') });

    await act(async () => {
      await submitButton.click();
    });

    expect(spyPost).toHaveBeenCalled();
    expect(spyPost)
      .toHaveBeenCalledWith('/register', {
        email: johnDoeEmail,
        name: johnDoeName,
        password: 'validpass123',
      }, {
        headers: { "Authorization": undefined },
      });

    const failedRegisterMessage = registerCard.querySelector('p');
    expect(failedRegisterMessage).toBeTruthy();
    expect(failedRegisterMessage.getAttribute(dataTestId))
      .toBe('common_register__element-invalid_register');
    expect(failedRegisterMessage.textContent).toBe('Dados inválidos!');
  });
});
