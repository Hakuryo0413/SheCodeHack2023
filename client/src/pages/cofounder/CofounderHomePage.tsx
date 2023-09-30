import React from "react";
import Sidenav from "../../components/Cofounder/Side-nav/SdeNav";
import { Routes, Route } from "react-router-dom";
import { NavRoutes } from "../../context/NavRoutes";
import AllJobsCofounder from "../../components/Cofounder/Cofounder/AllJobsCofounder";
import Dashboard from "../../components/Cofounder/Cofounder/Dashboard";
import CofounderHeaderWithNav from "../../components/Header/CofounderHeaderWithNav";
import CofounderProfile from "../../components/Cofounder/Profile/CofounderProfile";
import CofounderEditProfile from "../../components/Cofounder/Profile/CofounderEditProfile";
import CofounderMessenger from "../messenger/CofounderMessenger";
import Applications from "../../components/Cofounder/Cofounder/Applications";

function CofounderHomePage() {
  return (
    <div className="flex">
      <div className="w-1/5">
        <Sidenav routes={NavRoutes} />
      </div>
      <div className="w-4/5 pl-6 pr-6">
        <div className="relative mx-auto flex items-center text-blue-gray-900 pb-10 pt-6">
          <CofounderHeaderWithNav />
        </div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/all-jobs" element={<AllJobsCofounder />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/profile" element={<CofounderProfile />} />
          <Route path="/edit-profile" element={<CofounderEditProfile />} />
          <Route path="/messenger" element={<CofounderMessenger />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default CofounderHomePage;
