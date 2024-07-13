import React, { useState } from 'react';
import Navibar from '../../components/Navibar/Navibar';
import color from '../../components/CSS/Color'; // Assuming color is exported from Color.css


function Lectures() {
    const [selectedListItem, setSelectedListItem] = useState<number | null>(null); // Stores the index of the selected list item

    const handleClick = (index: number) => {
        setSelectedListItem(index); // Update selected index on click
    };

    return (
        <div>
            <Navibar />
            <div className="lectures-container d-flex flex-row  ">

                <div className="sidebar  sticky-top d-flex flex-column col-lg-1">
                    <a
                        className="sidebar-header d-block p-3 text-decoration-none  bg-black text-light "
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

                <div className="content d-flex justify-content-center  col-lg-11 mt-lg-3 ">
                    <div className="col-3 card ">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>

                    </div>
                    <div className="col-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>


                    </div>
                    <div className="col-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>

                    </div>
                    



                </div>

            </div>


        </div>

    );
}

export default Lectures;
