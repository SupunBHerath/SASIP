import React from 'react'
import AdminHome from './Pages/Admin/AdminHome'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './Pages/Admin/AdminLogin';
import TimeTablePage from './Pages/User/TimeTablePage';


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
          <Route path="/profile" element={<Profile />} />
        
          {/* =====================Admin====================== */}

          <Route path='/timetable' element={<TimeTablePage/>} />
          <Route path='/admin' element={<AdminHome/>} />
          <Route path='/admin/login' element={<SignIn/>} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
