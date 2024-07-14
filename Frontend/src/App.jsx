
import React from 'react';
import AdminHome from './Pages/Admin/AdminHome';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/Admin/AdminLogin';
import TimeTablePage from './Pages/User/TimeTablePage';
import { AuthProvider } from './Config/AuthContext';
import PrivateRoute from './Config/PrivateRoute'; 
import Team from "./Pages/team/Team";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* =====================User====================== */}
          <Route path='/timetable' element={<TimeTablePage />} />
          <Route path="/teachers" element={<Team />} />
        
          {/* =====================Admin====================== */}
          <Route path='/admin' element={<PrivateRoute element={<AdminHome />} />} />  {/* Use PrivateRoute for AdminHome */}
          <Route path='/admin/login' element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
        