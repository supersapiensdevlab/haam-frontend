import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/orderActions";
import axios from "axios";
import { getCategory, getType } from "../../redux/actions/optionsActions";
import DropDown from "../DropDown/DropDown";
import { setProducts } from "../../redux/actions/productActions";
import OrderComponent from "./OrderComponent";
import { Modal } from "react-bootstrap";

function Orders() {
  const oeders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [order, setOrder] = useState({
    CustomerID: "",
    OrderDate: "",
    RequiredDate: "",
    ShippedDate: "",
    Comment: "",
    Status: "",
    ProductID: "",
    QuantityOrdered: 1,
  });

  // For Add Order
  const [show, setShow] = useState(false);
  const handleModal = () => {
    setShow(!show);
    console.log("Modal Visibile ->", show);
  };

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

  // handle Add Order
  const handleSubmit =  async( e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/orders`,
        order,
        {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        }
      );
      console.log(res);
      fetchOrders();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <>
      <div className="flex flex-col w-full pt-5">
        <h2 className=" font-bold text-lg">Orders</h2>
        <div className="flex items-center my-2">
          <DropDown />
          <div
            onClick={handleModal}
            className="cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus: focus:ring-orange-500"
          >
            + Add Orders
          </div>
        </div>
        <OrderComponent />
      </div>
      <Modal show={show} onHide={handleModal}>
        <Modal.Header className="font-bold" closeButton>
          Add Custom Order
        </Modal.Header>

        <div className=" ">
          <div className=" grid-cols-3   md:gap-6">
            <div className="  md:col-span-3">
              <form onSubmit={handleSubmit} method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="  bg-white px-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-500"
                        >
                          Product Id
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={order.ProductID}
                          onChange={(e) => {
                            setOrder({ ...order, ProductID: e.target.value });
                          }}
                          autoComplete="given-name"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-500"
                        >
                          Customer ID
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={order.CustomerID}
                          onChange={(e) => {
                            setOrder({ ...order, CustomerID: e.target.value });
                          }}
                          autoComplete="given-name"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-500"
                        >
                          Order Date
                        </label>
                        <input
                          type="date"
                          name="first-name"
                          id="first-name"
                          value={order.OrderDate}
                          onChange={(e) => {
                            setOrder({ ...order, OrderDate: e.target.value });
                          }}
                          autoComplete="given-name"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-500"
                        >
                          Required Date
                        </label>
                        <input
                          type="date"
                          name="first-name"
                          id="first-name"
                          value={order.RequiredDate}
                          onChange={(e) => {
                            setOrder({
                              ...order,
                              RequiredDate: e.target.value,
                            });
                          }}
                          autoComplete="given-name"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-500"
                        >
                          Shipped Date
                        </label>
                        <input
                          type="date"
                          name="first-name"
                          id="first-name"
                          value={order.ShippedDate}
                          onChange={(e) => {
                            setOrder({ ...order, ShippedDate: e.target.value });
                          }}
                          autoComplete="given-name"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-500"
                        >
                          Comment
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={order.Comment}
                          onChange={(e) => {
                            setOrder({ ...order, Comment: e.target.value });
                          }}
                          autoComplete="given-name"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-500"
                        >
                          Status
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={order.Status}
                          onChange={(e) => {
                            setOrder({ ...order, Status: e.target.value });
                          }}
                          autoComplete="given-name"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-500"
                        >
                          Quantity Ordered
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={order.QuantityOrdered}
                          onChange={(e) => {
                            setOrder({
                              ...order,
                              QuantityOrdered: e.target.value,
                            });
                          }}
                          autoComplete="given-name"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      onClick={handleModal}
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus: focus:ring-orange-500"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <Modal.Footer>
            <div
              className="bg-orange-400 px-3 py-2 rounded-md text-white cursor-pointer hover:bg-orange-500 "
              onClick={handleModal}
            >
              Save
            </div>
          </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default Orders;
