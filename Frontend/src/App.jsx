import React from 'react'
import AdminHome from './Pages/Admin/AdminHome'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './Pages/Admin/AdminLogin';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* =====================Admin====================== */}

          <Route path='/admin' element={<AdminHome/>} />
          <Route path='/admin/login' element={<SignIn/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  
  )
}
