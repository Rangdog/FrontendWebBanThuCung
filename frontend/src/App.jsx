import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Cart from "./components/Cart";
import CustomerProfile from "./components/Customer/CustomerProfile";
import ChangePassword from "./components/Customer/ChangePassword";
import Order from "./components/Order";

function App() {
  const [count, setCount] = useState(0);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Navbar />
      <div style={{ paddingTop: "64px" }}>
        {" "}
        {/* Chỗ này là đặt padding-top để tránh bị che bởi Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Order />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/order" element={<Order />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </div>
    </SnackbarProvider>
  );
}

export default App;
