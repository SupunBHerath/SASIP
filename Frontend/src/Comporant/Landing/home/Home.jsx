// import Testimonal from "./testimonal/Testimonal";
import ImageGalleryContainer from "./ImageGalleryContainer";
import Card from "./Card";
import BasicSpeedDial from "../../ChatBot/SpeedDial";
import Navbar from "../../Navibar/Navbar";
import Head from "../common/header/Head";
import AboutCard from "../about/AboutCard"
import Hero from "./hero/Hero"
// import Footer from "../common/footer/Footer"
import "./Home.css"
import Testimonal from "./testimonal/Testimonal"
import SocialMediaSidebar from "../../Social/SocialMediaSidebar"
import TimeTableCard2 from "../../TimeTable/TimeTableCard2"
import React from 'react';
import HAbout from "./HAbout";
import LandingHero from "../../Hero/LandingHero";

import Landing from "../../Hero/Landing"; 
import CardSlide from "./upcomming/CardSlide";
import Heading from "../common/heading/Heading";
import Footer from "../../../Pages/User/Footer";


const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Landing />
      <BasicSpeedDial/>
      {/* <Hero /> */}
      <Heading title="[ Upcomming News]" />
   
      <CardSlide />

      <AboutCard />

      <Heading title="[Popular Lecturers]" />
      <HAbout />

      <Heading title="[ Time Table ]" />
      <TimeTableCard2 />


      <Testimonal />

    

      <Heading title="[ Gallery ]" />
      <ImageGalleryContainer />

      <Footer />

    </>
  );
};

export default Home;


