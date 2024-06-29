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

function AssociateView() {
    const [state, setState] = useState("");
    const [associate, setAssociate] = useState();
    const [associateOfferedBenefits, setAssociateOfferedBenefits] = useState();
    const [isLoadingBenefits, setIsLoadingBenefits] = useState(false);
    const { associateId } = useParams();
    const { user } = useAuthenticator((context) => [context.user]);

    const fetchAssociate = async () => {
        try {
            let response = await DataStore.query(Associate, associate => associate.id('eq', associateId) && associate.is_account_activated('eq', true));
            if (response.length > 0) {
                response = response[0];
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
        setIsLoadingBenefits(true);
        try {
            let response = await DataStore.query(Benefit, b => b.associate_id("eq", associate.id));
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
                        contact: benefit.contact,
                        url: benefit.url,
                        about_provider: benefit.about_provider,
                        about_provider_cat: benefit.about_provider_cat,
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
                {user && user.attributes.email === associate.email &&
                    <Link to={`/${getLang()}/cuenta`}>
                        <MKButton
                            sx={{ float: 'right' }}
                            mt={2}
                            color="info"
                        >
                            {Translator.instance.translate("associate_account_access")}
                        </MKButton>
                    </Link>
                }
                <h3>{associate.name}</h3>
                {associate.bio && <p><i>"{associate.bio}"</i></p>}
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