import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HAbout.css";
import Card from "./Card";
import { HAboutData } from "../../../Data/HAboutData"; 

function HAbout() {
  const [isMobileView, setIsMobileView] = useState(false);

  // Check for mobile screen size on component mount and resize
  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Settings for the react-slick slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000 // Auto play speed in milliseconds (3 seconds)
  };

  return (
    <div>
      <div className="justify-content-center d-flex">
        <div className="row" style={{ width: "100vw" }}>
          {isMobileView ? (
            <Slider {...sliderSettings}>
              {HAboutData.map((item) => (
                <div className="col-lg-3 col-md-6 col-sm-6 p-1 p-md-3 mb-3" key={item.lid}>
                  <Card
                    img={item.img}
                    firstSideSecondTittle={item.firstSideSecondTittle}
                    firstSideFirstTittle={item.firstSideFirstTittle}
                    firstMainTittle={item.firstMainTittle}
                    lid={item.lid}
                    isLecturer={item.isLecturer}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <>
              {HAboutData.map((item) => (
                <div className="col-lg-3 col-md-6 col-sm-6 p-1 p-md-3 mb-3" key={item.lid}>
                  <Card
                    img={item.img}
                    firstSideSecondTittle={item.firstSideSecondTittle}
                    firstSideFirstTittle={item.firstSideFirstTittle}
                    firstMainTittle={item.firstMainTittle}
                    lid={item.lid}
                    isLecturer={item.isLecturer}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HAbout;
