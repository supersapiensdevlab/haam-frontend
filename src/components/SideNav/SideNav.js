import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import ProductListing from "../Product/ProductListing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerListing from "../Customer/CustomerListing";
import { Link } from "react-router-dom";
import Home from '../../icons/Home.svg';
import User from '../../icons/User.svg';
import Box from '../../icons/Box.svg';
import Cog from '../../icons/Cog.svg';
import Options from '../../icons/Options.png';
const SideNav = () => {
  return (
    <>
      <div className="w-20 shadow-md h-screen   py-6">
        <Link
          className="text-black 2xl:text-xl lg:text-md text-bold dark:text-white  "
          id="inventory"
          to="/dashboard/products"
        >
          <div className=" flex">
            <div className="w-1.5 bg-orange-500 rounded-r-3xl my-2"></div>
            <img
              src={Home}
              alt="home"
              className="h-8 w-8 mx-auto my-4"
            ></img>
          </div>
        </Link>
        <Link
          className="text-black 2xl:text-xl lg:text-md text-bold dark:text-white  "
          id="customer"
          to="/dashboard/customers"
        >
          <div className=" flex">
            <div className="w-1.5 bg-orange-500 rounded-r-3xl my-2 hidden"></div>
            <img
              src={User}
              alt="home"
              className="h-8 w-8 mx-auto my-4"
            ></img>
          </div>
        </Link>
        <Link
          className="text-black 2xl:text-xl lg:text-md text-bold dark:text-white  "
          id="customer"
          to="/dashboard/options"
        >
          <div className=" flex">
            <div className="w-1.5 bg-orange-500 rounded-r-3xl my-2 hidden"></div>
            <img
              src={Options}
              alt="home"
              className="h-8 w-8 mx-auto my-4"
            ></img>
          </div>
        </Link>
        <img
          src={Box}
          alt="box"
          className="h-8 w-8 mx-auto my-4"
        ></img>
        <img
          src={Cog}
          alt="cog"
          className="h-8 w-8 mx-auto my-4"
        ></img>
      </div>
    </>
  );
};
export default SideNav;
