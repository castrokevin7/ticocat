import React, { useState, useEffect } from 'react';

import { DataStore, Storage, Predicates, SortDirection } from 'aws-amplify';

import { Event } from '../../../models';

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
import SimpleBackgroundCard from "components/Cards/BackgroundCards/SimpleBackgroundCard";

import DefaultNavbar from "components/Navbars/DefaultNavbar";

// Images
import bgImage from "assets/images/eventos.jpeg";

import { getEventTitle, getEventDescription } from './Utils';

import Translator from 'utils/Translator';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { getLang } from 'utils/Translator';

function EventsPage() {
    const [state, setState] = useState('');
    const [events, setEvents] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('all');

    const fetchEvents = async () => {
        try {
            let response = await DataStore.query(Event, Predicates.ALL, {
                useCache: false,
                sort: e => e.date(SortDirection.DESCENDING)
            });
            if (response.length > 0) {
                response = await Promise.all(response.map(async (event, i) => {
                    const image = await Storage.get(event.image);
                    return Event.copyOf(event, updated => {
                        updated.image = image;
                    });
                }));
                setEvents(response);
                setFilteredEvents(response);
            }
            setState('success');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    }

    useEffect(() => {
        setState('loading');
        fetchEvents();
    }, []);

    const getEvents = () => {
        if (state === 'loading') {
            return (
                <div style={{ padding: '10px', display: 'flex' }}>
                    <div className="spinner-container">
                        <div className="loading-spinner" />
                    </div>
                </div>
            );
        }

        if (state === 'error') {
            return (
                <MKTypography ml={3} mt={2} variant="body2" color="text">
                    {Translator.instance.translate("error_tag")}
                </MKTypography>
            );
        }


        if (filteredEvents === null || filteredEvents.length === 0) {
            return <MKTypography ml={3} mt={2} variant="body2" color="text">
                {Translator.instance.translate("events_page_no_events")}
            </MKTypography>
        }

        return (
            <>
                {
                    filteredEvents.map((event, i) =>
                        <Grid key={i} item xs={12} lg={4}>
                            <Link to={`/${getLang()}/evento/${event.event_id}`}>
                                <SimpleBackgroundCard
                                    image={event.image}
                                    title={getEventTitle(event)}
                                    date={event.date}
                                    description={`${getEventDescription(event).substring(0, 31)}... ${Translator.instance.translate("events_page_see_more_from_event")}`}
                                />
                            </Link>
                        </Grid>
                    )}
            </>
        )
    }

    const filterEventsByDate = (filter) => {
        if (filter === 'all') {
            setFilteredEvents([...events]);
        } else {
            const today = new Date(new Date().toDateString());
            if (filter === 'upcoming') {
                const filtered = events.filter((event) => {
                    const date = new Date(event.date);
                    return date >= today;
                })
                setFilteredEvents([...filtered]);
            } else {
                const filtered = events.filter((event) => {
                    const date = new Date(event.date);
                    return date < today;
                })
                setFilteredEvents([...filtered]);
            }
        }
    }

    const handleSelectedFilterChange = (event) => {
        setSelectedFilter(event.target.value);
        filterEventsByDate(event.target.value);
    };

    return (
        <>
            <DefaultNavbar
                routes={[]}
                center
                sticky
                brand="asoticocat"
                action={{
                    route: `/${getLang()}`,
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
                        <Grid container item xs={12} lg={8} flexDirection="column" justifyContent="center">
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
                                {Translator.instance.translate("events_page_title")}
                            </MKTypography>
                            <MKTypography variant="body1" color="white" opacity={0.8} pr={6} mr={6}>
                                {Translator.instance.translate("events_page_description")}
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
                            <MKTypography variant="body1" color="text" mb={2}>
                                {Translator.instance.translate("events_page_events_header")}
                            </MKTypography>
                            <FormControl sx={{ marginTop: '20px' }}>
                                <RadioGroup
                                    name="row-radio-buttons-group"
                                    value={selectedFilter}
                                    onChange={handleSelectedFilterChange}
                                    sx={{
                                        flexDirection: {
                                            xs: 'column',
                                            sm: 'row',
                                            md: 'row',
                                            lg: 'row',
                                            xl: 'row',
                                        }
                                    }}
                                >
                                    <FormControlLabel value="all" control={<Radio />} label={Translator.instance.translate("events_page_all_filter")} />
                                    <FormControlLabel value="upcoming" control={<Radio />} label={Translator.instance.translate("events_page_upcoming_filter")} />
                                    <FormControlLabel value="past" control={<Radio />} label={Translator.instance.translate("events_page_past_filter")} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid container spacing={3} mt={0.1}>
                            {getEvents()}
                        </Grid>
                    </Container>
                </MKBox>
            </Card>
        </>
    );
}

export default EventsPage;