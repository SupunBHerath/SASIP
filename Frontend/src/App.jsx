import React from "react";
//import AdminHome from "./Pages/Admin/AdminHome";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import {BrowserRouter, Routes, Route} from "react-router-dom";
// import SignIn from '"./Pages/Admin/AdminLogin"';
// import TimeTablePage from "./Pages/User/TimeTablePage";
import Team from "./Pages/team/Team";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* =====================Admin====================== */}

          {/* <Route path="/timetable" element={<TimeTablePage />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/login" element={<SignIn />} /> */}
          <Route path="/teachers" element={<Team />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
