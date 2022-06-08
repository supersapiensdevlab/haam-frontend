import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/actions/productActions";
const ProductComponent = ({ filterPrice, filterType, filterCategory }) => {
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/products`)
      .catch((err) => console.log(err));
    dispatch(setProducts(response.data));
  };

  // For Update Modal

  const [show, setShow] = React.useState(false);
  const [_product, set_Product] = useState({});
  const handleModal = () => {
    setShow(!show);
    console.log("Modal Visibile ->", show);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("_id", _product._id);
      formData.append("Image", _product.Image);
      formData.append("ProductName", _product.ProductName);
      formData.append("CategoryID", _product.CategoryID);
      formData.append("Type", _product.Type);
      formData.append("UnitPrice", _product.UnitPrice);
      formData.append("Size", _product.Size);
      formData.append("QuantityPerUnit", _product.QuantityPerUnit);
      formData.append("Description", _product.Description);
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/product/`,
        formData,
        {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        }
      );
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };
  // For Delete Modal
  const [showDelete, setShowDelete] = React.useState(false);
  const handleDeleteModal = () => {
    setShowDelete((val) => !val);
    console.log("Delete Modal Visibile ->", show);
  };
  const deleteProduct = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/delete-product`,
        _product,
        {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        }
      );
      await fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };
  const categories = useSelector((state) => state.options.category);
  const types = useSelector((state) => state.options.type);
  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product) => {
    if (filterCategory) {
      if (product.CategoryID != filterCategory) {
        return null;
      }
    }
    if (filterType) {
      if (product.Type != filterType) {
        return null;
      }
    }
    if (filterPrice) {
      if (product.UnitPrice < filterPrice.start) {
        return null;
      }

      if (filterPrice.end) {
        if (product.UnitPrice > filterPrice.end) {
          return null;
        }
      }
    }

    let catname = categories.find((c) => c.id == product.CategoryID);
    let typename = types.find((t) => t.id == product.Type);

    return (
      <tr
        key={product.ProductID}
        className="bg-white border-b  text-gray-900 font-semibold dark:border-gray-200 w-full"
      >
        <th scope="row" className="px-6 py-4 font-medium    whitespace-nowrap">
          {product.ProductID}
        </th>
        <td className="px-6 py-4">
          <img
            className="rounded w-24 h-2w-24"
            src={
              product.Image
                ? `${process.env.REACT_APP_SERVER_URL}/uploads/${product.Image}`
                : "https://picsum.photos/200"
            }
          ></img>
        </td>
        <td className="px-6 py-4"> {product.ProductName}</td>
        <td className="px-6 py-4">{catname ? catname.name : "General"}</td>
        <td className="px-6 py-4">{product.Size || 0}</td>
        <td className="px-6 py-4">{typename ? typename.name : "General"}</td>
        <td className="px-6 py-4">₹{product.UnitPrice}</td>
        <td className="px-6 py-4">{product.UnitsInStock}</td>

        <td className="px-6 py-4  flex align-middle items-center mt-4  text-center">
          <FaTrash
            onClick={() => {
              set_Product(product);
              handleDeleteModal();
            }}
            className="h-6 w-6 text-orange-300 hover:text-orange-400 mx-2 cursor-pointer"
            aria-hidden="true"
          />
          <FaEdit
            onClick={() => {
              set_Product(product);
              handleModal();
            }}
            className="h-6 w-6 text-orange-300 hover:text-orange-400 mx-2 cursor-pointer"
            aria-hidden="true"
          />
        </td>
      </tr>
    );
  });

  return (
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
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Size
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>

              <th scope="col" className="px-6 py-3">
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
      {/* For Update Modal */}
      <Modal show={show} onHide={handleModal}>
        <Modal.Header className="font-bold" closeButton>
          Update Product
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
                          {_product && _product.Image ? (
                            <img
                              className="h-32"
                              src={
                                typeof _product.Image == "string"
                                  ? `${process.env.REACT_APP_SERVER_URL}/uploads/${_product.Image}`
                                  : URL.createObjectURL(_product.Image)
                              }
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
                                  set_Product({
                                    ..._product,
                                    Image: e.target.files[0],
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
                          value={_product.ProductName}
                          onChange={(e) => {
                            set_Product({
                              ..._product,
                              ProductName: e.target.value,
                            });
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
                          value={_product.CategoryID}
                          onChange={(e) => {
                            set_Product({
                              ..._product,
                              CategoryID: e.target.value,
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
                          value={_product.Type}
                          onChange={(e) => {
                            set_Product({ ..._product, Type: e.target.value });
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
                          value={_product.UnitPrice}
                          onChange={(e) => {
                            set_Product({
                              ..._product,
                              UnitPrice: e.target.value,
                            });
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
                          value={_product.Size}
                          onChange={(e) => {
                            set_Product({ ..._product, Size: e.target.value });
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
                          value={_product.QuantityPerUnit}
                          onChange={(e) => {
                            set_Product({
                              ..._product,
                              QuantityPerUnit: e.target.value,
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
                            value={_product.Description}
                            onChange={(e) => {
                              set_Product({
                                ..._product,
                                Description: e.target.value,
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
      {/* Delete Modal */}
      <Modal show={showDelete} onHide={handleDeleteModal}>
        <Modal.Header className="font-bold" closeButton>
          Delete Product
        </Modal.Header>

        <div className=" p-3">
          <p>
            Are you sure you want to delete <bold>{_product.name}</bold>?
          </p>
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
    </div>
  );
};

export default ProductComponent;
