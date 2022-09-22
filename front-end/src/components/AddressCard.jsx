import PropTypes from 'prop-types';
import React from 'react';

export default function AddressCard({ address, hidden, id }) {
  return (
    <div
      className="address-card"
      hidden={ hidden }
    >
      <p
        className="address"
        data-testid={ `seller_orders__element-card-price-${id}` }
      >
        { address }
      </p>
    </div>
  );
}

AddressCard.propTypes = {
  address: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};
