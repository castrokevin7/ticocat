// Otis Kit PRO examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

import routes from "routes";

export function getTranslateAction() {
    let domain = window.location.hostname;
    let path = window.location.pathname;
    if (domain === "www.asoticocat.com") {
        return {
            route: "https://cat.asoticocat.com" + path,
            label: "CAT",
            color: "info",
            icon: "translate_rounded",
            variant: "outlined",
            size: "small",
            minimal: false
        }
    }
    return {
        route: "https://www.asoticocat.com" + path,
        label: "ESP",
        color: "info",
        icon: "translate_rounded",
        variant: "outlined",
        size: "small",
        minimal: false
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