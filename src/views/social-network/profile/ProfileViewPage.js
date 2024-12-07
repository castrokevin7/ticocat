import React, { useState, useEffect } from "react";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import { getTranslateAction } from 'utils/TranslateAction';
import { getLang } from 'utils/Translator';
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import bgImage from "assets/images/associates.jpg";
import { Associate, Benefit } from "../../../models";
import { Spinner } from "components/Spinner";
import { useParams } from "react-router";
import { DataStore, Storage } from "aws-amplify";
import Card from "@mui/material/Card";
import { auto } from "@popperjs/core";
import Translator from 'utils/Translator';
import MKButton from "components/MKButton";
import Link from "@mui/material/Link";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { getBenefitTitle, getBenefitDescription } from '../../informative/benefits/Utils';
import MKTypography from "components/MKTypography";
import Grid from "@mui/material/Grid";
import SimpleBackgroundCard from "components/Cards/BackgroundCards/SimpleBackgroundCard";
import thumbnail from "assets/images/profile.png";
import "./ProfileViewPage.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { getInterestTranslationKey } from "../utils";
import Chip from "@mui/material/Chip";
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';

import routes from "../routes";
import Footer from '../Footer';

function ProfileViewPage() {
    const [state, setState] = useState("");
    const [associate, setAssociate] = useState();
    const [associateOfferedBenefits, setAssociateOfferedBenefits] = useState();
    const [isLoadingBenefits, setIsLoadingBenefits] = useState(false);
    const { associateId } = useParams();
    const { user } = useAuthenticator((context) => [context.user]);
    const { route } = useAuthenticator(context => [context.route]);

    const fetchAssociate = async () => {
        try {
            let response;
            if (associateId) {
                response = await DataStore.query(Associate, associate => associate.and(associate => [
                    associate.username('eq', associateId),
                    associate.is_account_activated('eq', true)
                ]));
                if (response.length === 0) {
                    response = await DataStore.query(Associate, associate => associate.and(associate => [
                        associate.id('eq', associateId),
                        associate.is_account_activated('eq', true)
                    ]));
                }
            } else {
                response = await DataStore.query(Associate, associate => associate.email('eq', user.attributes.email));
            }

            if (response.length > 0) {
                response = response[0];
                if (response.profile_picture) {
                    const image = await Storage.get(response.profile_picture, { level: 'public' });
                    response = Associate.copyOf(response, updated => {
                        updated.profile_picture = image;
                    });
                }
                setAssociate(response);
            } else {
                setAssociate(null);
            }
            setState('success');
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
                response = await Promise.all(response.map(async (benefit, i) => {
                    const image = await Storage.get(benefit.image);
                    return Benefit.copyOf(benefit, updated => {
                        updated.image = image;
                    });
                }));
                setAssociateOfferedBenefits(response);
            }
        } catch (err) {
            console.error('Error:', err);
        }
        setIsLoadingBenefits(false);
    };

    useEffect(() => {
        setState('loading');
        fetchAssociate();
        // eslint-disable-next-line
    }, [associateId]);

    useEffect(() => {
        if (associate) {
            fetchAssociateOfferedBenefits(associate);
        }
        // eslint-disable-next-line
    }, [associate]);

    const getOfferedBenefitsSection = () => {
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
            <MKBox sx={{ margin: '25px' }}>
                <MKTypography variant="h3" mt={4}>
                    {Translator.instance.translate("account_page_benefits_offered")}:
                </MKTypography>
                <Grid container spacing={3}>
                    {
                        associateOfferedBenefits.map((benefit, i) =>
                            <Grid key={i} item xs={12} lg={4}>
                                <Link target="_blank" to={`/${getLang()}/beneficio/${benefit.benefit_id}`}>
                                    <SimpleBackgroundCard
                                        image={benefit.image}
                                        title={getBenefitTitle(benefit)}
                                        date={benefit.date}
                                        description={`${getBenefitDescription(benefit).substring(0, 31)}... ${Translator.instance.translate("benefits_page_see_more_from_benefit")}`}
                                    />
                                </Link>
                            </Grid>
                        )}
                </Grid>
            </MKBox>
        );
    }

    const getSocialMedia = () => {
        return (
            <MKBox display="flex" flexWrap="wrap" gap={0.1}>
                {associate.instagram_username && (
                    <MKTypography
                        component={Link}
                        href={`https://www.instagram.com/${associate.instagram_username}`}
                        target="_blank"
                        variant="body1"
                    >
                        <MKBox component="i">
                            <InstagramIcon fontSize="small" />
                        </MKBox>
                    </MKTypography>
                )}
                {associate.linkedin_username && (
                    <MKTypography
                        component={Link}
                        href={`https://www.linkedin.com/in/${associate.linkedin_username}`}
                        target="_blank"
                        variant="body1"
                    >
                        <MKBox component="i">
                            <LinkedInIcon fontSize="small" />
                        </MKBox>
                    </MKTypography>
                )}
                {associate.facebook_username && (
                    <MKTypography
                        component={Link}
                        href={`https://www.facebook.com/${associate.facebook_username}`}
                        target="_blank"
                        variant="body1"
                    >
                        <MKBox component="i">
                            <FacebookIcon fontSize="small" />
                        </MKBox>
                    </MKTypography>
                )}
            </MKBox>
        );
    }

    const getAssociateInformation = () => {
        if (!user && !associate.is_public_profile) {
            return <div>
                <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Perfil de usuario privado: solo es visible para miembros de TICOCAT Social.</p>
                <div style={{ float: 'right', marginTop: '10px' }}>
                    <Link to={`/${getLang()}/acceso`}>
                        <MKButton color="info">
                            Acceso Socios
                        </MKButton>
                    </Link>
                </div>
            </div>;
        }

        const getBioSection = () => {
            if (!associate.bio) {
                return;
            }

            return (
                <MKBox mt={2}>
                    <MKTypography variant="body1" color="text">
                        {associate.bio}
                    </MKTypography>
                </MKBox>
            );
        }

        const getContactSection = () => {
            if (!associate.share_email && !associate.share_phone) {
                return;
            }

            if (!associate.email && !associate.phone) {
                return;
            }

            return (
                <MKBox mt={5}>
                    <MKTypography variant="h4">
                        {Translator.instance.translate("account_page_contact")}
                    </MKTypography>
                    <MKTypography variant="body1" color="text">
                        {associate.email && associate.share_email && (
                            <MKTypography
                                component={Link}
                                href={`mailto:${associate.email}`}
                                variant="body1"
                                target="_blank"
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <MailOutlineRoundedIcon sx={{ marginRight: '3px' }} fontSize="small" />{associate.email}
                                </div>
                            </MKTypography>
                        )}
                        {associate.phone && associate.share_phone && (
                            <MKTypography
                                component={Link}
                                href={`https://wa.me/${associate.phone}`}
                                variant="body1"
                                target="_blank"
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <LocalPhoneRoundedIcon sx={{ marginRight: '3px' }} fontSize="small" />{associate.phone}
                                </div>
                            </MKTypography>
                        )}
                    </MKTypography>
                </MKBox>
            );
        }

        const getInterestsSection = () => {
            if (!associate.interests || associate.interests.length === 0) {
                return;
            }

            return (
                <MKBox mt={5}>
                    <MKTypography variant="h4">
                        Intereses
                    </MKTypography>
                    <div>
                        {associate.interests.map(interest => (
                            <Chip
                                sx={{ margin: '2px' }}
                                label={Translator.instance.translate(getInterestTranslationKey(interest))}
                            />
                        ))}
                    </div>
                </MKBox>
            );
        }

        const getHeaderSection = () => {
            return (
                <MKBox mb={3} display="flex" alignItems="center" justifyContent="space-between">
                    <MKBox>
                        <MKTypography variant="h3">
                            {associate.custom_name || associate.name}
                        </MKTypography>
                        {associate.username &&
                            <MKTypography variant="body2" color="text">
                                <b>@{associate.username}</b>
                            </MKTypography>
                        }
                        <MKTypography variant="body1" color="text">
                            {associate.position}
                        </MKTypography>
                    </MKBox>
                    <MKBox>
                        {getSocialMedia()}
                    </MKBox>
                </MKBox>
            );
        }

        return (
            <div>
                <MKBox sx={{ width: '80%', margin: 'auto' }}>
                    <div
                        id="display-profile-picture"
                        style={{ backgroundImage: `url(${associate.profile_picture || thumbnail})` }}
                    />
                    {getHeaderSection()}
                    {getBioSection()}
                    {getInterestsSection()}
                    {getContactSection()}
                </MKBox>
                {getOfferedBenefitsSection()}
            </div>
        )
    }

    const getAssociateContent = () => {
        if (state === 'loading') {
            return (
                <Spinner />
            )
        }

        if (state === 'error') {
            return <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{Translator.instance.translate("associate_search_error")}</p>;
        }

        return associate ?
            getAssociateInformation() :
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{Translator.instance.translate("associate_not_found")}</p>;
    }


    const getRoutes = () => {
        return route !== 'authenticated' ? [] : routes;
    }

    const getFooter = () => {
        return route !== 'authenticated' ? null : <Footer />;
    }

    return (
        <>
            <DefaultNavbar
                routes={getRoutes()}
                center
                sticky
                brand="asoticocat"
                action={getTranslateAction()}
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
            {getFooter()}
        </>
    );
}


export default ProfileViewPage;
