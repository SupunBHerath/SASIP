import React from 'react';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
    margin: '16px',
    width: 'calc(100% - 32px)',
    maxWidth: '280px',
    textAlign: 'center',
    boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
    backgroundColor: '#ffffff',
};

const cardHoverStyle = {
    ...cardStyle,
    boxShadow: '0 12px 24px 0 rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-10px)',
    backgroundColor: '#e0f7fa',
    cursor: 'pointer',
};

const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '16px',
    gap: '16px',
};

const allStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '20px',
    borderRadius: '12px',
};

const iconStyle = {
    color: '#00796b',
    fontSize: '30px',
    marginBottom: '12px',
};

const titleStyle = {
    margin: '10px 0',
    color: '#00796b',
};

const yearStyle = {
    margin: '0',
    fontSize: '24px',
    fontWeight: 'bold',
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

const Card = ({ title, year }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            style={isHovered ? cardHoverStyle : cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <FaCalendarAlt style={iconStyle} />
            <div>
                <h2 style={titleStyle}>{title}</h2>
                <p style={yearStyle}>{year}</p>
            </div>
        </div>
    );
};

const TimeTableCard2 = () => {
    const [isButtonHovered, setIsButtonHovered] = React.useState(false);

    return (
        <div style={allStyle}>
            <div style={containerStyle}>
                <Card title="TEARY" year="2025" />
                <Card title="TEARY" year="2024" />
                <Card title="REVISION" year="2024" />
                <Card title="PAPER" year="2024" />
                <Card title="TEARY" year="2023" />
                <Card title="REVISION" year="2023" />
                <Card title="PAPER" year="2023" />
            </div>
            <div className="justify-content-center d-flex mb-2">
                <button
                    className='btn outline-btn p-2'
                    style={isButtonHovered ? buttonHoverStyle : buttonStyle}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                >
                    <FaArrowRight style={{ marginRight: '8px' }} />
                    View All Time Tables
                </button>
            </div>
        </div>
    );
};

export default TimeTableCard2;
