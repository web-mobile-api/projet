import api from "../utils/api";

// Get location by ID
export async function getLocationById(id) {
  const { data } = await api.get(`/v1/location/id/${id}`);
  return data;
}

// Get location by position
export async function getLocationByPosition(position) {
  const { data } = await api.get(`/v1/location/position/${position}`);
  return data;
}

// Add a new location
export async function addLocation(location) {
  const { data } = await api.post('/v1/location', location);
  return data;
}

// Update a location
export async function updateLocation(location) {
  await api.put('/v1/location', location);
}

// Delete location by ID
export async function deleteLocationById(id) {
  await api.delete(`/v1/location/id/${id}`);
}

// Delete location by position
export async function deleteLocationByPosition(position) {
  await api.delete(`/v1/location/position/${position}`);
}
