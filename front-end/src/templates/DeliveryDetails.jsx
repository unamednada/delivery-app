import React, { useContext, useState } from 'react';
import Button from '../components/Button';
import SelectInput from '../components/SelectInput';
import TextInput from '../components/TextInput';
import CustomerContext from '../contexts/CustomerContext';
import { postRequest } from '../services/APIRequests';

export default function DeliveryDetails() {
  const sellersMock = ['Fulana Pereira'];

  const {
    cart,
    setCart,
    navigate,
    orders,
    setOrders,
    totalPrice,
    user: { userId, token },
  } = useContext(CustomerContext);

  const [deliveryDetails, setDeliveryDetails] = useState({
    sellerId: 2, deliveryAddress: '', deliveryNumber: '',
  });
  const { sellerId, deliveryAddress, deliveryNumber } = deliveryDetails;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await postRequest('/customer/orders',
      { sellerId, deliveryAddress, deliveryNumber, userId, totalPrice, cart }, token);
    setOrders([...orders, data]);
    setCart([]);
    navigate(`/customer/orders/${data.id}`);
  };

  return (
    <form>
      <SelectInput
        className="delivery-details"
        labelText="P. Vendedora Responsável:"
        name="delivery-details"
        value={ sellersMock[0] }
        options={ sellersMock }
        // onChange={ ({ target: { value } }) => setDeliveryDetails(
        //   { ...deliveryDetails, seller: value },
        // ) }
        id="delivery-details"
        dataTestId="customer_checkout__select-seller"
      />
      <TextInput
        className="address"
        name="address"
        onChange={ ({ target: { value } }) => setDeliveryDetails(
          { ...deliveryDetails, deliveryAddress: value },
        ) }
        type="text"
        value={ deliveryAddress }
        dataTestId="customer_checkout__input-address"
      />
      <TextInput
        className="address-number"
        name="address-number"
        onChange={ ({ target: { value } }) => setDeliveryDetails(
          { ...deliveryDetails, deliveryNumber: value },
        ) }
        type="number"
        value={ deliveryNumber }
        dataTestId="customer_checkout__input-addressNumber"
      />
      <Button
        name="Finalizar Pedido"
        handleClick={ (e) => handleSubmit(e) }
        className="finish-order"
        dataTestId="customer_checkout__button-submit-order"
        type="submit"
        disabled={ !sellerId || !deliveryAddress || !deliveryNumber }
      />
    </form>
  );
}
