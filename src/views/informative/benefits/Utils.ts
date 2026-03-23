import { getLang } from "../../../utils/Translator";
import { Benefit } from "../../../models";

export const getBenefitTitle = (benefit: Benefit): string | null | undefined => {
    return getLang() === "cat" ? benefit.title_cat : benefit.title;

}

export const getBenefitDescription = (benefit: Benefit): string | null | undefined => {
    return getLang() === "cat" ? benefit.description_cat : benefit.description;

}

export const getBenefitAboutProvider = (benefit: Benefit): string | null | undefined => {
    return getLang() === "cat" ? benefit.about_provider_cat : benefit.about_provider;

}
