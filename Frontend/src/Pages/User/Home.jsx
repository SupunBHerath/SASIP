import ImageGalleryContainer from "../../Comporant/Landing/home/ImageGalleryContainer";
import BasicSpeedDial from "../../Comporant/ChatBot/SpeedDial";
import AboutCard from "../../Comporant/Landing/about/AboutCard"
import Testimonal from "../../Comporant/Landing/home/testimonal/Testimonal"
import TimeTableCard2 from "../../Comporant/TimeTable/TimeTableCard2"
import React from 'react';
import HAbout from "../../Comporant/Landing/home/HAbout";
import CardSlide from "../../Comporant/Landing/home/upcomming/CardSlide";
import Heading from "../../Comporant/Landing/common/heading/Heading";
import Footer from "./Footer";
import Landing from "../../Comporant/Hero/Hero";


const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Landing/>

      <BasicSpeedDial />
      <br />
      <Heading title="[ Upcomming News]" />
      <CardSlide />
      <div className="space" style={{ height: '50px' }}></div>

      <AboutCard />
      <div className="space" style={{ height: '50px' }}></div>

      <Heading title="[Popular Lecturers]" />
      <HAbout />


      <div className="space" style={{ height: '50px' }}></div>
      <Heading title="[ Time Table ]" />
      <TimeTableCard2 />

      <div className="space" style={{ height: '50px' }}></div>
      {/* <Heading title="[Lecturers Reviews]" /> */}
      {/* <Testimonal /> */}

      <div className="space" style={{ height: '50px' }}></div>
      <Heading title="[ Gallery ]" />
      <ImageGalleryContainer />

      <div className="space" style={{ height: '50px' }}></div>
      <Footer />

    </>
  );
};

export default Home;


