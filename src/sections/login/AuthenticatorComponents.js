import { useTheme, Heading, View, Button, Text, Image } from "@aws-amplify/ui-react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import logo from "assets/images/logo-asoticocat-white.png";
import Translator from "utils/Translator";

export const components = {
    Header() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Image
                    width={'200px'}
                    alt="TICOCAT Logo"
                    src={logo}
                />
            </View>
        );
    },

    SignIn: {
        Header() {
            const { tokens } = useTheme();

            return (
                <View textAlign="center">
                    <Heading
                        padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                        level={4}
                    >
                        {Translator.instance.translate("login_header")}
                    </Heading>
                </View>
            );
        },
        /*         Footer() {
                    const { toForgotPassword } = useAuthenticator();
        
                    return (
                        <View textAlign="center">
                            <Button
                                fontWeight="normal"
                                onClick={toForgotPassword}
                                size="small"
                                variation="link"
                            >
                                Reset Password
                            </Button>
                        </View>
                    );
                }, */
    },

    SignUp: {
        Header() {
            const { tokens } = useTheme();

            return (
                <View textAlign="center">
                    <Heading
                        padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                        level={4}
                    >
                        {Translator.instance.translate("login_sign_up_header")}
                    </Heading>
                </View>
            );
        },
    },
    ConfirmSignUp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    SetupTotp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ConfirmSignIn: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ForgotPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
    ConfirmResetPassword: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        },
        Footer() {
            return <Text>Footer Information</Text>;
        },
    },
};
