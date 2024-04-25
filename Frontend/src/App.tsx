
import { useEffect } from "react";
import Sasip from "./Sasip";

import LoginForm from "./pages/login";
import { Landing } from "./pages/Landing";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "aos/dist/aos.js";
import "aos/dist/aos.css";
import AOS from "aos";

// import Sasip from './Sasip'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './pages/login'


import Navibar from './components/Navibar/Navibar'
import Landing from './pages/Landing/landing'

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <div>
      {/* <Navibar/> */}
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Sasip />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<Landing />} />
        </Routes>
      </BrowserRouter>

          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<LoginForm/>}/>
        </Routes>
      </BrowserRouter>
     

    </div>
  );
};

export default App;
