import React from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { setCustomers } from "../../redux/actions/customerActions";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from "../Table"; // new
import postService from "../services/post.service";

const CustomerComponent = () => {
  const customers = useSelector((state) => state.allCustomers.customers);
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);

  const [user, _setUser] = useState({});

  const handleModal = () => {
    setShow(!show);
    console.log("Modal Visibile ->", show);
  };

  const handleDeleteModal = () => {
    setShowDelete((val)=>!val);
    console.log("Delete Modal Visibile ->", show);
  };

  // const api = axios.create({
  //   baseURL: "http://localhost:3000/api",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //     "Access-Control-Allow-Headers":
  //       "Content-Type, Authorization, Content-Length, X-Requested-With",
  //   },
  // });

  const updateCustomer = async (user) => {
    postService.updateCustomer(user).then((response) => {
      console.log("Response from updateCustomer ->", response);
      fetchCustomers();
    });
  };

  const deleteCustomer = async (user) => {
    console.log(user);
    postService.deleteCustomer(user).then((response) => {
      if (response) console.log("Deleted, ", user);
      fetchCustomers();
    });
  };

  const fetchCustomers = async () => {
    postService.fetchCustomers().then((response) => {
      dispatch(setCustomers(response.data));
    });
  };

  const renderList = customers.map((customer) => {
    return (
      <tr
        key={customer.CustomerID}
        className="bg-white border-b  text-gray-900 font-semibold dark:border-gray-200 w-full"
      >
        <th scope="row" className="px-6 py-4 font-medium    whitespace-nowrap">
          {customer.CustomerID}
        </th>
        <td className="px-6 py-4">
          <img
            className="rounded w-24 h-2w-24"
            src={customer.ProductImage || "https://picsum.photos/200"}
          ></img>
        </td>
        <td className="px-6 py-4"> {customer.Name}</td>
        <td className="px-6 py-4">{customer.Email}</td>
        <td className="px-6 py-4">{customer.Phone || "-"}</td>
        <td className="px-6 py-4">{customer.RegisteredOn || "-"}</td>

        <td className="px-6 py-4  flex align-middle items-center mt-4  text-center">
          <FaTrash
            onClick={() => {
              _setUser({
                name: customer.Name,
                email: customer.Email,
                phone: customer.Phone,
                customerId: customer.CustomerID,
              });
              handleDeleteModal();
            }}
            className="h-6 w-6 text-orange-300 hover:text-orange-400 mx-2 cursor-pointer"
            aria-hidden="true"
          />
          <FaEdit
            onClick={() => {
              _setUser({
                name: customer.Name,
                email: customer.Email,
                phone: customer.Phone,
                customerId: customer.CustomerID,
              });
              handleModal();
            }}
            className="h-6 w-6 text-orange-300 hover:text-orange-400 mx-2 cursor-pointer"
            aria-hidden="true"
          />
        </td>
      </tr>
    );
  });

  const getData = () => {
    const data = [
      {
        name: "Jane Cooper",
        email: "jane.cooper@example.com",
        title: "Regional Paradigm Technician",
        department: "Optimization",
        status: "Active",
        role: "Admin",
        age: 27,
        imgUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        name: "Cody Fisher",
        email: "cody.fisher@example.com",
        title: "Product Directives Officer",
        department: "Intranet",
        status: "Inactive",
        role: "Owner",
        age: 43,
        imgUrl:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        name: "Esther Howard",
        email: "esther.howard@example.com",
        title: "Forward Response Developer",
        department: "Directives",
        status: "Active",
        role: "Member",
        age: 32,
        imgUrl:
          "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        name: "Jenny Wilson",
        email: "jenny.wilson@example.com",
        title: "Central Security Manager",
        department: "Program",
        status: "Offline",
        role: "Member",
        age: 29,
        imgUrl:
          "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        name: "Kristin Watson",
        email: "kristin.watson@example.com",
        title: "Lean Implementation Liaison",
        department: "Mobility",
        status: "Inactive",
        role: "Admin",
        age: 36,
        imgUrl:
          "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        name: "Cameron Williamson",
        email: "cameron.williamson@example.com",
        title: "Internal Applications Engineer",
        department: "Security",
        status: "Active",
        role: "Member",
        age: 24,
        imgUrl:
          "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
    ];
    return [...data, ...data, ...data];
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: AvatarCell,
        imgAccessor: "imgUrl",
        emailAccessor: "email",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Role",
        accessor: "role",
        Filter: SelectColumnFilter, // new
        filter: "includes",
      },
    ],
    []
  );

  const data = React.useMemo(() => getData(), []);

  return (
    <>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 dark:text-gray-500">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Photo
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  E-Mail
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Registered On
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Actions
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <div className="mt-6">
                <Table columns={columns} data={data} />
              </div> */}
              {renderList}
            </tbody>
          </table>
        </div>
      </div>

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
                      updateCustomer(user);
                    }}
                    className="cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus: focus:ring-orange-500"
                  >
                    Save Changes
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

      <Modal show={showDelete} onHide={handleDeleteModal}>
        <Modal.Header className="font-bold" closeButton>
          Add Customer
        </Modal.Header>

        <div className=" p-3">
          <p>
            Are you sure you want to delete <bold>{user.Name}</bold>?
          </p>
          <div className="flex w-full ">
            <div
              onClick={() => {
                deleteCustomer(user);
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
    </>
  );
};

export default CustomerComponent;
