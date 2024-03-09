import React, { useState, useEffect } from 'react';

import { DataStore, Storage } from 'aws-amplify';

import { Benefit } from '../../models';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Icon from "@mui/material/Icon";

// Otis Kit PRO examples
import SimpleBackgroundCard from "examples/Cards/BackgroundCards/SimpleBackgroundCard";

import Translator from 'utils/Translator';

import { getBenefitTitle, getBenefitDescription } from '../benefits/Utils';
import { getLang } from 'utils/Translator';

function Benefits() {
    const [state, setState] = useState('');
    const [benefits, setBenefits] = useState(null);

    const fetchBenefits = async () => {
        try {
            let response = await DataStore.query(Benefit);

            if (response.length > 0) {
                response = await Promise.all(response.map(async (benefit, i) => {
                    const image = await Storage.get(benefit.image);
                    return new Benefit({
                        image,
                        benefit_id: benefit.benefit_id,
                        title: benefit.title,
                        title_cat: benefit.title_cat,
                        description: benefit.description,
                        description_cat: benefit.description_cat,
                        about_provider: benefit.about_provider,
                        about_provider_cat: benefit.about_provider_cat,
                        contact: benefit.contact,
                        url: benefit.url
                    });
                }));
                response = response.sort(() => Math.random() - 0.5);
                setBenefits(response.slice(0, 3));
            }
            setState('');
        } catch (err) {
            console.error('Error:', err);
            setState('error');
        }
    }

    useEffect(() => {
        setState('loading');
        fetchBenefits();
    }, []);

    const getBenefits = () => {
        if (state === 'loading') {
            return (
                <div style={{ padding: '10px', display: 'flex' }}>
                    <div className="spinner-container">
                        <div className="loading-spinner" />
                    </div>
                </div>
            );
        }

        if (state === 'error') {
            return (
                <MKTypography variant="body1" color="text" mt={1} ml={"auto"} mr={"auto"}>
                    {Translator.instance.translate("error_tag")}
                </MKTypography>
            );
        }

        if (benefits === null || benefits.length === 0) {
            return (
                <MKTypography variant="body1" color="text" mt={1} ml={"auto"} mr={"auto"}>
                    {Translator.instance.translate("benefits_page_no_benefits")}
                </MKTypography>
            );
        }

        return (
            <>
                {benefits.map((benefit, i) =>
                    <Grid key={i} item xs={12} lg={4}>
                        <Link to={`/${getLang()}/beneficio/${benefit.benefit_id}`}>
                            <SimpleBackgroundCard
                                image={benefit.image}
                                title={getBenefitTitle(benefit)}
                                description={`${getBenefitDescription(benefit).substring(0, 31)}... ${Translator.instance.translate("benefits_page_see_more_from_benefit")}`}
                            />
                        </Link>
                    </Grid>
                )}
                <Grid p={3} xs={12} item>
                    <MKTypography
                        component="a"
                        href={`${getLang()}/beneficios`}
                        variant="body1"
                        color="info"
                        fontWeight="regular"
                        sx={{
                            width: "max-content",
                            display: "flex",
                            alignItems: "center",

                            "& .material-icons-round": {
                                fontSize: "1.125rem",
                                transform: "translateX(3px)",
                                transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                            },

                            "&:hover .material-icons-round, &:focus .material-icons-round": {
                                transform: "translateX(6px)",
                            },
                        }}
                    >
                        {Translator.instance.translate("benefits_see_all")}
                        <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                    </MKTypography>
                </Grid>
            </>
        )
    }
    return (
        <MKBox sx={{
            backgroundColor: ({ palette: { bgcolor1 }, functions: { rgba } }) => rgba(bgcolor1.main, 0.4),
        }} id="beneficios" component="section" py={6} pt={12} pb={12}>
            <Container sx={{ mt: '10px' }}>
                <Grid
                    container
                    item
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    xs={10}
                    lg={10}
                    sx={{ mx: "auto", textAlign: "center" }}
                >
                    <MKBox
                        width="3rem"
                        height="3rem"
                        borderRadius="lg"
                        shadow="md"
                        variant="gradient"
                        bgColor="info"
                        color="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Icon fontSize="small" sx={{ opacity: 0.8 }}>
                            card_giftcard_rounded
                        </Icon>
                    </MKBox>
                    <MKTypography variant="h3" mt={3}>
                        {Translator.instance.translate("benefits_page_title")}
                    </MKTypography>
                    <MKTypography variant="body1" color="text" mt={1}>
                        {Translator.instance.translate("benefits_page_description")}
                    </MKTypography>
                </Grid>
                <Grid container spacing={3} mt={2}>
                    {getBenefits()}
                </Grid>
            </Container>
        </MKBox>
    );
}

export default Benefits;