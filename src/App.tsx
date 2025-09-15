import { Routes, Route } from "react-router-dom";
import Homepage from "./component/HomePage";
import FarmerDashboard from "./component/Farmer/FarmerDashboard ";
import DistributorDashboard from "./component/Distributor/DistributorDashboard ";
import ConsumerDashboard from "./component/Consumer/ConsumerDashboard";

import AddProduct from "./component/Navbar/AddProduct";
import Inventory from "./component/Navbar/Inventory";
import Transaction from "./component/Navbar/Transaction";
import Analysis from "./component/Navbar/Analysis";
import Feedback from "./component/Navbar/Feedback";
import {CartPage} from "./component/Navbar/CartPage"; // ✅ Import
import {VerifiedInventory} from "./component/Navbar/VerifiedInventory";

import NavbarPage from "./component/Navbar/NavbarPage"; // ✅ Added Navbar
import "./App.css";

export default function App() {
  return (
    <>
      {/* Navbar always on top */}
      <NavbarPage />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/distributor-dashboard" element={<DistributorDashboard />} />
        <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />

        {/* Navbar pages */}
        <Route path="/cart" element={<CartPage />} />
<Route path="/verified" element={<VerifiedInventory />} />

        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </>
  );
}
