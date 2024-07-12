import React from 'react'
import AdminHome from './Pages/Admin/AdminHome'

import {BrowserRouter, Routes, Route} from 'react-router-dom';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* =====================Admin====================== */}

          <Route path='/admin' element={<AdminHome/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  
  )
}
