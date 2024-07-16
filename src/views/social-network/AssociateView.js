import React, { useState, useEffect } from "react";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import { getTranslateAction } from 'utils/TranslateAction';
import { getLang } from 'utils/Translator';
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import bgImage from "assets/images/associates.jpg";
import { Associate, Benefit } from "../../models";
import { Spinner } from "components/Spinner";
import { useParams } from "react-router";
import { DataStore, Storage } from "aws-amplify";
import Card from "@mui/material/Card";
import { auto } from "@popperjs/core";
import Translator from 'utils/Translator';
import MKButton from "components/MKButton";
import { Link } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { getBenefitTitle, getBenefitDescription } from '../benefits/Utils';
import MKTypography from "components/MKTypography";
import Grid from "@mui/material/Grid";
import SimpleBackgroundCard from "components/Cards/BackgroundCards/SimpleBackgroundCard";
import MKSocialButton from "components/MKSocialButton";
import Icon from "@mui/material/Icon";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MuiLink from "@mui/material/Link";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import thumbnail from "assets/images/profile.png";

function AssociateView() {
    const [state, setState] = useState("");
    const [associate, setAssociate] = useState();
    const [associateOfferedBenefits, setAssociateOfferedBenefits] = useState();
    const [isLoadingBenefits, setIsLoadingBenefits] = useState(false);
    const { associateId } = useParams();
    const { user } = useAuthenticator((context) => [context.user]);

    const fetchAssociate = async () => {
        try {
            let response = await DataStore.query(Associate, associate => associate.and(associate => [
                associate.username('eq', associateId),
                associate.is_account_activated('eq', true)
            ]));
            if (response.length === 0) {
                response = await DataStore.query(Associate, associate => associate.and(associate => [
                    associate.id('eq', associateId),
                    associate.is_account_activated('eq', true)
                ]));
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

    const getOfferedBenefits = () => {
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
                <MKTypography variant="body1" color="text" mt={2}>
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
            </>
        );
    }

    const getContactInformation = () => {
        if (!associate.share_phone && !associate.share_email) {
            return;
        }

        return (
            <>
                <MKTypography variant="body1" color="text" mt={2}>
                    {Translator.instance.translate("associate_view_contact_information_label")}
                </MKTypography>
                <div style={{ display: 'flex' }}>
                    {associate.share_phone && associate.phone &&
                        <MuiLink style={{ margin: '3px' }} href={`https://wa.me/${associate.phone}`} target="_blank" rel="noreferrer">
                            <ContactPhoneIcon fontSize="large" />
                        </MuiLink>
                    }
                    {associate.share_email && associate.email &&
                        <MuiLink style={{ margin: '3px' }} href={`mailto:${associate.email}`} target="_blank" rel="noreferrer">
                            <AlternateEmailIcon fontSize="large" />
                        </MuiLink>
                    }
                </div>
            </>
        );
    }

    const getSocialMedia = () => {
        if (!associate.instagram_username && !associate.facebook_username && !associate.linkedin_username) {
            return;
        }

        return (
            <MKBox display="flex" flexWrap="wrap" gap={1} mb={2}>
                {associate.instagram_username && (
                    <a href={`https://www.instagram.com/${associate.instagram_username}`} target="_blank" rel="noreferrer">
                        <MKSocialButton color="instagram" iconOnly>
                            <MKBox component="i" color="inherit" className="fab fa-instagram" />
                        </MKSocialButton>
                    </a>
                )}
                {associate.linkedin_username && (
                    <a href={`https://www.linkedin.com/in/${associate.linkedin_username}`} target="_blank" rel="noreferrer">
                        <MKSocialButton color="linkedin" iconOnly>
                            <MKBox component="i" color="inherit" className="fab fa-linkedin" />
                        </MKSocialButton>
                    </a>
                )}
                {associate.facebook_username && (
                    <a href={`https://www.facebook.com/${associate.facebook_username}`} target="_blank" rel="noreferrer">
                        <MKSocialButton color="facebook" iconOnly>
                            <MKBox component="i" color="inherit" className="fab fa-facebook" />
                        </MKSocialButton>
                    </a>
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

        return (
            <>
                {user?.attributes?.email === associate.email &&
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                        <Link style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} to={`/${getLang()}/cuenta`}>
                            <Icon fontSize="large">edit_note_rounded</Icon>
                            <MKTypography variant="caption" color="text">Editar</MKTypography>
                        </Link>
                    </div>
                }
                <Grid container>
                    <Grid item xs={12} md={6} lg={4}>
                        <img src={associate.profile_picture || thumbnail} alt="Profile" style={{ width: '250px', height: '250px', display: 'block', borderRadius: '5px' }} />
                        <h3>{associate.custom_name || associate.name}</h3>
                        {associate.username && <p>@{associate.username}</p>}
                        {getSocialMedia()}
                    </Grid>
                    <Grid item xs={12} md={6} lg={8} mt={{ md: 4, sm: 1 }}>
                        {associate.bio && <p><i>"{associate.bio}"</i></p>}
                    </Grid>
                </Grid>
                {getContactInformation()}
                {getOfferedBenefits()}
            </>
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

    return (
        <>
            <DefaultNavbar
                routes={[]}
                center
                sticky
                brand="asoticocat"
                action={getTranslateAction()}
                secondaryAction={{
                    route: `/${getLang()}/social`,
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
