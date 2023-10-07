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
import { getBenefitTitle, getBenefitDescription, getBenefitAboutProvider } from "./Utils";
import Translator from "utils/Translator";
import { getTranslateAction } from "sections/main/Navbar";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
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

    const getConnectionSection = (benefit) => {
        if (benefit.email || benefit.websiteUrl || benefit.instagramUrl || benefit.facebookUrl) {
            return (
                <>
                    <MKTypography variant="h3" mt={5} mb={1}>
                        {Translator.instance.translate("benefit_connect")}
                    </MKTypography>

                    <Container>
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
                        {benefit.websiteUrl &&
                            <MuiLink href={benefit.websiteUrl} target="_blank" rel="noreferrer">
                                <LanguageIcon fontSize="large" />
                            </MuiLink>
                        }
                        {benefit.email &&
                            <MuiLink href={`mailto:${benefit.email}`} target="_blank" rel="noreferrer">
                                <AlternateEmailIcon fontSize="large" />
                            </MuiLink>
                        }
                    </Container>
                </>
            )
        }

        return null;
    }

    const getBenefitContent = (benefit) => {
        return (
            <MKBox component="section" py={{ xs: 3, md: 12 }}>
                <Container>
                    <MKTypography variant="h3" my={1}>
                        {getBenefitTitle(benefit)}
                    </MKTypography>
                    <MKTypography sx={{ whiteSpace: 'pre-line' }} variant="body1" color="text" mb={2}>
                        {getBenefitDescription(benefit)}
                    </MKTypography>
                    <MKTypography variant="h3" mt={5} mb={1}>
                        {Translator.instance.translate("benefit_about_provider")}
                    </MKTypography>
                    <MKTypography sx={{ whiteSpace: 'pre-line' }} variant="body1" color="text" mb={2}>
                        {getBenefitAboutProvider(benefit)}
                        {benefit.phone &&
                            <MKTypography variant="body1" color='text' sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                <ContactPhoneIcon sx={{ marginLeft: '5px' }} fontSize="large" />
                                <span style={{ marginLeft: '10px' }}>{benefit.phone}</span>
                            </MKTypography>
                        }
                    </MKTypography>
                    {getConnectionSection(benefit)}
                </Container>
            </MKBox >
        );
    }

    if (state === 'loading') {
        return (
            <div style={{ padding: '10px', display: 'flex' }}>
                <div className="spinner-container">
                    <div className="loading-spinner" />
                </div>
            </div>
        )
    }

    if (state === 'error') {
        return (
            <MKTypography ml={1} mt={1} variant="h4">
                {Translator.instance.translate("benefit_error_tag").format(benefitId)}
            </MKTypography>
        );
    }

    if (benefit === null) {
        return (
            <MKTypography ml={1} mt={1} variant="h4">
                {Translator.instance.translate("benefit_not_found").format(benefitId)}
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
