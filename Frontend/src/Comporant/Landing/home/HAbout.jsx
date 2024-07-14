import React from "react"

import Heading from "../common/heading/Heading"
import "../allcourses/courses.css"
import { coursesCard } from "../dummydata"

const HAbout = () => {
  
  const duplicatedCourses = [...coursesCard, ...coursesCard]

  return (
    <>
      <section className='homeAbout'>
        <div className='container'>
          <Heading subtitle='our Classes' title='explore our popular Classes' />

          <div className='coursesCard'>
            <div className='scroll-container'>
              {duplicatedCourses.slice(0, 6).map((val, index) => (
                <div className='items' key={index}>
                  <div className='content flex'>
                    <div className='left'>
                      <div style={{marginLeft:'30%'}} className='img'>
                        <img src={val.cover} alt={val.coursesName} />
                      </div>
                    </div>
                    <div  style={{marginLeft:'30%'}}  className='text'>
                      <h1>{val.coursesName}</h1>
                     
                      <div className='details'>
                        {val.courTeacher.map((details, i) => (
                          <React.Fragment key={i}>
                            {/* Details content */}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='price'>
                    <h5> Institute of Universal Higher Studies<br></br>
                         Institute of Universal Higher Studies (Pvt) Ltd (IUHS Campus) is <br></br>
                          the sister company of “SASIP”, a well renowned and leading <br></br>
                          Advanced Level (A’level) private education institute that has <br></br>
                          been in operation for the past 9 years, 
                    </h5>
                  </div>
                
                </div>
              ))}
            </div>
          </div>
        </div>
       
      </section>
    </>
  )
}

export default HAbout
