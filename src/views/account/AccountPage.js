import React, { useState, useEffect } from "react";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import { getLang } from 'utils/Translator';
import MKBox from "components/MKBox";
import bgImage from "assets/images/associates.jpg";
import { auto } from "@popperjs/core";
import Container from "@mui/material/Container";
import { getTranslateAction } from 'utils/TranslateAction';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';
import Card from "@mui/material/Card";
import { Associate } from 'models';
import { DataStore } from 'aws-amplify';
import Translator from 'utils/Translator';
import MKTypography from "components/MKTypography";
import { Spinner } from "views/common/Spinner";
import MKButton from "components/MKButton";

function AccountPage() {
    const [state, setState] = useState("loading");
    const [associate, setAssociate] = useState();
    const { route } = useAuthenticator(context => [context.route]);
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    const fetchAssociate = async (email) => {
        try {
            let response = await DataStore.query(Associate, c => c.email("eq", email));
            if (response.length > 0) {
                setAssociate(response[0]);
                setState('success');
            } else {
                console.error('Error: Associate not found');
                setState('error');
            }
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    };

    useEffect(() => {
        if (route === 'authenticated') {
            setState('loading');
            fetchAssociate(user.attributes.email);
        }
    }, [route, user]);

    if (!user || route !== 'authenticated') {
        return <Navigate to={`/${getLang()}/acceso`} />;
    }

    const getAccountContent = () => {
        if (state === 'loading') {
            return (
                <Spinner />
            )
        }

        if (state === 'error') {
            return (
                <MKTypography ml={1} mt={1} variant="h4">
                    {Translator.instance.translate("login_page_email_not_found")}
                </MKTypography>
            );
        }

        return (
            <div>
                <MKTypography sx={{ mx: 'auto' }} variant="body1" color="text" mb={1}>
                    {associate.name}
                </MKTypography>
                <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mb={1}>
                    <b>{Translator.instance.translate("account_page_number_label")}</b>: {associate.associate_id}
                </MKTypography>
                <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mb={1}>
                    <b>{Translator.instance.translate("account_page_email_label")}</b>: {associate.email}
                </MKTypography>
                {associate.phone && (
                    <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mb={1}>
                        <b>{Translator.instance.translate("account_page_phone_label")}</b>: {associate.phone}
                    </MKTypography>
                )}
                {associate.identification && (
                    <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mb={1}>
                        <b>{Translator.instance.translate("account_page_id_label")}</b>: {associate.identification}
                    </MKTypography>
                )}
                <MKButton
                    sx={{ float: 'right'}}
                    mt={2}
                    onClick={() => {
                        signOut();
                        setState('signingOut');
                    }}
                >
                    {Translator.instance.translate("account_page_sign_out_button")}
                </MKButton>
            </div>
        );
    }

    return (
        <>
            <DefaultNavbar
                routes={[]}
                center
                sticky
                brand="asoticocatcat"
                action={getTranslateAction()}
                secondaryAction={{
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
                            <MKBox component="section" py={6}>
                                <Container>
                                    {getAccountContent()}
                                </Container>
                            </MKBox>
                        </Card>
                    </Container>
                </MKBox>
            </MKBox>
        </>
    );
}


export default AccountPage;