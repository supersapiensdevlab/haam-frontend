import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/orderActions";
import axios from "axios";
import { getCategory, getType } from "../../redux/actions/optionsActions";
import DropDown from "../DropDown/DropDown";
import { setProducts } from "../../redux/actions/productActions";
import OrderComponent from "./OrderComponent";
import { Modal } from "react-bootstrap";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
function Orders() {
  const oeders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [order, setOrder] = useState({
    CustomerID: "",
    OrderDate: "",
    RequiredDate: "",
    ShippedDate: "",
    Comment: "",
    Status: "Placed",
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

  // Status filter
  const [filterStatus, setFilterStatus] = useState(false);
  const filters = [
    "Placed",
    "Dispatched",
    "Cancelled",
    "Refunded",
    "Completed",
  ];

  // handle Add Order
  const handleSubmit = async (e) => {
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
  };

  return (
    <>
      <div className="flex flex-col w-full pt-5">
        <h2 className=" font-bold text-lg">Orders</h2>
        <div className="flex items-center my-2">
          <Menu as="div" className="relative inline-block text-left mr-5 ml-5 z-10">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring   focus:ring-offset-gray-100 focus:ring-orange-500">
               {filterStatus ? filterStatus : "Status"}
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {filters.map((fil) => {
                    return (
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className="px-1 py-2 hover:bg-slate-200 cursor-pointer"
                            onClick={() => {
                              setFilterStatus(fil);
                            }}
                          >
                          {fil}
                          </div>
                        )}
                      </Menu.Item>
                    );
                  })}
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className="px-1 py-2 hover:bg-slate-200 cursor-pointer"
                        onClick={() => {
                          setFilterStatus(false);
                        }}
                      >
                        All
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <div
            onClick={handleModal}
            className="cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus: focus:ring-orange-500"
          >
            + Add Orders
          </div>
        </div>
        <OrderComponent filterStatus={filterStatus} fetchOrders={fetchOrders} />
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
                        <select
                          name="first-name"
                          id="first-name"
                          value={order.Status}
                          onChange={(e) => {
                            setOrder({ ...order, Status: e.target.value });
                          }}
                          autoComplete="given-name"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="Placed">Placed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Refunded">Refunded</option>
                          <option value="Completed">Completed</option>
                        </select>
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
