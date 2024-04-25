import React, { useEffect } from 'react'
import './Sideshow.css'


const Rightimg = (prop:any) => {

  return (
    <div>
       <div className="container col-xxl-12 px-4 py-5 SideShow  ">
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
    <div className="col-lg-7  " data-aos="fade-right">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 ">{prop.title}</h1>
        {/* <p className="lead">{prop.desc}</p> */}
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          {/* <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
          <button type="button" className="btn btn-outline-secondary btn-lg px-4">Default</button> */}
        </div>
      </div>
      <div className="col-lg-5 col-sm-8   " data-aos="fade-left">
        <img src={prop.img} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="250" height="250" loading="lazy"/>
      </div>

    </div>
  </div>
    </div>
  )
}

export default Rightimg
