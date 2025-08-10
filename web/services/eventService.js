import api from "../utils/api";

// Create a new event with optional image
export async function createEvent({ title, description, startDate, endDate, startTime, endTime, organisateur, publicInfo, address, coordinates, image }) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('organisateur', organisateur);
    formData.append('publicInfo', publicInfo);
    formData.append('address', address);
    if (coordinates) {
        formData.append('latitude', coordinates.latitude);
        formData.append('longitude', coordinates.longitude);
    }
    formData.append('start_date', startDate.toISOString());
    formData.append('end_date', endDate.toISOString());
    formData.append('start_time', startTime.toISOString());
    formData.append('end_time', endTime.toISOString());
    if (image) {
        formData.append('image', {
            uri: image,
            name: 'event.jpg',
            type: 'image/jpeg',
        });
    }
    const { data } = await api.post('/v1/event/withPhoto', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
}
