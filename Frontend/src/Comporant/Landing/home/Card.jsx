import React, { useEffect } from "react";
import "./HAbout.css"; // Import your CSS file

function Card(props) {
  const isLecturer = props.isLecturer;

  useEffect(() => {
    // JavaScript for diagonal animation
    const flipBox = document.querySelector(".flip-box-front.btn-6");

    flipBox.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const span = this.querySelector("span");
      span.style.left = `${x}px`;
      span.style.top = `${y}px`;
    });

    flipBox.addEventListener("mouseleave", function () {
      const span = this.querySelector("span");
      span.style.removeProperty("left");
      span.style.removeProperty("top");
    });
  }, []);

  return (
    
    <div className="p-2">
    <div className="flip-box">
      {/* Front side */}
      <div
        className="flip-box-front text-center btn-6" // Apply btn-6 class for diagonal animation
        style={{
          backgroundImage: `url(${props.img})`,
        }}
      >
        <div className="inner color-white ">
          <h3 className="flip-box-header">{props.firstSideFirstTittle}</h3>
          <h3 className="flip-box-header1">{props.firstSideSecondTittle}</h3>
          <p>{props.firstDesc}</p>
          <span></span> {/* Diagonal animation element */}
        </div>
      </div>

      {/* Back side */}
      <div
        className="flip-box-back text-center"
        style={{
          backgroundImage: `url(${props.img})`,
        }}
      >
        <div className="inner color-white">
          <h3 className="flip-box-header">{props.secondTittle}</h3>
          <p>{props.secondDesc}</p>
          {isLecturer && (
            <div className="cus-btn">
              <button id="button-3">View Profile</button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Card;
