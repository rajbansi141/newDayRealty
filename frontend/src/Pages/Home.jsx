import React from 'react';
import Hero from '../Components/Hero';
import FeaturedProperties from '../Components/FeaturedProperties';
import StatsSection from '../Components/StatsSection';
import CallToAction from '../Components/CallToAction';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">  
        <Hero />
        <StatsSection />
        <FeaturedProperties />
        <CallToAction />
    </div>
  )
}

export default Home