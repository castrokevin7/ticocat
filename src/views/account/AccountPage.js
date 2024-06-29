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
import { Spinner } from "components/Spinner";
import MKButton from "components/MKButton";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";

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

    useEffect(() => {
        if (associate) {
            markAccountAsActivated(associate);
        }
    }, [associate]);

    if (!user || route !== 'authenticated') {
        return <Navigate to={`/${getLang()}/acceso`} />;
    }

    const markAccountAsActivated = async (associate) => {
        if (associate.is_account_activated)
            return;

        try {
            await DataStore.save(
                Associate.copyOf(associate, updated => {
                    Object.assign(updated, { is_account_activated: true });
                })
            );
            console.log('Account marked as activated:', associate.email);
        } catch (err) {
            console.error('Error activating account:', err);
        }
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

        const getAccountHeaderControls = () => {
            return (
                <div style={{ float: 'right' }}>
                    <MKButton
                        color="secondary"
                        onClick={() => {
                            signOut();
                            setState('signingOut');
                        }}
                    >
                        {Translator.instance.translate("account_page_sign_out_button")}
                    </MKButton>
                    {' '}
                    <Link to={`/${getLang()}/social`}>
                        <MKButton color="info">
                            TICOCAT Social
                        </MKButton>
                    </Link>
                </div>
            );
        }

        const getRegistryInformation = () => {
            return (
                <>
                    <MKTypography variant="body1" color="text">
                        {Translator.instance.translate("account_page_inscription_information_header")}
                    </MKTypography>
                    <MKTypography variant="body2" color="text" mb={1}>
                        {Translator.instance.translate("account_page_about_updating_information")}
                        {' '}
                        <MKTypography
                            component="a"
                            target="_blank"
                            href="mailto:asoticocat@gmail.com?Subject=Quiero actualizar mi información"
                            variant="body2"
                            color="info"
                            fontWeight="regular"
                        >
                            {Translator.instance.translate("account_page_about_updating_information_link")}
                        </MKTypography>
                        .
                    </MKTypography>
                    <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mb={1}>
                        <b>{Translator.instance.translate("account_page_number_label")}</b>: {associate.associate_id}
                    </MKTypography>
                    <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mt={1} mb={1}>
                        <b>{Translator.instance.translate("account_page_name_label")}</b>: {associate.name}
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
                </>
            );
        }

        const toggleSwitch = async () => {
            try {
                await DataStore.save(
                    Associate.copyOf(associate, updated => {
                        Object.assign(updated, { is_public_profile: !associate.is_public_profile });
                    })
                );
                console.log('Public profile updated:', associate.email);
                fetchAssociate(user.attributes.email);
            } catch (err) {
                console.error('Error updating public profile:', err);
            }
        }

        const getPublicAccountToggle = () => {
            return (
                <MKBox display="flex" alignItems="center">
                    <Switch checked={associate.is_public_profile} onChange={toggleSwitch} />
                    <MKBox ml={2} lineHeight={0.5}>
                        <MKTypography display="block" variant="button" fontWeight="bold">
                            {Translator.instance.translate("account_page_social_public_account_label")}
                        </MKTypography>
                        <MKTypography variant="caption" color="text" fontWeight="regular">
                            {Translator.instance.translate("account_page_social_public_account_description")}
                        </MKTypography>
                    </MKBox>
                </MKBox>
            )
        }

        const getSocialInformation = () => {
            return (
                <>
                    <MKTypography mt={5} variant="body1" color="text">
                        {Translator.instance.translate("account_page_social_information_header")}
                    </MKTypography>
                    <MKTypography variant="body2" color="text" mb={1}>
                        {Translator.instance.translate("account_page_social_information_description")}.
                    </MKTypography>
                    {getPublicAccountToggle()}
                </>
            );
        }

        return (
            <div>
                {getAccountHeaderControls()}
                {getRegistryInformation()}
                {getSocialInformation()}
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