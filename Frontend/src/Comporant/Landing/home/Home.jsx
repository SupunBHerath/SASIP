import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Heading from "../common/header/Header"
import Headingl from "../common/header/Headerl"
import Footer from "../common/footer/Footer"
import "./Home.css"
import Testimonal from "./testimonal/Testimonal"

const Home = () => {
  return (
    <>
      <Headingl />
      <Hero />
      <AboutCard />
      <HAbout />
      <Testimonal />
      <Hblog />
     <Footer />
    </>
  )
}

export default Home
