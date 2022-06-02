import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DropDown from "../DropDown/DropDown";
import { setCustomers } from "../../redux/actions/customerActions";
import CustomerComponent from "./CustomerComponent";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { setUser } from "../../redux/actions/userActions";
import APIService from "../services/post.service";

const CustomerListing = () => {
  const customers = useSelector((state) => state);
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const [user, _setUser] = useState({});

  const handleModal = () => {
    setShow(!show);
    console.log("Modal Visibile ->", show);
  };

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, Content-Length, X-Requested-With",
    },
  });

  const registeruser = async (user) => {
    const response = await api.post("/register", user);
    console.log(response.data);
    fetchCustomers();
  };

  const fetchCustomers = async () => {
    APIService.fetchCustomers().then((response) => {
      dispatch(setCustomers(response.data));
    });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full pt-5">
        <h2 className=" font-bold text-lg">Customers</h2>
        <div className="flex items-center my-2">
          <DropDown /> <DropDown /> <DropDown /> <DropDown />{" "}
          <div
            onClick={handleModal}
            className="cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            + Add Customer
          </div>
        </div>

        <CustomerComponent />
      </div>

      <>
        <Modal show={show} onHide={handleModal}>
          <Modal.Header className="font-bold" closeButton>
            Add Customer
          </Modal.Header>

          <div className=" ">
            <div className=" grid-cols-3 md:gap-6">
              <div className="  md:col-span-3">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="  bg-white px-6">
                    <div className="my-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Photo
                      </label>
                      <div className="mt-1 flex items-center">
                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <button
                          type="button"
                          className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6  ">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-500"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="given-name"
                          onChange={(e) =>
                            _setUser({ ...user, name: e.target.value })
                          }
                          placeholder="User Name"
                          value={user.name}
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-500"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          onChange={(e) =>
                            _setUser({ ...user, email: e.target.value })
                          }
                          placeholder="Enter customer email"
                          value={user.email}
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-500"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          maxLength={10}
                          minLength={10}
                          autoComplete="phone"
                          onChange={(e) =>
                            _setUser({ ...user, phone: e.target.value })
                          }
                          placeholder="Mobile Number"
                          value={user.phone}
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-500"
                        >
                          New Password
                        </label>
                        <input
                          type="text"
                          name="password"
                          id="password"
                          autoComplete="password"
                          onChange={(e) =>
                            _setUser({ ...user, password: e.target.value })
                          }
                          placeholder="Password"
                          value={user.password}
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-500"
                        >
                          Confirm Password
                        </label>
                        <input
                          id="confirm"
                          name="confirm"
                          type="password"
                          autoComplete="current-password"
                          required
                          onChange={(e) =>
                            _setUser({ ...user, confirm: e.target.value })
                          }
                          value={user.confirm}
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          placeholder="Confirm Password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      onClick={() => {
                        handleModal();
                        registeruser(user);
                      }}
                      className="cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus: focus:ring-orange-500"
                    >
                      Add Customer
                    </button>
                  </div>
                </div>
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
    </>
  );
};

export default CustomerListing;
