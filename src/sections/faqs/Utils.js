export const getFAQQuestion = (faq) => {
    let domain = window.location.hostname;
    if (domain === "www.asoticocat.com") {
        return faq.question;
    }
    return faq.question_cat;
}

export const getFAQAnswer = (faq) => {
    let domain = window.location.hostname;
    if (domain === "www.asoticocat.com") {
        return faq.answer;
    }
    return faq.answer_cat;
}

export const getLinkText = (link) => {
    if (link.length > 120) {
        return link.substring(0, 120) + "...";
    }
    return link;
}
