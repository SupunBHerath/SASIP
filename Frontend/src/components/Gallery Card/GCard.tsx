import React from 'react'
import './GCard.css'

const GCard = (prop: any) => {
    return (
        <div>
            <div className="GCard" data-aos="zoom-in-up"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000" >
                <img src={prop.img} alt="Gallery Image" />
                <a href={prop.link}>{prop.path}</a>
            </div>
        </div>
    )
}

export default GCard
