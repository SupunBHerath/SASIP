import React, { useEffect } from "react";
import Heading from "../common/heading/Heading";
import "./about.css";
import { home, homeAbout, VisionMission, contactInfo } from "../../dummydata";
import Awrapper from "./Awrapper";
import AboutVisionandMission from "./AboutVisionandMission";
import AOS from "aos";
import "aos/dist/aos.css";
import { Color } from "../CSS/Css";

const AboutCard = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  return (
    <>
      <section className="aboutHome">
        <div className='container'>
          <div className='left row' data-aos="fade-right">
            <img src='./images/DSC_4746.JPG' alt='About us' className='responsive-img' />
          </div>
          <div className='right row' data-aos="fade-left">
            <Heading subtitle='LEARN ANYTHING' title='Brief introduction about us' />
            <div className='items'>
              {home.map((val, index) => (
                <div className='item' key={index} data-aos="fade-up">
                  <div className='text'>
                    <h2>{val.title}</h2>
                    <p>{val.desc}</p>
                    {val.letter && (
                      <p className='letter' dangerouslySetInnerHTML={{ __html: val.letter }}></p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='aboutHome'>
        <div className='container'>
          <div className='right row'>
            <Heading subtitle='VISION AND MISSION' />
            <div className='vision-mission-container'>
              {VisionMission.map((val, index) => (
                <AboutVisionandMission
                  key={index}
                  title={val.title}
                  desc={val.desc}
                  data-aos="zoom-in"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='aboutHome backgroundSection'>
        <div className='container'>
          <div className='right row' data-aos="fade-left">
            <Heading subtitle='LEARN ANYTHING' title='Structured education program ensuring comprehensive learning at Sasip Institute.' />
            <div className='items'>
              {homeAbout.map((val, index) => (
                <div className='item' key={index} data-aos="fade-up">
                  <div className='img'>
                    <img src={val.cover} alt={val.title} className='responsive-img' />
                  </div>
                  <div className='text'>
                    <h2>{val.title}</h2>
                    <p>{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Awrapper />

      {/* Contact and Address Details */}
      <section className="aboutHome">
        <div className='container'>
          <div className='right row' data-aos="fade-left">
            <Heading subtitle='CONTACT DETAILS' />
            <table className="contact-table">
              <tbody>
                {contactInfo.pathTopic.map((item, index) => (
                  <tr key={index}>
                    <td><h5 style={{ color: Color.PrimaryColor }}>{item.subtitle}</h5></td>
                    <td>{contactInfo.detail[item.key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>


    </>
  );
};

export default AboutCard;
