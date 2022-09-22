import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Button, StatusCard, TextCard } from '../components';
import CustomerContext from '../contexts/CustomerContext';
import { updateRequest } from '../services/APIRequests';
import formatDate from '../services/formatDate';

export default function OrderMenu({ order, prefix, client }) {
  const { orderMenu, setOrderMenu, user: { token } } = useContext(CustomerContext);
  const { id, saleDate, status } = order;

  const PREPARING = 'Preparando';
  const IN_TRANSIT = 'Em Trânsito';
  const DELIVERED = 'Entregue';

  const handlePreparing = async (e) => {
    e.preventDefault();
    setOrderMenu({ ...orderMenu, status: PREPARING });
    await updateRequest(`/${client}/orders/${id}`, { status: PREPARING }, token);
  };

  const handleInTransit = async (e) => {
    e.preventDefault();
    setOrderMenu({ ...orderMenu, status: IN_TRANSIT });
    await updateRequest(`/${client}/orders/${id}`, { status: IN_TRANSIT }, token);
  };

  const handleDelivered = async (e) => {
    e.preventDefault();
    setOrderMenu({ ...orderMenu, status: DELIVERED });
    await updateRequest(`${client}/orders/${id}`, { status: DELIVERED }, token);
  };

  const handleClick = (e) => {
    if (client === 'customer') {
      return handleDelivered(e);
    }
    return handleInTransit(e);
  };

  return (
    <section>
      <TextCard
        text={ `PEDIDO ${id};` }
        dataTestId={ `${prefix}element-order-details-label-order-id` }
        className="order-id"
      />
      { client === 'customer' && (
        <TextCard
          text="P. Vend: Fulana Pereira" // get name from API
          className="seller"
          dataTestId={ `${prefix}element-order-details-label-seller-name` }
        />)}
      <TextCard
        text={ formatDate(saleDate) }
        className="sale-date"
        dataTestId={ `${prefix}element-order-details-label-order-date` }
      />
      <StatusCard
        status={ status }
        dataTestId={
          `${prefix}element-order-details-label-delivery-status`
        }
      />
      { client === 'seller' && (
        <Button
          name="PREPARAR PEDIDO"
          handleClick={ (e) => handlePreparing(e) }
          dataTestId={ `${prefix}button-preparing-check` }
          className="preparing-btn"
          type="submit"
          disabled={ status !== 'Pendente' }
        />)}
      <Button
        name={ client === 'customer' ? 'MARCAR COMO ENTREGUE' : 'SAIU PARA ENTREGA' }
        handleClick={ (e) => handleClick(e) }
        dataTestId={
          `${prefix}button-${client === 'customer' ? 'delivery' : 'dispatch'}-check`
        }
        className="status-btn"
        type="submit"
        disabled={
          client === 'customer' ? status !== 'Em Trânsito' : status !== 'Preparando'
        }
      />
    </section>
  );
}

OrderMenu.propTypes = {
  client: PropTypes.string.isRequired,
  order: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    )]),
  ).isRequired,
  prefix: PropTypes.string.isRequired,
};
