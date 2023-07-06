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
import { getBenefitTitle, getBenefitDescription, getBenefitAboutProvider } from "./Utils";
import Translator from "utils/Translator";
import { getTranslateAction } from "sections/main/Navbar";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MuiLink from "@mui/material/Link";


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
                        updated.benefit_id = response.benefit_id;
                        updated.image = image;
                        updated.title = response.title;
                        updated.title_cat = response.title_cat;
                        updated.description = response.description;
                        updated.description_cat = response.description_cat;
                        updated.about_provider = response.about_provider;
                        updated.about_provider_cat = response.about_provider_cat;
                        updated.phone = response.phone;
                        updated.email = response.email;
                        updated.websiteUrl = response.websiteUrl;
                        updated.instagramUrl = response.instagramUrl;
                        updated.facebookUrl = response.facebookUrl;
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
                {benefit.phone && <AboutUsOption
                    icon="contact_phone"
                    content={
                        <>
                            <span>{benefit.phone}</span>
                        </>
                    }
                />}
                {benefit.email && <AboutUsOption
                    icon="alternate_email"
                    content={
                        <>
                            <a rel="noreferrer" href={`mailto:${benefit.email}`} target="_blank">{benefit.email}</a>
                        </>
                    }
                />}
                {benefit.websiteUrl && <AboutUsOption
                    icon="language_rounded"
                    content={
                        <>
                            <a rel="noreferrer" href={benefit.websiteUrl} target="_blank">{benefit.websiteUrl}</a>
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
                            <MKTypography sx={{ whiteSpace: 'pre-line' }} variant="body1" color="text" mb={2}>
                                {getBenefitDescription(benefit)}
                            </MKTypography>
                            <MKTypography variant="h3" mt={5} mb={1}>
                                {Translator.instance.translate("benefit_about_provider")}
                            </MKTypography>
                            <MKTypography variant="body1" color="text" mb={2}>
                                {getBenefitAboutProvider(benefit)}
                            </MKTypography>
                            <div>
                                {benefit.instagramUrl &&
                                    <MuiLink href={benefit.instagramUrl} target="_blank" rel="noreferrer">
                                        <InstagramIcon fontSize="large" />
                                    </MuiLink>
                                }
                                {benefit.facebookUrl &&
                                    <MuiLink href={benefit.facebookUrl} target="_blank" rel="noreferrer">
                                        <FacebookIcon fontSize="large" />
                                    </MuiLink>
                                }
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={6} sx={{ ml: { xs: -2, lg: "auto" }, mt: { xs: 6, lg: 0 } }}>
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
