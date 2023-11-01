import { getLang } from "utils/Translator";

export const getBenefitTitle = (benefit) => {
    return getLang() === "cat" ? benefit.title_cat : benefit.title;

}

export const getBenefitDescription = (benefit) => {
    return getLang() === "cat" ? benefit.description_cat : benefit.description;

}

export const getBenefitAboutProvider = (benefit) => {
    return getLang() === "cat" ? benefit.about_provider_cat : benefit.about_provider;

}