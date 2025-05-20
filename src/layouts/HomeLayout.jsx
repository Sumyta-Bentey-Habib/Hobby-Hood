import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <div>
            <NavBar />
            <Outlet></Outlet>
            
        </div>
    );
};

export default HomeLayout;