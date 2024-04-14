import React, { useState, useEffect } from 'react';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Otis Kit PRO examples
import HorizontalTeamCard from "components/Cards/TeamCards/HorizontalTeamCard";

// Images
import bgImage from "assets/images/examples/city.jpg";
import thumbnail from "assets/images/profile.png";
import { Associate } from 'models';
import { Spinner } from "views/common/Spinner";
import { DataStore } from 'aws-amplify';
import Translator from 'utils/Translator';
import { getLang } from 'utils/Translator';
import { Link } from "react-router-dom";

function SocialNetworkPage() {
    const [state, setState] = useState('');
    const [associates, setAssociates] = useState(null);

    const fetchAssociates = async () => {
        try {
            let response = await DataStore.query(Associate);
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

    useEffect(() => {
        setState('loading');
        fetchAssociates();
    }, []);

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
                    <Grid item xs={12} lg={4}>
                        <MKBox mb={1}>
                            <Link to={`/${getLang()}/social/usuario/${associate.id}`}>
                                <HorizontalTeamCard
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
                {/*                 <Grid container>
                    <Grid item xs={12} md={8} sx={{ mb: 6 }}>
                        <MKBox
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="3rem"
                            height="3rem"
                            variant="gradient"
                            bgColor="info"
                            color="white"
                            shadow="md"
                            borderRadius="lg"
                            mb={2}
                        >
                            <Icon>supervisor_account</Icon>
                        </MKBox>
                        <MKTypography variant="h3" color="white">
                            The Executive Team
                        </MKTypography>
                        <MKTypography variant="body2" color="white" opacity={0.8}>
                            There&apos;s nothing I really wanted to do in life that I wasn&apos;t able to get good
                            at. That&apos;s my skill.
                        </MKTypography>
                    </Grid>
                </Grid> */}

                {getAssociates()}
            </Container>
        </MKBox>
    );
}

export default SocialNetworkPage;