import React from "react";
import Heading from "../common/heading/Heading";

const ImageGallery = ({ images = [] }) => {
  return (
    <div>
      <Heading subtitle="OUR Gallery" title="Recent From Blog" />

      <div className="relative overflow-hidden rounded-lg shadow-md">
        <div className="flex flex-col gap-4 p-4 md:flex-row md:p-8">
          {images.length > 0 && (
            <div className="relative overflow-hidden rounded-lg group md:w-1/2">
              <img className="image" src={images[0]} alt="Image 1" />
              <span className="overlay">Image 1</span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 md:w-1/2">
            {images.slice(1, 5).map((imageUrl, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg group"
              >
                <img
                  className="image"
                  src={imageUrl}
                  alt={`Image ${index + 2}`}
                />
                <span className="overlay">Image {index + 2}</span>
              </div>
            ))}
          </div>
        </div>
        <style>
          {`
        .relative {
          position: relative;
        }

        .overflow-hidden {
          overflow: hidden;
        }

        .rounded-lg {
          border-radius: 0.5rem;
        }

        .shadow-md {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .flex {
          display: flex;
        }

        .flex-col {
          flex-direction: column;
        }

        .md\\:flex-row {
          flex-direction: row;
        }

        .gap-4 {
          gap: 1rem;
        }

        .p-4 {
          padding: 1rem;
        }

        .md\\:p-8 {
          padding: 2rem;
        }

        .md\\:w-1\\/2 {
          width: 50%;
        }

        .grid {
          display: grid;
        }

        .grid-cols-2 {
          grid-template-columns: repeat(2, 1fr);
        }

        .transition-transform {
          transition: transform 0.3s;
        }

        .duration-300 {
          transition-duration: 0.3s;
        }

        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }

        .hover\\:blur-sm:hover {
          filter: blur(2px);
        }

        .group:hover .group-hover\\:opacity-100 {
          opacity: 1;
        }

        .image {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 0.5rem;
        }

        .overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          color: white;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .group:hover .overlay {
          opacity: 1;
        }
        `}
        </style>
      </div>
    </div>
  );
};

export default ImageGallery;
