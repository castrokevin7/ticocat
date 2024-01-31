import Translator from "utils/Translator";

export const formFields = {
    signIn: {
        username: {
            placeholder: Translator.instance.translate("login_form_email_placeholder"),
        },
        password: {
            placeholder: Translator.instance.translate("login_form_password_placeholder"),
        },
    },
    signUp: {
        password: {
            label: 'Password:',
            placeholder: Translator.instance.translate("login_form_password_placeholder"),
            isRequired: false,
            order: 2,
        },
        confirm_password: {
            label: 'Confirm Password:',
            order: 1,
        },
    },
    forceNewPassword: {
        password: {
            placeholder: Translator.instance.translate("login_form_password_placeholder"),
        },
    },
    forgotPassword: {
        username: {
            placeholder: 'Enter your email:',
        },
    },
    confirmResetPassword: {
        confirmation_code: {
            placeholder: 'Enter your Confirmation Code:',
            label: 'New Label',
            isRequired: false,
        },
        confirm_password: {
            placeholder: 'Enter your Password Please:',
        },
    },
    setupTotp: {
        QR: {
            totpIssuer: 'test issuer',
            totpUsername: 'amplify_qr_test_user',
        },
        confirmation_code: {
            label: 'New Label',
            placeholder: 'Enter your Confirmation Code:',
            isRequired: false,
        },
    },
    confirmSignIn: {
        confirmation_code: {
            label: 'New Label',
            placeholder: 'Enter your Confirmation Code:',
            isRequired: false,
        },
    },
};
