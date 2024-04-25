import React, { useEffect } from 'react'
import Logo from '../../assets/sasip-logo.jpeg'

import LeftImg from './LeftImg'
import './Sideshow.css'
import Rightimg from './RightImg';
const Sideshow = () => {

  return (
    <div>
      
      <div id="carouselExampleDark" className="carousel carousel-dark slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000"  >
      {/* <img src={Logo} className="d-block w-100  " alt="..." style={{height:"640px"}}/> */}
     
    <Rightimg img={Logo} title="Experience the Future of  Quality Online Learning!" desc="abnamnvamn"/>
    </div>
    <div className="carousel-item" data-bs-interval="2000" >
    <LeftImg img={Logo} title="Experience the Future of  Quality Online Learning!" desc="abnamnvamn"/>

    </div>
    <div className="carousel-item" >
    <Rightimg img={Logo} title="Experience the Future of  Quality Online Learning!" desc="abnamnvamn"/>

    </div>
  </div>
  {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button> */}
  {/* <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button> */}
</div>
    </div>
  )
}

export default Sideshow
