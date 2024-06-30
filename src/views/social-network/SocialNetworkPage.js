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
import { DataStore } from 'aws-amplify';
import Translator from 'utils/Translator';
import { getLang } from 'utils/Translator';
import { Link } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';

function SocialNetworkPage() {
    const [state, setState] = useState('');
    const [associates, setAssociates] = useState(null);    
    const { route } = useAuthenticator(context => [context.route]);

    useEffect(() => {
        if (route !== 'authenticated')
            return;

        setState('loading');
        fetchAssociates();
    }, [route]);

    if (route !== 'authenticated') {
        return <Navigate to={`/${getLang()}/cuenta`} />;
    }

    const fetchAssociates = async () => {
        try {
            let response = await DataStore.query(Associate, a => a.is_account_activated("eq", true));
            if (response.length > 0) {
                response = response.sort(() => Math.random() - 0.5);
                setAssociates(response);
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

        if (associates === null || associates.length === 0) {
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
                {associates.map((associate, index) => (
                    <Grid key={index} item xs={12} lg={4}>
                        <MKBox mb={1}>
                            <Link to={`/${getLang()}/social/usuario/${associate.username || associate.id}`}>
                                <AssociateCard
                                    image={thumbnail}
                                    name={associate.name}
                                    bio={associate.bio}
                                />
                            </Link>
                        </MKBox>
                    </Grid>
                ))}
            </Grid>
        )
    };

    return (
        <MKBox
            component="section"
            position="relative"
            py={12}
            sx={{
                backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.dark.main, 0.8), rgba(gradients.dark.state, 0.8))}, url(${bgImage})`,
            }}
        >
            <Container>
                {getAssociates()}
            </Container>
        </MKBox>
    );
}

export default SocialNetworkPage;