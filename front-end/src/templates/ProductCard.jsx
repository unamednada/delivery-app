import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Button, TextInput } from '../components';
import CustomerContext from '../contexts/CustomerContext';

export default function ProductCard({ name, imageURL, price, id }) {
  const [quantity, setQuantity] = useState(0);

  const { cart, setCart } = useContext(CustomerContext);

  const item = { name, imageURL, price, id };

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart'));
    const product = localCart.find((it) => it.id === item.id);
    if (product) setQuantity(product.quantity);
  }, [item.id]);

  const handleCart = (elementName, value) => {
    const newCart = cart.filter((it) => it.id !== item.id);

    switch (elementName) {
    case ('+'):
      setQuantity((prevState) => prevState + 1);
      setCart([...newCart, { ...item, quantity: (quantity + 1) }]);
      break;
    case ('-'):
      setQuantity((prevState) => prevState - 1);
      setCart([...newCart, { ...item, quantity: (quantity - 1) }]);
      if (quantity === 1) setCart(newCart);
      break;
    default:
      setQuantity(+value);
      setCart([...newCart, { ...item, quantity: +value }]);
      if (+value === 0) setCart(newCart);
    }
  };

  return (
    <section className="product-card">
      <section className="product-card__price-image">
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
          className="product-card__price"
        >
          { `R$ ${price.toFixed(2)}`.replace('.', ',') }
        </p>
        <img
          alt={ `Imagem do produto ${name}.` }
          src={ imageURL }
          className="product-card__image"
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          width="80"
          height="100"
        />
      </section>
      <section className="product-card__name-qtdy">
        <p
          className="product-card__name"
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }
        </p>
        <div>
          <Button
            name="-"
            handleClick={ ({ target }) => handleCart(target.name) }
            className=" button product-card__qtdy product-card__qtdy--subtraction"
            dataTestId={ `customer_products__button-card-rm-item-${id}` }
            type="button"
            disabled={ quantity <= 0 }
          />
          <TextInput
            className=" text-input product-card__input"
            name="quantity"
            onChange={ ({ target }) => handleCart(target.name, target.value) }
            type="number"
            value={ quantity }
            dataTestId={ `customer_products__input-card-quantity-${id}` }
          />
          <Button
            name="+"
            handleClick={ ({ target }) => handleCart(target.name) }
            className=" button product-card__qtdy product-card__qtdy--sum "
            dataTestId={ `customer_products__button-card-add-item-${id}` }
            type="button"
          />
        </div>
      </section>
    </section>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
