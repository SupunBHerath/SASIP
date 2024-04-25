// import Sasip from './Sasip'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './pages/login'
import AdminDashboard from './pages/adminDashboard'
import Navibar from './components/Navibar/Navibar'
import Landing from './pages/Landing/landing'

const App = () => {
  return (
    <div>
      {/* <Navibar/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/admin' element={<AdminDashboard/>}/>
        </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App
