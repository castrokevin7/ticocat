import DefaultNavbar from "components/Navbars/DefaultNavbar";
import { getLang } from 'utils/Translator';
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import bgImage from "assets/images/associates.jpg";
import Card from "@mui/material/Card";
import { auto } from "@popperjs/core";
import Translator from 'utils/Translator';

function TermsAndConditionsPage() {

    return (
        <>
            <DefaultNavbar
                routes={[]}
                center
                sticky
                brand="asoticocatcat"
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
                            <h2>{Translator.instance.translate("terms_title")}</h2>

                            <h4>{Translator.instance.translate("terms_last_update")}: {Translator.instance.translate("terms_last_update_date")}</h4>

                            <p>{Translator.instance.translate("terms_introduction")}</p>

                            <h3 style={{ marginTop: '15px' }}>{Translator.instance.translate("terms_consent")}</h3>
                            <p>{Translator.instance.translate("terms_consent_description")}</p>

                            <h3 style={{ marginTop: '15px' }}>{Translator.instance.translate("terms_data_collected")}</h3>
                            <p>{Translator.instance.translate("terms_data_collected_description")}</p>
                            <ul style={{ marginLeft: '40px' }}>
                                <li>{Translator.instance.translate("terms_data_collected_description_item_1")}</li>
                                <li>{Translator.instance.translate("terms_data_collected_description_item_2")}</li>
                                <li>{Translator.instance.translate("terms_data_collected_description_item_3")}</li>
                                <li>{Translator.instance.translate("terms_data_collected_description_item_4")}</li>
                            </ul>

                            <h3 style={{ marginTop: '15px' }}>{Translator.instance.translate("terms_data_usage")}</h3>
                            <p>{Translator.instance.translate("terms_data_usage_description")}</p>
                            <ul style={{ marginLeft: '40px' }}>
                                <li>{Translator.instance.translate("terms_data_usage_description_item_1")}</li>
                                <li>{Translator.instance.translate("terms_data_usage_description_item_2")}</li>
                                <li>{Translator.instance.translate("terms_data_usage_description_item_3")}</li>
                                <li>{Translator.instance.translate("terms_data_usage_description_item_4")}</li>
                            </ul>

                            <h3 style={{ marginTop: '15px' }}>{Translator.instance.translate("terms_multimedia_usage")}</h3>
                            <p>{Translator.instance.translate("terms_multimedia_usage_description")}</p>

                            <h3 style={{ marginTop: '15px' }}>{Translator.instance.translate("terms_whatsapp_community_usage")}</h3>
                            <p>{Translator.instance.translate("terms_whatsapp_community_usage_description")}</p>
                            <ul style={{ marginLeft: '40px' }}>
                                <li>{Translator.instance.translate("terms_whatsapp_community_usage_description_item_1")}</li>
                                <li>{Translator.instance.translate("terms_whatsapp_community_usage_description_item_2")}</li>
                                <li>{Translator.instance.translate("terms_whatsapp_community_usage_description_item_3")}</li>
                                <li>{Translator.instance.translate("terms_whatsapp_community_usage_description_item_4")}</li>
                                <li>{Translator.instance.translate("terms_whatsapp_community_usage_description_item_5")}</li>
                                <li>{Translator.instance.translate("terms_whatsapp_community_usage_description_item_6")}</li>
                                <li>{Translator.instance.translate("terms_whatsapp_community_usage_description_item_7")}</li>
                                <li>{Translator.instance.translate("terms_whatsapp_community_usage_description_item_8")}</li>
                            </ul>

                            <h3 style={{ marginTop: '15px' }}>{Translator.instance.translate("terms_data_safety")}</h3>
                            <p>{Translator.instance.translate("terms_data_safety_description")}</p>

                            <h3 style={{ marginTop: '15px' }}>{Translator.instance.translate("terms_share_data")}</h3>
                            <p>{Translator.instance.translate("terms_share_data_description")}</p>

                            <h3 style={{ marginTop: '15px' }}>{Translator.instance.translate("terms_data_subject_rights")}</h3>
                            <p>{Translator.instance.translate("terms_data_subject_rights_description")}</p>
                            <ul style={{ marginLeft: '40px' }}>
                                <li>{Translator.instance.translate("terms_data_subject_rights_description_item_1")}</li>
                                <li>{Translator.instance.translate("terms_data_subject_rights_description_item_2")}</li>
                                <li>{Translator.instance.translate("terms_data_subject_rights_description_item_3")}</li>
                                <li>{Translator.instance.translate("terms_data_subject_rights_description_item_4")}</li>
                            </ul>
                            <p>{Translator.instance.translate("terms_data_subject_rights_conclusion")}: <a href="mailto:asoticocat@gmail.com?Subject=Mis datos" rel="noreferrer">asoticocat@gmail.com</a>.</p>

                            <h3 style={{ marginTop: '15px' }}>{Translator.instance.translate("terms_conditions_changes")}</h3>
                            <p>{Translator.instance.translate("terms_conditions_changes_description")}</p>

                            <p style={{ marginTop: '25px' }}>{Translator.instance.translate("terms_conclusion")}</p>

                            <p>{Translator.instance.translate("terms_conclusion_thanks")}</p>

                            <p><a href="mailto:asoticocat@gmail.com?Subject=Mis datos" rel="noreferrer">asoticocat@gmail.com</a></p>

                            <p><strong>{Translator.instance.translate("terms_last_update_date")}</strong></p>
                        </Card>
                    </Container>
                </MKBox>
            </MKBox>
        </>
    );
}


export default TermsAndConditionsPage;