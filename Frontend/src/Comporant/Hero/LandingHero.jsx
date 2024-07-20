import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Heading from '../Landing/common/heading/Heading';
import Navbar from '../Navibar/Navbar';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const { width } = useWindowSize(); // Get the current window width

  useEffect(() => {
    AOS.init();
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      setCurrentAnimationIndex((prevIndex) => (prevIndex + 1) % animations.length);
    }, 5000); // Change image and animation every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Define inline styles with responsiveness
  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundImage: 'url("../../../../public/image/mbg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    leftSide: {
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      color: 'white',
      textAlign: 'center',
      maxWidth: '400px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: 'blue',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    rightSide: {
      flex: '1',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      padding: '20px',
      position: 'relative',
    },
    image: {
      width: width <= 600 ? '100px' : '200px', // Resize image based on screen width
      height: width <= 600 ? '100px' : '200px',
      borderRadius: '50%',
      objectFit: 'cover',
      position: 'absolute',
      boxShadow: '0px 10px 10px 0px rgba(0, 0, 0, 0.8)',
      top: width <= 600 ? '20px' : '70px', // Adjust position based on screen width
      right: width <= 600 ? '20px' : '70px',
      border: '5px solid white',
    },
  };

  const imageUrls = [
    '../../../../public/image/Lecturers/a.jpg',
    '../../../../public/image/Lecturers/t.jpg',
    '../../../../public/image/Lecturers/tissaSir.png',
  ];

  const animations = [
    'fade-up',
    'fade-down',
    'fade-left',
    'fade-right',
    'zoom-in',
    'zoom-out',
  ];

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <div style={styles.textContainer}>
          <h1>WELCOME TO SASIP</h1>
          <h2>Best Education Expertise</h2>
          <button style={styles.button}>SASIP INSTITUTE</button>
        </div>
      </div>
      <div style={styles.rightSide}>
        <img
          src={imageUrls[currentImageIndex]}
          alt="Slideshow"
          style={styles.image}
          data-aos={animations[currentAnimationIndex]} // Apply current animation
          data-aos-duration="1000" // Duration of the animation
          key={currentImageIndex} // Add key to reinitialize animation on change
        />
      </div>
    </div>
  );
};

export default LandingHero;
