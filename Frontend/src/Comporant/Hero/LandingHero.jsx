import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import {backgroundImages , textData }from '../../Data/LandingHeroData'; 

// Custom hook to get window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const LandingHero = () => {
  const { width } = useWindowSize(); // Get the current window width
  const navi = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  // Define inline styles with responsiveness
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start', // Align items to the left
      height: '100vh',
      background: 'url(/path-to-your-background-image.png) no-repeat center center', // Update with your background image path
      backgroundSize: 'cover',
      textAlign: 'left', // Align text to the left
      color: '#fff',
      paddingLeft: '5%', // Add padding to the left
    },
    textContainer: {
      maxWidth: '500px',
    },
    heading: {
      fontSize: '2.5rem',
      margin: '0.5rem 0',
    },
    subHeading: {
      fontSize: '2rem',
      margin: '0.5rem 0',
    },
    text: {
      fontSize: '1rem',
      margin: '1rem 0',
    },
    buttonContainer: {
      display: 'flex',
      marginTop: '2rem',
    },
    button: {
      padding: '10px 20px',
      margin: '0 10px',
      fontSize: '1rem',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.3s',
    },
    getStartedButton: {
      backgroundColor: '#00c4cc',
      color: '#fff',
    },
    viewCourseButton: {
      backgroundColor: '#fff',
      color: '#00c4cc',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h1 style={styles.heading} data-aos="fade-right" data-aos-duration="2000">{textData.heading}</h1>
        <h2 style={styles.subHeading} data-aos="fade-left" data-aos-duration="2000">{textData.subHeading}</h2>
        <p style={styles.text} data-aos="fade-up" data-aos-duration="2000">
          {textData.paragraph}
        </p>
        <div style={styles.buttonContainer}>
          <button onClick={() => { window.open('https://www.sasipinstitute.com/', '_blank') }} style={{ ...styles.button, ...styles.getStartedButton }} data-aos="fade-up" data-aos-duration="2000">
            GET STARTED NOW
          </button>
          <button onClick={() => { navi('/timetable/all/all') }} style={{ ...styles.button, ...styles.viewCourseButton }} data-aos="fade-up" data-aos-duration="2000">
            VIEW TIME TABLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
