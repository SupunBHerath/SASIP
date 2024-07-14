import React from "react"
import { awrapper } from "../dummydata"

const Awrapper = () => {
  return (
    <>
      <section className='awrapper'>
        <div className='container grid'>
          {awrapper.map((val, index) => {
            return (
              <div className='box flex' key={val.id || index}>
                <div className='img'>
                  <img src={val.cover} alt={val.title} />
                </div>
                <div className='text'>
                  <h1>{val.data}</h1>
                  <h3>{val.title}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Awrapper
