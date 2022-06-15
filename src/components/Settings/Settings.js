import { Switch } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/userActions";

function Settings({ show, setShow }) {
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);
  const [enabled2, setEnabled2] = useState(false);
  const [myUser, setMyUser] = useState({});
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user) {
      setMyUser(user);
    }
  }, [user, show]);
  const handleSubmit = async () => {
    if (
      myUser.Email != user.Email ||
      myUser.Password != user.Password ||
      myUser.Name != user.Name ||
      myUser.Phone != user.Phone
    ) {
      if (myUser.Password == user.Password) {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/update-customer`,
          { email:myUser.Email, name:myUser.Name,phone:myUser.Phone},
          {
            headers: {
              "x-auth-token": JSON.parse(localStorage.getItem("user"))
                .accessToken,
            },
          }
        );
      }else{
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/update-customer`,
          { email:myUser.Email, name:myUser.Name,phone:myUser.Phone,password:myUser.Password},
          {
            headers: {
              "x-auth-token": JSON.parse(localStorage.getItem("user"))
                .accessToken,
            },
          }
        );
      }
      axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/getcurrentuser`, {
        headers: {
          "x-auth-token": JSON.parse(localStorage.getItem("user"))
            .accessToken,
        },
      }).then((data) => {
        console.log(data)
        dispatch(setUser(data.data));
      }).catch((err) => console.log(err));
      setShow(false);

    }
  };
  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header className="font-bold text-lg" closeButton>
        Settings
      </Modal.Header>
      <Modal.Body>
        <div className="px-20">
          <div>
            <div className="pb-2 text-md font-bold text-gray-500">
              Profile Settings
            </div>
            <div className="flex justify-evenly">
              <div className=" grow mx-2 my-2 border-2 relative border-gray-200 rounded-lg">
                <label className="text-black absolute  -top-3 px-1 bg-white left-5 font-semibold text-xs">
                  Full Name
                </label>
                <div className="grow flex items-center ">
                  <i class="fa-solid fa-user text-xl pl-2 text-gray-200"></i>
                  <input
                    value={myUser.Name}
                    onChange={(e) => {
                      setMyUser({
                        ...myUser,
                        Name: e.target.value,
                      });
                    }}
                    className="border-transparent focus:border-transparent focus:ring-0 outline-none grow border-none text-sm"
                    type="text"
                  />
                </div>
              </div>
              <div className="grow mx-2 my-2 border-2 relative border-gray-200 rounded-lg">
                <label className="text-black absolute  -top-3 px-1 bg-white left-5 font-semibold text-xs">
                  Email Address
                </label>
                <div className="grow flex items-center  ">
                  <i class="fa-solid fa-envelope text-xl pl-2 text-gray-200"></i>
                  <input
                    value={myUser.Email}
                    onChange={(e) => {
                      setMyUser({
                        ...myUser,
                        Email: e.target.value,
                      });
                    }}
                    className="border-transparent focus:border-transparent focus:ring-0 outline-none grow border-none text-sm "
                    type="email"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-evenly">
              <div className="grow mx-2 my-2 border-2 relative border-gray-200 rounded-lg">
                <label className="text-black absolute  -top-3 px-1 bg-white left-5 font-semibold text-xs">
                  Phone Number
                </label>
                <div className="grow flex items-center ">
                  <i class="fa-solid fa-phone text-xl pl-2 text-gray-200"></i>
                  <input
                    value={myUser.Phone}
                    onChange={(e) => {
                      setMyUser({
                        ...myUser,
                        Phone: e.target.value,
                      });
                    }}
                    className="border-transparent focus:border-transparent focus:ring-0 outline-none grow border-none text-sm"
                    type="tel"
                  />
                </div>
              </div>
              <div className="grow mx-2 my-2 border-2 relative border-gray-200 rounded-lg">
                <label className="text-black absolute  -top-3 px-1 bg-white left-5 font-semibold text-xs">
                  Password
                </label>
                <div className="grow flex items-center ">
                  <i class="fa-solid fa-lock text-xl pl-2 text-gray-200"></i>
                  <input
                    value={myUser.Password}
                    onChange={(e) => {
                      setMyUser({
                        ...myUser,
                        Password: e.target.value,
                      });
                    }}
                    className="border-transparent focus:border-transparent focus:ring-0 outline-none grow border-none text-sm"
                    type="password"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <div className="mt-1 text-md font-bold text-gray-500">
              Notifications
            </div>
            <div className="mt-3 flex justify-evenly">
              <div className="flex items-center border px-3 py-2 border-gray-200 rounded-lg">
                <i class="fa-solid fa-bell text-xl pr-2 text-gray-200"></i>
                <div className="pl-1 pr-4">
                  <div className="text-sm font-bold text-black">
                    Notifications
                  </div>
                  <div className="text-xs text-gray-500">
                    You will receive daily updates
                  </div>
                </div>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${
                    enabled ? "bg-orange-500" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable notifications</span>
                  <span
                    className={`${
                      enabled ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white`}
                  />
                </Switch>
              </div>
              <div className="flex items-center border px-3 py-2 border-gray-200 rounded-lg">
                <i class="fa-solid fa-bell text-xl pr-2 text-gray-200"></i>
                <div className="pl-1 pr-4">
                  <div className="text-sm font-bold text-black">
                    Promotional Notifications
                  </div>
                  <div className="text-xs text-gray-500">
                    Get notified when promotions
                  </div>
                </div>
                <Switch
                  checked={enabled2}
                  onChange={setEnabled2}
                  className={`${
                    enabled2 ? "bg-orange-500" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable notifications</span>
                  <span
                    className={`${
                      enabled2 ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white`}
                  />
                </Switch>
              </div>
            </div>
          </div>

          {/* More */}
          <div>
            <div className="mt-3 text-md font-bold text-gray-500">More</div>
            <div className="mt-3 flex justify-evenly">
              <div className=" mx-2 grow flex items-center border px-3 py-2 border-gray-200 rounded-lg">
                <i class="fa-solid fa-circle-exclamation text-xl pr-2 text-gray-200"></i>
                <div className="grow pl-1 pr-4">
                  <div className="text-sm font-bold text-black">About Us</div>
                  <div className="text-xs text-gray-500">
                    Check About Us Info
                  </div>
                </div>
                <i class="fa-solid fa-angle-right text-xl text-blue-500"></i>
              </div>
              <div className="mx-2  grow flex items-center border px-3 py-2 border-gray-200 rounded-lg">
                <i class="fa-solid fa-flag text-xl pr-2 text-gray-200"></i>
                <div className="grow pl-1 pr-4">
                  <div className="text-sm font-bold text-black">FAQ</div>
                  <div className="text-xs text-gray-500">
                    Frequently Asked Questions
                  </div>
                </div>
                <i class="fa-solid fa-angle-right text-xl text-blue-500"></i>
              </div>
            </div>
            <div className="my-2 flex justify-evenly">
              <div className="mx-2  grow flex items-center border px-3 py-2 border-gray-200 rounded-lg">
                <i class="fa-solid fa-lock text-xl pr-2 text-gray-200"></i>
                <div className="grow pl-1 pr-4">
                  <div className="text-sm font-bold text-black">
                    Privacy Policy
                  </div>
                  <div className="text-xs text-gray-500">
                    Check Privacy Policy
                  </div>
                </div>
                <i class="fa-solid fa-angle-right text-xl text-blue-500"></i>
              </div>
              <div className="mx-2 grow flex items-center border px-3 py-2 border-gray-200 rounded-lg">
                <i class="fa-solid fa-file-lines text-xl pr-2 text-gray-200"></i>
                <div className="grow pl-1 pr-4">
                  <div className="text-sm font-bold text-black">
                    Terms & conditions
                  </div>
                  <div className="text-xs text-gray-500">
                    Check Terms & Conditions
                  </div>
                </div>
                <i class="fa-solid fa-angle-right text-xl text-blue-500"></i>
              </div>
            </div>
          </div>
          {/* Change Setting button */}
          <div className="flex justify-end my-3">
            <button
              onClick={handleSubmit}
              className="bg-orange-400 hover:bg-orange-500 rounded-lg text-white px-16 font-semibold text-sm py-2"
            >
              Change Settings
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Settings;
