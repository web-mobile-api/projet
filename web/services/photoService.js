// Get photo by ID
window.getPhotoById = async function(id) {
  const { data } = await window.api.get(`/v1/photo/id/${id}`);
  return data;
}

// Get photo by filename
window.getPhotoByFilename = async function(filename) {
  const { data } = await window.api.get(`/v1/photo/uploads/${filename}`);
  return data;
}

// Add a new photo
window.addPhoto = async function(photoFile) {
  const formData = new FormData();
  formData.append('photo', photoFile);
  const { data } = await window.api.post('/v1/photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

// Update a photo
window.updatePhoto = async function(photo) {
  await window.api.patch('/v1/photo', photo);
}

// Delete photo by ID
window.deletePhoto = async function(id) {
  await window.api.delete(`/v1/photo/${id}`);
}
