import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
           
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsvE9gEtv1x4EFbaD8aBI4A55L65guOAr1-g&s" alt="Logo" style={{ width: '150px' }} />
           
          </div>

          <div className='social'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-youtube icon'></i>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
