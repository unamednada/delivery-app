import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import CustomerContext from '../contexts/CustomerContext';

export default function TotalPrice({ dataTestId, text, total }) {
  const { totalPrice, setTotalPrice, cart } = useContext(CustomerContext);

  useEffect(() => {
    const handleTotalPrice = () => cart.reduce((acc, { price, quantity }) => {
      acc += (price * quantity);
      return acc;
    }, 0);

    setTotalPrice(handleTotalPrice());
  }, [cart, setTotalPrice]);

  return (
    <span data-testid={ dataTestId }>
      { `${text} R$ ${total || totalPrice.toFixed(2)}`.replace('.', ',') }
    </span>
  );
}

TotalPrice.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  text: PropTypes.string,
  total: PropTypes.string,
};

TotalPrice.defaultProps = {
  text: '',
  total: '',
};
