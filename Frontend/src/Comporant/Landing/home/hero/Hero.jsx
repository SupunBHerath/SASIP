import React from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../common/heading/Heading";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/teachers");
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <Heading subtitle="WELCOME TO SASIP" title="Best Education Expertise" />
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts.
            </p>
          </div>
        </div>
      </section>
          <div className="container m-2">
          <div className="row">
            <div className="col-md-8 float-start"> {/* Adjust column size and alignment */}
              <div className="button-container mt-5">
                <button className="btn btn-primary top-80 left-3" onClick={handleClick}>
                  SASIP INSTITUTE <i className="fa fa-long-arrow-alt-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      <div className="margin"></div>
    </>
  );
};

export default Hero;
