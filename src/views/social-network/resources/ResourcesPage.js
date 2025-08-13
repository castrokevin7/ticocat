import React, { useState, useEffect } from 'react';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Otis Kit PRO components
import Card from "@mui/material/Card";

import bgImage from 'assets/images/bg-community.jpg';
import { Storage } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import DefaultNavbar from 'components/Navbars/DefaultNavbar';

import routes from '../routes';
import Footer from '../Footer';

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Otis Kit PRO components
import InfoBackgroundCard from "components/Cards/BackgroundCards/InfoBackgroundCard";
import { Spinner } from "components/Spinner";

function ResourcesPage() {
    const { route } = useAuthenticator(context => [context.route]);
    const [welcomeGuideUrl, setWelcomeGuideUrl] = useState(null);
    const [statutesUrl, setStatutesUrl] = useState(null);
    const [loadingResources, setLoadingResources] = useState(false);

    useEffect(() => {
        setLoadingResources(true);
        getWelcomeGuideUrl().then(url => setWelcomeGuideUrl(url));
        getStatutesUrl().then(url => setStatutesUrl(url));
        setLoadingResources(false);
    }, []);

    const getStatutesUrl = async () => {
        const url = await Storage.get('Recursos/Estatutos.pdf', { expires: 60 });
        return url;
    }

    const getWelcomeGuideUrl = async () => {
        const url = await Storage.get('Recursos/Bienvenida TICOCAT.pdf', { expires: 60 });
        return url;
    }

    const getRoutes = () => {
        return route !== 'authenticated' ? [] : routes;
    }

    const getFooter = () => {
        return route !== 'authenticated' ? null : <Footer />;
    }

    const getResources = () => {
        if (loadingResources) return <Spinner />;

        return (
            <Grid container spacing={3} item xs={12} md={6} lg={8}>
                <Grid item xs={12} md={6}>
                    <a href={welcomeGuideUrl} target="_blank" rel="noreferrer">
                        <InfoBackgroundCard
                            image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/laught.jpg"
                            icon="import_contacts"
                            title="Guía de Bienvenida"
                        />
                    </a>
                </Grid>
                <Grid item xs={12} md={6}>
                    <a href={statutesUrl} target="_blank" rel="noreferrer">
                        <InfoBackgroundCard
                            image="https://derechovirtual.org/wp-content/uploads/2023/06/elaboracio%CC%81n-de-leyes-en-Espan%CC%83a.jpg"
                            icon="import_contacts"
                            title="Estatutos"
                        />
                    </a>
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            <DefaultNavbar
                routes={getRoutes()}
                center
                sticky
                brand="asoticocat"
            />
            <MKBox component="header" position="relative">
                <MKBox
                    display="flex"
                    alignItems="center"
                    minHeight="60vh"
                    sx={{
                        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.dark.main, 0.5), rgba(gradients.dark.state, 0.5))}, url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Container>
                        <Grid container item xs={12} lg={8} flexDirection="column" justifyContent="center">
                            <MKTypography
                                variant="h1"
                                color="white"
                                mb={3}
                                sx={({ breakpoints, typography: { size } }) => ({
                                    [breakpoints.down("md")]: {
                                        fontSize: size["3xl"],
                                    },
                                })}
                            >
                                Recursos
                            </MKTypography>
                            <MKTypography variant="body1" color="white" opacity={0.8} pr={6} mr={6}>
                                Acá encontrarás recursos útiles para tu participación en la comunidad TICOCAT.
                            </MKTypography>
                        </Grid>
                    </Container>
                </MKBox>
            </MKBox>
            <Card
                sx={{
                    p: 2,
                    mx: { xs: 2, lg: 3 },
                    mt: -8,
                    mb: 4,
                    backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
                    backdropFilter: "saturate(200%) blur(30px)",
                    boxShadow: ({ boxShadows: { xxl } }) => xxl,
                }}
            >
                <MKBox component="section" py={6}>
                    <Container>
                        {getResources()}
                    </Container>
                </MKBox>
            </Card>
            {getFooter()}
        </>
    );
}

export default ResourcesPage;
