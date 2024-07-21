import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HAbout.css";
import Card from "./Card";
import Heading from "../common/heading/Heading";

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
      <Heading title="[Popular Lecturers]" />
      <div className="justify-content-center d-flex">
        <div className="row" style={{ width: "100vw" }}>
          {isMobileView ? (
            <Slider {...sliderSettings}>
              <div className="col-lg-3 col-md-6 col-sm-6 p-1 p-md-3 mb-3 ">
                <Card
                  img="../../../../public/a.jpg"
                  firstSideSecondTittle="Physics"
                  firstSideFirstTittle="Amith pussala"
                  firstMainTittle="Bio"
                  isLecturer={true}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 p-1 p-md-3 mb-3">
                <Card
                  img="../../../../public/t.jpg"
                  firstSideSecondTittle="Biology"
                  firstSideFirstTittle="Tissa Jananayaka"
                  firstMainTittle="Bio"
                  isLecturer={true}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 p-1 p-md-3 mb-3">
                <Card
                  img="../../../../public/aj.jpg"
                  firstSideSecondTittle="Combined Maths"
                  firstSideFirstTittle="Ajantha Dissanayake"
                  firstMainTittle="Bio"
                  isLecturer={true}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 p-1 p-md-3 mb-3">
                <Card
                  img="../../../../public/k.jpg"
                  firstSideSecondTittle="Chemistry"
                  firstSideFirstTittle="ksiri Withanage"
                  firstMainTittle="Bio"
                  isLecturer={true}
                />
              </div>
            </Slider>
          ) : (
            <>
              <div className="col-lg-3 col-md-6 col-sm-6 p-1  p-md-3 mb-3">
                <Card
                  img="../../../../public/a.jpg"
                  firstSideSecondTittle="Physics"
                  firstSideFirstTittle="Amith pussala"
                  firstMainTittle="Bio"
                  isLecturer={true}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 p-1 p-md-3 mb-3">
                <Card
                  img="../../../../public/t.jpg"
                  firstSideSecondTittle="Biology"
                  firstSideFirstTittle="Tissa Jananayaka"
                  firstMainTittle="Bio"
                  isLecturer={true}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 p-1 p-md-3 mb-3">
                <Card
                  img="../../../../public/aj.jpg"
                  firstSideSecondTittle="Combined Maths"
                  firstSideFirstTittle="Ajantha Dissanayake"
                  firstMainTittle="Bio"
                  isLecturer={true}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 p-1 p-md-3 mb-3">
                <Card
                  img="../../../../public/k.jpg"
                  firstSideSecondTittle="Chemistry"
                  firstSideFirstTittle="ksiri Withanage"
                  firstMainTittle="Bio"
                  isLecturer={true}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HAbout;
