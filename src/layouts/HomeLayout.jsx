import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Slider from '../components/slider/Slider';
import Hero from '../components/Hero';

const HomeLayout = () => {
    return (
        <div>
            <NavBar />
            <Hero></Hero>
            <Slider className="mt-2"></Slider>
            <Outlet></Outlet>
            
        </div>
    );
};

export default HomeLayout;