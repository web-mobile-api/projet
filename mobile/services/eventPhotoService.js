import api from "../utils/api";

// Get event photo by ID
export async function getEventPhotoById(id) {
  const { data } = await api.get(`/eventPhoto/${id}`);
  return data;
}

// Add a new event photo
export async function addEventPhoto(photoFile) {
  const formData = new FormData();
  formData.append('file', photoFile);
  const { data } = await api.post('/eventPhoto', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

// Update event photo by ID
export async function updateEventPhoto(id, photoFile) {
  const formData = new FormData();
  formData.append('file', photoFile);
  const { data } = await api.put(`/eventPhoto/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

// Delete event photo by ID
export async function deleteEventPhoto(id) {
  await api.delete(`/eventPhoto/${id}`);
}
