import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../Navibar/Navbar';
import LandingHero from './LandingHero';
import k from '../../../public/logoback.png'

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
  '../../../public/logoback.png',
  'https://z-p3-scontent.fcmb9-1.fna.fbcdn.net/v/t39.30808-6/435700213_990027145820228_374095329094466250_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeFWE36eA9KnvgG0Eqgc48_scMNBmqfiNYRww0Gap-I1hLd4-4oc93PlbXkesXbOUKuVAaI23LemlRlG0DpUacjo&_nc_ohc=cGnnH0usqdIQ7kNvgFLAUSA&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb9-1.fna&oh=00_AYCeTKohdcSPZupOSoLcOhFUpfqCLJwhqBRexpznH4OXKw&oe=669CC616',
  'https://z-p3-scontent.fcmb9-1.fna.fbcdn.net/v/t39.30808-6/438088360_990036185819324_2378637075562672293_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeE2Wvz-KSd66_idhCfUUGh4562C_J3AdEznrYL8ncB0TC3lRRK4N3E_pdSEWhpFErmm9O3N55r1FZdS5KAbNsL5&_nc_ohc=g5xxedjmqyAQ7kNvgEE1oXg&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb9-1.fna&oh=00_AYBQ6NtNQkFZsAiN9qEcXjOQV1cAbh5A5EiIjtgXBPBblA&oe=669CDAEB',

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
    }, 6000); // Change background image every 10 seconds

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
