import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Benefit } from "../../models";
import { DataStore, Storage } from "aws-amplify";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Stack from "@mui/material/Stack";
import AboutUsOption from "pages/LandingPages/Coworking/components/AboutUsOption";
import { getBenefitTitle, getBenefitDescription } from "./Utils";
import Translator from "utils/Translator";
import { getTranslateAction } from "sections/main/Navbar";

function BenefitView() {
    const [state, setState] = useState("");
    const [benefit, setBenefit] = useState(null);
    const { benefitId } = useParams();

    const fetchBenefit = async () => {
        try {
            let response = await DataStore.query(Benefit, e => e.benefit_id('eq', benefitId), { useCache: false });
            if (response.length > 0) {
                response = response[0];
                if (response.image) {
                    const image = await Storage.get(response.image);
                    response = Benefit.copyOf(response, updated => {
                        updated.image = image;
                        updated.benefit_id = response.benefit_id;
                        updated.title = response.title;
                        updated.title_cat = response.title_cat;
                        updated.description = response.description;
                        updated.description_cat = response.description_cat;
                        updated.contact = response.contact;
                        updated.url = response.url;
                        updated.about_provider = response.about_provider;
                        updated.about_provider_cat = response.about_provider_cat;
                    });
                }

                setBenefit(response);
            } else {
                setBenefit(null);
            }
            setState('success');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    };

    useEffect(() => {
        setState('loading');
        fetchBenefit();
    }, [benefitId]);

    const getBenefitDetails = (benefit) => {
        return (
            <Stack>
                {benefit.contact && <AboutUsOption
                    icon="contact_phone"
                    content={
                        <>
                            {benefit.contact}
                        </>
                    }
                />}
                {benefit.url && <AboutUsOption
                    icon="location_on"
                    content={
                        <>
                            <a rel="noreferrer" href={benefit.url} target="_blank">{Translator.instance.translate("benefit_location")}</a>
                        </>
                    }
                />}
            </Stack>
        );
    }

    const getBenefitContent = (benefit) => {
        return (
            <MKBox component="section" py={{ xs: 3, md: 12 }}>
                <Container>
                    <Grid container alignItems="center">
                        <Grid item xs={12} lg={5}>
                            <MKTypography variant="h3" my={1}>
                                {getBenefitTitle(benefit)}
                            </MKTypography>
                            <MKTypography variant="body1" color="text" mb={2}>
                                {getBenefitDescription(benefit)}
                            </MKTypography>
                            {getBenefitDetails(benefit)}
                        </Grid>
                    </Grid>
                </Container>
            </MKBox>
        );
    }

    if (state === 'loading') {
        return (
            <div style={{ padding: '10px', display: 'flex' }}>
                <div className="spinner-container">
                    <div className="loading-spinner" />
                </div>
                {Translator.instance.translate("loading_tag")}
            </div>
        )
    }

    if (state === 'error') {
        return (
            <h1>
                {Translator.instance.translate("error_tag")}
            </h1>
        );
    }

    if (benefit === null) {
        return (
            <h1>
                {Translator.instance.translate("benefit_not_found")}
            </h1>
        );
    }

    return (
        <>
            <DefaultNavbar
                routes={[]}
                center
                sticky
                brand="asoticocat"
                action={getTranslateAction()}
                secondaryAction={{
                    route: "/beneficios",
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
                        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.dark.main, 0.4), rgba(gradients.dark.state, 0.4))}, url(${benefit.image})`,
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
                                {getBenefitTitle(benefit)}
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
                        {getBenefitContent(benefit)}
                    </Container>
                </MKBox>
            </Card>
        </>
    )
}

export default BenefitView;