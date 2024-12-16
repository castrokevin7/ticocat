import DefaultNavbar from 'components/Navbars/DefaultNavbar';
import { getTranslateAction } from 'utils/TranslateAction';
import { getLang } from 'utils/Translator';
import MKBox from 'components/MKBox';
import bgImage from 'assets/images/bg-login.jpg';
import Translator from 'utils/Translator';
import Container from '@mui/material/Container';
import { Associate } from 'models';
import { DataStore, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate } from 'react-router-dom';
import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-react';
import './LoginPage.css';

I18n.putVocabularies(translations);
I18n.setLanguage(getLang());

I18n.putVocabularies({
    es: {
        'Create Account': Translator.instance.translate("login_sign_up_header"),
        'Password must have at least 8 characters': Translator.instance.translate("login_form_password_length_placeholder"),
        'Password must have lower case letters': Translator.instance.translate("login_form_password_lowercase_placeholder"),
        'Password must have numbers': Translator.instance.translate("login_form_password_numbers_placeholder"),
        'Password must have special characters': Translator.instance.translate("login_form_password_special_characters_placeholder"),
        'Password must have upper case letters': Translator.instance.translate("login_form_password_uppercase_placeholder"),
        'Your passwords must match': Translator.instance.translate("login_form_passwords_match_placeholder"),
        'Incorrect username or password.': Translator.instance.translate("login_form_password_wrong"),
        'An account with the given email already exists.': Translator.instance.translate("login_form_account_already_exists"),
        'User does not exist.': Translator.instance.translate("login_form_user_does_not_exist"),
        'Invalid verification code provided, please try again.': Translator.instance.translate("login_form_invalid_verification_code"),
        'We Emailed You': Translator.instance.translate("login_form_email_verification"),
        'Network Error': Translator.instance.translate("login_form_network_error"),
        'The username should either be a string or one of the sign in types': Translator.instance.translate("login_page_email_not_found"),
        'Username cannot be empty': Translator.instance.translate("login_page_email_not_found"),
        'Username/client id combination not found.': Translator.instance.translate("login_page_email_not_found"),
        'Temporary password has expired and must be reset by an administrator.': Translator.instance.translate("login_form_temporary_password_expired"),
    },
    cat: {
        'Sign in': Translator.instance.translate("login_header"),
        'Sign In': Translator.instance.translate("login_header"),
        'Create Account': Translator.instance.translate("login_sign_up_header"),
        'Password': Translator.instance.translate("login_form_password_placeholder"),
        'Confirm Password': Translator.instance.translate("login_form_confirm_password_placeholder"),
        'Forgot your password?': Translator.instance.translate("login_form_forgot_password_placeholder"),
        'Password must have at least 8 characters': Translator.instance.translate("login_form_password_length_placeholder"),
        'Password must have lower case letters': Translator.instance.translate("login_form_password_lowercase_placeholder"),
        'Password must have numbers': Translator.instance.translate("login_form_password_numbers_placeholder"),
        'Password must have special characters': Translator.instance.translate("login_form_password_special_characters_placeholder"),
        'Password must have upper case letters': Translator.instance.translate("login_form_password_uppercase_placeholder"),
        'Your passwords must match': Translator.instance.translate("login_form_passwords_match_placeholder"),
        'Incorrect username or password.': Translator.instance.translate("login_form_password_wrong"),
        'An account with the given email already exists.': Translator.instance.translate("login_form_account_already_exists"),
        'User does not exist.': Translator.instance.translate("login_form_user_does_not_exist"),
        'Invalid verification code provided, please try again.': Translator.instance.translate("login_form_invalid_verification_code"),
        'We Emailed You': Translator.instance.translate("login_form_email_verification"),
        'Network Error': Translator.instance.translate("login_form_network_error"),
        'The username should either be a string or one of the sign in types': Translator.instance.translate("login_page_email_not_found"),
        'Username cannot be empty': Translator.instance.translate("login_page_email_not_found"),
        'Username/client id combination not found.': Translator.instance.translate("login_page_email_not_found"),
        'Temporary password has expired and must be reset by an administrator.': Translator.instance.translate("login_form_temporary_password_expired"),
    },
});

function LoginPage() {
    const { route } = useAuthenticator(context => [context.route]);

    if (route === 'authenticated') {
        return <Navigate to={`/${getLang()}/social/configuracion`} />;
    }

    const isRegisteredAssociate = async (email) => {
        try {
            const response = await DataStore.query(Associate, associate => associate.email("eq", email));
            return response.length > 0;
        } catch (err) {
            console.error('Error:', err);
            return false;
        }
    }

    const services = {
        async handleSignUp(formData) {
            let { username, password } = formData;
            const isRegistered = await isRegisteredAssociate(username);
            if (isRegistered) {
                return Auth.signUp({
                    username,
                    password
                });
            } else {
                return Auth.signUp({});
            }
        },
    };

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
                        <Authenticator services={services} />
                    </Container>
                </MKBox>
            </MKBox>
        </>
    );
}


export default LoginPage;
