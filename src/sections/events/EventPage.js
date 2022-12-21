import React, { useState } from 'react';
import { useParams } from 'react-router';

import { Event } from '../../models';
import { DataStore, Storage } from 'aws-amplify';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";

const useConstructor = (callBack = () => { }) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}

function EventPage() {
    const [state, setState] = useState('');
    const [event, setEvent] = useState(null);
    const { eventId } = useParams();


    const fetchEvent = async () => {
        setState('loading');
        try {
            let response = await DataStore.query(Event, e => e.event_id('eq', eventId));
            if (response.length > 0) {
                response = response[0];
                if (response.image) {
                    const image = await Storage.get(response.image);
                    const updateFrom = new Event({
                        image,
                        event_id: response.event_id,
                        title: response.title,
                        description: response.description,
                        date: response.date,
                        location: response.location,
                        location_url: response.location_url,
                        gallery: response.gallery
                    });
                    response = Event.copyOf(updateFrom, updated => {
                        updated.event_id = updateFrom.event_id;
                        updated.image = updateFrom.image;
                        updated.title = updateFrom.title;
                        updated.description = updateFrom.description;
                        updated.date = updateFrom.date;
                        updated.location = updateFrom.location;
                        updated.location_url = updateFrom.location_url;
                        updated.gallery = updateFrom.gallery;
                    });
                }

                if (response.gallery) {
                    const gallery = await Promise.all(
                        response.gallery.map(async image => {
                            const signedUrl = await Storage.get(image);
                            return signedUrl;
                        })
                    );
                    const updateFrom = new Event({
                        gallery,
                        image: response.image,
                        event_id: response.event_id,
                        title: response.title,
                        description: response.description,
                        date: response.date,
                        location: response.location,
                        location_url: response.location_url
                    });
                    response = Event.copyOf(updateFrom, updated => {
                        updated.event_id = updateFrom.event_id;
                        updated.image = updateFrom.image;
                        updated.title = updateFrom.title;
                        updated.description = updateFrom.description;
                        updated.date = updateFrom.date;
                        updated.location = updateFrom.location;
                        updated.location_url = updateFrom.location_url;
                        updated.gallery = updateFrom.gallery;
                    });
                }
            }
            setEvent(response);
            setState('success');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    };

    const viewEvent = () => {
        return (
            <>
                <DefaultNavbar
                    routes={[]}
                    center
                    sticky
                    brand="asoticocat"
                    action={{
                        route: "/eventos",
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
                            backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.dark.main, 0.4), rgba(gradients.dark.state, 0.4))}, url(${event.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <Container>
                            <Grid
                                container
                                item
                                xs={12}
                                lg={6}
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                textAlign="center"
                                mx="auto"
                            >
                                <MKTypography
                                    variant="h1"
                                    color="white"
                                    sx={({ breakpoints, typography: { size } }) => ({
                                        [breakpoints.down("md")]: {
                                            fontSize: size["3xl"],
                                        },
                                    })}
                                    mb={3}
                                >
                                    {event.title}
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
                            <Grid
                                container
                                item
                                xs={8}
                                flexDirection="column"
                                alignItems="center"
                                mx="auto"
                                textAlign="center"
                                mb={6}
                            >
                                <MKTypography variant="body2" color="text">
                                    {event.description}
                                </MKTypography>
                            </Grid>
                            <Grid container spacing={3} minHeight={{
                                xs: "80vh",
                                sm: "80vh",
                                md: "60vh",
                                lg: "70vh",
                                xl: "80vh"
                            }}>
                                { event.gallery.map((image) => 
                                    <Grid item xs={12} sm={12} md={4}>
                                        <MKBox
                                            width="100%"
                                            height="100%"
                                            borderRadius="lg"
                                            shadow="md"
                                            sx={{
                                                backgroundImage: `url(${image})`,
                                                backgroundSize: "cover",
                                            }}
                                        />
                                    </Grid>
                                ) }
                            </Grid>
                        </Container>
                    </MKBox>
                </Card>
            </>
        )
    };

    useConstructor(() => {
        setState('loading');
        fetchEvent();
    });

    if (state === 'error') {
        return (
            <h1>
                Hubo un error...
            </h1>
        );
    }

    return (
        <>
            {state === 'loading' ? (
                <div style={{ padding: '10px', display: 'flex' }}>
                    <div className="spinner-container">
                        <div className="loading-spinner" />
                    </div>
                    Cargando
                </div>
            )
                :
                (
                    event ? viewEvent() : <span style={{ padding: '10px' }}>Evento {eventId} no existe.</span>
                )}
        </>
    )
}

export default EventPage;