import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import './CardSlide.css';
import { PostsData } from './data';

const CardSlide = () => {
    // Function to get the number of cards visible based on screen width
    const getNumCardsVisible = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1200) return 5;
        else if (screenWidth >= 992) return 4;
        else if (screenWidth >= 768) return 3;
        else if (screenWidth >= 576) return 2;
        else return 1;
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [numCardsVisible, setNumCardsVisible] = useState(getNumCardsVisible());

    const cardsContainerRef = useRef(null);
    const intervalRef = useRef(null); // Ref for interval

    useEffect(() => {
        startAutoSlide();

        const handleResize = () => {
            setNumCardsVisible(getNumCardsVisible());
            setCurrentIndex(0); // Reset currentIndex when the number of cards visible changes
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            clearInterval(intervalRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Function to start auto sliding
    const startAutoSlide = () => {
        intervalRef.current = setInterval(() => {
            goToNextSlide();
        }, 2000); // Automatically slide every 2 seconds
    };

    // Function to pause auto sliding
    const pauseAutoSlide = () => {
        clearInterval(intervalRef.current);
    };

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (PostsData.length - numCardsVisible + 1));
    };

    const goToPreviousSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? PostsData.length - numCardsVisible : prevIndex - 1));
    };

    const renderVisibleCards = () => {
        return PostsData.slice(currentIndex, currentIndex + numCardsVisible).map((post, index) => (
            <div key={index} className="card-news" onMouseEnter={pauseAutoSlide} onMouseLeave={startAutoSlide}>
                <Card details={post} />
            </div>
        ));
    };

    return (
        <div className="card-news">
            <div className="card-news-slide">
                <div className="navigation prev" onClick={goToPreviousSlide}>
                    {'<'}
                </div>
                <div className="card-news-container" ref={cardsContainerRef}>
                    {renderVisibleCards()}
                </div>
                <div className="navigation next" onClick={goToNextSlide}>
                    {'>'}
                </div>
            </div>
        </div>
    );
};

export default CardSlide;
