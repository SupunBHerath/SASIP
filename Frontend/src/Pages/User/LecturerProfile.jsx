/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function Profile() {
  return (
    <div className="container" id="c">
      <div className="w-full p-6 bg-card text-card-foreground">
        <style>{`
       
          @media (max-width: 768px) {
            .flex-1 {
              width: 100%; /* Make the flex container full width */
            } #c{
                  padding: 0;
                  margin:0;
               }
           
            
            .bg-black {
              padding-top: 20px; /* Add top padding to the black card */
            }

            .widget-title {
              font-size: 3rem; /* Mobile font size for h2 */
            }
            .widget-subtitle {
              font-size: 2rem; /* Mobile font size for h3 */
            }
            .widget-text-xl {
              font-size: 1.25rem; /* Mobile font size for text-xl */
            }
          }

          /* Style for large screens (min-width: 768px) */
          @media (min-width: 768px) {
          
            .bg-black {
              margin-top: 120px; /* Add top margin to the black card */
            }

            .widget-title {
              font-size: 4rem; /* Tablet/Desktop font size for h2 */
            }
            .widget-subtitle {
              font-size: 3rem; /* Tablet/Desktop font size for h3 */
            }
            .widget-text-xl {
              font-size: 1.5rem; /* Tablet/Desktop font size for text-xl */
            }
          }
             
        `}</style>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src="../../../public/Icon/lecturer2.png"
            style={{ height: "407px" }}
            alt="Profile Picture"
            className=" md:mr-6 mb-6 md:mb-0 rounded-lg "
          />
          <div className="flex-1">
            <div className="bg-black text-primary-foreground p-6 rounded-lg shadow-md w-100">
              <h2 className="text-4xl font-bold">Dr. Jane Doe</h2>
              <br />
              <br />
              <table>
                <tr>
                  <td>
                    <span className="mt-5 widget-text-xl">
                      <strong className="p-3">Subject </strong>
                    </span>
                  </td>
                  <td>
                    <span className="mt-5 widget-text-xl">
                      <span className="p-3">Physics </span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="mt-5 widget-text-xl">
                      <strong className="p-3">Stream </strong>
                    </span>
                  </td>
                  <td>
                    <span className="mt-5 widget-text-xl">
                      <span className="p-3">Science </span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="mt-5 widget-text-xl">
                      <strong className="p-3">Medium </strong>
                    </span>
                  </td>
                  <td>
                    <span className="mt-5 widget-text-xl">
                      <span className="p-3">English / Sinhala </span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="mt-5 widget-text-xl">
                      <strong className="p-3">Experince </strong>
                    </span>
                  </td>
                  <td>
                    <span className="mt-5 widget-text-xl">
                      <span className="p-3">Since 2000</span>
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className="mb-2 inline-block rounded bg-[#1877f2] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
              >
                <span className="[&>svg]:h-4 [&>svg]:w-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 320 512"
                  >
                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                  </svg>
                </span>
              </button>
              <button
                type="button"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className="mb-2 inline-block rounded bg-[#0088cc] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
              >
                <span className="[&>svg]:h-4 [&>svg]:w-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 496 512"
                  >
                    <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
                  </svg>
                </span>
              </button>

              <button
                type="button"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                className="mb-2 inline-block rounded bg-[#ff0000] px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
              >
                <span className="[&>svg]:h-4 [&>svg]:w-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 576 512"
                  >
                    <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        <hr className="my-6 border-muted" />
        <div>
          <h3 className="widget-subtitle font-bold">Bio</h3>
          <p className="text-muted-foreground mt-2 widget-text-xl">
            Dr. Jane Doe is a seasoned educator and researcher with over 15
            years of experience in Computer Science. Her expertise lies in
            Artificial Intelligence, particularly in the fields of Machine
            Learning and Natural Language Processing. She is passionate about
            fostering the next generation of tech innovators and her teaching
            style is known for its engaging and practical approach.
          </p>
        </div>
        <hr className="my-6 border-muted" />
        <div>
          <h3 className="widget-subtitle font-bold">Qualifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-accent text-accent-foreground p-6 rounded-lg shadow-md flex items-center transform hover:scale-105 transition duration-500">
              <img
                src="../../../public/Icon/Logo_color.png"
                alt="Qualification Icon"
                className="w-12 h-12 rounded-full mr-6"
              />
              <div>
                <h4 className="font-bold">Ph.D. in Computer Science</h4>
                <p className="text-muted-foreground">
                  Stanford University, USA (2005)
                </p>
                <p className="text-muted-foreground">
                  Thesis: "Advanced Techniques in Deep Learning for Natural
                  Language Processing"
                </p>
              </div>
            </div>
            <div className="bg-accent text-accent-foreground p-6 rounded-lg shadow-md flex items-center transform hover:scale-105 transition duration-500">
              <img
                src="../../../public/Icon/Logo_color.png"
                alt="Qualification Icon"
                className="w-12 h-12 rounded-full mr-6"
              />
              <div>
                <h4 className="font-bold">Ph.D. in Computer Science</h4>
                <p className="text-muted-foreground">
                  Stanford University, USA (2005)
                </p>
                <p className="text-muted-foreground">
                  Thesis: "Advanced Techniques in Deep Learning for Natural
                  Language Processing"
                </p>
              </div>
            </div>
            <div className="bg-accent text-accent-foreground p-6 rounded-lg shadow-md flex items-center transform hover:scale-105 transition duration-500">
              <img
                src="../../../public/Icon/Logo_color.png"
                alt="Qualification Icon"
                className="w-12 h-12 rounded-full mr-6"
              />
              <div>
                <h4 className="font-bold">Ph.D. in Computer Science</h4>
                <p className="text-muted-foreground">
                  Stanford University, USA (2005)
                </p>
                <p className="text-muted-foreground">
                  Thesis: "Advanced Techniques in Deep Learning for Natural
                  Language Processing"
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-muted" />
        <div>
          <h3 className="widget-subtitle font-bold">Timetable</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-muted p-4 rounded-lg shadow-md">
              <img
                src="https://placehold.co/300x200"
                alt="Timetable Slot 1"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="bg-muted p-4 rounded-lg shadow-md">
              <img
                src="https://placehold.co/300x200"
                alt="Timetable Slot 2"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="bg-muted p-4 rounded-lg shadow-md">
              <img
                src="https://placehold.co/300x200"
                alt="Timetable Slot 3"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
