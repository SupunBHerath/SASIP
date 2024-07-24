import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"

const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      {/* <Head /> */}
      <header>
        <nav className='flexSB shadow-lg '>
          <div className='logo'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsvE9gEtv1x4EFbaD8aBI4A55L65guOAr1-g&s" alt="Logo" style={{ width: '150px'}} />
          </div>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
          <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/'>About</Link>
            </li>
            <li>
              <Link to='/teachers'>Lecturers</Link>
            </li>
            <li>
              <Link to='/timetable'>Time Table</Link>
            </li>
            <li>
              <Link to='/contact'>Contact Us</Link>
            </li>
          </ul>
          <div className='start'>
            <div className='button ' style={{cursor:'pointer'}}>SASIP INSTITUTE</div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
