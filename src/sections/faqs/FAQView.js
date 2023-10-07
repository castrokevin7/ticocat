import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FAQ } from "../../models";
import { DataStore } from "aws-amplify";
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { getFAQAnswer, getFAQQuestion, getLinkText } from "./Utils";
import Translator from "utils/Translator";
import { getTranslateAction } from "sections/main/Navbar";
import Grid from "@mui/material/Grid";
import bgImage from "assets/images/faqs.jpeg";
import Card from "@mui/material/Card";


function FAQView() {
    const [state, setState] = useState("");
    const [faq, setFAQ] = useState(null);
    const { faqId } = useParams();

    const fetchFAQ = async () => {
        try {
            let response = await DataStore.query(FAQ, faq => faq.id('eq', faqId));
            if (response.length > 0) {
                response = response[0];
                setFAQ(response);
            } else {
                setFAQ(null);
            }
            setState('success');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    };

    useEffect(() => {
        setState('loading');
        fetchFAQ();
    }, [faqId]);

    const getFAQContent = (faq) => {
        return (
            <Card
                sx={{
                    p: 2,
                    backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
                    backdropFilter: "saturate(200%) blur(30px)",
                    boxShadow: ({ boxShadows: { xxl } }) => xxl,
                }}
            >
                <MKTypography
                    variant="h3"
                    mb={3}
                >
                    {Translator.instance.translate("faq_view_header")}:
                </MKTypography>

                <MKTypography
                    variant="h4"
                >
                    {getFAQQuestion(faq)}
                </MKTypography>

                <MKTypography mt={1} variant="body1" color="text">
                    {getFAQAnswer(faq)}
                </MKTypography>

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
            </Card>
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
                {Translator.instance.translate("faq_error_tag").format(faqId)}
            </MKTypography>
        );
    }

    if (faq === null) {
        return (
            <MKTypography ml={1} mt={1} variant="h4">
                {Translator.instance.translate("faq_not_found").format(faqId)}
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
                    route: "/faqs",
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
                        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.dark.main, 0.4), rgba(gradients.dark.state, 0.4))}, url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Container>
                        {getFAQContent(faq)}
                    </Container>
                </MKBox>
            </MKBox>
        </>
    )
}

export default FAQView;
