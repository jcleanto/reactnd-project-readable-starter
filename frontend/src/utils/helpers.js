export const formatDate = (timestamp) => {
    const date = new Date(timestamp).toLocaleDateString();
    return date;
}

export const formatHour = (timestamp) => {
    const hour = new Date(timestamp).toLocaleTimeString();
    return hour;
}