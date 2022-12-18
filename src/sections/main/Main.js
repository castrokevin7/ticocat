import React from 'react';

import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Team from './Team';
import Associates from './Associates';
import Footer from './Footer';

export default function Main() {
    return (
        <>
            <Navbar />
            <Home />
            <About />
            <Team />
            <Associates />
            <Footer />
        </>
    );
}