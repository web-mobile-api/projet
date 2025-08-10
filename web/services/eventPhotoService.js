  // Get event photo by ID
window.getEventPhotoById = async function(id) {
  const { data } = await window.api.get(`/eventPhoto/${id}`);
  return data;
}

// Add a new event photo
window.addEventPhoto = async function(photoFile) {
  const formData = new FormData();
  formData.append('file', photoFile);
  const { data } = await window.api.post('/eventPhoto', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

// Update event photo by ID
window.updateEventPhoto = async function(id, photoFile) {
  const formData = new FormData();
  formData.append('file', photoFile);
  const { data } = await window.api.patch(`/eventPhoto/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

// Delete event photo by ID
window.deleteEventPhoto = async function(id) {
  await window.api.delete(`/eventPhoto/${id}`);
}
