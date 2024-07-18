import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Adjust the value as needed
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '10px',
        display: isVisible ? 'block' : 'none',
        background: 'linear-gradient(135deg, #FF4081, #FF6F61)',
        color: '#fff',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        border: 'none',
        transition: 'opacity 0.3s ease',
        opacity: isVisible ? 1 : 0.8
      }}
    >
      <ArrowUpwardIcon style={{ fontSize: '30px' }} />
    </Button>
  );
};

export default ScrollToTopButton;
