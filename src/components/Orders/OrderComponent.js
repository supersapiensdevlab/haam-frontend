import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/actions/productActions";
import OrderRow from "./OrderRow";

function OrderComponent({ fetchOrders, filterStatus }) {
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/products`)
      .catch((err) => console.log(err));
    dispatch(setProducts(response.data));
  };
  const categories = useSelector((state) => state.options.category);
  const types = useSelector((state) => state.options.type);
  const products = useSelector((state) => state.allProducts.products);
  const orders = useSelector((state) => state.orders.orders);
  const [currentOrder, setCurrentOrder] = useState({
    CustomerID: "",
    OrderDate: 0,
    RequiredDate: 0,
    ShippedDate: 0,
    Comment: "",
    Status: "Placed",
    ProductID: "",
    QuantityOrdered: 1,
  });

  // for delete
  // For Delete Modal
  const [showDelete, setShowDelete] = React.useState(false);
  const handleDeleteModal = () => {
    setShowDelete((val) => !val);
  };
  const deleteProduct = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/delete-order`,
        currentOrder,
        {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        }
      );
      await fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  // For Update
  const [show, setShow] = useState(false);
  const handleModal = () => {
    setShow((v) => !v);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/update-order`,
        currentOrder,
        {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        }
      );
      await fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const renderList = orders.map((order) => {
    const product = products.find((pr) => pr.ProductID == order.ProductID);
    if(filterStatus){
      if(filterStatus != order.Status){
        return null;
      }
    }
    if (product) {
      let catname = categories.find((c) => c.id == product.CategoryID);
      let typename = types.find((t) => t.id == product.Type);
      return (
        <OrderRow
          handleModal={handleModal}
          handleDeleteModal={handleDeleteModal}
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
          product={product}
          catname={catname}
          typename={typename}
          key={order.OrderID}
          order={order}
        />
      );
    } else {
      return null;
    }
  });

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 dark:text-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3 cursor-pointer">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Photo
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer">
                Name
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer">
                Category
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer">
                Size
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer">
                Type
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer">
                Price
              </th>

              <th scope="col" className="px-6 py-3 cursor-pointer">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Actions
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>{renderList}</tbody>
        </table>
      </div>

      {/* Delete Modal */}
      <Modal show={showDelete} onHide={handleDeleteModal}>
        <Modal.Header className="font-bold" closeButton>
          Delete Order
        </Modal.Header>

        <div className=" p-3">
          <p>Are you sure you want to delete order?</p>
          <div className="flex w-full ">
            <div
              onClick={() => {
                deleteProduct();
                handleDeleteModal();
              }}
              className="button bg-orange-400 hover:bg-orange-500 rounded px-2 mx-2 text-white cursor-pointer"
            >
              Yes
            </div>
            <div className="button bg-blue-100 hover:bg-blue-200 rounded px-2 mx-2 cursor-pointer">
              No
            </div>
          </div>
        </div>
      </Modal>

      {/* Update modal */}
      <Modal show={show} onHide={handleModal}>
        <Modal.Header className="font-bold" closeButton>
          Update Order
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
                          value={currentOrder.ProductID}
                          onChange={(e) => {
                            setCurrentOrder({
                              ...currentOrder,
                              ProductID: e.target.value,
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
                          Customer ID
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={currentOrder.CustomerID}
                          onChange={(e) => {
                            setCurrentOrder({
                              ...currentOrder,
                              CustomerID: e.target.value,
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
                          Order Date
                        </label>
                        <input
                          type="date"
                          name="first-name"
                          id="first-name"
                          value={new Date(currentOrder.OrderDate)
                            .toISOString()
                            .substr(0, 10)}
                          onChange={(e) => {
                            setCurrentOrder({
                              ...currentOrder,
                              OrderDate: e.target.value,
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
                          Required Date
                        </label>
                        <input
                          type="date"
                          name="first-name"
                          id="first-name"
                          value={new Date(currentOrder.RequiredDate)
                            .toISOString()
                            .substr(0, 10)}
                          onChange={(e) => {
                            setCurrentOrder({
                              ...currentOrder,
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
                          value={new Date(currentOrder.ShippedDate)
                            .toISOString()
                            .substr(0, 10)}
                          onChange={(e) => {
                            setCurrentOrder({
                              ...currentOrder,
                              ShippedDate: e.target.value,
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
                          Comment
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          value={currentOrder.Comment}
                          onChange={(e) => {
                            setCurrentOrder({
                              ...currentOrder,
                              Comment: e.target.value,
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
                          Status
                        </label>
                        <select
                          name="first-name"
                          id="first-name"
                          value={currentOrder.Status}
                          onChange={(e) => {
                            setCurrentOrder({
                              ...currentOrder,
                              Status: e.target.value,
                            });
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
                          value={currentOrder.QuantityOrdered}
                          onChange={(e) => {
                            setCurrentOrder({
                              ...currentOrder,
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
                      Update Product
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
    </div>
  );
}

export default OrderComponent;
