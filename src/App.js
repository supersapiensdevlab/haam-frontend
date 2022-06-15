import "./App.css";
import LoginPage from "./components/AccessManager/LoginPage";
import RegisterPage from "./components/AccessManager/RegisterPage";
import AuthService from "./components/services/auth.service";
import Header from "./components/Header";
import { Provider, useDispatch } from "react-redux";
import ProductListing from "./components/Product/ProductListing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import CustomerListing from "./components/Customer/CustomerListing";
import SideNav from "./components/SideNav/SideNav";
import { useState, useEffect } from "react";
import Options from "./components/Options/Options";
import Orders from "./components/Orders/Orders";
import { setUser } from "./redux/actions/userActions";
import axios from "axios";

function App() {
  //const user = JSON.parse(window.localStorage.getItem('user'));
  const [currentUser, setCurrentUser] = useState(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
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
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route
              path="productlisting"
              exact
              element={
                <>
                  <Header />
                  <ProductListing />
                </>
              }
            ></Route>

            <Route path="dashboard" element={<Dashboard />}>
              <Route path="customers" element={<CustomerListing />}></Route>
              <Route path="products" element={<ProductListing />}></Route>
              <Route path="options" element={<Options />}></Route>
              <Route path="orders" element={<Orders />}></Route>
            </Route>

            <Route path="register" exact element={<RegisterPage />} />

            <Route path="login" exact element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
