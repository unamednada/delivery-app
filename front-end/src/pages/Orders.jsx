import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { HeaderLink } from '../components';
import CustomerContext from '../contexts/CustomerContext';
import { Header, SaleCard } from '../templates';

export default function Orders({ client }) {
  const { user: { role, name }, orders } = useContext(CustomerContext);

  const path = client === 'customer' ? 'products' : 'orders';

  return (
    role === client && (
      <main>
        <Header
          FirstNavigationLink={ () => HeaderLink({
            name: client === 'customer' ? 'Produtos' : 'Pedidos',
            user: client,
            path,
            dataTestId: `customer_products__element-navbar-link-${path}`,
            className: 'header-nav__items header-nav__link  header-nav__link--products',
          }) }
          SecondNavigationLink={ () => ((role === 'customer') ? HeaderLink({
            name: 'Meus Pedidos',
            user: 'customer',
            path: 'orders',
            dataTestId: 'customer_products__element-navbar-link-orders',
            className: 'header-nav__items header-nav__link header-nav__link--orders',

          }) : null) }
          userName={ name }
        />
        {
          (orders.length > 0) && orders.map((
            { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber },
          ) => (
            <SaleCard
              key={ id }
              id={ id }
              status={ status }
              saleDate={ saleDate }
              totalPrice={ +totalPrice }
              address={ deliveryAddress }
              number={ +deliveryNumber }
              client={ client }
            />
          ))
        }
      </main>
    )
  );
}

Orders.propTypes = {
  client: PropTypes.string.isRequired,
};
