
import { getLang } from 'utils/Translator';
export function getUserProfileAction() {
    if (getLang() === "es") {
        return {
            route: "/es/cuenta",
            label: "Cuenta",
            color: "info",
            icon: "account_circle_rounded",
            variant: "outlined",
            size: "medium",
            minimal: false
        }
    } else {
        return {
            route: "/cat/cuenta",
            label: "Compte",
            color: "info",
            icon: "account_circle_rounded",
            variant: "outlined",
            size: "medium",
            minimal: false
        }
    }
}
