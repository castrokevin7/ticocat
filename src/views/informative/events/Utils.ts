import { getLang } from "../../../utils/Translator";
import { Event } from "../../../models";

export const getEventTitle = (event: Event): string | null | undefined => {
    return getLang() === "cat" ? event.title_cat : event.title;
}

export const getEventDescription = (event: Event): string | null | undefined => {
    return getLang() === "cat" ? event.description_cat : event.description;
}
