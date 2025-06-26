import React from 'react';
import Slider from '../components/slider/Slider';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Faq from '../components/Faq';
const Home = () => {
  return (
    <div>
        <Hero></Hero>
        <Slider></Slider>
        <Card></Card>
        <Faq></Faq>
    </div>
  );
};

export default Home;
