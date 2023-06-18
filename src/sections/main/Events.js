import React, { useState, useEffect } from 'react';

import { DataStore, Storage, Predicates, SortDirection, Hub } from 'aws-amplify';

import { Event } from '../../models';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Icon from "@mui/material/Icon";

// Otis Kit PRO examples
import SimpleBackgroundCard from "examples/Cards/BackgroundCards/SimpleBackgroundCard";

import Translator from 'utils/Translator';

import { getEventTitle, getEventDescription } from '../events/Utils';

function Events() {
    const [state, setState] = useState('');
    const [events, setEvents] = useState(null);

    const fetchEvents = async () => {
        try {
            let response = await DataStore.query(Event, Predicates.ALL, {
                useCache: false,
                sort: e => e.date(SortDirection.DESCENDING)
            });
            if (response.length > 0) {
                response = await Promise.all(response.map(async (event, i) => {
                    const image = await Storage.get(event.image);
                    return new Event({
                        image,
                        event_id: event.event_id,
                        title: event.title,
                        title_cat: event.title_cat,
                        description: event.description,
                        description_cat: event.description_cat,
                        date: event.date,
                        time: event.time,
                        contact: event.contact,
                        location_url: event.location_url,
                        gallery: event.gallery
                    });
                }));
                setEvents(response.slice(0, 3));
            }
            setState('');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    }

    useEffect(() => {
        setState('loading');
        const removeListener = Hub.listen("datastore", async (capsule) => {
            const {
                payload: { event },
            } = capsule;

            if (event === "ready") {
                fetchEvents();
            }
        });
        
        DataStore.start();

        return () => {
            removeListener();
        };
    }, []);

    const getEvents = () => {
        if (state === 'loading') {
            return (
                <div style={{ padding: '10px', display: 'flex' }}>
                    <div className="spinner-container">
                        <div className="loading-spinner" />
                    </div>
                    {Translator.instance.translate("loading_tag")}
                </div>
            );
        }

        if (state === 'error') {
            return (
                <h1>
                    {Translator.instance.translate("error_tag")}
                </h1>
            );
        }

        if (events === null || events.length === 0) {
            return (
                <h1>
                    {Translator.instance.translate("events_page_no_events")}
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
                                title={getEventTitle(event)}
                                date={event.date}
                                description={`${getEventDescription(event).substring(0, 31)}... ${Translator.instance.translate("events_page_see_more_from_event")}`}
                            />
                        </Link>
                    </Grid>
                )}
                <Grid p={3} xs={12} item>
                    <MKTypography
                        component="a"
                        href="/eventos"
                        variant="body1"
                        color="info"
                        fontWeight="regular"
                        sx={{
                            width: "max-content",
                            display: "flex",
                            alignItems: "center",

                            "& .material-icons-round": {
                                fontSize: "1.125rem",
                                transform: "translateX(3px)",
                                transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                            },

                            "&:hover .material-icons-round, &:focus .material-icons-round": {
                                transform: "translateX(6px)",
                            },
                        }}
                    >
                        {Translator.instance.translate("events_see_all")}
                        <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                    </MKTypography>
                </Grid>
            </>
        )
    }

    return (
        <MKBox id="eventos" component="section" py={6} pt={12} pb={12}>
            <Container>
                <Grid
                    container
                    item
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    xs={10}
                    lg={10}
                    sx={{ mx: "auto", textAlign: "center" }}
                >
                    <MKBox
                        width="3rem"
                        height="3rem"
                        borderRadius="lg"
                        shadow="md"
                        variant="gradient"
                        bgColor="info"
                        color="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Icon fontSize="small" sx={{ opacity: 0.8 }}>
                            celebration_rounded
                        </Icon>
                    </MKBox>
                    <MKTypography variant="h3" mt={3}>
                        {Translator.instance.translate("events_page_title")}
                    </MKTypography>
                    <MKTypography variant="body1" color="text" mt={1}>
                        {Translator.instance.translate("events_page_description")}
                    </MKTypography>
                </Grid>
                <Grid container spacing={3} mt={2}>
                    {getEvents()}
                </Grid>
            </Container>
        </MKBox>
    );
}

export default Events;