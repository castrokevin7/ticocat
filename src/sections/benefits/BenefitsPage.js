import React, { useState, useEffect } from 'react';

import { DataStore, Storage } from 'aws-amplify';

import { Benefit } from '../../models';

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
import bgImage from "assets/images/beneficios.jpg";

import { getBenefitTitle, getBenefitDescription } from './Utils';

import Translator from 'utils/Translator';

import { getTranslateAction } from 'sections/main/Navbar';

function BenefitsPage() {
    const [state, setState] = useState('');
    const [benefits, setBenefits] = useState(null);

    const fetchBenefits = async () => {
        try {
            let response = await DataStore.query(Benefit);
            if (response.length > 0) {
                response = await Promise.all(response.map(async (benefit, i) => {
                    const image = await Storage.get(benefit.image);
                    return new Benefit({
                        image,
                        benefit_id: benefit.benefit_id,
                        title: benefit.title,
                        title_cat: benefit.title_cat,
                        description: benefit.description,
                        description_cat: benefit.description_cat,
                        contact: benefit.contact,
                        url: benefit.url,
                        about_provider: benefit.about_provider,
                        about_provider_cat: benefit.about_provider_cat,

                    });
                }));
                response = response.sort(() => Math.random() - 0.5);
                setBenefits(response);
            }
            setState('success');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    }

    useEffect(() => {
        setState('loading');
        fetchBenefits();
    }, []);

    const getBenefits = () => {
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
                <MKTypography ml={3} mt={2} variant="body2" color="text">
                    {Translator.instance.translate("error_tag")}
                </MKTypography >
            );
        }


        if (benefits === null || benefits.length === 0) {
            return <MKTypography ml={3} mt={2} variant="body2" color="text">
                {Translator.instance.translate("benefits_page_no_benefits")}
            </MKTypography>
        }

        return (
            <>
                {
                    benefits.map((benefit, i) =>
                        <Grid key={i} item xs={12} lg={4}>
                            <Link to={`/beneficio/${benefit.benefit_id}`}>
                                <SimpleBackgroundCard
                                    image={benefit.image}
                                    title={getBenefitTitle(benefit)}
                                    date={benefit.date}
                                    description={`${getBenefitDescription(benefit).substring(0, 31)}... ${Translator.instance.translate("benefits_page_see_more_from_benefit")}`}
                                />
                            </Link>
                        </Grid>
                    )}
            </>
        )
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
                                {Translator.instance.translate("benefits_page_title")}
                            </MKTypography>
                            <MKTypography variant="body1" color="white" opacity={0.8} pr={6} mr={6}>
                                {Translator.instance.translate("benefits_page_description")}
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
                                {Translator.instance.translate("benefits_page_benefits_header")}
                            </MKTypography>
                        </Grid>
                        <Grid container spacing={3} mt={0.1}>
                            {getBenefits()}
                        </Grid>
                    </Container>
                </MKBox>
            </Card>
        </>
    );
}

export default BenefitsPage;