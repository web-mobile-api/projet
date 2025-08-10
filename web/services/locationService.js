
// Get location by ID
window.getLocationById = async function(id) {
  const { data } = await window.api.get(`/v1/location/id/${id}`);
  return data;
}

// Get location by position
window.getLocationByPosition = async function(position) {
  const { data } = await window.api.get(`/v1/location/position/${position}`);
  return data;
}

// Add a new location
window.addLocation = async function(location) {
  const { data } = await window.api.post('/v1/location', location);
  return data;
}

// Update a location
window.updateLocation = async function(location) {
  await window.api.put('/v1/location', location);
}

// Delete location by ID
window.deleteLocationById = async function(id) {
  await window.api.delete(`/v1/location/id/${id}`);
}

// Delete location by position
window.deleteLocationByPosition = async function(position) {
  await window.api.delete(`/v1/location/position/${position}`);
}
