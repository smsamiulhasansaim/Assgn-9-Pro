import React from 'react';
import Navbar from '../../components/common/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../components/common/Footer/Footer';

const Root = () => {
    return (
        <>
         <Navbar></Navbar>  
         <Outlet></Outlet>
         <Footer></Footer>
        </>
    );
};

export default Root;