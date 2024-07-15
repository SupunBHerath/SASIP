import React from "react";
import AboutCard from "../about/AboutCard";
import Hblog from "./Hblog";
import HAbout from "./HAbout";
import Hero from "./hero/Hero";
import Heading from "../common/header/Header";
import Footer from "../common/footer/Footer";
import "./Home.css";
import Testimonal from "./testimonal/Testimonal";
import ImageGalleryContainer from "./ImageGalleryContainer";

const Home = () => {
  return (
    <>
      <Heading />
      <Hero />
      <AboutCard />
      <HAbout />
      <Testimonal />
      <ImageGalleryContainer />
      <Footer />
    </>
  );
};

export default Home;
