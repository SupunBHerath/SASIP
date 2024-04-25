import React from 'react'
import Navibar from '../../components/Navibar/Navibar'
import Sideshow from '../../components/Sideshow/Sideshow'
import { LandingAboutUS } from '../../components/LandingAboutUS/LandingAboutUS'
import Gallery from '../../components/Gallery/Gallery'

const landing = () => {
  return (
    <div>
      <Navibar/>
      <Sideshow/>
      <LandingAboutUS/>
      <Gallery/>
    </div>
  )
}

export default landing
