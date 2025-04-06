export const createEventIdFromTitle = (title: string) => {
    return `${title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')}`;
};