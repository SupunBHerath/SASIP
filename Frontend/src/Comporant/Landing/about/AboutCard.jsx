import React from "react";
import Heading from "../common/heading/Heading";
import "./about.css";
import { homeAbout } from "../dummydata";
import Awrapper from "./Awrapper";

const AboutCard = () => {
  return (
    <>
      <section className="aboutHome">
        <div className="container flexSB">
          <div className="left row">
            <img src="../public/image/logoe1.png" alt="Logo" />
          </div>
          <div className="right row">
            <center>
              <h1 className="titlem" style={{ fontSize: "30px" }}>
                WHO WE ARE
              </h1>
            </center>
            <div className="items">
              {homeAbout.map((val, index) => {
                return (
                  <div className="item flexSB" key={val.id || index}>
                    <div className="text">
                      <center>
                        <p>{val.desc}</p>
                      </center>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  );
};

export default AboutCard;
