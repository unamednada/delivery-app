import PropTypes from 'prop-types';
import React from 'react';

export default function OrderCard({ id, dataTestId }) {
  return (
    <div className="order-card">
      <span
        className="order-number"
        data-testid={ dataTestId }
      >
        Pedido
        { '\n' }
        000
        { id }
      </span>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  dataTestId: PropTypes.string.isRequired,
};
