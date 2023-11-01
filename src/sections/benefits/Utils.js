export const getBenefitTitle = (benefit) => {
    const path = window.location.pathname;
    let parts = path.split("/");
    if (parts.length > 0 && parts[0] === "") {
        parts = parts.slice(1);
    }
    const first = parts[0];
    if (first === "cat") {
        return benefit.title_cat;
    }
    return benefit.title;
}

export const getBenefitDescription = (benefit) => {
    const path = window.location.pathname;
    let parts = path.split("/");
    if (parts.length > 0 && parts[0] === "") {
        parts = parts.slice(1);
    }
    const first = parts[0];
    if (first === "cat") {
        return benefit.description_cat;
    }
    return benefit.description;
}

export const getBenefitAboutProvider = (benefit) => {
    const path = window.location.pathname;
    let parts = path.split("/");
    if (parts.length > 0 && parts[0] === "") {
        parts = parts.slice(1);
    }
    const first = parts[0];
    if (first === "cat") {
        return benefit.about_provider_cat;
    }
    return benefit.about_provider;
}