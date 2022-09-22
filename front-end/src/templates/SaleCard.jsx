import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { AddressCard, OrderCard, StatusCard, TextCard } from '../components';
import formatDate from '../services/formatDate';

export default function SaleCard(
  { id, status, saleDate, totalPrice, address, number, client },
) {
  return (
    <Link to={ `/${client}/orders/${id}` }>
      <OrderCard
        id={ id }
        dataTestId={ `${client}_orders__element-order-id-${id}` }
      />
      <StatusCard
        status={ status }
        dataTestId={ `${client}_orders__element-delivery-status-${id}` }
      />
      <TextCard
        text={ formatDate(saleDate) }
        className="sale-date"
        dataTestId={ `${client}_orders__element-order-date-${id}` }
      />
      <TextCard
        text={ `R$ ${totalPrice.toFixed(2)}`.replace('.', ',') }
        className="salestring-price"
        dataTestId={ `${client}_orders__element-card-price-${id}` }
      />
      <AddressCard
        address={ `${address}, ${number}` }
        hidden={ client !== 'seller' }
        id={ id }
      />
    </Link>
  );
}

SaleCard.propTypes = {
  address: PropTypes.string,
  client: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  number: PropTypes.number,
  saleDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

SaleCard.defaultProps = {
  address: '',
  number: null,
};
