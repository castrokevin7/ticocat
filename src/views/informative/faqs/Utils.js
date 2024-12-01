import { getLang } from "utils/Translator";

export const getFAQQuestion = (faq) => {
    return getLang() === "cat" ? faq.question_cat : faq.question;
}

export const getFAQAnswer = (faq) => {
    return getLang() === "cat" ? faq.answer_cat : faq.answer;
}

export const getLinkText = (link) => {
    if (link.length > 120) {
        return link.substring(0, 120) + "...";
    }
    return link;
}
