// import Sasip from './Sasip'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './pages/login'

import Navibar from './components/Navibar/Navibar'

const App = () => {
  return (
    <div>
      <Navibar/>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/navi' element={}/> */}
          <Route path='/login' element={<LoginForm/>}/>
        </Routes>
      </BrowserRouter>
      {/* <Sasip/> */}
    </div>
  )
}

export default App
