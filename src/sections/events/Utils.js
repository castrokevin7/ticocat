export const getEventTitle = (event) => {
    let domain = window.location.hostname;
    if (domain === "www.asoticocat.com") {
        return event.title;
    }
    return event.title_cat;
}

export const getEventDescription = (event) => {
    let domain = window.location.hostname;
    if (domain === "www.asoticocat.com") {
        return event.description;
    }
    return event.description_cat;
}