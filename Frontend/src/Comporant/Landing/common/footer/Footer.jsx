import React from "react";
import { blog } from "../../dummydata";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>where we strive to provide top-quality tutoring service</h1>
            <span>Far far away, behind the word mountains</span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Enter email address' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section>
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsvE9gEtv1x4EFbaD8aBI4A55L65guOAr1-g&s" alt="Logo" style={{ width: '190px', height: '70px' }} />
            <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Classes</li>
              <li>Teachers</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
              <li>Gallery</li>
              <li>IUHS</li>
              <li>Calender</li>
              <li>Privacy</li>
              <li>Feedbacks</li>
            </ul>
          </div>
          <div className='box'>
            <h3>Recent Post</h3>
            {blog.slice(0, 3).map((val, index) => (
              <div className='items flexSB' key={index}>
                <div className='img'>
                  <img src={val.cover} alt='' />
                  <i className='fa fa-calendar-alt'></i>
                  <i className='fa fa-user'></i>
                </div>
                <div className='text'>
                  {/* Additional content can go here */}
                </div>
              </div>
            ))}
          </div>
          <div className='box last'>
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                Sasip Nugegoda
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                +94-772662662
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                sasip@yourdomain.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2022 All rights reserved | This template is made with <i className='fa fa-heart'></i> by GorkhCoder
        </p>
      </div>
    </>
  );
}

export default Footer;
