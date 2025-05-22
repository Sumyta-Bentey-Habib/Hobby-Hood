import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Slider from '../components/slider/Slider';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Faq from '../components/Faq';

const HomeLayout = () => {
    return (
        <div>
            <NavBar />
            <Hero></Hero>
            <Slider className="mt-2"></Slider>
            <Outlet></Outlet>
            <Card></Card>
            <Faq></Faq>
            <Footer></Footer>    
        </div>
    );
};

export default HomeLayout;