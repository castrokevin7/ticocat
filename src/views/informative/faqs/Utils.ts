import { getLang } from "../../../utils/Translator";
import { FAQ } from "../../../models";

export const getFAQQuestion = (faq: FAQ): string | null | undefined => {
    return getLang() === "cat" ? faq.question_cat : faq.question;
}

export const getFAQAnswer = (faq: FAQ): string | null | undefined => {
    return getLang() === "cat" ? faq.answer_cat : faq.answer;
}

export const getLinkText = (link: string): string => {
    if (link.length > 120) {
        return link.substring(0, 120) + "...";
    }
    return link;
}
