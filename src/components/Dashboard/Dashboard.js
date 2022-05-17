import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import ProductListing from "../Product/ProductListing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerListing from "../Customer/CustomerListing";

const Dashboard = () => {
  return (
    <>
      <Header></Header>
      <div className="flex ">
        <Routes>
          <Route
            path="/customers"
            exact
            element={
              <>
                <div className="grid grid-cols-12 w-full">
                  <div className="col-span-12 ">
                    <div className="flex flex-col w-full px-5">
                      <CustomerListing />
                    </div>
                  </div>
                </div>
              </>
            }
          >
            {" "}
          </Route>
        </Routes>

        <Routes>
          <Route
            path="/products"
            exact
            element={
              <>
                <div className="grid grid-cols-12 w-full">
                  <div className="col-span-12 ">
                    <div className="flex flex-col w-full px-5">
                      <ProductListing />
                    </div>
                  </div>
                </div>
              </>
            }
          >
            {" "}
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default Dashboard;
