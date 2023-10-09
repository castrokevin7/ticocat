import React, { useState, useEffect } from 'react';

import { DataStore } from 'aws-amplify';

import { FAQ } from '../../models';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKInput from "components/MKInput";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Otis Kit PRO examples
import FaqCollapse from "pages/Support/HelpCenter/components/FaqCollapse";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Images
import bgImage from "assets/images/faqs.jpeg";

import { getFAQQuestion, getFAQAnswer, getLinkText } from './Utils';

import Translator from 'utils/Translator';

import { getTranslateAction } from 'sections/main/Navbar';
import { Spinner } from "sections/common/Spinner";

function FAQsPage() {
    const [collapse, setCollapse] = useState(false);
    const [state, setState] = useState('');
    const [faqs, setFAQs] = useState(null);
    const [filteredFAQs, setFilteredFAQs] = useState(null);

    const fetchFAQs = async () => {
        try {
            let response = await DataStore.query(FAQ);
            if (response.length > 0) {
                response = response.sort(() => Math.random() - 0.5);
                setFAQs(response);
                setFilteredFAQs(response);
            }
            setState('success');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    }

    useEffect(() => {
        setState('loading');
        fetchFAQs();
    }, []);

    const getFAQs = () => {
        if (state === 'loading' && filteredFAQs === null) {
            return (
                <Spinner />
            );
        }

        if (state === 'error') {
            return (
                <Grid container spacing={3} mt={2}>
                    <MKTypography ml={3} mt={2} variant="body1" color="text">
                        {Translator.instance.translate("error_tag")}
                    </MKTypography >
                </Grid>
            );
        }


        if (filteredFAQs === null || filteredFAQs.length === 0) {
            return (
                <Grid container spacing={3} mt={2}>
                    <MKTypography ml={3} mt={2} variant="body2" color="text">
                        {Translator.instance.translate("faqs_page_no_faqs")}
                    </MKTypography>
                </Grid>
            );
        }

        return (
            <Grid item xs={12} md={10} mt={4}>
                {filteredFAQs.map((faq, i) =>
                    <FaqCollapse
                        id={faq.id}
                        key={i}
                        title={getFAQQuestion(faq)}
                        open={collapse === i}
                        onClick={() => (collapse === i ? setCollapse(false) : setCollapse(i))}
                    >
                        <MKTypography sx={{ whiteSpace: 'pre-line' }} ml={2} mt={2} variant="body1" color="text">
                            {getFAQAnswer(faq)}
                        </MKTypography>

                        {faq.links !== null &&
                            <ol style={{ marginTop: "10px", marginLeft: "20px" }}>
                                {faq.links.map((link, i) => {
                                    return <li key={i}>
                                        <MKTypography variant="body1" color="text">
                                            <a href={link} target='_blank' rel="noreferrer">{getLinkText(link)}</a>
                                        </MKTypography>
                                    </li>
                                }
                                )}
                            </ol>
                        }
                    </FaqCollapse>
                )}
            </Grid>
        )
    }

    const filterFAQsByText = (filter) => {
        if (filter == null || filter.trim() === '') {
            setFilteredFAQs([...faqs]);
        } else {
            const filtered = faqs.filter(faq => {
                const question = getFAQQuestion(faq);
                return question.toLowerCase().includes(filter.toLowerCase())
            });
            setFilteredFAQs([...filtered]);
        }
    }

    const handleSearchCriteriaChange = (event) => {
        setCollapse(false);
        filterFAQsByText(event.target.value);
    };

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
                                {Translator.instance.translate("faqs_page_title")}
                            </MKTypography>
                            <MKTypography variant="body1" color="white" opacity={0.8} pr={6} mr={6}>
                                {Translator.instance.translate("faqs_page_description")}
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
                                {Translator.instance.translate("faqs_page_faqs_header")}
                            </MKTypography>
                        </Grid>
                        <Grid container item xs={12} lg={8} py={1} mx="auto">
                            <MKInput
                                label={Translator.instance.translate("faqs_page_look_for_faq")}
                                fullWidth
                                onChange={handleSearchCriteriaChange}
                            />
                            <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mt={1}>
                                {Translator.instance.translate("faqs_page_suggestions")} <a rel="noreferrer" target='_blank' href='https://forms.gle/mhvgWoYt1jj1YtUs6'>aquí</a>.
                            </MKTypography>
                        </Grid>

                        {getFAQs()}
                    </Container>
                </MKBox>
            </Card>
        </>
    );
}

export default FAQsPage;
