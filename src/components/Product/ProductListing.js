import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DropDown from "../DropDown/DropDown";
import { setProducts } from "../../redux/actions/productActions";
import ProductComponent from "./ProductComponent";
import ReactDOM from "react-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Modal, Button } from "react-bootstrap";
import { getCategory, getType } from "../../redux/actions/optionsActions";

const ProductListing = () => {
  const products = useSelector((state) => state);
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "0",
    type: "0",
    size: "",
    quantity: 0,
  });
  const handleModal = () => {
    setShow(!show);
    console.log("Modal Visibile ->", show);
  };

  const fetchProducts = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/products`)
      .catch((err) => console.log(err));
    dispatch(setProducts(response.data));
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

  useEffect(() => {
    fetchProducts();
    fetchCategory();
    fetchType();
  }, []);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  // After add product Click
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", product.image);
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("type", product.type);
    formData.append("size", product.size);
    formData.append("quantity", product.quantity);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/product`,
        formData,
        {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        }
      );
      console.log(res);
      fetchProducts();
    } catch (ex) {
      console.log(ex);
    }
  };
  // For Filters
  const [filterCategory, setFilterCategory] = useState(false);
  const [filterType, setFilterType] = useState(false);
  const [filterPrice, setFilterPrice] = useState(false);
  const categories = useSelector((state) => state.options.category);
  const types = useSelector((state) => state.options.type);
  const [priceranges, setPriceRanges] = useState([
    { start: 1, end: 1000 },
    { start: 1001, end: 5000 },
    { start: 5001, end: 10000 },
    { start: 10001 },
  ]);

  return (
    <>
      <div className="flex flex-col w-full pt-5">
        <h2 className=" font-bold text-lg">Inventory</h2>
        <div className="flex items-center my-2">
          <Menu as="div" className="relative inline-block text-left mr-5 z-10">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring   focus:ring-offset-gray-100 focus:ring-orange-500">
                {filterCategory != false
                  ? categories.find((c) => c.id == filterCategory).name
                  : "Category"}
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
                  {categories.map((category) => {
                    return (
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className="px-1 py-2 hover:bg-slate-200 cursor-pointer"
                            onClick={() => {
                              setFilterCategory(category.id);
                            }}
                          >
                            {category.name}
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
                          setFilterCategory(false);
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
          <Menu as="div" className="relative inline-block text-left mr-5 z-10">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring   focus:ring-offset-gray-100 focus:ring-orange-500">
                {filterType != false
                  ? types.find((ty) => ty.id == filterType).name
                  : "Type"}
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
                  {types &&
                    types.map((type) => {
                      return (
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className="px-1 py-2 hover:bg-slate-200 cursor-pointer"
                              onClick={() => {
                                setFilterType(type.id);
                              }}
                            >
                              {type.name}
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
                          setFilterType(false);
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
          <Menu as="div" className="relative inline-block text-left mr-5 z-10">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring   focus:ring-offset-gray-100 focus:ring-orange-500">
                {filterPrice != false
                  ? `${filterPrice.start} To ${
                      filterPrice.end ? filterPrice.end : "Above"
                    }`
                  : "Price"}
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
                  {priceranges.map((pricerange) => {
                    return (
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className="px-1 py-2 hover:bg-slate-200 cursor-pointer"
                            onClick={() => {
                              setFilterPrice(pricerange);
                            }}
                          >
                            {pricerange.start} To{" "}
                            {pricerange.end ? pricerange.end : "Above"}
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
                          setFilterPrice(false);
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
            + Add Item
          </div>
        </div>
        <ProductComponent
          filterCategory={filterCategory}
          filterType={filterType}
          filterPrice={filterPrice}
        />
      </div>

      <>
        <Modal show={show} onHide={handleModal}>
          <Modal.Header className="font-bold" closeButton>
            Add Product
          </Modal.Header>

          <div className=" ">
            <div className=" grid-cols-3   md:gap-6">
              <div className="  md:col-span-3">
                <form onSubmit={handleSubmit} method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="  bg-white px-6">
                      <div className="  py-5">
                        <label className="block text-sm font-medium text-gray-500">
                          Product Photo
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            {product.image ? (
                              <img
                                className="h-32"
                                src={URL.createObjectURL(product.image)}
                              ></img>
                            ) : (
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}

                            <div className="flex text-sm text-gray-400">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-orange-400 hover:text-orange-500 focus-within:outline-none focus-within:ring-2  focus-within:ring-orange-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={(e) => {
                                    setProduct({
                                      ...product,
                                      image: e.target.files[0],
                                    });
                                  }}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-500"
                          >
                            Product Name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            value={product.name}
                            onChange={(e) => {
                              setProduct({ ...product, name: e.target.value });
                            }}
                            autoComplete="given-name"
                            className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-500"
                          >
                            Category
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={product.category}
                            onChange={(e) => {
                              setProduct({
                                ...product,
                                category: e.target.value,
                              });
                            }}
                            autoComplete="country-name"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          >
                            <option value="0">Select Category</option>
                            {categories.map((category) => {
                              return (
                                <option value={category.id}>
                                  {category.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-500"
                          >
                            Type
                          </label>
                          <select
                            id="country"
                            value={product.type}
                            onChange={(e) => {
                              setProduct({ ...product, type: e.target.value });
                            }}
                            name="country"
                            autoComplete="country-name"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          >
                            <option value="0">Select Type</option>
                            {types.map((ty) => {
                              return <option value={ty.id}>{ty.name}</option>;
                            })}
                          </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-500"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            value={product.price}
                            onChange={(e) => {
                              setProduct({ ...product, price: e.target.value });
                            }}
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-500"
                          >
                            Size
                          </label>
                          <input
                            type="text"
                            value={product.size}
                            onChange={(e) => {
                              setProduct({ ...product, size: e.target.value });
                            }}
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-500"
                          >
                            Quantity
                          </label>
                          <input
                            type="text"
                            value={product.quantity}
                            onChange={(e) => {
                              setProduct({
                                ...product,
                                quantity: e.target.value,
                              });
                            }}
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6  ">
                          <label
                            htmlFor="about"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="about"
                              value={product.description}
                              onChange={(e) => {
                                setProduct({
                                  ...product,
                                  description: e.target.value,
                                });
                              }}
                              name="about"
                              rows={2}
                              className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              placeholder=" "
                              defaultValue={""}
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500 hidden">
                            Brief description for your profile. URLs are
                            hyperlinked.
                          </p>
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
    </>
  );
};

export default ProductListing;
