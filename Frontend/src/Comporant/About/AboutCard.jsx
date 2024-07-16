import React, { useEffect, useState } from "react";
import Heading from "../common/heading/Heading";
import "./about.css";
import { home, homeAbout, contactInfo } from "../../dummydata";
import Awrapper from "./Awrapper";
import AOS from "aos";
import "aos/dist/aos.css";
import { Color } from "../CSS/Css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faGlobe, faEnvelope, faMapMarkerAlt, faGraduationCap, faMap } from '@fortawesome/free-solid-svg-icons';
import { faEye, faLightbulb, faSnowflake } from '@fortawesome/free-solid-svg-icons';


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
    fontSize: '40px',
    color: isHovered ? Color.SecondaryColor : 'black',
    transition: 'color 0.3s',
    margin: '20px',

  };

  const handlContact = {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '3rem',
    color: isHovered ? Color.SecondaryColor : 'black',
    transition: 'color 0.3s',
    margin: '20px',

  };

  const pStyle = {
    textAlign: 'center',
    color: isHovered ? Color.PrimaryColor : 'black',
    transition: 'color 0.3s',
    marginTop: 0
  }
  const pharagrapStyleone = {
    textAlign: 'center',
    color: isHovered ? Color.PrimaryColor : 'black',
    transition: 'color 0.3s',
    marginTop: 0,
    fontSize: '14px'

  }

  const pharagrapStyletwo = {
    color: isHovered ? Color.PrimaryColor : 'black',
    transition: 'color 0.3s',
    marginTop: 0,
    fontSize: '14px'
  }

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: '20px',
    },
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      width: '300px',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    icon: {
      color: Color.PrimaryColor,
      marginBottom: '10px',
    },
    title: {
      fontSize: '1.5em',
      margin: '10px 0',
    },
    desc: {
      fontSize: '1em',
      color: '#555',
    }
  };



  const VisionMission = [
    {
      title: "Our Vision",
      desc: "A good intelligent society.",
      icon: faEye,
    },
    {
      title: "Our Mission",
      desc: "Through formal and up-to-date practical education, well-disciplined and good in all fields, a generation of people creating.",
      icon: faLightbulb,
    },
    {
      title: "Excellence In Service",
      desc: "To not just meet but exceed client expectation consistently by imbibing Teamwork, Professionalism, Personalised Service.",
      icon: faSnowflake,
    }
  ];

  const getIcon = (key) => {
    switch (key) {
      case 'telephoneNumbers':
        return faPhone;
      case 'officialWebsite':
        return faGlobe;
      case 'distanceLearningWebsite':
        return faGraduationCap;
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
        return null;
    }
  };

  return (
    <>
      <section className="aboutHome">
        <div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className='left row' data-aos="fade-right">
            <img src='../../../public/image/logoonenew.png' alt='About us' className='responsive-img' />
          </div>
          <div className='right row' data-aos="fade-left">
            <Heading subtitle='LEARN ANYTHING' title='Brief introduction about us' />
            <div className='items'>
              {home.map((val, index) => (
                <div className='item' key={index} data-aos="fade-up">

                  <div className='text'>
                    <p style={pharagrapStyleone}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}>{val.desc}</p>
                    {val.letter && (
                      <p style={pharagrapStyletwo}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)} className='letter' dangerouslySetInnerHTML={{ __html: val.letter }}></p>
                    )}
                  </div>


                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="subtitle" style={handlContact}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)} data-aos="fade-up">OUR VISION AND MISSION</h2>
        <div style={styles.container} >


          {VisionMission.map((item, index) => (
            <div key={index} style={styles.card} data-aos="fade-up">
              <FontAwesomeIcon icon={item.icon} size="2x" style={styles.icon} />
              <h2 style={styles.title}>{item.title}</h2>
              <p >{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='aboutHome backgroundSection'>
        <div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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

      <section className="aboutHome" style={{ padding: '40px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="right row" data-aos="fade-left">
            <h2 className="subtitle" style={handlContact}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>CONTACT DETAILS</h2>
            <div className="contact-details" style={{ width: '100%' }}>
              <table className="contact-table" style={{ width: '100%' }}>
                <tbody>
                  {contactInfo.pathTopic.map((item, index) => (
                    <tr key={index} style={{ display: 'flex', width: '100%' }}>
                      <td className="icon-cell" style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={getIcon(item.key)} className="contact-icon" />
                      </td>
                      <td className="subtitle-cell" style={{ flex: '3', paddingLeft: '10px' }}>
                        <h5 style={{ color: Color.PrimaryColor }}>{item.subtitle}</h5>
                      </td>
                      <td className="detail-cell" style={{ flex: '6', paddingLeft: '10px' }}>
                        {contactInfo.detail[item.key]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='left row' data-aos="fade-right">
            <img src='../../../public/images/boy.png' alt='About us' className='responsive-img' />
          </div>
        </div>

      </section>

      <Awrapper />
    </>
  );
};

export default AboutCard;

