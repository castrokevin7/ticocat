import React, { useState } from 'react';

import { DataStore, Storage } from 'aws-amplify';

import { Event } from '../../models';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Otis Kit PRO examples
import SimpleBackgroundCard from "examples/Cards/BackgroundCards/SimpleBackgroundCard";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Images
import bgImage from "assets/images/bg-coworking.jpeg";

const useConstructor = (callBack = () => { }) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}

function EventsPage() {
    const [state, setState] = useState('');
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        setState('loading');
        try {
            let response = await DataStore.query(Event);
            console.log(response);
            if (response.length > 0) {
                response = await Promise.all(response.map(async (event, i) => {
                    const image = await Storage.get(event.image);
                    return new Event({
                        image,
                        event_id: event.event_id,
                        title: event.title,
                        description: event.description,
                        date: event.date,
                        location: event.location,
                        location_url: event.location_url,
                        gallery: event.gallery
                    });
                }));
                console.log(response);
                setEvents(response);
                setState('success');
            }
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    }

    const getEvents = () => {
        if (state === 'loading') {
            return (
                <div style={{ padding: '10px', display: 'flex' }}>
                    <div className="spinner-container">
                        <div className="loading-spinner" />
                    </div>
                    Cargando
                </div>
            );
        }

        if (state === 'error') {
            return (
                <h1>
                    Hubo un error...
                </h1>
            );
        }

        return (
            <>
                {events.map((event, i) =>
                    <Grid key={i} item xs={12} lg={4}>
                        <Link to={`/evento/${event.event_id}`}>
                            <SimpleBackgroundCard
                                image={event.image}
                                title={event.title}
                                description={event.description.substring(0, 127)}
                            />
                        </Link>
                    </Grid>
                )}
            </>
        )
    }

    useConstructor(() => {
        setState('loading');
        fetchEvents();
    });

    return (
        <>
            <DefaultNavbar
                routes={[]}
                center
                sticky
                brand="asoticocat"
                action={{
                    route: "/",
                    color: "info",
                    icon: "arrow_circle_left_rounded",
                    variant: "text",
                    size: "large",
                    minimal: true
                }}
            />
            <MKBox component="header" position="relative">
                <MKBox
                    display="flex"
                    alignItems="center"
                    minHeight="100vh"
                    sx={{
                        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.dark.main, 0.5), rgba(gradients.dark.state, 0.5))}, url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Container>
                        <Grid container item xs={12} md={7} lg={6} flexDirection="column" justifyContent="center">
                            <MKTypography
                                variant="h1"
                                color="white"
                                mb={3}
                                sx={({ breakpoints, typography: { size } }) => ({
                                    [breakpoints.down("md")]: {
                                        fontSize: size["3xl"],
                                    },
                                })}
                            >
                                Eventos
                            </MKTypography>
                            <MKTypography variant="body1" color="white" opacity={0.8} pr={6} mr={6}>
                                Espacios para la comunidad
                            </MKTypography>
                        </Grid>
                    </Container>
                </MKBox>
            </MKBox>
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
                <MKBox component="section" py={6}>
                    <Container>
                        <Grid container item xs={12} lg={6} flexDirection="column">
                            <MKTypography variant="h3" mt={3} mb={1}>
                                Build something great
                            </MKTypography>
                            <MKTypography variant="body2" color="text" mb={2}>
                                We&apos;re constantly trying to express ourselves and actualize our dreams. If you have
                                the opportunity to play this game of life you need to appreciate every moment.
                            </MKTypography>
                        </Grid>
                        <Grid container spacing={3} mt={3}>
                            {getEvents()}
                        </Grid>
                    </Container>
                </MKBox>
            </Card>
        </>
    );
}

export default EventsPage;