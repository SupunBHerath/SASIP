import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import color from '../CSS/Color'
import './Navibar.css'
import Logo from '../../assets/sasip-logo.jpeg'

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg " style={{backgroundColor:color.primaryColor}}>
      <div className="container-fluid Navibar  " >
        <img src={Logo} alt="" style={{height:'51px'}} />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse w-100   " id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto  mb-2 mb-lg-0 justify-content-around w-50   ">
            <li className="nav-item">
              <a className="nav-link active text-white  underline-animation" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active text-white underline-animation" aria-current="page" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active text-white underline-animation " aria-current="page" href="#">Time Table</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active text-white  underline-animation" aria-current="page" href="#">Lectures</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active text-white underline-animation " aria-current="page" href="#">Contact us</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <button className="btn text-white  " style={{backgroundColor:color.secondaryColor}} type="submit">LMS Dashboard</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
