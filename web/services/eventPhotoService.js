window.getEventPhotoById = async function(id) {
  const { data } = await window.api.get(`/eventPhoto/${id}`);
  return data;
}

window.addEventPhoto = async function(photoFile) {
  const formData = new FormData();
  formData.append('file', photoFile);
  const { data } = await window.api.post('/eventPhoto', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

window.updateEventPhoto = async function(id, photoFile) {
  const formData = new FormData();
  formData.append('file', photoFile);
  const { data } = await window.api.patch(`/eventPhoto/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

window.deleteEventPhoto = async function(id) {
  await window.api.delete(`/eventPhoto/${id}`);
}
