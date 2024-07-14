import React from 'react'
import AdminHome from './Pages/Admin/AdminHome'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './Pages/Admin/AdminLogin';
import TimeTablePage from './Pages/User/TimeTablePage';
import Gallery from './Pages/User/GalleryPage';
import AboutUs from './Pages/User/AboutUsPage';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* =====================Admin====================== */}

          <Route path='/timetable' element={<TimeTablePage/>} />
          <Route path='/admin' element={<AdminHome/>} />
          <Route path='/admin/login' element={<SignIn/>} />
          <Route path='/gallery' element={<Gallery/>} />
          <Route path='/about' element={<AboutUs/>} />


          
        </Routes>
      </BrowserRouter>
    </div>
  
  )
}
