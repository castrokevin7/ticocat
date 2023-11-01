import { getLang } from "utils/Translator";

export const getEventTitle = (event) => {
    return getLang() === "cat" ? event.title_cat : event.title;
}

export const getEventDescription = (event) => {
    return getLang() === "cat" ? event.description_cat : event.description;
}