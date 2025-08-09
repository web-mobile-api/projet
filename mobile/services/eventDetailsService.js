import api from "../utils/api";

// Get event details by event ID
export async function getEventDetails(eventId) {
    const { data } = await api.get(`/v1/event/id/${eventId}`);
    return data;
}
