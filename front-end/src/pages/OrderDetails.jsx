import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderLink, Loading, TotalPrice } from '../components';
import CustomerContext from '../contexts/CustomerContext';
import { getData } from '../services/APIRequests';
import { Header, OrderMenu, OrdersTable } from '../templates';
import { orderIndex } from '../tests/mocks/TableIndexes';

export default function OrderDetails({ client }) {
  const {
    user: { name, role, token },
    isLoading,
    setIsLoading,
    orderMenu,
    setOrderMenu,
  } = useContext(CustomerContext);
  const [orderDetails, setOrderDetails] = useState([]);

  const id = useLocation().pathname.split('/').pop();

  useEffect(() => {
    setIsLoading(true);
    const getOrderDetails = async () => {
      const { data } = await getData(`/${client}/orders/${id}`, token);
      setOrderMenu(data);
      setOrderDetails(data.products);
    };

    getOrderDetails();
    setIsLoading(false);
  }, [client, id, setIsLoading, setOrderMenu, token]);

  const LAST_ITEM = -1;

  return (
    role === client && (
      <main>
        <Header
          FirstNavigationLink={ () => HeaderLink({
            name: client === 'customer' ? 'Produtos' : 'Pedidos',
            user: client,
            path: client === 'customer' ? 'products' : 'orders',
            dataTestId: 'customer_products__element-navbar-link-products',
            className: 'header-nav__items header-nav__link  header-nav__link--products',
          }) }
          SecondNavigationLink={ () => (client === 'customer' ? HeaderLink({
            name: 'Meus Pedidos',
            user: 'customer',
            path: 'orders',
            dataTestId: 'customer_products__element-navbar-link-orders',
            className: 'header-nav__items header-nav__link header-nav__link--orders',
          }) : null) }
          userName={ name }
        />
        {
          isLoading && (orderDetails.length > 0) ? <Loading /> : (
            <div>
              <OrderMenu
                order={ orderMenu }
                prefix={ `${client}_order_details__` }
                client={ client }
              />
              <OrdersTable
                index={ orderIndex.slice(0, LAST_ITEM) }
                body={ orderDetails }
                prefix={ `${client}_products__` }
              />
              <TotalPrice
                dataTestId={ `${client}_order_details__element-order-total-price` }
                text="Total:"
                total={ orderMenu.totalPrice }
              />
            </div>
          )
        }
      </main>
    )
  );
}

OrderDetails.propTypes = {
  client: PropTypes.string.isRequired,
};
