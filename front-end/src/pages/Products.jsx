import React, { useContext } from 'react';
import { Header, ProductCard } from '../templates';
import { Button, HeaderLink, TotalPrice } from '../components';
import CustomerContext from '../contexts/CustomerContext';
import cartShop from './styles/shopping-cart.png';

export default function Products() {
  const { navigate, products, totalPrice } = useContext(CustomerContext);

  const data = JSON.parse(localStorage.getItem('user'));
  return (
    <main className="container-page-products">
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
        userName={ data.name }
      />
      <section className="product-card-container__card">
        {
          products.map(({ name, urlImage, price, id }) => (
            <ProductCard
              name={ name }
              imageURL={ urlImage }
              price={ +price }
              id={ id }
              key={ id }
            />))
        }
      </section>
      <div className="container-page-products__total-price">
        <img src={ cartShop } alt="Cart Shop" />
        <Button
          name="Ver Carrinho:"
          handleClick={ () => navigate('/customer/checkout') }
          className="total-price__button"
          dataTestId="customer_products__button-cart"
          type="button"
          price={
            <TotalPrice
              dataTestId="customer_products__checkout-bottom-value"
            />
          }
          disabled={ !totalPrice }
        />
      </div>
    </main>
  );
}
