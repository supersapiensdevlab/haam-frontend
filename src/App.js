import "./App.css";
import LoginPage from "./components/AccessManager/LoginPage";
import Header from "./components/Header";
import { Provider } from "react-redux";
import ProductListing from "./components/Product/ProductListing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import CustomerListing from "./components/Customer/CustomerListing";
import SideNav from "./components/SideNav/SideNav";

function App() {
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
          <Route path="/register" exact element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
