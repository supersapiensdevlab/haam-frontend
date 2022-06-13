import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/actions/orderActions';
import axios from 'axios';
import { getCategory, getType } from '../../redux/actions/optionsActions';
import DropDown from "../DropDown/DropDown";
import { setProducts } from '../../redux/actions/productActions';
import OrderComponent from './OrderComponent';

function Orders() {
  const oeders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const [order, setOrder] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "0",
    type: "0",
    size: "",
    quantity: 0,
  });

  const fetchOrders = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/orders`)
      .catch((err) => console.log(err));
    dispatch(getOrders(response.data));
  };
  const fetchCategory = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/options/category`)
      .catch((err) => console.log(err));
    dispatch(getCategory(response.data));
  };
  const fetchType = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/options/type`)
      .catch((err) => console.log(err));
    dispatch(getType(response.data));
  };
  const fetchProducts = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/products`)
      .catch((err) => console.log(err));
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchOrders();
    fetchCategory();
    fetchType();
    fetchProducts();
  }, []);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }




  return (
    <>
    <div className="flex flex-col w-full pt-5">
      <h2 className=" font-bold text-lg">Orders</h2>
      <div className="flex items-center my-2">
      <DropDown />
      </div>
      <OrderComponent />
    </div>
  </>
  )
}

export default Orders