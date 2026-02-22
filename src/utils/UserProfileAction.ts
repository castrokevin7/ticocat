import { getLang } from './Translator';
import { ActionConfig } from './TranslateAction';

export function getUserProfileAction(): ActionConfig {
    if (getLang() === "es") {
        return {
            route: "/es/social/configuracion",
            label: "Cuenta",
            color: "info",
            icon: "account_circle_rounded",
            variant: "outlined",
            size: "medium",
            minimal: false
        }
    } else {
        return {
            route: "/cat/social/configuracion",
            label: "Compte",
            color: "info",
            icon: "account_circle_rounded",
            variant: "outlined",
            size: "medium",
            minimal: false
        }
    }
}
