import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Benefit } from "../../../models";
import { DataStore, Storage } from "aws-amplify";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "../../../components/MKBox";
import MKTypography from "../../../components/MKTypography";
import DefaultNavbar from "../../../components/Navbars/DefaultNavbar";
import { getBenefitTitle, getBenefitDescription, getBenefitAboutProvider } from "./Utils";
import Translator, { getLang } from "../../../utils/Translator";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MuiLink from "@mui/material/Link";
import { Spinner } from "../../../components/Spinner";

function BenefitView() {
    const [state, setState] = useState("");
    const [benefit, setBenefit] = useState<Benefit | null>(null);
    const { benefitId } = useParams<{ benefitId?: string }>();

    const fetchBenefit = async () => {
        try {
            const response = await DataStore.query(Benefit, (b: any) => b.benefit_id('eq', benefitId));
            if (response.length > 0) {
                let foundBenefit = response[0];
                if (foundBenefit.image) {
                    const image = await Storage.get(foundBenefit.image);
                    foundBenefit = Benefit.copyOf(foundBenefit, updated => {
                        updated.image = image;
                    });
                }

                setBenefit(foundBenefit);
            } else {
                setBenefit(null);
            }
            setState('success');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    };

    useEffect(() => {
        setState('loading');
        fetchBenefit();
        // eslint-disable-next-line
    }, [benefitId]);

    const getConnectionSection = (currentBenefit: Benefit) => {
        if (currentBenefit.email || currentBenefit.websiteUrl || currentBenefit.instagramUrl || currentBenefit.facebookUrl) {
            return (
                <>
                    <MKTypography variant="h3" mt={5} mb={1}>
                        {Translator.instance.translate("benefit_connect")}
                    </MKTypography>

                    <Container>
                        {currentBenefit.instagramUrl &&
                            <MuiLink href={currentBenefit.instagramUrl} target="_blank" rel="noreferrer">
                                <InstagramIcon fontSize="large" />
                            </MuiLink>
                        }
                        {currentBenefit.facebookUrl &&
                            <MuiLink href={currentBenefit.facebookUrl} target="_blank" rel="noreferrer">
                                <FacebookIcon fontSize="large" />
                            </MuiLink>
                        }
                        {currentBenefit.websiteUrl &&
                            <MuiLink href={currentBenefit.websiteUrl} target="_blank" rel="noreferrer">
                                <LanguageIcon fontSize="large" />
                            </MuiLink>
                        }
                        {currentBenefit.email &&
                            <MuiLink href={`mailto:${currentBenefit.email}`} target="_blank" rel="noreferrer">
                                <AlternateEmailIcon fontSize="large" />
                            </MuiLink>
                        }
                    </Container>
                </>
            )
        }

        return null;
    }

    const getBenefitContent = (currentBenefit: Benefit) => {
        return (
            <MKBox component="section" py={{ xs: 3, md: 12 }}>
                <Container>
                    <MKTypography variant="h3" my={1}>
                        {getBenefitTitle(currentBenefit)}
                    </MKTypography>
                    <MKTypography sx={{ whiteSpace: 'pre-line' }} variant="body1" color="text" mb={2}>
                        {getBenefitDescription(currentBenefit)}
                    </MKTypography>
                    <MKTypography variant="h3" mt={5} mb={1}>
                        {Translator.instance.translate("benefit_about_provider")}
                    </MKTypography>
                    <MKTypography sx={{ whiteSpace: 'pre-line' }} variant="body1" color="text" mb={2}>
                        {getBenefitAboutProvider(currentBenefit)}
                        {currentBenefit.phone &&
                            <MKTypography variant="body1" color='text' sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                <ContactPhoneIcon sx={{ marginLeft: '5px' }} fontSize="large" />
                                <span style={{ marginLeft: '10px' }}>{currentBenefit.phone}</span>
                            </MKTypography>
                        }
                    </MKTypography>
                    {getConnectionSection(currentBenefit)}
                </Container>
            </MKBox >
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
                {Translator.instance.translate("benefit_error_tag").format(benefitId || '')}
            </MKTypography>
        );
    }

    if (benefit === null) {
        return (
            <MKTypography ml={1} mt={1} variant="h4">
                {Translator.instance.translate("benefit_not_found").format(benefitId || '')}
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
                    route: `/${getLang()}/beneficios`,
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
                        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }: any) => `${linearGradient(rgba(gradients.dark.main, 0.4), rgba(gradients.dark.state, 0.4))}, url(${benefit.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Container>
                        <Grid
                            container
                            item
                            xs={12}
                            lg={6}
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                            mx="auto"
                        >
                            <MKTypography
                                variant="h1"
                                color="white"
                                sx={({ breakpoints, typography: { size } }: any) => ({
                                    [breakpoints.down("md")]: {
                                        fontSize: size["3xl"],
                                    },
                                })}
                                mb={1}
                            >
                                {getBenefitTitle(benefit)}
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
                    backgroundColor: ({ palette: { white }, functions: { rgba } }: any) => rgba(white.main, 0.8),
                    backdropFilter: "saturate(200%) blur(30px)",
                    boxShadow: ({ boxShadows: { xxl } }: any) => xxl,
                }}
            >
                <MKBox component="section" py={6}>
                    <Container>
                        {getBenefitContent(benefit)}
                    </Container>
                </MKBox>
            </Card>
        </>
    )
}

export default BenefitView;
