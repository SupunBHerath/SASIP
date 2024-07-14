import React from 'react'
import AdminHome from './Pages/Admin/AdminHome'
import UserHome from './Pages/User/UserHome'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './Pages/Admin/AdminLogin';
import TimeTablePage from './Pages/User/TimeTablePage';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/* =====================USER====================== */}
          <Route path='/' element={<UserHome/>} />

          {/* =====================Admin====================== */}
         
          <Route path='/timetable' element={<TimeTablePage/>} />
          <Route path='/admin' element={<AdminHome/>} />
          <Route path='/admin/login' element={<SignIn/>} />
       
          
        </Routes>
      </BrowserRouter>
    </div>
  
  )
}
