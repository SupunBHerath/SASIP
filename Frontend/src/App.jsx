import React from 'react'
import AdminHome from './Pages/Admin/AdminHome'

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
