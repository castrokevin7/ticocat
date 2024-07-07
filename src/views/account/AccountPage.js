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
import { Benefit } from "models";
import Grid from "@mui/material/Grid";
import MKInput from "components/MKInput";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

function AccountPage() {
    const [state, setState] = useState("loading");
    const [associate, setAssociate] = useState();
    const [associateOfferedBenefits, setAssociateOfferedBenefits] = useState();
    const [isLoadingBenefits, setIsLoadingBenefits] = useState(false);
    const { route } = useAuthenticator(context => [context.route]);
    const { user, signOut } = useAuthenticator((context) => [context.user]);
    const [username, setUsername] = useState();
    const [bio, setBio] = useState();
    const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);

    const fetchAssociate = async (email) => {
        try {
            let response = await DataStore.query(Associate, a => a.email("eq", email));
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

    const fetchAssociateOfferedBenefits = async (associate) => {
        if (associateOfferedBenefits && associateOfferedBenefits.length > 0) {
            return;
        }

        setIsLoadingBenefits(true);
        try {
            let response = await DataStore.query(Benefit, b => b.associate_id("eq", associate.id));
            if (response.length > 0) {
                setAssociateOfferedBenefits(response);
            }
        } catch (err) {
            console.error('Error:', err);
        }
        setIsLoadingBenefits(false);
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
            fetchAssociateOfferedBenefits(associate);
            setUsername(associate.username);
            setBio(associate.bio);
        }
        // eslint-disable-next-line
    }, [associate]);

    if (!user || route !== 'authenticated') {
        return <Navigate to={`/${getLang()}/acceso`} />;
    }

    const markAccountAsActivated = async (associate) => {
        if (associate.is_account_activated)
            return;

        try {
            const original = await DataStore.query(Associate, associate.id);
            await DataStore.save(
                Associate.copyOf(original, updated => {
                    updated.is_account_activated = true;
                })
            );
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
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', justifyContent: 'flex-end' }}>
                    <span style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Icon fontSize="large"
                            onClick={() => {
                                signOut();
                                setState('signingOut');
                            }}
                        >
                            logout_rounded
                        </Icon>
                        <MKTypography variant="caption" color="text">Salir</MKTypography>
                    </span>
                    <Link style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} to={`/${getLang()}/social/usuario/${associate.username || associate.id}`}>
                        <Icon fontSize="large">account_box_rounded</Icon>
                        <MKTypography variant="caption" color="text">Perfil</MKTypography>
                    </Link>
                    <Link style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} to={`/${getLang()}/social`}>
                        <Icon fontSize="large">connect_without_contact_rounded</Icon>
                        <MKTypography variant="caption" color="text">Social</MKTypography>
                    </Link>
                </div>
            );
        }

        const getBenefitsOffered = () => {
            if (isLoadingBenefits) {
                return (
                    <MKTypography
                        sx={{ mx: 'auto', display: 'flex', alignItems: 'center' }}
                        variant="body2"
                        color="text"
                        mt={2}
                    >
                        <Spinner /> {Translator.instance.translate("account_page_loading_benefits_offered")}
                    </MKTypography>
                );
            }

            if (!associateOfferedBenefits || associateOfferedBenefits.length === 0) {
                return;
            }

            return (
                <>
                    <MKTypography variant="body2" color="text">
                        <b>{Translator.instance.translate("account_page_benefits_offered")}</b>:
                    </MKTypography>
                    <ul style={{ marginLeft: '30px' }}>
                        {associateOfferedBenefits && associateOfferedBenefits.map(benefit => (
                            <li key={benefit.id}>
                                <Link target="_blank" to={`/${getLang()}/beneficio/${benefit.benefit_id}`}>
                                    <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text">
                                        {benefit.title}
                                    </MKTypography>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
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
                    {getBenefitsOffered()}
                </>
            );
        }

        const updateProfileVisiblitySettings = async () => {
            try {
                const original = await DataStore.query(Associate, associate.id);
                await DataStore.save(
                    Associate.copyOf(original, updated => {
                        updated.is_public_profile = !original.is_public_profile;
                    })
                );
                fetchAssociate(user.attributes.email);
            } catch (err) {
                console.error('Error updating public profile:', err);
            }
        }

        const getPublicAccountToggle = () => {
            return (
                <MKBox display="flex" alignItems="center" mb={2}>
                    <Switch checked={associate.is_public_profile} onChange={updateProfileVisiblitySettings} />
                    <MKBox ml={2} lineHeight={0.5}>
                        <MKTypography display="block" variant="button" fontWeight="bold">
                            {Translator.instance.translate("account_page_social_public_account_label")}
                        </MKTypography>
                        <MKTypography variant="caption" color="text" fontWeight="regular">
                            {Translator.instance.translate("account_page_social_public_account_description")}.
                        </MKTypography>
                    </MKBox>
                </MKBox>
            )
        }

        const updatePhoneVisiblitySettings = async () => {
            try {
                const original = await DataStore.query(Associate, associate.id);
                await DataStore.save(
                    Associate.copyOf(original, updated => {
                        updated.share_phone = !original.share_phone;
                    })
                );
                fetchAssociate(user.attributes.email);
            } catch (err) {
                console.error('Error updating public phone:', err);
            }
        }

        const getPublicPhoneToggle = () => {
            return (
                <MKBox display="flex" alignItems="center" mb={2}>
                    <Switch checked={associate.share_phone} onChange={updatePhoneVisiblitySettings} />
                    <MKBox ml={2} lineHeight={0.5}>
                        <MKTypography display="block" variant="button" fontWeight="bold">
                            {Translator.instance.translate("account_page_social_public_phone_label")}
                        </MKTypography>
                        <MKTypography variant="caption" color="text" fontWeight="regular">
                            {Translator.instance.translate("account_page_social_public_phone_description")}.
                        </MKTypography>
                    </MKBox>
                </MKBox>
            )
        }

        const updateEmailVisiblitySettings = async () => {
            try {
                const original = await DataStore.query(Associate, associate.id);
                await DataStore.save(
                    Associate.copyOf(original, updated => {
                        updated.share_email = !original.share_email;
                    })
                );
                fetchAssociate(user.attributes.email);
            } catch (err) {
                console.error('Error updating public email:', err);
            }
        }

        const getPublicEmailToggle = () => {
            return (
                <MKBox display="flex" alignItems="center" mb={2}>
                    <Switch checked={associate.share_email} onChange={updateEmailVisiblitySettings} />
                    <MKBox ml={2} lineHeight={0.5}>
                        <MKTypography display="block" variant="button" fontWeight="bold">
                            {Translator.instance.translate("account_page_social_public_email_label")}
                        </MKTypography>
                        <MKTypography variant="caption" color="text" fontWeight="regular">
                            {Translator.instance.translate("account_page_social_public_email_description")}.
                        </MKTypography>
                    </MKBox>
                </MKBox>
            )
        }

        const updateUsername = async (event) => {
            const newUsername = event.target.value;

            if (newUsername === '' || newUsername === associate.username) {
                setUsername(newUsername);
                setUsernameAlreadyExists(false);
                return;
            }

            if (/^[a-zA-Z0-9_]*$/.test(newUsername)) {
                const otherAssociate = await DataStore.query(Associate, a => a.username("eq", newUsername));
                if (otherAssociate.length > 0) {
                    console.error('Error: Username already exists');
                    setUsernameAlreadyExists(true);
                } else {
                    setUsernameAlreadyExists(false);
                }

                setUsername(newUsername);
            }
        }

        const updateAssociateUsername = async () => {
            try {
                const original = await DataStore.query(Associate, associate.id);
                await DataStore.save(
                    Associate.copyOf(original, updated => {
                        updated.username = username;
                    })
                );
                console.log('Username updated:', associate.email);
                fetchAssociate(user.attributes.email);
            } catch (err) {
                console.error('Error updating username:', err);
            }
        }

        const getUpdateUsernameControls = () => {
            if (username === associate.username || usernameAlreadyExists) {
                return;
            }

            return (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={updateAssociateUsername}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={() => setUsername(associate.username)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        const getUsernameField = () => {
            return (
                <div style={{ marginTop: '5px' }}>
                    <Grid container item xs={12} lg={6} py={1}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <MKInput
                            variant="standard"
                            label="Nombre de usuario"
                            placeholder="usuariocool123"
                            InputLabelProps={{ shrink: true }}
                            onChange={updateUsername}
                            value={username}
                            fullWidth
                        />
                        {getUpdateUsernameControls()}
                        {usernameAlreadyExists && (
                            <MKTypography variant="caption" color="error">
                                {Translator.instance.translate("account_page_username_already_exists")}
                            </MKTypography>
                        )}
                    </Grid>
                </div>
            )
        }

        const MAX_BIO_LENGTH = 512;
        const updateBio = async (event) => {
            const newBio = event.target.value;

            if (newBio.length > MAX_BIO_LENGTH) {
                return;
            }

            if (newBio === '') {
                setBio(newBio);
                return;
            }

            if (/^[a-zA-Z0-9_.,!¡¿?() -$€@"'áÁàÀéÉèÈüÜóÓòÒíÍìÌúÚùÙñÑ]*$/.test(newBio)) {
                setBio(newBio);
            }
        }

        const updateAssociateBio = async () => {
            try {
                const original = await DataStore.query(Associate, associate.id);
                await DataStore.save(
                    Associate.copyOf(original, updated => {
                        updated.bio = bio.trim();
                    })
                );
                fetchAssociate(user.attributes.email);
            } catch (err) {
                console.error('Error updating bio:', err);
            }
        }

        const getUpdateBioControls = () => {
            if (bio === associate.bio) {
                return;
            }

            return (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={updateAssociateBio}
                    >
                        check
                    </Icon>
                    <Icon
                        sx={{ mr: 1 }}
                        onClick={() => setBio(associate.bio)}
                    >
                        close
                    </Icon>
                </div >
            )
        }

        const getBioField = () => {
            return (
                <div style={{ marginTop: '15px' }}>
                    <Grid container item xs={12} lg={6} py={1}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <MKInput
                            variant="standard"
                            label="Biografía"
                            placeholder="Escribe algo sobre ti"
                            InputLabelProps={{ shrink: true }}
                            multiline
                            rows={4}
                            value={bio}
                            onChange={updateBio}
                            fullWidth
                        />
                        <MKTypography variant="caption" color="info">
                            {bio ? bio.length : 0}/{MAX_BIO_LENGTH}
                        </MKTypography>
                        {getUpdateBioControls()}
                    </Grid>
                </div>
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
                    {getPublicPhoneToggle()}
                    {getPublicEmailToggle()}
                    <div style={{ marginTop: '5px', marginLeft: '5px' }}>
                        {getUsernameField()}
                        {getBioField()}
                    </div>
                </>
            );
        }

        return (
            <>
                {getAccountHeaderControls()}
                {getRegistryInformation()}
                {getSocialInformation()}
            </>
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
