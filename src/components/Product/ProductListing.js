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

const ProductListing = () => {
  const products = useSelector((state) => state);
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "United States",
    type: "United States",
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

  useEffect(() => {
    fetchProducts();
  }, []);

  // After add product Click 
  const handleSubmit =async (e) =>{
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
        formData,{headers:{'x-auth-token':JSON.parse(localStorage.getItem('user')).accessToken}}
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
    console.log(product);
  }
  return (
    <>
      <div className="flex flex-col w-full pt-5">
        <h2 className=" font-bold text-lg">Inventory</h2>
        <div className="flex items-center my-2">
          <DropDown /> <DropDown /> <DropDown /> <DropDown />{" "}
          <div
            onClick={handleModal}
            className="cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus: focus:ring-orange-500"
          >
            + Add Item
          </div>
        </div>
        <ProductComponent />
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
                                  onChange={(e)=>{setProduct({...product,image:e.target.files[0]})}}
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
                            onChange={(e)=>{setProduct({...product,name:e.target.value})}}
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
                            onChange={(e)=>{setProduct({...product,category:e.target.value})}}
                            autoComplete="country-name"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          >
                            <option selected value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="Mexico">Mexico</option>
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
                            onChange={(e)=>{setProduct({...product,type:e.target.value})}}
                            name="country"
                            autoComplete="country-name"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          >
                           <option selected value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="Mexico">Mexico</option>
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
                            onChange={(e)=>{setProduct({...product,price:e.target.value})}}
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
                            onChange={(e)=>{setProduct({...product,size:e.target.value})}}
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
                            onChange={(e)=>{setProduct({...product,quantity:e.target.value})}}
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
                              onChange={(e)=>{setProduct({...product,description:e.target.value})}}
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
