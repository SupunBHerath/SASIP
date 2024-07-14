import React from "react";
import AdminHome from "./Pages/Admin/AdminHome";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/Admin/AdminLogin";
import Profile from "./Pages/User/LecturerProfile";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* =====================Admin====================== */}

          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/login" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
