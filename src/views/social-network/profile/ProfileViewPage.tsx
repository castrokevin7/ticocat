import React, { useState, useEffect } from 'react';
import DefaultNavbar from '../../../components/Navbars/DefaultNavbar';
import { getLang } from '../../../utils/Translator';
import Container from '@mui/material/Container';
import MKBox from '../../../components/MKBox';
import bgImage from '../../../assets/images/bg-profile.jpg';
import { Associate, Benefit, Interests } from '../../../models';
import { Spinner } from '../../../components/Spinner';
import { useParams } from 'react-router';
import { DataStore, Storage } from 'aws-amplify';
import Card from '@mui/material/Card';
import Translator from '../../../utils/Translator';
import MKButton from '../../../components/MKButton';
import Link from '@mui/material/Link';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { getBenefitTitle, getBenefitDescription } from '../../informative/benefits/Utils';
import MKTypography from '../../../components/MKTypography';
import Grid from '@mui/material/Grid';
import SimpleBackgroundCard from '../../../components/Cards/BackgroundCards/SimpleBackgroundCard';
import thumbnail from '../../../assets/images/profile.png';
import './ProfileViewPage.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { getInterestTranslationKey } from '../utils';
import Chip from '@mui/material/Chip';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import MKBadge from "../../../components/MKBadge";

import routes from '../routes';
import Footer from '../Footer';

function ProfileViewPage() {
    const [state, setState] = useState("");
    const [associate, setAssociate] = useState<Associate | null>();
    const [associateOfferedBenefits, setAssociateOfferedBenefits] = useState<Benefit[] | undefined>();
    const [isLoadingBenefits, setIsLoadingBenefits] = useState(false);
    const { associateId } = useParams<{ associateId?: string }>();
    const { user } = useAuthenticator((context) => [context.user]);
    const { route } = useAuthenticator(context => [context.route]);

    const fetchAssociate = async () => {
        try {
            let response: Associate[];
            if (associateId) {
                response = await DataStore.query(Associate, (assoc: any) => assoc.and((a: any) => [
                    a.username("eq", associateId),
                    a.is_account_activated("eq", true)
                ]));
                if (response.length === 0) {
                    response = await DataStore.query(Associate, (assoc: any) => assoc.and((a: any) => [
                        a.id("eq", associateId),
                        a.is_account_activated("eq", true)
                    ]));
                }
            } else {
                response = await DataStore.query(Associate, (assoc: any) => assoc.email("eq", user?.attributes?.email || ''));
                if (response.length > 0) {
                    const loggedUser = response[0];
                    window.history.pushState({}, '', `/${getLang()}/social/perfil/${loggedUser.username || loggedUser.id}`);
                }
            }

            if (response.length > 0) {
                let associateData = response[0];
                if (associateData.profile_picture) {
                    const image = await Storage.get(associateData.profile_picture, { level: 'public' });
                    associateData = Associate.copyOf(associateData, updated => {
                        updated.profile_picture = image;
                    });
                }
                setAssociate(associateData);
            } else {
                setAssociate(null);
            }
            setState('success');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    };

    const fetchAssociateOfferedBenefits = async (assoc: Associate) => {
        if (associateOfferedBenefits && associateOfferedBenefits.length > 0) {
            return;
        }

        setIsLoadingBenefits(true);
        try {
            let response = await DataStore.query(Benefit, (b: any) => b.associate_id("eq", assoc.id));
            if (response.length > 0) {
                response = await Promise.all(response.map(async (benefit) => {
                    const image = await Storage.get(benefit.image || '');
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
            return null;
        }

        return (
            <MKBox sx={{ margin: '25px' }}>
                <MKTypography variant="h4" mt={4}>
                    {Translator.instance.translate("account_page_benefits_offered")}:
                </MKTypography>
                <Grid container spacing={3}>
                    {
                        associateOfferedBenefits.map((benefit, i) =>
                            <Grid key={i} item xs={12} lg={4}>
                                <a rel="noreferrer" target="_blank" href={`/${getLang()}/beneficio/${benefit.benefit_id}`}>
                                    <SimpleBackgroundCard
                                        image={benefit.image || ''}
                                        title={getBenefitTitle(benefit) || ''}
                                        description={`${(getBenefitDescription(benefit) || '').substring(0, 31)}... ${Translator.instance.translate("benefits_page_see_more_from_benefit")}`}
                                    />
                                </a>
                            </Grid>
                        )}
                </Grid>
            </MKBox>
        );
    }

    const getSocialMedia = () => {
        if (!associate) return null;

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
        if (!associate) return null;

        if (!user && !associate.is_public_profile) {
            return <div>
                <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Perfil de usuario privado: solo es visible para miembros de TICOCAT Social.</p>
                <div style={{ float: 'right', marginTop: '10px' }}>
                    <a href={`/${getLang()}/acceso`}>
                        <MKButton color="info">
                            Acceso Socios
                        </MKButton>
                    </a>
                </div>
            </div>;
        }

        const getBioSection = () => {
            if (!associate.bio) {
                return null;
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
                return null;
            }

            if (!associate.email && !associate.phone) {
                return null;
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
            if (!associate.interests || !Array.isArray(associate.interests) || associate.interests.length === 0) {
                return null;
            }

            const interests = associate.interests as (Interests | null)[];

            return (
                <MKBox mt={5}>
                    <MKTypography variant="h4">
                        Intereses
                    </MKTypography>
                    <div>
                        {interests.map((interest, index) => (
                            <Chip
                                key={index}
                                sx={{ margin: '2px' }}
                                label={Translator.instance.translate(getInterestTranslationKey(interest as Interests))}
                            />
                        ))}
                    </div>
                </MKBox>
            );
        }

        const getHeaderSection = () => {
            return (
                <>
                    <MKBox mb={3} display="flex" alignItems="center" justifyContent="space-between">
                        <MKBox>
                            <MKTypography variant="h4">
                                {associate.custom_name || associate.name}
                            </MKTypography>
                            {associate.username &&
                                <MKTypography variant="body2" color="text">
                                    @{associate.username}
                                </MKTypography>
                            }
                        </MKBox>
                        {getSocialMedia()}
                    </MKBox>
                    {associate.is_public_profile && <MKBadge badgeContent="Perfil Público" color="info" container />}
                </>
            );
        }

        return (
            <div>
                <MKBox sx={{ width: { xs: '90%', md: '80%' }, margin: 'auto' }}>
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
            null;
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
            />

            <MKBox component="header" position="relative">
                <MKBox
                    display="flex"
                    alignItems="center"
                    minHeight="100vh"
                    sx={{
                        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }: any) => `${linearGradient(rgba(gradients.dark.main, 0.4), rgba(gradients.dark.state, 0.4))}, url(${bgImage})`,
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
                                backgroundColor: ({ palette: { white }, functions: { rgba } }: any) => rgba(white.main, 0.8),
                                backdropFilter: "saturate(200%) blur(30px)",
                                boxShadow: ({ boxShadows: { xxl } }: any) => xxl,
                                overflowY: 'auto'
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
