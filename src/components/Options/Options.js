import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getType } from "../../redux/actions/optionsActions";

function Options() {
  const dispatch = useDispatch();
  const [showCategory, setShowCategory] = React.useState(false);
  const [showType, setShowType] = React.useState(false);
  const [showTypeDelete, setShowTypeDelete] = React.useState(false);
  const [showCategoryDelete, setShowCategoryDelete] = React.useState(false);
  const handleCategoryDeleteModal = () => {
    setShowCategoryDelete((val) => !val);
  };
  const handleTypeDeleteModal = () => {
    setShowTypeDelete((val) => !val);
  };

  // For EDIT Modal
  const [showTypeEdit, setShowTypeEdit] = React.useState(false);
  const [showCategoryEdit, setShowCategoryEdit] = React.useState(false);
  const handleCategoryEditModal = () => {
    setShowCategoryEdit((val) => !val);
  }; 
  const handleTypeEditModal = () => {
    setShowTypeEdit((val) => !val);
  };

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const handleCategoryModal = () => {
    setShowCategory(!showCategory);
  };
  const handleTypeModal = () => {
    setShowType(!showType);
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
    fetchCategory();
    fetchType();
  },[]);
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("image", product.image);
    // formData.append("name", product.name);
    // formData.append("price", product.price);
    // formData.append("description", product.description);
    // formData.append("category", product.category);
    // formData.append("type", product.type);
    // formData.append("size", product.size);
    // formData.append("quantity", product.quantity);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/options/category`,
        {name:name},
        {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        }
      );
      console.log(res);
      fetchCategory();
      setName("");
    } catch (ex) {
      console.log(ex);
    }
  };
  const handleTypeSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("image", product.image);
    // formData.append("name", product.name);
    // formData.append("price", product.price);
    // formData.append("description", product.description);
    // formData.append("category", product.category);
    // formData.append("type", product.type);
    // formData.append("size", product.size);
    // formData.append("quantity", product.quantity);

    try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/options/type`,
          {name:name},
          {
            headers: {
              "x-auth-token": JSON.parse(localStorage.getItem("user"))
                .accessToken,
            },
          }
        );
        console.log(res);
        fetchType();
        setName("");
      } catch (ex) {
        console.log(ex);
      }
  };
  // delete 
  const deleteType = async() =>{
    if(typeId){
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/options/delete-type`,
        {id:typeId},
        {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        }
      );
      console.log(res);
      fetchType();
      setTypeId(null);
    } catch (ex) {
      console.log(ex);
    }
  }
  }
  const deleteCategory = async() =>{
    if(categoryId){
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/options/delete-category`,
        {id:categoryId},
        {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        }
      );
      console.log(res);
      fetchCategory();
      setCategoryId(null);
    } catch (ex) {
      console.log(ex);
    }
  }
  }

// For Edit Submit
const handleCategoryEditSubmit = async (e) => {
  e.preventDefault();
  try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/options/category-update`,
        {id:categoryId,name:name},
        {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        }
      );
      console.log(res);
      fetchCategory();
      setName("");
      setCategoryId(0);
    } catch (ex) {
      console.log(ex);
    }
}
const handleTypeEditSubmit = async (e) => {
  e.preventDefault();
  try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/options/type-update`,
        {id:typeId,name:name},
        {
          headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        }
      );
      console.log(res);
      fetchType();
      setName("");
      setTypeId(0);
    } catch (ex) {
      console.log(ex);
    }
}


  const categories = useSelector((state) => state.options.category);
  const renderCategoryList = categories.map((category) => {
    return (
      <tr
        key={category.id}
        className="bg-white border-b  text-gray-900 font-semibold dark:border-gray-200 w-full"
      >
        <th scope="row" className="px-6 py-4 font-medium    whitespace-nowrap">
          {category.id}
        </th>
        {/* <td className="px-6 py-4">
          <img
            className="rounded w-24 h-2w-24"
            src={
              product.Image
                ? `${process.env.REACT_APP_SERVER_URL}/uploads/${product.Image}`
                : "https://picsum.photos/200"
            }
          ></img>
        </td> */}
        <td className="px-6 py-4"> {category.name}</td>
        <td className="px-6 py-4  flex align-middle items-center mt-4  text-center">
          <FaTrash
            onClick={() => {
              setCategoryId(category.id);
              handleCategoryDeleteModal();
            }}
            className="h-6 w-6 text-orange-300 hover:text-orange-400 mx-2 cursor-pointer"
            aria-hidden="true"
          />
           <FaEdit
            onClick={() => {
              setCategoryId(category.id);
              setName(category.name);
              handleCategoryEditModal();
            }}
            className="h-6 w-6 text-orange-300 hover:text-orange-400 mx-2 cursor-pointer"
            aria-hidden="true"
          />
        </td>
      </tr>
    );
  });
  const types = useSelector((state) => state.options.type);
  const renderTypeList = types.map((type) => {
    return (
      <tr
        key={type.id}
        className="bg-white border-b  text-gray-900 font-semibold dark:border-gray-200 w-full"
      >
        <th scope="row" className="px-6 py-4 font-medium    whitespace-nowrap">
          {type.id}
        </th>
        {/* <td className="px-6 py-4">
          <img
            className="rounded w-24 h-2w-24"
            src={
              product.Image
                ? `${process.env.REACT_APP_SERVER_URL}/uploads/${product.Image}`
                : "https://picsum.photos/200"
            }
          ></img>
        </td> */}
        <td className="px-6 py-4"> {type.name}</td>
        <td className="px-6 py-4  flex align-middle items-center mt-4  text-center">
          <FaTrash
            onClick={() => {
              setTypeId(type.id);
              handleTypeDeleteModal();
            }}
            className="h-6 w-6 text-orange-300 hover:text-orange-400 mx-2 cursor-pointer"
            aria-hidden="true"
          />
               <FaEdit
            onClick={() => {
              setTypeId(type.id);
              setName(type.name);
              handleTypeEditModal();

            }}
            className="h-6 w-6 text-orange-300 hover:text-orange-400 mx-2 cursor-pointer"
            aria-hidden="true"
          />
        </td>
      </tr>
    );
  });
  return (
    <>
      <div className="flex  w-full">
        <div className="flex flex-col w-full pt-5">
          <h2 className=" font-bold text-lg">Category</h2>
          <div className="flex items-center my-2">
            <div
              onClick={handleCategoryModal}
              className="cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus: focus:ring-orange-500"
            >
              + Add Category
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 dark:text-gray-500">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Actions
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>{renderCategoryList}</tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col w-full pt-5">
          <h2 className=" font-bold text-lg">Type</h2>
          <div className="flex items-center my-2">
            <div
              onClick={handleTypeModal}
              className="cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus: focus:ring-orange-500"
            >
              + Add Type
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 dark:text-gray-500">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Actions
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>{renderTypeList}</tbody>
            </table>
          </div>
        </div>
      </div>

      <>
        <Modal show={showCategory} onHide={handleCategoryModal}>
          <Modal.Header className="font-bold" closeButton>
            Add Category
          </Modal.Header>

          <div className=" ">
            <div className=" grid-cols-3   md:gap-6">
              <div className="  md:col-span-3">
                <form onSubmit={handleCategorySubmit} method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="  bg-white px-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-500"
                          >
                            Category Name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                              value={name}
                              onChange={(e) => {
                                setName( e.target.value);
                              }}
                            autoComplete="given-name"
                            className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        onClick={handleCategoryModal}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus: focus:ring-orange-500"
                      >
                        Add Category
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
        <Modal show={showType} onHide={handleTypeModal}>
          <Modal.Header className="font-bold" closeButton>
            Add Type
          </Modal.Header>

          <div className=" ">
            <div className=" grid-cols-3   md:gap-6">
              <div className="  md:col-span-3">
                <form onSubmit={handleTypeSubmit} method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="  bg-white px-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-500"
                          >
                            Type Name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            autoComplete="given-name"
                            className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        onClick={handleTypeModal}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus: focus:ring-orange-500"
                      >
                        Add Type
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
        {/* Category Delete Modal */}
        <Modal show={showCategoryDelete} onHide={handleCategoryDeleteModal}>
        <Modal.Header className="font-bold" closeButton>
          Delete Category
        </Modal.Header>

        <div className=" p-3">
          <p>
            Are you sure you want to delete this category ?
          </p>
          <div className="flex w-full ">
            <div
              onClick={() => {
                deleteCategory();
                handleCategoryDeleteModal();
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
        {/* Type Delete Modal */}
        <Modal show={showTypeDelete} onHide={handleTypeDeleteModal}>
        <Modal.Header className="font-bold" closeButton>
          Delete Type
        </Modal.Header>

        <div className=" p-3">
          <p>
            Are you sure you want to delete this type ?
          </p>
          <div className="flex w-full ">
            <div
              onClick={() => {
                deleteType();
                handleTypeDeleteModal();
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
      {/* For Edit  */}
      <Modal show={showCategoryEdit} onHide={handleCategoryEditModal}>
          <Modal.Header className="font-bold" closeButton>
            Update Category
          </Modal.Header>

          <div className=" ">
            <div className=" grid-cols-3   md:gap-6">
              <div className="  md:col-span-3">
                <form onSubmit={handleCategoryEditSubmit} method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="  bg-white px-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-500"
                          >
                            Category Name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                              value={name}
                              onChange={(e) => {
                                setName( e.target.value);
                              }}
                            autoComplete="given-name"
                            className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        onClick={handleCategoryEditModal}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus: focus:ring-orange-500"
                      >
                        Update Category
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
        <Modal show={showTypeEdit} onHide={handleCategoryEditModal}>
          <Modal.Header className="font-bold" closeButton>
            Update Type
          </Modal.Header>

          <div className=" ">
            <div className=" grid-cols-3   md:gap-6">
              <div className="  md:col-span-3">
                <form onSubmit={handleTypeEditSubmit} method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="  bg-white px-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-500"
                          >
                            Type Name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                              value={name}
                              onChange={(e) => {
                                setName( e.target.value);
                              }}
                            autoComplete="given-name"
                            className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        onClick={handleTypeEditModal}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus: focus:ring-orange-500"
                      >
                        Update Type
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </>
    </>
  );
}

export default Options;
