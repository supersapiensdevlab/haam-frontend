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

    </>
  );
};

export default Dashboard;
