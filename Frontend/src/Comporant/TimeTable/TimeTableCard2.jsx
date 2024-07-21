import React from 'react';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../Landing/home/btn.css';
import Heading from '../Landing/common/heading/Heading';

const cardStyle = {
    display: 'flex',
    margin: 'auto',
    width: '200px',
    height: '150px',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: '-5px 5px 0px 0px rgb(0,0,0)',
    borderRadius: '15px',
    transition: 'all 0.5s',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer', // Makes the card look clickable
};

const hoverEffectStyle = {
    position: 'absolute',
    top: -3,
    right: -3,
    width: '50px',
    height: '50px',
    backgroundColor: 'rgb(42, 42, 42)',
    borderRadius: '50%',
    transition: 'all 0.5s',
};

const cardHoverEffectStyle = {
    ...hoverEffectStyle,
    width: '202px',
    height: '152px',
    borderRadius: '15px',
};

const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '26px',
    gap: '26px',
};

const allStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '30px',
    backgroundImage: 'url("../../../public/logoback.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    padding: '10px',
    backgroundColor: '#00796b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
};

const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#004d40',
    transform: 'scale(1.05)',
};

const cardButtonStyle = {
    position: 'absolute',
    width: 'max-content',
    bottom: '5px',

    opacity: 0,
    transition: 'opacity 0.3s',
    color: 'white',
    padding: '8px ',
    left: '30px',
};

const cardButtonHoverStyle = {
    ...cardButtonStyle,
    opacity: 1,
};

const Card = ({ title, year }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        // Construct the URL based on the title and year
        const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
        const url = `/timetable/${year}/${formattedTitle}`;
        navigate(url);
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick} // Make the whole card clickable
        >

            <div style={isHovered ? cardHoverEffectStyle : hoverEffectStyle}></div>
            <div className="content" style={{ zIndex: 40, color: isHovered ? 'white' : 'black', textAlign: 'center' }}>
                <FaCalendarAlt style={{ fontSize: '24px', top: 9, right: 9, position: 'absolute', color: 'white' }} />
                <h2>{title}</h2>
                <p className='h3 mb-3' style={{ marginTop: '-17px' }}>{year}</p>

                <button
                    style={isHovered ? cardButtonHoverStyle : cardButtonStyle}
                >
                    View Time Table
                </button>
            </div>
        </div>
    );
};

const TimeTableCard2 = () => {
    const [isButtonHovered, setIsButtonHovered] = React.useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/timetable');
    };

    return (
        <div style={allStyle} className=''>

            <div style={containerStyle} className='mt-5'>
                <Card title="Theory" year="2025" />
                <Card title="Theory" year="2024" />
                <Card title="Revision" year="2024" />
                <Card title="Paper" year="2024" />
                <Card title="Theory" year="2023" />
                <Card title="Revision" year="2023" />
                <Card title="Paper" year="2023" />
            </div>
            <div className="justify-content-center d-flex mb-5 mt-5">
                <button
                    className="btn outline-btn p-2"
                    style={isButtonHovered ? buttonHoverStyle : buttonStyle}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    onClick={handleClick}
                >
                    <FaArrowRight style={{ marginRight: '8px' }} />
                    View All Time Tables
                </button>
                <br /><br />
            </div>
        </div>
    );
};

export default TimeTableCard2;
