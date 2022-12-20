import React from 'react';
import Card from "@mui/material/Card";

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
            <Card
                sx={{
                p: 2,
                mx: { xs: 2, lg: 3 },
                mt: -8,
                mb: 4,
                backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
                backdropFilter: "saturate(200%) blur(30px)",
                boxShadow: ({ boxShadows: { xxl } }) => xxl,
                }}
            >
                <About />
                <Team />
                <Associates />
            </Card>
            <Footer />
        </>
    );
}