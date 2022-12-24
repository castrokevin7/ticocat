import React, { useState } from 'react';

import { DataStore, Storage } from 'aws-amplify';

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

const useConstructor = (callBack = () => { }) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}

function Events() {
    const [state, setState] = useState('');
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        setState('loading');
        try {
            let response = await DataStore.query(Event);
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
                response.sort((a, b) => {
                    let dateA = new Date(a.date);
                    let dateB = new Date(b.date);
                    return dateB - dateA;
                });
                setEvents(response.slice(0, 3));
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

        return (
            <>
                {events.length === 0 ?
                    <MKTypography ml={3} mt={2} variant="body2" color="text">
                        {Translator.instance.translate("events_page_no_events")}
                    </MKTypography>
                    :
                    <>
                        {events.map((event, i) =>
                            <Grid key={i} item xs={12} lg={4}>
                                <Link to={`/evento/${event.event_id}`}>
                                    <SimpleBackgroundCard
                                        image={event.image}
                                        title={getEventTitle(event)}
                                        date={event.date}
                                        description={`${getEventDescription(event).substring(0, 31)} ...${Translator.instance.translate("events_page_see_more_from_event")}`}
                                    />
                                </Link>
                            </Grid>
                        )}
                        <Grid p={3} xs={12} item>
                            <MKTypography
                                component="a"
                                href="/eventos"
                                variant="body2"
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
                }
            </>
        )
    }

    useConstructor(() => {
        setState('loading');
        fetchEvents();
    });

    return (
        <MKBox id="eventos" component="section" py={6}>
            <Container>
                <Grid container item xs={12} lg={6} flexDirection="column">
                    <MKTypography variant="h3" mt={3} mb={1}>
                        {Translator.instance.translate("events_page_title")}
                    </MKTypography>
                    <MKTypography variant="body2" color="text" mb={2}>
                        {Translator.instance.translate("events_page_description")}
                    </MKTypography>
                </Grid>
                <Grid container spacing={3} mt={0.1}>
                    {getEvents()}
                </Grid>
            </Container>
        </MKBox>
    );
}

export default Events;