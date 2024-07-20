import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../Navibar/Navbar';
import LandingHero from './LandingHero';

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

const backgroundImages = [
  '../../../public/image/mbg.jpg',
  '../../../public/image/smallt.jpg',
  '../../../public/image/logoonenew.png',
];

const Landing = () => {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const { width } = useWindowSize(); // Get the current window width

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation
      easing: 'ease-in-out', // Easing function
    });

    const intervalId = setInterval(() => {
      setShowContent(false); // Hide content to trigger animation
      setTimeout(() => {
        setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        setShowContent(true); // Show content after background changes
      }, 1000); // Wait for background image transition
    }, 10000); // Change background image every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  const heroStyle = {
    backgroundImage: `url(${backgroundImages[currentBackgroundIndex]})`,
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 1s ease-in-out', // Smooth transition between images
  };

  return (
    <div>
      <div style={heroStyle}>
        <Navbar />
        <div style={{ opacity: showContent ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
          <LandingHero />
        </div>
      </div>
    
    </div>
  );
};

export default Landing;
