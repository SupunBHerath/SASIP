import React from "react";
import Heading from "../common/heading/Heading";
import "../allcourses/courses.css";
const coursesCard = [
  {
    cover: "../../../../public/image/maths.jpg",
    coursesName: "Course 1",
    courTeacher: ["Teacher A", "Teacher B"]
  },
  {
    cover: "../../../../public/maths.jpg",
    coursesName: "Course 2",
    courTeacher: ["Teacher C", "Teacher D"]
  },
  {
    cover: "../../../../public/maths.jpg",
    coursesName: "Course 2",
    courTeacher: ["Teacher C", "Teacher D"]
  },
  {
    cover: "../../../../public/maths.jpg",
    coursesName: "Course 2",
    courTeacher: ["Teacher C", "Teacher D"]
  },

];

const HAbout = () => {
  const duplicatedCourses = [...coursesCard, ...coursesCard];

  return (
    <>
      <section className="homeAbout">
        <div className="container">
          <Heading className="titlem" subtitle="our Classes" title="explore our popular Classes" />

          <div className="coursesCard">
            <div className="scroll-container">
              {duplicatedCourses.slice(0).map((val, index) => (
                <div className="items" key={index}>
                  <div className="seccard" >
                    <div className="content flex">
                      <div className="text">
                        <img src={val.cover} alt=""  style={{width:'350px',height:'350px',objectFit:'fill'}}/>
                         
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HAbout;
