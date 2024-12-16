import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Event } from "../../../models";
import { DataStore, Storage } from "aws-amplify";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import getFormattedDate from "utils/FormatDate";
import Stack from "@mui/material/Stack";
import AboutUsOption from "components/AboutUsOption";
import { getEventTitle, getEventDescription } from "./Utils";
import Translator from "utils/Translator";
import { getTranslateAction } from 'utils/TranslateAction';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import { Spinner } from "components/Spinner";
import { getLang } from "utils/Translator";

function EventView() {
    const [state, setState] = useState("");
    const [event, setEvent] = useState(null);
    const { eventId } = useParams();

    const fetchEvent = async () => {
        try {
            let response = await DataStore.query(Event, e => e.event_id('eq', eventId), { useCache: false });
            if (response.length > 0) {
                response = response[0];
                if (response.image) {
                    const image = await Storage.get(response.image);
                    response = Event.copyOf(response, updated => {
                        updated.image = image;
                        updated.event_id = response.event_id;
                        updated.title = response.title;
                        updated.title_cat = response.title_cat;
                        updated.description = response.description;
                        updated.description_cat = response.description_cat;
                        updated.date = response.date;
                        updated.time = response.time;
                        updated.contact = response.contact;
                        updated.location_url = response.location_url;
                        updated.gallery = response.gallery;
                    });
                }

                if (response.gallery && response.gallery.length > 0) {
                    const gallery = await Promise.all(
                        response.gallery.map(async image => {
                            const signedUrl = await Storage.get(image);
                            return signedUrl;
                        })
                    );
                    response = Event.copyOf(response, updated => {
                        updated.gallery = gallery;
                        updated.event_id = response.event_id;
                        updated.image = response.image;
                        updated.title = response.title;
                        updated.title_cat = response.title_cat;
                        updated.description = response.description;
                        updated.description_cat = response.description_cat;
                        updated.date = response.date;
                        updated.time = response.time;
                        updated.contact = response.contact;
                        updated.location_url = response.location_url;
                    });
                }

                setEvent(response);
            } else {
                setEvent(null);
            }
            setState('success');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    };

    useEffect(() => {
        setState('loading');
        fetchEvent();
        // eslint-disable-next-line
    }, [eventId]);

    const getEventDetails = (event) => {
        return (
            <Stack>
                <AboutUsOption
                    icon="date_range"
                    content={
                        <>
                            {getDateTime(event)}
                        </>
                    }
                />
                {event.contact && <AboutUsOption
                    icon="contact_phone"
                    content={
                        <>
                            {event.contact}
                        </>
                    }
                />}
                {event.location_url && <AboutUsOption
                    icon="location_on"
                    content={
                        <>
                            <a rel="noreferrer" href={event.location_url} target="_blank">{Translator.instance.translate("event_location")}</a>
                        </>
                    }
                />}
            </Stack>
        );
    }

    const getEventContent = (event) => {
        return (
            <MKBox component="section" py={{ xs: 3, md: 12 }}>
                <Container>
                    <Grid container alignItems="center">
                        <Grid item xs={12}>
                            <MKTypography variant="h3" my={1}>
                                {getEventTitle(event)}
                            </MKTypography>
                            <MKTypography sx={{ whiteSpace: 'pre-line' }} variant="body1" color="text" mb={2}>
                                {getEventDescription(event)}
                            </MKTypography>
                            {/*                             {
                                event.gallery && event.gallery.length > 0 && getEventDetails(event)
                            } */}
                            {getEventDetails(event)}
                        </Grid>
                        {/*                        {event.gallery && event.gallery.length > 0 ?
                            getEventGallery(event) :
                            <Grid item xs={12} lg={6} sx={{ ml: { xs: -2, lg: "auto" }, mt: { xs: 6, lg: 0 } }}>
                                {getEventDetails(event)}
                            </Grid>
                        } */}
                    </Grid>
                </Container>
            </MKBox>
        );
    }

    const getDateTime = (event) => {
        if (event.time) {
            return `${getFormattedDate(event.date)}  ${Translator.instance.translate("event_date_time_prefix")}  ${getTime(event.time)}`;
        } else {
            return getFormattedDate(event.date);
        }
    }

    const getTime = (time) => {
        if (time) {
            return `${time}H`
        }
    };

    // eslint-disable-next-line
    const getEventGallery = (event) => {
        if (event.gallery && event.gallery.length > 0) {
            return (
                <Box ml={{
                    xs: 2,
                    md: 12,
                }} mt={{
                    xs: 6,
                }} sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
                    <ImageList variant="masonry" cols={2} gap={8}>
                        {event.gallery.map((image, i) => (
                            <ImageListItem key={i}>
                                <img
                                    src={`${image}?w=248&fit=crop&auto=format`}
                                    srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={`${i + 1} from ${event.title}`}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
            )
        }
        return null;
    }

    if (state === 'loading') {
        return (
            <Spinner />
        )
    }

    if (state === 'error') {
        return (
            <MKTypography ml={1} mt={1} variant="h4">
                {Translator.instance.translate("event_error_tag").format(eventId)}
            </MKTypography>
        );
    }

    if (event === null) {
        return (
            <MKTypography ml={1} mt={1} variant="h4">
                {Translator.instance.translate("event_not_found").format(eventId)}
            </MKTypography>
        );
    }

    return (
        <>
            <DefaultNavbar
                routes={[]}
                center
                sticky
                brand="asoticocat"
                action={{
                    route: `/${getLang()}/eventos`,
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
                                mb={1}
                            >
                                {getEventTitle(event)}
                            </MKTypography>
                            <MKTypography variant="body3" color="white" mt={1} mb={{ xs: 3, sm: 8 }} px={3}
                                sx={{ fontWeight: 'bold' }}
                            >
                                {getDateTime(event)}
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
                        {getEventContent(event)}
                    </Container>
                </MKBox>
            </Card>
        </>
    )
}

export default EventView;
