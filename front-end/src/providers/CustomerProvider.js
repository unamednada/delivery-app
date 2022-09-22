import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../contexts/CustomerContext';
import { getData } from '../services/APIRequests';

const INITIAL_USER_STATE = { userId: 0, email: '', name: '', role: '', token: '' };
export default function CustomerProvider({ children }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(INITIAL_USER_STATE);
  const [orders, setOrders] = useState([]);
  const [orderMenu, setOrderMenu] = useState({ });

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      setUser(loggedUser);
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart'));

    return localCart ? setCart(localCart)
      : localStorage.setItem('cart', JSON.stringify([]));
  }, []);

  const getOrders = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      const { data } = await getData(`/${loggedUser.role}/orders`, loggedUser.token);
      setOrders(data);
    }
  };

  useEffect(() => getOrders(), [user]);

  useEffect(() => cart && localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  useEffect(() => orders && localStorage.setItem('orders', JSON.stringify(orders)),
    [orders]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('orders');
    setIsLogged(false);
    navigate('/login');
  };

  const getProducts = async () => {
    setIsLoading(true);
    const { data } = await getData('/customer/products');
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => getProducts(), []);

  const context = {
    cart,
    setCart,
    orderMenu,
    setOrderMenu,
    logout,
    navigate,
    isLoading,
    setIsLoading,
    isLogged,
    setIsLogged,
    orders,
    setOrders,
    products,
    totalPrice,
    setTotalPrice,
    user,
    setUser,
  };

  return (
    <CustomerContext.Provider value={ context }>
      { children }
    </CustomerContext.Provider>
  );
}

CustomerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
