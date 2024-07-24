import React, { useState, useRef, useEffect } from 'react';
import './GalleryPage.css'; // Import CSS for styling
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { imageData } from './imageData'; // Import imageData
import CloseIcon from '@mui/icons-material/Close'; // Import Close Icon
import Navbar from '../../Comporant/Navibar/Navbar';

const GalleryPage = () => {
  const galleryRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const selectedImageRef = useRef(null);

  const [selectedAlbum, setSelectedAlbum] = useState('ALL');
  const [albums, setAlbums] = useState(Object.keys(imageData)); // Get albums from data
  const [isScrolled, setIsScrolled] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const easing = 0.05;
  let startY = 0;
  let endY = 0;
  let raf = null;

  const lerp = (start, end, t) => start * (1 - t) + end * t;

  const updateScroll = () => {
    startY = lerp(startY, endY, easing);
    if (galleryRef.current && trackRef.current) {
      galleryRef.current.style.height = `${trackRef.current.clientHeight}px`;
      trackRef.current.style.transform = `translateY(-${startY}px)`;
    }
    activateParallax();
    raf = requestAnimationFrame(updateScroll);
    if (startY.toFixed(1) === window.scrollY.toFixed(1)) cancelAnimationFrame(raf);
  };

  const startScroll = () => {
    endY = window.scrollY;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateScroll);
  };

  const parallax = (card) => {
    if (card) {
      const wrapper = card.querySelector('.card-image-wrapper');
      if (wrapper) {
        const diff = card.offsetHeight - wrapper.offsetHeight;
        const { top } = card.getBoundingClientRect();
        const progress = top / window.innerHeight;
        const yPos = diff * progress;
        wrapper.style.transform = `translateY(${yPos}px)`;
      }
    }
  };

  const activateParallax = () => {
    cardsRef.current.forEach(parallax);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change color when scrolled past 50px
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      activateParallax();
      startScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    updateScroll(); // Initial setup on component mount
  }, []);

  useEffect(() => {
    if (showImage && selectedImageRef.current) {
      // Add animation to the enlarged image when it appears
      selectedImageRef.current.style.animation = 'slideDown 0.5s ease-in-out';
    } else if (selectedImageRef.current) {
      // Add animation to the enlarged image when it disappears
      selectedImageRef.current.style.animation = 'slideUp 0.5s ease-in-out';
    }
  }, [showImage]); // Run this effect whenever showImage changes

  const handleAlbumChange = (event, newValue) => {
    setSelectedAlbum(newValue);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImage(true);
  };

  const closeImage = () => {
    setShowImage(false);
  };

  return (
    <>
      <Navbar position={true} fixed={true}/>
    <br /><br />
    <div>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Tabs
          value={selectedAlbum}
          onChange={handleAlbumChange}
          aria-label="album filter tabs"
          sx={{ position: 'static', top: 0, zIndex: 1000 }} // Fixed on top
        >
          {albums.map((album) => (
            <Tab
              key={album}
              label={album}
              value={album}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#007bff', // Selected tab background
                  color: 'white', // Selected tab text color
                },
                '&:hover': {
                  backgroundColor: '#ddd', // Hover background
                },
                color: isScrolled ? 'white' : '#333', // Change color based on scroll
                transition: 'color 0.3s ease', // Add transition animation
              }}
            />
          ))}
        </Tabs>
      </Box>

      <main className="gallery" ref={galleryRef}>
        <div className="gallery-track" ref={trackRef}>
          {imageData[selectedAlbum].map((image, index) => (
            <div
              className="card"
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => handleImageClick(image)}
            >
              <div className="card-image-wrapper">
                <img src={image} alt={`Gallery Image ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Enlarged Image */}
      {showImage && (
        <div className="enlarged-image" ref={selectedImageRef}>
          <img src={selectedImage} alt="Enlarged Image" />
          <button onClick={closeImage} className="close-button">
            <CloseIcon /> {/* Use Close Icon */}
          </button>
        </div>
      )}
    </div>
    </>

  );
};

export default GalleryPage;