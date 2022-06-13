import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";

function OrderRow({ order, product, typename, catname }) {
  const categories = useSelector((state) => state.options.category);
  const types = useSelector((state) => state.options.type);
  const products = useSelector((state) => state.allProducts.products);
  const orders = useSelector((state) => state.orders);

  const [showOrderDetails, setShowOrderDetails] = useState(false);

  return (
    <>
      <tr
        key={product.ProductID}
        className="cursor-pointer bg-white border-b  text-gray-900 font-semibold dark:border-gray-200 w-full"
        onClick={()=>{setShowOrderDetails(!showOrderDetails)}}
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
            //   onClick={() => {
            //     set_Product(product);
            //     handleDeleteModal();
            //   }}
            className="h-6 w-6 text-orange-300 hover:text-orange-400 mx-2 cursor-pointer"
            aria-hidden="true"
          />
          <FaEdit
            //   onClick={() => {
            //     set_Product(product);
            //     handleModal();
            //   }}
            className="h-6 w-6 text-orange-300 hover:text-orange-400 mx-2 cursor-pointer"
            aria-hidden="true"
          />
        </td>
      </tr>
      {showOrderDetails && (
        <tr>
          <td colspan="9">
            <div className="flex flex-wrap w-full px-5 py-2">
              <div className="pr-16">
                <h7 className="text-xs">Name</h7>
                <h6 className="text-black text-md  border-black border-b mt-1 mb-2">
                  {product.ProductName}
                </h6>
              </div>
              <div className="pr-16">
                <h7 className="text-xs">ProductID</h7>
                <h6 className="text-black text-md border-black border-b mt-1 mb-2">
                  {product.ProductID}
                </h6>
              </div>
              <div className="pr-16">
                <h7 className="text-xs">OrderID</h7>
                <h6 className="text-black text-md border-black border-b mt-1 mb-2">
                  {order.OrderID}
                </h6>
              </div>
              <div className="pr-16">
                <h7 className="text-xs">OrderDate</h7>
                <h6 className="text-black text-md border-black border-b mt-1 mb-2">
                  {new Date(order.OrderDate).toLocaleDateString()}
                </h6>
              </div>
              <div className="pr-16">
                <h7 className="text-xs">RequiredDate</h7>
                <h6 className="text-black text-md border-black border-b mt-1 mb-2">
                  {new Date(order.RequiredDate).toLocaleDateString()}
                </h6>
              </div>
              <div className="pr-16">
                <h7 className="text-xs">ShippedDate</h7>
                <h6 className="text-black text-md border-black border-b mt-1 mb-2">
                  {new Date(order.ShippedDate).toLocaleDateString()}
                </h6>
              </div>
              <div className="pr-16">
                <h7 className="text-xs">Comment</h7>
                <h6 className="text-black text-md border-black border-b mt-1 mb-2">
                  {order.Comment}
                </h6>
              </div>
              <div className="pr-16">
                <h7 className="text-xs">Status</h7>
                <h6 className="text-black text-md border-black border-b mt-1 mb-2">
                  {order.Status}
                </h6>
              </div>
              <div className="pr-16">
                <h7 className="text-xs">QuantityOrdered</h7>
                <h6 className="text-black text-md border-black border-b mt-1 mb-2">
                  {order.QuantityOrdered}
                </h6>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default OrderRow;
