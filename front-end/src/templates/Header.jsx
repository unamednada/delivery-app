import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Button } from '../components';
import CustomerContext from '../contexts/CustomerContext';
import './styles';
import '../components/styles';

export default function Header(
  { FirstNavigationLink, SecondNavigationLink, userName },
) {
  const { logout } = useContext(CustomerContext);

  return (
    <header className="header">
      <nav className="header-nav">
        <FirstNavigationLink />
        <SecondNavigationLink />
        <p
          className="header-nav__items header-nav__name"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { userName }
        </p>
        <Button
          name="Sair"
          handleClick={ () => logout() }
          className="button header-nav__items header-nav__buton"
          dataTestId="customer_products__element-navbar-link-logout"
          type="button"
        />

      </nav>
    </header>
  );
}

Header.propTypes = {
  FirstNavigationLink: PropTypes.elementType.isRequired,
  SecondNavigationLink: PropTypes.elementType,
  userName: PropTypes.string.isRequired,
};

Header.defaultProps = {
  SecondNavigationLink: null,
};
