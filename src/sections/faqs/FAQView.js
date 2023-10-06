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
            <Container>
                <MKTypography ml={2} mt={2} variant="body1" color="text">
                    {getFAQQuestion(faq)}
                </MKTypography>

                <MKTypography ml={2} mt={2} variant="body1" color="text">
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
            </Container>
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

    if (faq === null) {
        return (
            <h1>
                {Translator.instance.translate("faq_not_found")}
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
                    route: "/faqs",
                    color: "info",
                    icon: "arrow_circle_left_rounded",
                    variant: "text",
                    size: "large",
                    minimal: true
                }}
            />
            <MKBox component="section" py={6}>
                {getFAQContent(faq)}
            </MKBox>
        </>
    )
}

export default FAQView;
