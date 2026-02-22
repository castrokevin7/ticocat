import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { DataStore } from "aws-amplify";
import { FAQ } from "../../../models";
import Container from "@mui/material/Container";
import MKBox from "../../../components/MKBox";
import MKTypography from "../../../components/MKTypography";
import DefaultNavbar from "../../../components/Navbars/DefaultNavbar";
import { getFAQAnswer, getFAQQuestion, getLinkText } from "./Utils";
import Translator, { getLang } from "../../../utils/Translator";
import bgImage from "../../../assets/images/faqs.jpeg";
import Card from "@mui/material/Card";
import { Spinner } from "../../../components/Spinner";

function FAQView() {
    const [state, setState] = useState("");
    const [faq, setFAQ] = useState<FAQ | null>(null);
    const { faqId } = useParams<{ faqId?: string }>();

    const fetchFAQ = async () => {
        try {
            const response = await DataStore.query(FAQ, (f: any) => f.faq_id('eq', faqId));
            if (response.length > 0) {
                setFAQ(response[0]);
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
        // eslint-disable-next-line
    }, [faqId]);

    const getFAQContent = (currentFaq: FAQ) => {
        return (
            <Card
                sx={{
                    p: 2,
                    backgroundColor: ({ palette: { white }, functions: { rgba } }: any) => rgba(white.main, 0.8),
                    backdropFilter: "saturate(200%) blur(30px)",
                    boxShadow: ({ boxShadows: { xxl } }: any) => xxl,
                    overflowY: 'auto'
                }}
            >
                <MKTypography
                    variant="h4"
                >
                    {getFAQQuestion(currentFaq)}
                </MKTypography>

                <MKTypography sx={{ whiteSpace: 'pre-line' }} mt={1} variant="body1" color="text">
                    {getFAQAnswer(currentFaq)}
                </MKTypography>

                {currentFaq.links && Array.isArray(currentFaq.links) && (
                    <ol style={{ marginTop: "20px", marginLeft: "20px" }}>
                        {currentFaq.links.map((link, i) => {
                            return <li key={i}>
                                <MKTypography variant="body1" color="text">
                                    <a href={link || ''} target='_blank' rel="noreferrer">{getLinkText(link || '')}</a>
                                </MKTypography>
                            </li>
                        }
                        )}
                    </ol>
                )}
            </Card>
        );
    }

    if (state === 'loading') {
        return (
            <Spinner />
        )
    }

    if (state === 'error') {
        return (
            <MKTypography ml={1} mt={1} variant="h4">
                {Translator.instance.translate("faq_error_tag").format(faqId || '')}
            </MKTypography>
        );
    }

    if (faq === null) {
        return (
            <MKTypography ml={1} mt={1} variant="h4">
                {Translator.instance.translate("faq_not_found").format(faqId || '')}
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
                    route: `/${getLang()}/faqs`,
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
                        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }: any) => `${linearGradient(rgba(gradients.dark.main, 0.4), rgba(gradients.dark.state, 0.4))}, url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Container
                        sx={{ marginTop: '150px', marginBottom: '100px' }}
                    >
                        {getFAQContent(faq)}
                    </Container>
                </MKBox>
            </MKBox>
        </>
    )
}

export default FAQView;
