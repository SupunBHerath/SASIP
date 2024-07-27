
import React from 'react'
import AdminHome from './Pages/Admin/AdminHome'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/Admin/AdminLogin';
import TimeTablePage from './Pages/User/TimeTablePage';
import Team from './Pages/team/Team';
import Profile from './Pages/User/LecturerProfile';
import ResetPassword from "./Pages/Admin/ResetPassword";
import { AuthProvider } from './Config/AuthContext';
import GalleryPage from './Pages/User/GalleryPage';
import ContactPage from './Comporant/Landing/contactpage/contactpage';
import AboutPage from './Pages/User/About';
import Home from './Pages/User/Home';
// import About from './Comporant/About/AboutUs';


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* =====================User====================== */}
          <Route path="/" element={<Home/>} />
          <Route path="/timetable/:year/:type" element={<TimeTablePage />} />
          <Route path="/lecturers" element={<Team />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />






          {/* =====================Admin====================== */}

          {/* <Route
            path="/admin"
            element={<PrivateRoute element={<AdminHome />} />}
          />
          />{" "} */}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/login" element={<SignIn />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
