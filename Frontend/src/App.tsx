import Sasip from './Sasip'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './pages/login'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginForm/>}/>
        </Routes>
      </BrowserRouter>
      <Sasip/>
    </div>
  )
}

export default App
