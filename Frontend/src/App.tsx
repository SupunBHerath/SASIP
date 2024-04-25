// import Sasip from './Sasip'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './pages/login'

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
        </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App
