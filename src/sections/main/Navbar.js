// Otis Kit PRO examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

import routes from "routes";

import { getLang } from 'utils/Translator';

export function getTranslateAction() {
    const origin = window.location.origin;
    
    let pathnameParts = window.location.pathname.split("/");
    if (pathnameParts.length > 0 && pathnameParts[0] === "") {
        pathnameParts = pathnameParts.slice(1);
    }

    if (getLang() === "es") {
        pathnameParts = pathnameParts.slice(1);
        const route = [origin, "cat"].concat(pathnameParts).join("/");
        return {
            route,
            label: "CAT",
            color: "info",
            icon: "translate_rounded",
            variant: "outlined",
            size: "small",
            minimal: false
        }
    } else {
        pathnameParts = pathnameParts.slice(1);
        const route = [origin, "es"].concat(pathnameParts).join("/");
        return {
            route,
            label: "ES",
            color: "info",
            icon: "translate_rounded",
            variant: "outlined",
            size: "small",
            minimal: false
        }
    }
}

function Navbar() {
    return (
        <DefaultNavbar
            routes={routes}
            center
            sticky
            brand="asoticocat"
            action={getTranslateAction()}
        />
    );
}

export default Navbar;