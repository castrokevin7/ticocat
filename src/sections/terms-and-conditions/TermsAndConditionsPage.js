import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { getTranslateAction } from 'sections/main/Navbar';
import { getLang } from 'utils/Translator';
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import bgImage from "assets/images/associates.jpg";
import Card from "@mui/material/Card";
import { auto } from "@popperjs/core";

function TermsAndConditionsPage() {

    return (
        <>
            <DefaultNavbar
                routes={[]}
                center
                sticky
                brand="asoticocatcat"
                action={getTranslateAction()}
                secondaryAction={{
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
                            <h3>Términos y Condiciones para la Gestión de Datos de Asociados</h3>

                            <h4>Última actualización: 06 de Noviembre del 2023</h4>

                            <p>Bienvenido a la página web de la Asociación Cultural Costarricense Catalana (en adelante, "nuestra asociación"). Agradecemos tu interés en ser parte de nuestra comunidad. Para brindarte una experiencia óptima como asociado, necesitamos recopilar y gestionar ciertos datos personales. Este documento establece los términos y condiciones que rigen la recopilación, uso y protección de tus datos personales.</p>

                            <h3>1. Consentimiento</h3>
                            <p>Al unirte como asociado a la Asociación Cultural Costarricense Catalana, otorgas tu consentimiento expreso para la recopilación y procesamiento de tus datos personales con fines de comunicación y gestión de la asociación. Aseguramos que tus datos serán utilizados exclusivamente para los fines establecidos en este documento y en conformidad con la legislación aplicable en materia de protección de datos.</p>

                            <h3>2. Datos Recopilados</h3>
                            <p>Los datos personales que recopilamos pueden incluir, pero no se limitan a:</p>
                            <ul>
                                <li>Nombre y apellidos</li>
                                <li>Dirección de correo electrónico</li>
                                <li>Número de teléfono</li>
                                <li>Identificación (DNI, NIE o Pasaporte)</li>
                            </ul>

                            <h3>3. Uso de Datos</h3>
                            <p>Utilizaremos tus datos personales para los siguientes fines:</p>
                            <ul>
                                <li>Comunicación relacionada con actividades y eventos de la asociación.</li>
                                <li>Gestión de tu membresía y participación en proyectos.</li>
                                <li>Envío de boletines informativos y anuncios relevantes.</li>
                                <li>Información sobre oportunidades de voluntariado y colaboración.</li>
                            </ul>

                            <h3>4. Seguridad de Datos</h3>
                            <p>Nos comprometemos a garantizar la seguridad de tus datos personales y a protegerlos de accesos no autorizados, pérdida, robo o divulgación no autorizada. Utilizamos medidas de seguridad técnicas y organizativas adecuadas para proteger tus datos.</p>

                            <h3>5. Compartir Datos</h3>
                            <p>No compartiremos tus datos personales con terceros sin tu consentimiento expreso, a menos que estemos legalmente obligados a hacerlo.</p>

                            <h3>6. Derechos del Titular de Datos</h3>

                            <p>Como titular de datos, tienes los siguientes derechos:</p>
                            <ul>
                                <li>Acceso a tus datos personales.</li>
                                <li>Rectificación de datos inexactos o incompletos.</li>
                                <li>Supresión de tus datos cuando ya no sean necesarios para los fines establecidos.</li>
                                <li>Oposición al procesamiento de tus datos.</li>
                            </ul>

                            <p>Para ejercer tus derechos o si tienes alguna pregunta o inquietud sobre la gestión de tus datos personales, por favor, contáctanos a través de <a href="mailto:asoticocat@gmail.com?Subject=Mis datos" rel="noreferrer">asoticocat@gmail.com</a>.</p>
                            
                            <h3>7. Cambios en los Términos y Condiciones</h3>
                            <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio significativo será notificado a los asociados de manera adecuada.</p>
                            
                            <p>Al continuar siendo parte de la Asociación Cultural Costarricense Catalana, aceptas estos términos y condiciones para la gestión de tus datos personales. Te animamos a revisar esta política de privacidad periódicamente para estar al tanto de cualquier cambio.</p>

                            <p>Gracias por ser parte de nuestra comunidad cultural y artística. ¡Esperamos que disfrutes de tu experiencia con nosotros!</p>
                            
                            <p><a href="mailto:asoticocat@gmail.com?Subject=Mis datos" rel="noreferrer">asoticocat@gmail.com</a></p>

                            <p><strong>06 de Noviembre del 2023</strong></p>
                        </Card>
                    </Container>
                </MKBox>
            </MKBox>
        </>
    );
}


export default TermsAndConditionsPage;