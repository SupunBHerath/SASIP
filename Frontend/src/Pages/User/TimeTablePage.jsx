import React from 'react'
import TimeTable from '../../Comporant/TimeTable/TimeTable'
import Hero from '../../Comporant/Landing/home/hero/Hero'
import Header from '../../Comporant/Landing/common/header/Header'

export default function TimeTablePage() {
  return (
    <div>
      <div className="" style={{ backgroundColor: '#80868e' }}>
        <br />
        <Header />
        <br />
      </div>
      <div className="container">
        <TimeTable />

      </div>
    </div>
  )
}
