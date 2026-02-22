import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Event } from "../../../models";
import { DataStore, Storage } from "aws-amplify";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "../../../components/MKBox";
import MKTypography from "../../../components/MKTypography";
import DefaultNavbar from "../../../components/Navbars/DefaultNavbar";
import getFormattedDate from "../../../utils/FormatDate";
import Stack from "@mui/material/Stack";
import AboutUsOption from "../../../components/AboutUsOption";
import { getEventTitle, getEventDescription } from "./Utils";
import Translator, { getLang } from "../../../utils/Translator";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import { Spinner } from "../../../components/Spinner";

function EventView() {
    const [state, setState] = useState("");
    const [event, setEvent] = useState<Event | null>(null);
    const { eventId } = useParams<{ eventId?: string }>();

    const fetchEvent = async () => {
        try {
            const response = await DataStore.query(Event, (e: any) => e.event_id('eq', eventId));
            if (response.length > 0) {
                let foundEvent = response[0];
                if (foundEvent.image) {
                    const image = await Storage.get(foundEvent.image);
                    foundEvent = Event.copyOf(foundEvent, updated => {
                        updated.image = image;
                    });
                }

                if (foundEvent.gallery && foundEvent.gallery.length > 0) {
                    const gallery = await Promise.all(
                        foundEvent.gallery.map(async (img) => {
                            const signedUrl = await Storage.get(img || '');
                            return signedUrl;
                        })
                    );
                    foundEvent = Event.copyOf(foundEvent, updated => {
                        updated.gallery = gallery;
                    });
                }

                setEvent(foundEvent);
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

    const getEventDetails = (currentEvent: Event) => {
        return (
            <Stack>
                <AboutUsOption
                    icon="date_range"
                    content={
                        <>
                            {getDateTime(currentEvent)}
                        </>
                    }
                />
                {currentEvent.contact && <AboutUsOption
                    icon="contact_phone"
                    content={
                        <>
                            {currentEvent.contact}
                        </>
                    }
                />}
                {currentEvent.location_url && <AboutUsOption
                    icon="location_on"
                    content={
                        <>
                            <a rel="noreferrer" href={currentEvent.location_url} target="_blank">{Translator.instance.translate("event_location")}</a>
                        </>
                    }
                />}
            </Stack>
        );
    }

    const getEventContent = (currentEvent: Event) => {
        return (
            <MKBox component="section" py={{ xs: 3, md: 12 }}>
                <Container>
                    <Grid container alignItems="center">
                        <Grid item xs={12}>
                            <MKTypography variant="h3" my={1}>
                                {getEventTitle(currentEvent)}
                            </MKTypography>
                            <MKTypography sx={{ whiteSpace: 'pre-line' }} variant="body1" color="text" mb={2}>
                                {getEventDescription(currentEvent)}
                            </MKTypography>
                            {getEventDetails(currentEvent)}
                        </Grid>
                    </Grid>
                </Container>
            </MKBox>
        );
    }

    const getDateTime = (currentEvent: Event) => {
        if (currentEvent.time) {
            return `${getFormattedDate(currentEvent.date || '')}  ${Translator.instance.translate("event_date_time_prefix")}  ${getTime(currentEvent.time)}`;
        } else {
            return getFormattedDate(currentEvent.date || '');
        }
    }

    const getTime = (time: string | null | undefined) => {
        if (time) {
            return `${time}H`
        }
        return '';
    };

    // @ts-expect-error Unused function kept for future use
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _getEventGallery = (currentEvent: Event) => {
        if (currentEvent.gallery && currentEvent.gallery.length > 0) {
            return (
                <Box ml={{
                    xs: 2,
                    md: 12,
                }} mt={{
                    xs: 6,
                }} sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
                    <ImageList variant="masonry" cols={2} gap={8}>
                        {currentEvent.gallery.map((image, i) => (
                            <ImageListItem key={i}>
                                <img
                                    src={`${image}?w=248&fit=crop&auto=format`}
                                    srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={`${i + 1} from ${currentEvent.title}`}
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
                {Translator.instance.translate("event_error_tag").format(eventId || '')}
            </MKTypography>
        );
    }

    if (event === null) {
        return (
            <MKTypography ml={1} mt={1} variant="h4">
                {Translator.instance.translate("event_not_found").format(eventId || '')}
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
                        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }: any) => `${linearGradient(rgba(gradients.dark.main, 0.4), rgba(gradients.dark.state, 0.4))}, url(${event.image})`,
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
                                sx={({ breakpoints, typography: { size } }: any) => ({
                                    [breakpoints.down("md")]: {
                                        fontSize: size["3xl"],
                                    },
                                })}
                                mb={1}
                            >
                                {getEventTitle(event)}
                            </MKTypography>
                            <MKTypography variant="body2" color="white" mt={1} mb={{ xs: 3, sm: 8 }} px={3}
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
                    backgroundColor: ({ palette: { white }, functions: { rgba } }: any) => rgba(white.main, 0.8),
                    backdropFilter: "saturate(200%) blur(30px)",
                    boxShadow: ({ boxShadows: { xxl } }: any) => xxl,
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
