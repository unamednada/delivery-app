import React, { useContext } from 'react';
import { HeaderLink, TotalPrice } from '../components';
import DeliveryDetails from '../templates/DeliveryDetails';
import CustomerContext from '../contexts/CustomerContext';
import { Header } from '../templates';
import OrdersTable from '../templates/OrdersTable';
import { orderIndex } from '../tests/mocks/TableIndexes';

export default function Checkout() {
  const { user: { name }, cart } = useContext(CustomerContext);

  return (
    <main>
      <Header
        FirstNavigationLink={ () => HeaderLink({
          name: 'Produtos',
          user: 'customer',
          path: 'products',
          dataTestId: 'customer_products__element-navbar-link-products',
          className: 'header-nav__items header-nav__link  header-nav__link--products',
        }) }
        SecondNavigationLink={ () => HeaderLink({
          name: 'Meus Pedidos',
          user: 'customer',
          path: 'orders',
          dataTestId: 'customer_products__element-navbar-link-orders',
          className: 'header-nav__items header-nav__link header-nav__link--orders',
        }) }
        userName={ name }
      />
      <h3>Finalizar Pedido</h3>
      <div>
        <OrdersTable
          index={ orderIndex }
          body={ cart }
          prefix="customer_checkout__"
        />
        <div>
          <TotalPrice
            dataTestId="customer_checkout__element-order-total-price"
            text="Total:"
          />
        </div>
      </div>
      <h3>Detalhes e Endereço para Entrega</h3>
      <div>
        <DeliveryDetails />
      </div>
    </main>
  );
}
