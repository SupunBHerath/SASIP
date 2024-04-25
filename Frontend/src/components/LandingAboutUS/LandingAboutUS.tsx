import React from "react";
import "./Landing.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const LandingAboutUS = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div
          className="row align-items-center rounded-3  p-3 shadow-lg "
          data-aos="fade-in"
        >
          <div
            className="col-lg-6 rounded-1 m-0 p-0 overflow-hidden shadow-lg"
            data-aos="fade-left"
          >
            <div className="youtube-iframe embed-responsive embed-responsive-1by1 ">
              <iframe
                src="https://www.youtube.com/embed/1uUKMnj5a3I?rel=0&autoplay=1&controls=0&disablekb=1&iv_load_policy=3&fs=0"
                allowFullScreen
              />
            </div>
          </div>
          <div className="col-lg-6 p-3 p-lg-5 pt-lg-3 " data-aos="fade-in">
            <div>
              <h6 className="text-center " style={{ fontFamily: "Inter" }}>
                [ ABOUT SASIP ]
              </h6>
            </div>
            <div className="text-center">
              <h3
                className="m-0 p-0"
                style={{ fontFamily: "Inter", fontWeight: "bold" }}
              >
                [WHO ARE WE]
              </h3>
            </div>
            <br />
            <div className="text-center">
              <p>
                Institute of Universal Higher Studies (Pvt) Ltd (IUHS Campus) is
                the sister company of “SASIP”, a well renowned and leading
                Advanced Level (A’level) private education institute that has
                been in operation for the past 9 years, providing quality
                secondary education in various streams such as Maths , Bio
                Science, Commerce, Arts and Technology.
              </p>
            </div>
            <br />
            <br />
            <Button
              variant="contained"
              style={{ backgroundColor: "red", float: "right" }}
              onClick={() => {
                navigate("/about");
              }}
            >
              READ MORE
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
