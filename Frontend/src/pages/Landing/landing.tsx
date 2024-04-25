import React from 'react'
import Navibar from '../../components/Navibar/Navibar'
import Sideshow from '../../components/Sideshow/Sideshow'
import { LandingAboutUS } from '../../components/LandingAboutUS/LandingAboutUS'

const landing = () => {
  return (
    <div>
      <Navibar/>
      <Sideshow/>
      <LandingAboutUS/>
    </div>
  )
}

export default landing
