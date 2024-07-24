import React from "react";
import TeamCard from "../../Comporant/Card/TeamCard";
import '../../../public/Image/team/t1.webp'
import "./team.css";
import Heading from "../../Comporant/Landing/common/heading/Heading";

const Lectures = () => {
  const teamMembers = [
    {
      name: "John Doe",
      work: "Software Engineer",
      cover: "../../../public/Image/team/t1.webp",
    },
    {
      name: "Jane Smith",
      work: "Product Manager",
      cover: "../../../public/Image/team/t1.webp",
    },
    {
      name: "Sam Wilson",
      work: "UX Designer",
      cover: "../../../public/Image/team/t1.webp",
    },
    {
      name: "Sam Wilson",
      work: "UX Designer",
      cover: "../../../public/Image/team/t1.webp",
    },
  ];

  return (
    <div className="teacher">
      <Heading  title='[ Our Sasip Lectures ]' />
      <section className=" team padding">
        <div className="container grid">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </section>
    </div>

  );
};

export default Lectures;
