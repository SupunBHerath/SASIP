import React from 'react';
import AdminHome from './Pages/Admin/AdminHome';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/Admin/AdminLogin';
import TimeTablePage from './Pages/User/TimeTablePage';
import { AuthProvider } from './Config/AuthContext';
import PrivateRoute from './Config/PrivateRoute'; 
import ResetPassword from './Pages/Admin/ResetPassword';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* =====================User====================== */}
          <Route path='/timetable' element={<TimeTablePage />} />
          
          {/* =====================Admin====================== */}
          <Route path='/admin' element={<PrivateRoute element={<AdminHome />} />} /> 
          <Route path='/admin/login' element={<SignIn />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
