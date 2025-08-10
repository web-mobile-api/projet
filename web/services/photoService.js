import api from "../utils/api";

// Get photo by ID
export async function getPhotoById(id) {
  const { data } = await api.get(`/v1/photo/id/${id}`);
  return data;
}

// Get photo by filename
export async function getPhotoByFilename(filename) {
  const { data } = await api.get(`/v1/photo/uploads/${filename}`);
  return data;
}

// Add a new photo
export async function addPhoto(photoFile) {
  const formData = new FormData();
  formData.append('photo', photoFile);
  const { data } = await api.post('/v1/photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

// Update a photo
export async function updatePhoto(photo) {
  await api.patch('/v1/photo', photo);
}

// Delete photo by ID
export async function deletePhoto(id) {
  await api.delete(`/v1/photo/${id}`);
}
