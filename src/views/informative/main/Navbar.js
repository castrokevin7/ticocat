// Otis Kit PRO examples
import DefaultNavbar from "components/Navbars/DefaultNavbar";

import routes from "../routes";

import { useAuthenticator } from '@aws-amplify/ui-react';
import { getAccessAction } from 'utils/AccessAction';
import { getUserProfileAction } from 'utils/UserProfileAction';

function Navbar() {
    const { user } = useAuthenticator((context) => [context.user]);

    let secondaryAction = getAccessAction();
    if (user) {
        secondaryAction = getUserProfileAction();
    }

    return (
        <DefaultNavbar
            routes={routes}
            center
            sticky
            brand="asoticocat"
            action={secondaryAction}
        />
    );
}

export default Navbar;