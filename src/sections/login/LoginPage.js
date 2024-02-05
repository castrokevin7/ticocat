import React, { useState } from 'react';
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { getTranslateAction } from 'utils/TranslateAction';
import { getLang } from 'utils/Translator';
import MKBox from "components/MKBox";
import bgImage from "assets/images/associates.jpg";
import { auto } from "@popperjs/core";
import Translator from 'utils/Translator';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Icon from "@mui/material/Icon";
import { Associate } from 'models';
import { DataStore } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';
import MKTypography from "components/MKTypography";
import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-react';

I18n.putVocabularies(translations);
I18n.setLanguage(getLang());

I18n.putVocabularies({
    es: {
        'Create Account': Translator.instance.translate("login_sign_up_header"),
        'Password must have at least 8 characters': Translator.instance.translate("login_form_password_length_placeholder"),
        'Password must have lower case letters': Translator.instance.translate("login_form_password_lowercase_placeholder"),
        'Password must have numbers': Translator.instance.translate("login_form_password_numbers_placeholder"),
        'Password must have special characters': Translator.instance.translate("login_form_password_special_characters_placeholder"),
        'Password must have upper case letters': Translator.instance.translate("login_form_password_uppercase_placeholder"),
        'Your passwords must match': Translator.instance.translate("login_form_passwords_match_placeholder"),
        'Incorrect username or password.': Translator.instance.translate("login_form_password_wrong"),
        'An account with the given email already exists.': Translator.instance.translate("login_form_account_already_exists"),
        'User does not exist.': Translator.instance.translate("login_form_user_does_not_exist"),
        'Invalid verification code provided, please try again.': Translator.instance.translate("login_form_invalid_verification_code"),
        'We Emailed You': Translator.instance.translate("login_form_email_verification"),
        'Network Error': Translator.instance.translate("login_form_network_error"),
    },
    cat: {
        'Sign in': Translator.instance.translate("login_header"),
        'Sign In': Translator.instance.translate("login_header"),
        'Create Account': Translator.instance.translate("login_sign_up_header"),
        'Password': Translator.instance.translate("login_form_password_placeholder"),
        'Confirm Password': Translator.instance.translate("login_form_confirm_password_placeholder"),
        'Forgot your password?': Translator.instance.translate("login_form_forgot_password_placeholder"),
        'Password must have at least 8 characters': Translator.instance.translate("login_form_password_length_placeholder"),
        'Password must have lower case letters': Translator.instance.translate("login_form_password_lowercase_placeholder"),
        'Password must have numbers': Translator.instance.translate("login_form_password_numbers_placeholder"),
        'Password must have special characters': Translator.instance.translate("login_form_password_special_characters_placeholder"),
        'Password must have upper case letters': Translator.instance.translate("login_form_password_uppercase_placeholder"),
        'Your passwords must match': Translator.instance.translate("login_form_passwords_match_placeholder"),
        'Incorrect username or password.': Translator.instance.translate("login_form_password_wrong"),
        'An account with the given email already exists.': Translator.instance.translate("login_form_account_already_exists"),
        'User does not exist.': Translator.instance.translate("login_form_user_does_not_exist"),
        'Invalid verification code provided, please try again.': Translator.instance.translate("login_form_invalid_verification_code"),
        'We Emailed You': Translator.instance.translate("login_form_email_verification"),
        'Network Error': Translator.instance.translate("login_form_network_error"),
    },
});

function LoginPage() {
    const [email, setEmail] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [emailToSearch, setEmailToSearch] = useState(null);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const { route } = useAuthenticator(context => [context.route]);

    if (route === 'authenticated') {
        return <Navigate to={`/${getLang()}/cuenta`} />;
    }

    const searchAssociate = async (email) => {
        try {
            let response = await DataStore.query(Associate, c => c.email("eq", email));
            if (response.length > 0) {
                setEmail(response[0]);
                setNotFound(false);
            } else {
                setEmail(null);
                setNotFound(true);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    }

    const handleAccess = () => {
        searchAssociate(emailToSearch);
    }

    const handleEmailChange = (event) => {
        const email = event.target.value;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailRegex.test(email)) {
            setEmailToSearch(email);
            setInvalidEmail(false);
        } else {
            setEmailToSearch(null);
            setInvalidEmail(true);
        }
    };

    const getLoginContent = () => {

        if (email) {
            return <Authenticator />;
        }

        return (
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
                        <MKTypography sx={{ mx: 'auto' }} variant="body2" color="text" mb={1}>
                            {Translator.instance.translate("login_page_email_input")}:
                        </MKTypography>
                        <Grid item sx={{ display: 'flex', flexDirection: 'row' }} xs={12} lg={8} py={1} mx="auto">
                            <MKInput
                                label={Translator.instance.translate("login_page_email")}
                                fullWidth
                                onChange={handleEmailChange}
                                type="email"
                            />
                            <MKButton
                                color="dark"
                                onClick={handleAccess}
                                disabled={!emailToSearch || invalidEmail}
                            >
                                {Translator.instance.translate("login_page_access")}
                                <Icon sx={{ ml: 1 }}>login</Icon>
                            </MKButton>
                        </Grid>
                        {notFound &&
                            <p style={{ fontSize: '14px', textAlign: 'center', color: 'red' }}>
                                {Translator.instance.translate("login_page_email_not_found")}
                            </p>
                        }
                    </Container>
                </MKBox>
            </Card>
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
                        {getLoginContent()}
                    </Container>
                </MKBox>
            </MKBox>
        </>
    );
}


export default LoginPage;