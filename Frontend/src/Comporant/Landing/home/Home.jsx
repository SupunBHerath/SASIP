import ImageGalleryContainer from "./ImageGalleryContainer";
import BasicSpeedDial from "../../ChatBot/SpeedDial";
import AboutCard from "../about/AboutCard"
import "./Home.css"
import Testimonal from "./testimonal/Testimonal"
import TimeTableCard2 from "../../TimeTable/TimeTableCard2"
import React from 'react';
import HAbout from "./HAbout";
import CardSlide from "./upcomming/CardSlide";
import Heading from "../common/heading/Heading";
import Footer from "../../../Pages/User/Footer";
import Landing from "../../Hero/Hero";


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
      <Heading title="[Lecturers Reviews]" />
      <Testimonal />

      <div className="space" style={{ height: '50px' }}></div>
      <Heading title="[ Gallery ]" />
      <ImageGalleryContainer />

      <div className="space" style={{ height: '50px' }}></div>
      <Footer />

    </>
  );
};

export default Home;


