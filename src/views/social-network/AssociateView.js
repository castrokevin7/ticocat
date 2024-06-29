import React, { useState, useEffect } from "react";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import { getTranslateAction } from 'utils/TranslateAction';
import { getLang } from 'utils/Translator';
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import bgImage from "assets/images/associates.jpg";
import { Associate } from "../../models";
import { Spinner } from "components/Spinner";
import { useParams } from "react-router";
import { DataStore } from "aws-amplify";
import Card from "@mui/material/Card";
import { auto } from "@popperjs/core";
import Translator from 'utils/Translator';
import MKButton from "components/MKButton";
import { Link } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';

function AssociateView() {
    const [state, setState] = useState("");
    const [associate, setAssociate] = useState();
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

    useEffect(() => {
        setState('loading');
        fetchAssociate();
        // eslint-disable-next-line
    }, [associateId]);

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