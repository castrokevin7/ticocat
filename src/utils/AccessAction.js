
import { getLang } from 'utils/Translator';

export function getAccessAction() {
    if (getLang() === "es") {
        return {
            route: "/es/acceso",
            label: "Acceso",
            color: "info",
            icon: "login_rounded",
            variant: "outlined",
            size: "small",
            minimal: false
        }
    } else {
        return {
            route: "/cat/acceso",
            label: "Accés",
            color: "info",
            icon: "login_rounded",
            variant: "outlined",
            size: "small",
            minimal: false
        }
    }
}