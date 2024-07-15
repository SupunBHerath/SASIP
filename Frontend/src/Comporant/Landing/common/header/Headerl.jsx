import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./headerl.css"

const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <Head />
      <div className="h11">
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/'>All Courses</Link>
            </li>
            <li>
              <Link to='/'>About</Link>
            </li>
            <li>
              <Link to='/'>Team</Link>
            </li>
            <li>
              <Link to='/'>Pricing</Link>
            </li>
            <li>
              <Link to='/'>Journal</Link>
            </li>
            <li>
              <Link to='/'>Contact</Link>
            </li>
          </ul>
          <div className='start'>
            <div className='button'>SASIP INSTITUTE</div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
      </div>
    </>
  )
}

export default Header
