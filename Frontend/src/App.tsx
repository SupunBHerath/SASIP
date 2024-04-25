import { useEffect } from "react";
import Sasip from "./Sasip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login";
import { Landing } from "./pages/Landing";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "aos/dist/aos.js";
import "aos/dist/aos.css";
import AOS from "aos";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sasip />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
