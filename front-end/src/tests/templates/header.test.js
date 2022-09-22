import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Header } from '../../templates';
import { renderWithContext } from '../mocks/mockRender';

describe('<Header />', () => {
  let container = null;
  let header;

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
        <Header
          FirstNavigationLink={ () => <a href="test1">anchor1</a> }
          SecondNavigationLink={ () => <a href="test2">anchor2</a> }
          userName="test"
        />,
        container,
      );
    });

    header = container.querySelector('header');
  });

  it('should render a header with a navigation bar', () => {
    expect(header).toBeTruthy();

    const navBar = header.querySelector('nav');
    expect(navBar).toBeTruthy();
  });

  it('should render the navigation links', () => {
    const navigationLinks = header.querySelectorAll('nav a');
    expect(navigationLinks.length).toBe(2);
    expect(navigationLinks[0].getAttribute('href')).toBe('test1');
    expect(navigationLinks[1].getAttribute('href')).toBe('test2');
  });

  it('should render the user name', () => {
    const userName = header.querySelector('p');
    expect(userName).toBeTruthy();
    expect(userName.textContent).toBe('test');
    expect(userName.getAttribute('class')).toBe('logged-user-name');
    expect(userName.getAttribute('data-testid'))
      .toBe('customer_products__element-navbar-user-full-name');
  });

  it('should render the logout button', () => {
    const logoutButton = header.querySelector('button');
    expect(logoutButton).toBeTruthy();
    expect(logoutButton.getAttribute('data-testid'))
      .toBe('customer_products__element-navbar-link-logout');
    expect(logoutButton.textContent).toBe('Sair');
    expect(logoutButton.getAttribute('class')).toBe('logout-button');
    expect(logoutButton.getAttribute('type')).toBe('button');
  });
});
