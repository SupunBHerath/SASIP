
// import Testimonal from "./testimonal/Testimonal";
import ImageGalleryContainer from "./ImageGalleryContainer";
import Header from "../common/header/Headerl";
import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Heading from "../common/header/Header"
import Footer from "../common/footer/Footer"
import "./Home.css"
import Testimonal from "./testimonal/Testimonal"
import SocialMediaSidebar from "../../Social/SocialMediaSidebar"
import TimeTableCard2 from "../../TimeTable/TimeTableCard2"
import BasicSpeedDial from "../../ChatBot/SpeedDial";
import Lectures from "../../../Pages/team/lectures";

const Home = () => {
  return (
    <>
      <Header />
      <SocialMediaSidebar />
      {/* <Heading /> */}
      <BasicSpeedDial/>
      <Hero />
      <AboutCard />
      <HAbout />
      <Lectures/>
      <Testimonal />
      <div className="text-center">
        <h1 style={{color:'#00796b'}} className="">[ Time Table ]</h1>
        <br /><br />
      </div>
      <TimeTableCard2 />
      <ImageGalleryContainer />

      {/* <Hblog /> */}
      <Footer />
    </>
  );
};

export default Home;
