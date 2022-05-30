import "./App.css";
import LoginPage from "./components/AccessManager/LoginPage";
import RegisterPage from "./components/AccessManager/RegisterPage";
import AuthService from "./components/services/auth.service";
import Header from "./components/Header";
import { Provider } from "react-redux";
import ProductListing from "./components/Product/ProductListing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import CustomerListing from "./components/Customer/CustomerListing";
import SideNav from "./components/SideNav/SideNav";
import { useState, useEffect } from "react";

function App() {
  //const user = JSON.parse(window.localStorage.getItem('user'));
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
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
          <Route
            path="/productlisting"
            exact
            element={
              <>
                <Header />
                <ProductListing />
              </>
            }
          ></Route>
        </Routes>

        <Routes>
          <Route path="/dashboard" exact element={<Dashboard />}></Route>
        </Routes>

        <Routes>
          <Route
            path="/customers"
            exact
            element={
              <>
                <Header />
                <div className="flex gap-4">
                  <SideNav />
                  <CustomerListing />
                </div>
              </>
            }
          ></Route>
        </Routes>

        <Routes>
          <Route
            path="/products"
            exact
            element={
              <>
                <Header />
                <div className="flex gap-4">
                  <SideNav />
                  <ProductListing />
                </div>
              </>
            }
          ></Route>
        </Routes>

        <Routes>
          <Route path="/register" exact element={<RegisterPage />} />
        </Routes>

        <Routes>
          <Route path="/login" exact element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
