import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import LoginSignup from "./auth/Login";
import ClinicRegistration from "./auth/ClinicRegister";
import UserDashboard from "./dashboards/userDashboard";
import Contact from "./pages/Contact";
import ClinicDashboard from "./dashboards/clinicDashboard";

const App = () => {
  return (
    <div>
    
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/clinic-registration" element={<ClinicRegistration />}/>

        {/* Pages */}
        <Route path="/contact" element={<Contact />} />

        {/* Dashboards */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/clinic/dashboard" element={<ClinicDashboard />} />
      </Routes>
    </div>
  );
};

export default App;