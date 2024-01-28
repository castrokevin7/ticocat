import React, { useState } from 'react';
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { getTranslateAction } from 'sections/main/Navbar';
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


function LoginPage() {
    const [email, setEmail] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [emailToSearch, setEmailToSearch] = useState(null);
    const [invalidEmail, setInvalidEmail] = useState(false);

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
            return (
                <Authenticator>
                    {({ signOut, user }) => (
                        <main>
                            <h1>Hello {user.username}</h1>
                            <button onClick={signOut}>Sign out</button>
                        </main>
                    )}
                </Authenticator>
            );
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
                        <Grid item sx={{ display: 'flex', flexDirection: 'row' }} xs={12} lg={8} py={1} mx="auto">
                            <MKInput
                                label={Translator.instance.translate("login_page_email")}
                                fullWidth
                                onChange={handleEmailChange}
                                type="email"
                            />
                            <MKButton
                                variant="outlined"
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