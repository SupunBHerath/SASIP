import React from 'react'
import "./Card.css"
function Card({ details }) {
    return (
        <div>
            <figure className="snip1369 green">
                <img src={details.imageUrl} style={{height:"400px",width:"auto"}} alt="pr-sample15" />
                <div className="image"><img src={details.imageUrl} alt="pr-sample15" /></div>
                <figcaption>
                    <h3>{details.title}</h3>
                    <p>{details.desc}</p>
                </figcaption>
                <span className='read-more'>
                    {details.isBtnVisible && (
                        <>
                            SUBSCRIBE <i className="ion-android-arrow-forward"></i>
                        </>
                    )}
                    <a href="#"></a>
                </span>

            </figure>
        </div>
    )
}

export default Card
