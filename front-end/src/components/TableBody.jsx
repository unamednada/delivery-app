// import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import CustomerContext from '../contexts/CustomerContext';
import Button from './Button';

export default function TableBody({ body, prefix }) {
  const { cart, setCart } = useContext(CustomerContext);

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  return (
    body.map(({ id, name, quantity, price }, i) => (
      <tr key={ i }>
        <td data-testid={ `${prefix}element-order-table-item-number-${i}` }>
          {i + 1}
        </td>
        <td data-testid={ `${prefix}element-order-table-name-${i}` }>
          {name}
        </td>
        <td data-testid={ `${prefix}element-order-table-quantity-${i}` }>
          {quantity}
        </td>
        <td data-testid={ `${prefix}element-order-table-unit-price-${i}` }>
          {(+price).toFixed(2).replace('.', ',')}
        </td>
        <td data-testid={ `${prefix}element-order-table-sub-total-${i}` }>
          {(+price * quantity).toFixed(2).replace('.', ',')}
        </td>
        {
          prefix === 'customer_checkout__' && (
            <td>
              <Button
                name="Remover"
                handleClick={ () => removeFromCart(id) }
                className="remove-button"
                dataTestId={ `${prefix}element-order-table-remove-${i}` }
                type="button"
              />
            </td>
          )
        }
      </tr>
    ))
  );
}
