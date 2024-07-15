// src/App.js

import React from "react";
import AdminHome from "./Pages/Admin/AdminHome";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/Admin/AdminLogin";
import TimeTablePage from "./Pages/User/TimeTablePage";
import { AuthProvider } from "./Config/AuthContext";
import PrivateRoute from "./Config/PrivateRoute";
import Home from "./Comporant/Landing/home/Home";
import ResetPassword from "./Pages/Admin/ResetPassword";
import Team from "./Pages/team/Team";
import Profile from "./Pages/User/LecturerProfile";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* =====================User====================== */}
          <Route path="/" element={<Home />} />
          <Route path="/timetable" element={<TimeTablePage />} />
          <Route path="/teachers" element={<Team />} />
          <Route path="/contact" element={<ContactPage/>} />

        
          {/* =====================Admin====================== */}
          <Route
            path="/admin"
            element={<PrivateRoute element={<AdminHome />} />}
          />{" "}
          {/* Use PrivateRoute for AdminHome */}
          <Route path="/admin/login" element={<SignIn />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
