import React, { useEffect, useState } from "react";
import Heading from "../common/heading/Heading";
import "./about.css";
import { home, homeAbout, VisionMission, contactInfo } from "../../dummydata";
import Awrapper from "./Awrapper";
import AboutVisionandMission from "./AboutVisionandMission";
import AOS from "aos";
import "aos/dist/aos.css";
import { Color } from "../CSS/Css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faGlobe, faEnvelope, faMapMarkerAlt, faGraduationCap, faMap } from '@fortawesome/free-solid-svg-icons';



const AboutCard = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  const [isHovered, setIsHovered] = useState(false);

  const headingStyle = {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '30px',
    color: isHovered ? Color.SecondaryColor : 'black',
    transition: 'color 0.3s' ,
     marginBottom: '20px',
     
  };

  const pStyle={
    textAlign: 'center',
    color: isHovered ? Color.PrimaryColor : 'black',
    transition: 'color 0.3s',
    marginTop: 0
  }

  const getIcon = (key) => {
    switch (key) {
      case 'telephoneNumbers':
        return faPhone;
      case 'officialWebsite':
        return faGlobe;
      case 'distanceLearningWebsite':
        return faGraduationCap; // Assuming you have this icon imported
      case 'email':
        return faEnvelope;
      case 'address':
        return faMapMarkerAlt;
      case 'province':
        return faMap;
      case 'district':
        return faMap;
      case 'city':
        return faMap;
      default:
        return null; // Return null or handle default case as needed
    }
  };

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
          <div className='row'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h2
                style={headingStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                VISION AND MISSION
              </h2>
            </div>
            <div className='vision-mission-container'>
              {VisionMission.map((val, index) => (
                <div className='col-12 col-sm-6 col-lg-3 card-box' key={index} data-aos="zoom-in">
                  <AboutVisionandMission
                    title={val.title}
                    desc={val.desc}
                    icon={val.icon}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className='aboutHome backgroundSection'>
        <div className='container'>
          <div className='right row' data-aos="fade-left">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p style={pStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                >
                  [OUR FEATURES]</p>
             
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h3 style={headingStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                  Structured education program ensuring comprehensive learning at Sasip Institute.
                  </h3>
             
            </div>
            
            
            <div className='cards-container'>
              {homeAbout.map((val, index) => (
                <div className='card' key={index} data-aos="fade-up">
                  <div className='card__side card__side--front'>
                    <div className='card__picture' style={{ backgroundImage: `url(${val.cover})` }}>
                      <h4 className='card__heading'>
                        <span className='card__heading-span'>{val.title}</span>
                      </h4>
                    </div>
                  </div>
                  <div className='card__side card__side--back'>
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
        <div className="container">
          <div className="right row" data-aos="fade-left">
            <h2 className="subtitle">CONTACT DETAILS</h2>
            <div className="contact-details" >
              <table className="contact-table" >
                <tbody>
                  {contactInfo.pathTopic.map((item, index) => (
                    <tr key={index}>
                      <td className="icon-cell">
                        <FontAwesomeIcon icon={getIcon(item.key)} className="contact-icon" />
                      </td>
                      <td className="subtitle-cell">
                        <h5 style={{ color: Color.PrimaryColor }}>{item.subtitle}</h5>
                      </td>
                      <td className="detail-cell">
                        {contactInfo.detail[item.key]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutCard;

