import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../redux/actions/productActions';
import OrderRow from './OrderRow';

function OrderComponent() {  
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
  
    const renderList = orders.map((order) => {
        const product = products.find((pr) => pr.ProductID == order.ProductID);
        if(product) {
        let catname = categories.find((c) => c.id == product.CategoryID);
        let typename = types.find((t) => t.id == product.Type);
        return(
        <OrderRow product={product} catname={catname} typename={typename} key={order.OrderID} order={order} />
        )
        }else{
            return null;
        }
    });
    return (
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 dark:text-gray-500">
              <tr>
                <th scope="col"  className="px-6 py-3 cursor-pointer">
                  ID
                </th>
                <th scope="col"  className="px-6 py-3">
                  Photo
                </th>
                <th scope="col"  className="px-6 py-3 cursor-pointer">
                  Name
                </th>
                <th scope="col"  className="px-6 py-3 cursor-pointer">
                  Category
                </th>
                <th scope="col"  className="px-6 py-3 cursor-pointer">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  Price
                </th>
  
                <th scope="col"  className="px-6 py-3 cursor-pointer">
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
      </div>
    );
  };


export default OrderComponent