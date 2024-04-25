import React, { useState } from 'react';
import Navibar from '../../components/Navibar/Navibar';
import color from '../../components/CSS/Color'; // Assuming color is exported from Color.css

function Lectures() {
    const [selectedListItem, setSelectedListItem] = useState(null); // Stores the index of the selected list item

    const handleClick = (index) => {
        setSelectedListItem(index); // Update selected index on click
    };

    return (
        <div className="lectures-container">
            <Navibar />

            <div className="sidebar  sticky-top">
                <a
                    className="sidebar-header d-block p-3 text-decoration-none col-lg-1 bg-black text-light "
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                >
                    <h4>SUBJECT STREAM</h4>
                </a>
                <ul className={`nav nav-pills nav-flush flex-column mb-auto text-center col-lg-1 shadow`}>
                    {['All', 'Science', 'Commerce', 'Tech', 'Arts', 'Others'].map(
                        (item, index) => (
                            <li key={index} className="nav-item">
                                <a
                                    href="#"
                                    className={`nav-link py-3 border-bottom rounded-0 ${index === selectedListItem ? 'text-white' : ''
                                        }`}
                                    style={{ backgroundColor: index === selectedListItem ? color.primaryColor : '' }} // Apply background color on selection
                                    onClick={() => handleClick(index)}
                                    title={item}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                >
                                    <h5>{item}</h5>
                                </a>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>

    );
}

export default Lectures;
