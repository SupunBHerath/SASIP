import React, { useEffect, useState } from "react";
import "./HAbout.css";
import Card from "./Card";
import Slider from "react-slick";

function HAbout() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 1,
        },
      },
    ],
  };

  // Check for mobile screen size on component mount and resize
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="justify-content-center d-flex">
      <div className="row w-100 p-5">
        {isSmallScreen ? (
          <Slider {...settings}>
            <div className="col-lg-3 col-md-6 col-sm-6  p-1 p-md-3 mb-3 ">
              <Card
                img="../../../../public/Image/Lecturers/tissaSir.png"
                firstTittle="Tissa Jananayaka"
                isLecturer="true"
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6  p-1 p-md-3 mb-3">
              <Card img="https://s25.postimg.cc/hj4c4qnov/cta-3.png" />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6  p-1 p-md-3 mb-3">
              <Card img="https://s25.postimg.cc/hj4c4qnov/cta-3.png" />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6  p-1 p-md-3 mb-3">
              <Card img="https://s25.postimg.cc/hj4c4qnov/cta-3.png" />
            </div>
          </Slider>
        ) : (
          <>
            <div className="col-lg-3 col-md-6 col-sm-6  p-1 p-md-3 mb-3 ">
              <Card
                img="../../../../public/Image/Lecturers/tissaSir.png"
                firstTittle="Tissa Jananayaka"
                isLecturer="true"
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6  p-1 p-md-3 mb-3">
              <Card img="https://s25.postimg.cc/hj4c4qnov/cta-3.png" />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6  p-1 p-md-3 mb-3">
              <Card img="https://s25.postimg.cc/hj4c4qnov/cta-3.png" />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6  p-1 p-md-3 mb-3">
              <Card img="https://s25.postimg.cc/hj4c4qnov/cta-3.png" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HAbout;
