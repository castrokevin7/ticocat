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
            variant: "text",
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
            variant: "text",
            size: "small",
            minimal: false
        }
    }
}