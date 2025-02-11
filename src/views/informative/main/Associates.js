import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Associate } from 'models';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// HelpCenter page components
import ListItem from "components/ListItem";

import DefaultCounterCard from "components/Cards/CounterCards/DefaultCounterCard";

// Images
import bgImage1 from "assets/images/examples/comunidad-ticos.png";

import Translator from 'utils/Translator';
import { getLang } from 'utils/Translator';

function AssociatesCounter() {
    const [count, setCount] = useState(null);

    const fetchData = async () => {
        const associates = await DataStore.query(Associate);
        setCount(associates.length);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Card
            sx={({
                functions: { rgba, linearGradient },
                palette: { black },
                borders: { borderRadius },
            }) => ({
                backgroundImage: `${linearGradient(
                    rgba(black.main, 0.5),
                    rgba(black.main, 0.5)
                )}, url(${bgImage1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: borderRadius.xl,
            })}
        >
            <MKBox textAlign="center" pt={12} pb={3} px={3}>
                <DefaultCounterCard
                    color="light"
                    count={count}
                    title={Translator.instance.translate("associates_counter_title")}
                    description={Translator.instance.translate("associates_counter_description")}
                />

                <MKButton
                    component="a"
                    href="https://forms.gle/RK4BLbsTSQyM4u1x8"
                    target="_blank"
                    rel="noreferrer"
                    color="white"
                    size="small"
                    sx={{ my: 2 }}
                >
                    {Translator.instance.translate("associates_counter_action")}
                </MKButton>
            </MKBox>
        </Card>
    );
}

function Associates() {
    return (
        <MKBox id="socios" component="section" py={12} pt={12} pb={12}>
            <Container sx={{ mt: '10px' }}>
                <Grid
                    container
                    item
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    xs={12}
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
                            volunteer_activism
                        </Icon>
                    </MKBox>
                    <MKTypography variant="h3" mt={3}>
                        {Translator.instance.translate("associates_main_title")}
                    </MKTypography>
                </Grid>
                <Grid container spacing={3} alignItems="center" sx={{ mt: 6 }}>
                    <Grid item xs={12} md={4} sx={{ ml: "auto" }}>
                        <AssociatesCounter />
                    </Grid>
                    <Grid item xs={12} md={5} sx={{ mr: "auto", ml: { xs: 0, md: 6 } }}>
                        <ListItem title={Translator.instance.translate("associates_benefit_1")} />
                        <ListItem title={Translator.instance.translate("associates_benefit_2")} />
                        <ListItem title={Translator.instance.translate("associates_benefit_3")} />
                        <ListItem title={Translator.instance.translate("associates_benefit_4")} />
                        <ListItem title={Translator.instance.translate("associates_benefit_5")} />
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    xs={12}
                    sx={{ mx: "auto", textAlign: "center", mt: 6 }}
                >
                    <MKTypography variant="body1" color="text">
                        {Translator.instance.translate("associates_main_verification")}
                        {' '}
                        <MKTypography
                            component="a"
                            target="_blank"
                            href={`/${getLang()}/socios`}
                            variant="body1"
                            color="info"
                            fontWeight="regular"
                        >
                            {Translator.instance.translate("benefits_page_benefits_verification_link")}
                        </MKTypography>
                        .
                    </MKTypography>
                    <MKTypography variant="body1" color="text">
                        {Translator.instance.translate("associate_terms_conditions")}
                        {' '}
                        <MKTypography
                            component="a"
                            target="_blank"
                            href={`/${getLang()}/terminos-condiciones`}
                            variant="body1"
                            color="info"
                            fontWeight="regular"
                        >
                            {Translator.instance.translate("benefits_page_benefits_verification_link")}
                        </MKTypography>
                        .
                    </MKTypography>
                </Grid>
            </Container>
        </MKBox>
    );
}

export default Associates;