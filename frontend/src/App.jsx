import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import NavbarAdmin from "./components/NavbarAdmin";
import Register from "./components/Register";
import ManageAccount from "./components/ManageAccount";
import ManageEmployees from "./components/ManageEmployees";
import ManageBranch from "./components/ManageBranch";
import ManageType from "./components/ManageType";
import ManagePet from "./components/ManagePet";
import ManageBreeds from "./components/ManageBreeds";
import ChangePassword from "./components/Customer/ChangePassword";
import CustomerProfile from "./components/Customer/CustomerProfile";

import { Routes, Route, useLocation } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Cart from "./components/Cart";
import Order from "./components/Order";
import HistoryOrder from "./components/HistoryOrder";
import OrderDetail from "./components/OrderDetail";
import ProductItem from "./components/ProductItem";
import PetItem from "./components/PetItem";

function App() {
  const [count, setCount] = useState(0);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Navbar />
      <div style={{ paddingTop: "64px" }}>
        {" "}
        {/* Chỗ này là đặt padding-top để tránh bị che bởi Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/" element={<Order />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/changepassowrd" element={<ChangePassword />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/history" element={<HistoryOrder />} />
          <Route path="/orderdetail" element={<OrderDetail />} />
          <Route path="/product/:id" element={<ProductItem />} />
          <Route path="/pet/:id" element={<PetItem />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Routes>
        <Routes>
          <Route
            path="/admin"
            element={<NavbarAdmin content={<ManageAccount />} />}
          />
          <Route
            path="/admin/nhanvien"
            element={<NavbarAdmin content={<ManageEmployees />} />}
          />
          <Route
            path="/admin/chinhanh"
            element={<NavbarAdmin content={<ManageBranch />} />}
          />
          <Route
            path="/admin/loaisp"
            element={<NavbarAdmin content={<ManageType />} />}
          />
          <Route
            path="/admin/loaithucung"
            element={<NavbarAdmin content={<ManagePet />} />}
          />
          <Route
            path="/admin/giong"
            element={<NavbarAdmin content={<ManageBreeds />} />}
          />
        </Routes>
      </div>
    </SnackbarProvider>
  );
}

export default App;
