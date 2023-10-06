import React, { useState, useEffect } from 'react';

import { DataStore } from 'aws-amplify';

import { FAQ } from '../../models';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Icon from "@mui/material/Icon";

import Translator from 'utils/Translator';

import FaqCollapse from "pages/Support/HelpCenter/components/FaqCollapse";

import { getFAQQuestion, getFAQAnswer } from '../faqs/Utils';

function FAQs() {
    const [collapse, setCollapse] = useState(false);
    const [state, setState] = useState('');
    const [faqs, setFAQs] = useState(null);

    const fetchFAQs = async () => {
        try {
            let response = await DataStore.query(FAQ);

            if (response.length > 0) {
                response = response.sort(() => Math.random() - 0.5);
                setFAQs(response.slice(0, 3));
            }
            setState('');
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
                <Grid container spacing={3} mt={2}>
                    <MKTypography variant="body1" color="text" mt={1} ml={"auto"} mr={"auto"}>
                        {Translator.instance.translate("error_tag")}
                    </MKTypography>
                </Grid>
            );
        }

        if (faqs === null || faqs.length === 0) {
            return (
                <Grid container spacing={3} mt={2}>
                    <MKTypography variant="body1" color="text" mt={1} ml={"auto"} mr={"auto"}>
                        {Translator.instance.translate("faqs_page_no_faqs")}
                    </MKTypography>
                </Grid>
            );
        }

        return (
            <Grid item xs={12} md={10}>
                {faqs.map((faq, i) =>
                    <FaqCollapse
                        title={getFAQQuestion(faq)}
                        open={collapse === i}
                        onClick={() => (collapse === i ? setCollapse(false) : setCollapse(i))}
                    >
                        {getFAQAnswer(faq)}

                        <ol>
                            {faq.links.map((link, i) =>
                                <li key={i}>
                                    <Link to={link.link}>{link.text}</Link>
                                </li>
                            )}
                        </ol>
                    </FaqCollapse>
                )}
            </Grid>
        )
    }
    return (
        <MKBox sx={{
            backgroundColor: ({ palette: { bgcolor1 }, functions: { rgba } }) => rgba(bgcolor1.main, 0.4),
        }} id="faqs" component="section" py={6} pt={12} pb={12}>
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
                            quiz_rounded
                        </Icon>
                    </MKBox>
                    <MKTypography variant="h3" mt={3}>
                        {Translator.instance.translate("faqs_page_title")}
                    </MKTypography>
                    <MKTypography variant="body1" color="text" mt={1}>
                        {Translator.instance.translate("faqs_page_description")}
                    </MKTypography>
                </Grid>
                {getFAQs()}
            </Container>
        </MKBox>
    );
}

export default FAQs;