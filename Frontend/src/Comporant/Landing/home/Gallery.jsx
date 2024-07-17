import React, { useState, useEffect } from "react";
import "./Gallery.css";
import { useNavigate } from "react-router-dom";
import Heading from "../common/heading/Heading";

function Gallery() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showTitle, setShowTitle] = useState(false);
  const [title, setTitle] = useState("");

  // Sample dataset for images and titles
  const imageData = [
    {
      src: "https://z-p3-scontent.fcmb9-1.fna.fbcdn.net/v/t39.30808-6/427905482_351393377799291_153414725545854247_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_ohc=GJ2-VHW7OXAQ7kNvgF9ErpH&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb9-1.fna&oh=00_AYBDw_X8SMLuazNu625hr-VtjdF76gtkW3Mj_G9GsTA7kg&oe=669CB6B8",
      title: "Wigadama",
    },
    {
      src: "https://z-p3-scontent.fcmb9-1.fna.fbcdn.net/v/t39.30808-6/437505086_990034819152794_7407103249783809369_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeGyA7VDIhwywXCltmW8ZrDKL0B-nFEWEBovQH6cURYQGkZjrZmSlHd801hnHVVJVsYcEK74eXtFH1mV4XAtANiT&_nc_ohc=j7y2BCEC2_kQ7kNvgHEqETP&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb9-1.fna&oh=00_AYCYEGYfScycZ7qdJMuO0IRL3BzUQawu0qK-q6OVUe5XhQ&oe=669CB55C",
      title: "AWURUDU",
    },
    {
      src: "https://z-p3-scontent.fcmb9-1.fna.fbcdn.net/v/t39.30808-6/438088360_990036185819324_2378637075562672293_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeE2Wvz-KSd66_idhCfUUGh4562C_J3AdEznrYL8ncB0TC3lRRK4N3E_pdSEWhpFErmm9O3N55r1FZdS5KAbNsL5&_nc_ohc=g5xxedjmqyAQ7kNvgEE1oXg&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb9-1.fna&oh=00_AYBQ6NtNQkFZsAiN9qEcXjOQV1cAbh5A5EiIjtgXBPBblA&oe=669CDAEB",
      title: "AWURUDU",
    },
    {
      src: "https://z-p3-scontent.fcmb9-1.fna.fbcdn.net/v/t39.30808-6/439446917_122128253612240867_5854419867086240576_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeHSUpKjB2fHsYboOqH3LR6oDrftxDRezWAOt-3ENF7NYPqfVFNbGJ9YO52SGDRFcUJedrTxRxrVIuL8jPHRy9ld&_nc_ohc=1TRye9JEK5UQ7kNvgED_0Lu&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb9-1.fna&oh=00_AYDADu5paKoqqC9eX0BNgqizsszN98d_QBMnWZAAaKqBSg&oe=669CD53B",
      title: "AWURUDU",
    },
    {
      src: "https://z-p3-scontent.fcmb9-1.fna.fbcdn.net/v/t39.30808-6/435700213_990027145820228_374095329094466250_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeFWE36eA9KnvgG0Eqgc48_scMNBmqfiNYRww0Gap-I1hLd4-4oc93PlbXkesXbOUKuVAaI23LemlRlG0DpUacjo&_nc_ohc=cGnnH0usqdIQ7kNvgFLAUSA&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb9-1.fna&oh=00_AYCeTKohdcSPZupOSoLcOhFUpfqCLJwhqBRexpznH4OXKw&oe=669CC616",
      title: "AWURUDU",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide) => (currentSlide % imageData.length) + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handlePaginationClick = (slideNumber) => {
    setCurrentSlide(slideNumber);
  };

  // Define navigation paths for each image
  const imageNavigationPaths = {};
  imageData.forEach((_, index) => {
    imageNavigationPaths[index + 1] = `/gallery/image${index + 1}`;
  });

  const handleImageClick = (slideNumber, event) => {
    event.preventDefault(); // Prevent default behavior

    // If the clicked image is NOT the current main image
    if (slideNumber !== currentSlide) {
      setCurrentSlide(slideNumber);
    } else {
      // If the clicked image IS the current main image, navigate
      navigate(imageNavigationPaths[slideNumber]);
    }
  };

  const handleImageMouseOver = (slideNumber) => {
    // Only show the title if the hovered image is the active slide
    if (slideNumber === currentSlide) {
      setShowTitle(true);
      setTitle(imageData[slideNumber - 1].title);
    }
  };

  const handleImageMouseOut = () => {
    setShowTitle(false);
  };

  return (
    <div>
      <Heading subtitle="Our Gallery" title="Recent From Blog" />

      <section id="slider">
        {imageData.map((image, index) => (
          <input
            key={index}
            type="radio"
            name="slider"
            id={`s${index + 1}`}
            checked={currentSlide === index + 1}
          />
        ))}

        {imageData.map((image, index) => (
          <label
            key={index}
            htmlFor={`s${index + 1}`}
            id={`slide${index + 1}`}
            onMouseOver={() => handleImageMouseOver(index + 1)}
            onMouseOut={handleImageMouseOut}
            onClick={(event) => handleImageClick(index + 1, event)}
          >
            <div>
              <img src={image.src} alt="" />
              {showTitle && currentSlide === index + 1 && (
                <div className="title-popup">{title}</div>
              )}
            </div>
          </label>
        ))}
      </section>

      <div className="pagination"></div>
    </div>
  );
}

export default Gallery;
