import React, { useState } from "react";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import { getTranslateAction } from 'utils/TranslateAction';
import { getLang } from 'utils/Translator';
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import bgImage from "assets/images/associates.jpg";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Translator from 'utils/Translator';
import Card from "@mui/material/Card";
import { auto } from "@popperjs/core";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

function AssociateVerificationPage() {
    const [associateId, setAssociateId] = useState();

    const handleSearchCriteriaChange = (event) => {
        setAssociateId(event.target.value);
    };

    return (
        <>
            <DefaultNavbar
                routes={[]}
                center
                sticky
                brand="asoticocat"
                action={{
                    route: `/${getLang()}`,
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
                            <Grid container spacing={1}>
                                <Grid item xs={8}>
                                    <MKInput
                                        variant="standard"
                                        label={Translator.instance.translate("associate_search_label")}
                                        fullWidth
                                        onChange={handleSearchCriteriaChange}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Link to={associateId && associateId.trim() !== '' ? `/${getLang()}/socio/${associateId}` : ''}>
                                        <MKButton
                                            fullWidth
                                            sx={{ height: "100%" }}
                                            color="white"
                                        >
                                            {Translator.instance.translate("associate_search_action")}
                                        </MKButton>
                                    </Link>
                                </Grid>
                            </Grid>

                            <p style={{ marginTop: '15px', textAlign: 'center' }}>{Translator.instance.translate("associate_terms_conditions")} <a target="_blank" rel="noreferrer" href={`/${getLang()}/terminos-condiciones`}>aquí</a>.</p>
                        </Card>
                    </Container>
                </MKBox>
            </MKBox>
        </>
    );
}


export default AssociateVerificationPage;