import React, { useState, useEffect } from "react";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { getTranslateAction } from 'sections/main/Navbar';
import { getLang } from 'utils/Translator';
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import bgImage from "assets/images/associates.jpg";
import { Associate } from "../../models";
import { Spinner } from "sections/common/Spinner";
import { useParams } from "react-router";
import { DataStore } from "aws-amplify";
import Card from "@mui/material/Card";
import { auto } from "@popperjs/core";

function AssociateView() {
    const [state, setState] = useState("");
    const [associate, setAssociate] = useState();
    const { associateId } = useParams();

    const fetchAssociate = async () => {
        try {
            console.log("looking for:", associateId);
            let response = await DataStore.query(Associate, associate => associate.identification('eq', associateId));
            if (response.length > 0) {
                response = response[0];
                setAssociate(response);
                console.log("found:", response);
            } else {
                setAssociate(null);
                console.log("not found");
            }
            setState('success');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    };

    useEffect(() => {
        setState('loading');
        fetchAssociate();
    }, [associateId]);

    const getAssociateContent = () => {
        if (state === 'loading') {
            return (
                <Spinner />
            )
        }

        if (state === 'error') {
            return "There has been an error loading the associate"
        }

        return associate ? associate.name : "Not found";
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
                    route: `/${getLang()}/socio`,
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
                    <Container
                        sx={{ marginTop: '150px', marginBottom: '100px' }}
                    >   
                        <Card
                            sx={{
                                p: 2,
                                backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
                                backdropFilter: "saturate(200%) blur(30px)",
                                boxShadow: ({ boxShadows: { xxl } }) => xxl,
                                overflowY: auto
                            }}
                        >
                            {getAssociateContent()}
                        </Card>
                    </Container>
                </MKBox>
            </MKBox>
        </>
    );
}


export default AssociateView;