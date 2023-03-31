export const getBenefitTitle = (benefit) => {
    let domain = window.location.hostname;
    if (domain === "www.asoticocat.com") {
        return benefit.title;
    }
    return benefit.title_cat;
}

export const getBenefitDescription = (benefit) => {
    let domain = window.location.hostname;
    if (domain === "www.asoticocat.com") {
        return benefit.description;
    }
    return benefit.description_cat;
}

export const getBenefitAboutProvider = (benefit) => {
    let domain = window.location.hostname;
    if (domain === "www.asoticocat.com") {
        return benefit.about_provider;
    }
    return benefit.about_provider_cat;
}