import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import ProductListing from "../Product/ProductListing";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import CustomerListing from "../Customer/CustomerListing";
import { Link } from "react-router-dom";
import Home from "../../icons/Home.svg";
import User from "../../icons/User.svg";
import Box from "../../icons/Box.svg";
import Cog from "../../icons/Cog.svg";
import Options from "../../icons/Options.png";
import Settings from "../Settings/Settings";
const SideNav = () => {
  const [show, setShow] = React.useState(false);
  const location = useLocation();
  const [active, setActive] = useState("dashboard");

  useEffect(() => {
    setActive(
      location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
    );
  }, [location]);

  return (
    <>
      <div className="w-20 shadow-md h-screen   py-6">
        <NavLink
          className="text-black 2xl:text-xl lg:text-md text-bold dark:text-white no-underline	 "
          id="inventory"
          to="/dashboard/products"
        >
          <div className=" flex">
            {active == "products" && (
              <div className="w-1.5 bg-orange-500 rounded-r-3xl my-2"></div>
            )}
            {active == "products" ? (
              <i
                className={`fa-solid fa-house text-2xl mx-auto my-4 text-orange-500 `}
              ></i>
            ) : (
              <i
                className={`fa-solid fa-house text-2xl mx-auto my-4 text-gray-500 `}
              ></i>
            )}
          </div>
        </NavLink>
        <NavLink
          className="text-black 2xl:text-xl lg:text-md text-bold dark:text-white no-underline	 "
          id="customer"
          to="/dashboard/customers"
        >
          <div className=" flex">
            {active == "customers" && (
              <div className="w-1.5 bg-orange-500 rounded-r-3xl my-2"></div>
            )}
            {active == "customers" ? (
              <i
                className={`fa-solid fa-user text-2xl mx-auto my-4 text-orange-500 `}
              ></i>
            ) : (
              <i
                className={`fa-solid fa-user text-2xl mx-auto my-4 text-gray-500 `}
              ></i>
            )}
          </div>
        </NavLink>
        <NavLink
          className="2xl:text-xl lg:text-md text-bold dark:text-white  no-underline	"
          id="customer"
          to="/dashboard/options"
        >
          <div className=" flex">
            {active == "options" && (
              <div className="w-1.5 bg-orange-500 rounded-r-3xl my-2"></div>
            )}
            {active == "options" ? (
              <i
                className={`fa-solid fa-sliders text-2xl mx-auto my-4 text-orange-500 `}
              ></i>
            ) : (
              <i
                className={`fa-solid fa-sliders text-2xl mx-auto my-4 text-gray-500 `}
              ></i>
            )}
          </div>
        </NavLink>
        <NavLink
          className="text-black 2xl:text-xl lg:text-md text-bold dark:text-white  no-underline	"
          id="customer"
          to="/dashboard/orders"
        >
          <div className=" flex">
            {active == "orders" && (
              <div className="w-1.5 bg-orange-500 rounded-r-3xl my-2"></div>
            )}
            {active == "orders" ? (
              <i
                className={`fa-solid fa-box text-2xl mx-auto my-4 text-orange-500 `}
              ></i>
            ) : (
              <i
                className={`fa-solid fa-box text-2xl mx-auto my-4 text-gray-500 `}
              ></i>
            )}
          </div>
        </NavLink>
        <img
          onClick={() => setShow(true)}
          src={Cog}
          alt="cog"
          className="h-8 w-8 mx-auto my-4 cursor-pointer"
        ></img>
      </div>
      <Settings show={show} setShow={setShow}></Settings>
    </>
  );
};
export default SideNav;
