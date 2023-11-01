// Otis Kit PRO examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

import routes from "routes";

export function getTranslateAction() {
    const origin = window.location.origin;
    const path = window.location.pathname;
    let parts = path.split("/");
    if (parts.length > 0 && parts[0] === "") {
        parts = parts.slice(1);
    }

    if (parts.length > 0 && parts[0] === "es") {
        parts = parts.slice(1);
        const route = [origin, "cat"].concat(parts).join("/");
        return {
            route,
            label: "CAT",
            color: "info",
            icon: "translate_rounded",
            variant: "outlined",
            size: "small",
            minimal: false
        }
    } else if (parts.length > 0 && parts[0] === "cat") {
        parts = parts.slice(1);
        const route = [origin, "es"].concat(parts).join("/");
        return {
            route,
            label: "ESP",
            color: "info",
            icon: "translate_rounded",
            variant: "outlined",
            size: "small",
            minimal: false
        }
    } else {
        const route = [origin, "cat"].concat(parts).join("/");
        return {
            route,
            label: "CAT",
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