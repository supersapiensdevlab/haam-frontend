import React, { useEffect, useState } from "react";

import LoginHook from "./LoginHook";
import LogoutHook from "./LogOutHook";
import { LockClosedIcon } from "@heroicons/react/solid";
import { setUser } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [user, _setUser] = useState({});
  const [isRemembered, setIsRemembered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, Content-Length, X-Requested-With",
    },
  });

  const registeruser = async (user) => {
    const response = await api.post("/register", user);
    navigate("/login");
    //console.log(response.data);
  };

  const handleIsRemembered = (e) => {
    setIsRemembered(e.target.checked);
  };

  return (
    <>
      <div className="  items-center   h-screen flex justify-center w-full bg-gradient-to-br from-orange-500 to-orange-200">
        <div className="shadow-md  bg-white w-max rounded-md ">
          <div className="min-h-full flex items-center justify-center py-6 px-6 sm:px-6 lg:px-8 ">
            <div className="max-w-md w-full space-y-8  ">
              <div>
                <img
                  className="mx-auto w-20 h-20  "
                  src="../../icons/logo.svg"
                  alt="Haam"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Welcome to Haam
                </h2>

                <p
                  href=" "
                  className="font-medium text-orange-500 hover:text-orange-400 text-center"
                >
                  Hello there, sign up to continue!
                </p>
              </div>
              <div>
                <div className="rounded-md shadow-sm -space-y-px my-4">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Full Name
                    </label>
                    <input
                      id="full-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      onChange={(e) =>
                        _setUser({ ...user, name: e.target.value })
                      }
                      value={user.name}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-400 focus:border-orange-400 focus:z-10 sm:text-sm"
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      onChange={(e) =>
                        _setUser({ ...user, email: e.target.value })
                      }
                      value={user.email}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900   focus:outline-none focus:ring-orange-400 focus:border-orange-400 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone-number" className="sr-only">
                      Phone Number
                    </label>
                    <input
                      id="phone-number"
                      name="phone"
                      type="phone"
                      autoComplete="phone"
                      required
                      onChange={(e) =>
                        _setUser({ ...user, phone: e.target.value })
                      }
                      value={user.phone}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900   focus:outline-none focus:ring-orange-400 focus:border-orange-400 focus:z-10 sm:text-sm"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      onChange={(e) =>
                        _setUser({ ...user, password: e.target.value })
                      }
                      value={user.password}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-orange-400 focus:border-orange-400 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Confirm Password
                    </label>
                    <input
                      id="confirm"
                      name="confirm"
                      type="password"
                      autoComplete="current-password"
                      required
                      onChange={(e) =>
                        _setUser({ ...user, confirm: e.target.value })
                      }
                      value={user.confirm}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-400 focus:border-orange-400 focus:z-10 sm:text-sm"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between my-3 hidden">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={isRemembered}
                      onChange={handleIsRemembered}
                      className="h-4 w-4 text-orange-400 focus:ring-orange-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="/forgot-password"
                      rel="noopener noreferrer"
                      className="font-medium text-orange-400 hover:text-orange-400"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      registeruser(user);
                    }}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-orange-400 group-hover:text-orange-500"
                        aria-hidden="true"
                      />
                    </span>
                    Register
                  </button>
                </div>

                <p className="  opacity-80  text-center my-2">
                  or continue with social accounts
                </p>
                <div className="my-3 mx-auto justify-center w-full flex gap-3">
                  <LoginHook />
                  <LogoutHook />
                </div>

                <p className="   text-sm text-center">
                  Already have an account?
                  <span className="text-orange-500 hover:text-orange-400 font-semibold ml-1">
                    <Link to="/login">Sign in</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
