import React from "react";
import { useSelector } from "react-redux";
const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product) => {
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
            src={product.ProductImage || "https://picsum.photos/200"}
          ></img>
        </td>
        <td className="px-6 py-4"> {product.ProductName}</td>
        <td className="px-6 py-4">{product.CategoryID}</td>
        <td className="px-6 py-4">{product.Size || 0}</td>
        <td className="px-6 py-4">{product.Type || "General"}</td>
        <td className="px-6 py-4">₹{product.UnitPrice}</td>
        <td className="px-6 py-4">{product.UnitsInStock}</td>
        <td className="px-6 py-4 text-right">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
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
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>{renderList}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductComponent;
