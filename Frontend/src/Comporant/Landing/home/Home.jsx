// import Testimonal from "./testimonal/Testimonal";
import ImageGalleryContainer from "./ImageGalleryContainer";
import Card from "./Card";
import BasicSpeedDial from "../../ChatBot/SpeedDial";
import Navbar from "../../Navibar/Navbar";
import Head from "../common/header/Head";
import AboutCard from "../about/AboutCard"
import Hero from "./hero/Hero"
import Footer from "../common/footer/Footer"
import "./Home.css"
import Testimonal from "./testimonal/Testimonal"
import SocialMediaSidebar from "../../Social/SocialMediaSidebar"
import TimeTableCard2 from "../../TimeTable/TimeTableCard2"
import React from 'react';
import HAbout from "./HAbout";
import LandingHero from "../../Hero/LandingHero";

import Landing from "../../Hero/Landing"; 
import CardSlide from "./upcomming/CardSlide";


const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Landing />
      {/* <BasicSpeedDial/>
      <Hero /> */}
      <AboutCard />
      <HAbout />
      <CardSlide />
      <Testimonal />
      <div className="text-center">
        <h1 style={{ color: "#00796b" }}>[ Time Table ]</h1>
        <br />
        <br />
      </div>
      <TimeTableCard2 />
      <ImageGalleryContainer />

      <Footer />
    </>
  );
};

export default Home;


