import React from "react"
import { testimonal } from "../../dummydata"
import "./style.css"

const Testimonal = () => {
  return (
    <>
      <section className='testimonal padding'>
        <div className='container'>
      

          <div className='content grid2'>
            {testimonal.map((val, index) => (
              <div className='items shadow' key={val.id || index}>
                <div className='box flex'>
                  <div className='img'>
                    <img src={val.cover} alt={val.name} />
                
                  </div>
                  <div className='name'>
                    <h2>{val.name}</h2>
                    <span>{val.post}</span>
                  </div>
                </div>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonal
