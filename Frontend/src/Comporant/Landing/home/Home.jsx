// import Testimonal from "./testimonal/Testimonal";
import ImageGalleryContainer from "./ImageGalleryContainer";
import Header from "../common/header/Headerl";
import React from "react";
import AboutCard from "../about/AboutCard";
import Hblog from "./Hblog";
import HAbout from "./HAbout";
import Hero from "./hero/Hero";
import Heading from "../common/header/Header";
import Footer from "../common/footer/Footer";
import "./Home.css";
import Testimonal from "./testimonal/Testimonal";
import SocialMediaSidebar from "../../Social/SocialMediaSidebar";
import TimeTableCard2 from "../../TimeTable/TimeTableCard2";
import Card from "./Card";
import BasicSpeedDial from "../../ChatBot/SpeedDial";
import Navbar from "../../Navibar/Navbar";
import Head from "../common/header/Head";

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Navbar/>
      <BasicSpeedDial/>
      <Hero />
      <AboutCard />
      <HAbout />
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
