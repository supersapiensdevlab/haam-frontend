import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import ProductListing from "../Product/ProductListing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerListing from "../Customer/CustomerListing";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Outlet } from "react-router-dom";
import SideNav from "../SideNav/SideNav";
const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header></Header>
      <div className="flex gap-4">
        <SideNav />
        <Outlet></Outlet>
      </div>
      {/* 
          <Route
            path="products"
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
          </Route> */}
    </>
  );
};

export default Dashboard;
