import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';

import { DataStore, Storage } from 'aws-amplify';

import { FAQ } from '../../../models';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKInput from "../../../components/MKInput";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

// Otis Kit PRO components
import MKBox from "../../../components/MKBox";
import MKTypography from "../../../components/MKTypography";

// Otis Kit PRO examples
import FaqCollapse from "../../../components/FaqCollapse";

import DefaultNavbar from "../../../components/Navbars/DefaultNavbar";

// Images
import bgImage from "../../../assets/images/faqs.jpeg";

import { getFAQQuestion, getFAQAnswer, getLinkText } from './Utils';

import Translator, { getLang } from '../../../utils/Translator';

import { Spinner } from "../../../components/Spinner";
import destinoCatalunyaImg from '../../../assets/images/destino_catalunya.png';
import InfoBackgroundCard from "../../../components/Cards/BackgroundCards/InfoBackgroundCard";

function FAQsPage() {
    const [collapse, setCollapse] = useState<number | false>(false);
    const [state, setState] = useState('');
    const [faqs, setFAQs] = useState<FAQ[] | null>(null);
    const [destinoCatalunyaUrl, setDestinoCatalunyaUrl] = useState<string | null>(null);
    const [filteredFAQs, setFilteredFAQs] = useState<FAQ[] | null>(null);
    const [activeTab, setActiveTab] = useState(0);

    const fetchFAQs = async () => {
        try {
            let response = await DataStore.query(FAQ);
            if (response.length > 0) {
                const shuffled = [...response].sort(() => Math.random() - 0.5);
                setFAQs(shuffled);
                setFilteredFAQs(shuffled);
            }
            setState('success');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    }

    useEffect(() => {
        setState('loading');
        getDestinoCatalunyaUrl().then(url => setDestinoCatalunyaUrl(url));
        fetchFAQs();
    }, []);

    const getDestinoCatalunyaUrl = async (): Promise<string> => {
        const url = await Storage.get('Recursos/Destino Catalunya 2025.pdf', { expires: 60 });
        return url;
    }

    const getFAQsContent = () => {
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
                        faqId={faq.faq_id}
                        key={i}
                        title={getFAQQuestion(faq) || ''}
                        open={collapse === i}
                        onClick={() => (collapse === i ? setCollapse(false) : setCollapse(i))}
                    >
                        <MKTypography sx={{ whiteSpace: 'pre-line' }} ml={2} mt={2} variant="body1" color="text">
                            {getFAQAnswer(faq)}
                        </MKTypography>

                        {faq.links !== null && Array.isArray(faq.links) &&
                            <ol style={{ marginTop: "20px", marginLeft: "20px" }}>
                                {faq.links.map((link, j) => {
                                    return <li key={j}>
                                        <MKTypography variant="body1" color="text">
                                            <a href={link || ''} target='_blank' rel="noreferrer">{getLinkText(link || '')}</a>
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

    const filterFAQsByText = (filter: string | null) => {
        if (!faqs) return;

        if (filter == null || filter.trim() === '') {
            setFilteredFAQs([...faqs]);
        } else {
            const filtered = faqs.filter(faq => {
                const question = getFAQQuestion(faq);
                return (question || '').toLowerCase().includes(filter.toLowerCase())
            });
            setFilteredFAQs([...filtered]);
        }
    }

    const handleSearchCriteriaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCollapse(false);
        filterFAQsByText(event.target.value);
    };

    const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
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
                        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }: any) => `${linearGradient(rgba(gradients.dark.main, 0.5), rgba(gradients.dark.state, 0.5))}, url(${bgImage})`,
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
                                sx={({ breakpoints, typography: { size } }: any) => ({
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
                    backgroundColor: ({ palette: { white }, functions: { rgba } }: any) => rgba(white.main, 0.8),
                    backdropFilter: "saturate(200%) blur(30px)",
                    boxShadow: ({ boxShadows: { xxl } }: any) => xxl,
                }}
            >
                <MKBox component="section" py={6}>
                    <Container>
                        <Box>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                textColor="inherit"
                                indicatorColor="primary"
                            >
                                <Tab label={Translator.instance.translate("faqs_page_title")} />
                                <Tab label={Translator.instance.translate("faqs_page_resources")} />
                            </Tabs>
                        </Box>

                        {activeTab === 0 && (
                            <>
                                <Grid container xs={12} lg={8} py={4} mx="auto">
                                    <MKInput
                                        label={Translator.instance.translate("faqs_page_look_for_faq")}
                                        fullWidth
                                        onChange={handleSearchCriteriaChange}
                                    />
                                    <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mt={1}>
                                        {Translator.instance.translate("faqs_page_suggestions")} <a rel="noreferrer" target='_blank' href='https://forms.gle/mhvgWoYt1jj1YtUs6'>aquí</a>.
                                    </MKTypography>
                                </Grid>

                                {getFAQsContent()}
                            </>
                        )}

                        {activeTab === 1 && (
                            <Grid container spacing={3} py={4}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <a href={destinoCatalunyaUrl || '#'} target="_blank" rel="noreferrer">
                                        <InfoBackgroundCard
                                            image={destinoCatalunyaImg}
                                            icon="import_contacts"
                                            title="Destino Cataluña 2025"
                                            label="Guía informativa sobre trámites y vida en Cataluña"
                                        />
                                    </a>
                                </Grid>
                            </Grid>
                        )}
                    </Container>
                </MKBox>
            </Card>
        </>
    );
}

export default FAQsPage;
