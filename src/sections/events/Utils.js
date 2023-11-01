export const getEventTitle = (event) => {
    const path = window.location.pathname;
    let parts = path.split("/");
    if (parts.length > 0 && parts[0] === "") {
        parts = parts.slice(1);
    }
    const first = parts[0];
    if (first === "cat") {
        return event.title_cat;
    }
    return event.title;
}

export const getEventDescription = (event) => {
    const path = window.location.pathname;
    let parts = path.split("/");
    if (parts.length > 0 && parts[0] === "") {
        parts = parts.slice(1);
    }
    const first = parts[0];
    if (first === "cat") {
        return event.description_cat;
    }
    return event.description;
}