export const getFAQQuestion = (faq) => {
    const path = window.location.pathname;
    let parts = path.split("/");
    if (parts.length > 0 && parts[0] === "") {
        parts = parts.slice(1);
    }
    const first = parts[0];
    if (first === "cat") {
        return faq.question_cat;
    }
    return faq.question;
}

export const getFAQAnswer = (faq) => {
    const path = window.location.pathname;
    let parts = path.split("/");
    if (parts.length > 0 && parts[0] === "") {
        parts = parts.slice(1);
    }
    const first = parts[0];
    if (first === "cat") {
        return faq.answer_cat;
    }
    return faq.answer;
}

export const getLinkText = (link) => {
    if (link.length > 120) {
        return link.substring(0, 120) + "...";
    }
    return link;
}
