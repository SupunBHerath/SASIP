import React from "react";
import "../blog/blog.css";
import { blog } from "../dummydata";
import Heading from "../common/heading/Heading";

// copy code of blog => blogCard

const Hblog = () => {
  return (
    <>
      <section className="blog">
        <div className="container">
          <Heading subtitle="OUR Gallery" title="Recent From Blog" />
          <div className="grid2">
            {blog.slice(0, 6).map((val) => (
              <div className="items shadow" key={val.id}>
                <div className="img">
                  <img src={val.cover} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hblog;
