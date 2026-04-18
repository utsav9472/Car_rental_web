import React from 'react'
import Navbar from '../components/Navbar'
import HomeBanner from '../components/HomeBanner'
import Homecars from '../components/Homecars'
import Testimonial from '../components/Testimonial'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HomeBanner />
        <Homecars />
        <Testimonial/>
        <Footer/>
        
    </div>
  )
}

export default Home