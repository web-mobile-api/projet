import api from "../utils/api";

// Get all events
export async function getAllEvents() {
    const { data } = await api.get('/v1/event');
    return data;
}
