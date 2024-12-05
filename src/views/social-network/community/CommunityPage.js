import React, { useState, useEffect } from 'react';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Otis Kit PRO examples
import AssociateCard from "components/Cards/TeamCards/AssociateCard";

// Images
import bgImage from "assets/images/examples/city.jpg";
import thumbnail from "assets/images/profile.png";
import { Associate } from 'models';
import { Spinner } from "components/Spinner";
import { DataStore, Storage } from 'aws-amplify';
import Translator from 'utils/Translator';
import { getLang } from 'utils/Translator';
import { Link } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import { getTranslateAction } from 'utils/TranslateAction';
import { getInterestTranslationKey } from "../utils";
import Chip from "@mui/material/Chip";
import { Interests } from 'models';

import routes from "../routes";
import Footer from '../Footer';

function CommunityPage() {
    const [state, setState] = useState('');
    const [associateSearch, setAssociateSearch] = useState('');
    const [interestsFilter, setInterestsFilter] = useState([]);
    const [associates, setAssociates] = useState([]);
    const [shownAssociates, setShownAssociates] = useState([]);
    const { route } = useAuthenticator(context => [context.route]);

    useEffect(() => {
        if (route !== 'authenticated')
            return;

        setState('loading');
        fetchAssociates();
    }, [route]);

    useEffect(() => {
        if (associates.length === 0) return;

        let filteredAssociates = associates.filter(associate => {
            if (associateSearch.length > 0) {
                return associate.name?.toLowerCase().includes(associateSearch.toLowerCase()) ||
                    associate.custom_name?.toLowerCase().includes(associateSearch.toLowerCase()) ||
                    associate.username?.toLowerCase().includes(associateSearch.toLowerCase());
            }

            if (interestsFilter.length > 0) {
                return interestsFilter.some(interest => associate.interests?.includes(interest));
            }

            return true;
        });
        setShownAssociates(filteredAssociates);
    }, [associateSearch, interestsFilter, associates]);

    if (route !== 'authenticated') {
        return <Navigate to={`/${getLang()}/social/configuracion`} />;
    }

    const fetchAssociates = async () => {
        try {
            let response = await DataStore.query(Associate, associate => associate.and(associate => [
                associate.is_account_activated('eq', true)
            ]));
            if (response.length > 0) {
                response = await Promise.all(response.map(async (associate, i) => {
                    if (!associate.profile_picture) {
                        return Associate.copyOf(associate, updated => {
                            updated.profile_picture = thumbnail;
                        });
                    }

                    const image = await Storage.get(associate.profile_picture, { level: 'public' });
                    return Associate.copyOf(associate, updated => {
                        updated.profile_picture = image;
                    });
                }));
                setAssociates(response);
                setShownAssociates(response);
            }
            setState('success');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    }

    const getAssociates = () => {
        if (state === 'loading') {
            return (
                <Spinner />
            );
        }

        if (state === 'error') {
            return (
                <Grid container spacing={3} mt={2}>
                    <MKTypography ml={3} mt={2} variant="body1" color="text">
                        {Translator.instance.translate("error_tag")}
                    </MKTypography >
                </Grid>
            );
        }

        if (shownAssociates.length === 0) {
            return (
                <Grid container spacing={3} mt={2}>
                    <MKTypography ml={3} mt={2} variant="body2" color="text">
                        {Translator.instance.translate("social_page_no_associates")}
                    </MKTypography>
                </Grid>
            );
        }

        return (
            <Grid container spacing={4}>
                {shownAssociates.map((associate, index) => (
                    <Grid key={index} item xs={12} lg={4}>
                        <MKBox mb={1}>
                            <Link to={`/${getLang()}/social/perfil/${associate.username || associate.id}`}>
                                <AssociateCard
                                    image={associate.profile_picture}
                                    name={associate.name}
                                    username={associate.username}
                                    customName={associate.custom_name}
                                    bio={associate.bio}
                                />
                            </Link>
                        </MKBox>
                    </Grid>
                ))}
            </Grid>
        )
    };

    const getFiltersBox = () => {
        return (
            <MKBox
                position="relative"
                mb={5}
                p={2}
                borderRadius={5}
                sx={{
                    backgroundColor: ({ palette }) => palette.background.paper,
                    boxShadow: ({ shadows }) => shadows[1],
                }}
            >
                <MKTypography variant="h4" mb={1}>
                    Buscador de la comunidad
                </MKTypography>
                {getTextSearchField()}
                {getInterestsField()}
            </MKBox>
        );
    };

    const getTextSearchField = () => {
        return (
            <MKBox
                component="input"
                type="text"
                value={associateSearch}
                onChange={(e) => setAssociateSearch(e.target.value)}
                placeholder="Busca por nombre, usuario o bio..."
                mb={2}
                p={1}
                width="100%"
                borderRadius={10}
                sx={{
                    border: ({ palette }) => `1px solid ${palette.divider}`,
                    backgroundColor: ({ palette }) => palette.background.paper,
                    color: ({ palette }) => palette.text.primary,
                }}
            />
        );
    };

    const getInterestsField = () => {
        const updateInterestsFilter = (interest) => {
            if (interestsFilter.includes(interest)) {
                setInterestsFilter(interestsFilter.filter(i => i !== interest));
            } else {
                setInterestsFilter([...interestsFilter, interest]);
            }
        }

        return (
            <MKBox>
                {Object.keys(Interests).map(interest => (
                    <Chip
                        sx={{ margin: '2px' }}
                        label={Translator.instance.translate(getInterestTranslationKey(interest))}
                        variant={interestsFilter.includes(interest) ? undefined : "outlined"}
                        onClick={() => updateInterestsFilter(interest)}
                    />
                ))}
            </MKBox>
        );
    }

    return (
        <>
            <DefaultNavbar
                routes={routes}
                center
                sticky
                brand="asoticocat"
                action={getTranslateAction()}
            />
            <MKBox
                component="section"
                position="relative"
                py={20}
                sx={{
                    backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.dark.main, 0.8), rgba(gradients.dark.state, 0.8))}, url(${bgImage})`,
                }}
            >
                <Container>
                    {getFiltersBox()}
                    {getAssociates()}
                </Container>
            </MKBox>
            <Footer />
        </>
    );
}

export default CommunityPage;
