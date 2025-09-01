import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Header } from "./components/Layout/Header";
import { FarmerPortal } from "./components/Farmer/FarmerPortal";
import { DistributorPortal } from "./components/Distributor/DistributorPortal";
import { ConsumerPortal } from "./components/Consumer/ConsumerPortal";
import { Login } from "./components/Auth/Login";
import  Home  from "./components/Layout/Home";
import  Profile  from "./components/Auth/Profile";
import "./App.css";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header stays constant across pages */}
        <Header />

        <main className="py-8">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Profile */}
            <Route path="/profile" element={<Profile />} />

            {/* Portals (role-based) */}
            <Route path="/farmer" element={<FarmerPortal />} />
            <Route path="/distributor" element={<DistributorPortal />} />
            <Route path="/consumer" element={<ConsumerPortal />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
