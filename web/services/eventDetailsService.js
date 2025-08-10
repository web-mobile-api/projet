
window.getEventDetails = async function(eventId) {
    const { data } = await window.api.get(`/v1/event/id/${eventId}`);
    return data;
};

window.getAllEvents = async function() {
    const { data } = await window.api.get('/v1/event');
    return data;
}

window.deleteEvent = async function(eventId) {
    await window.api.delete(`/v1/event/id/${eventId}`);
    return true;
};

window.updateEvent = async function(eventId, eventData) {
    await window.api.put(`/v1/event/id/${eventId}`, eventData);
    return true;
};

window.approveEvent = async function(eventId) {
    await window.api.post(`/v1/event/approve/${eventId}`);
    return true;
};
