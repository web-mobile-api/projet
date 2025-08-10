
window.getLocationById = async function(id) {
  const { data } = await window.api.get(`/v1/location/id/${id}`);
  return data;
}

window.getLocationByPosition = async function(position) {
  const { data } = await window.api.get(`/v1/location/position/${position}`);
  return data;
}

window.addLocation = async function(location) {
  const { data } = await window.api.post('/v1/location', location);
  return data;
}

window.updateLocation = async function(location) {
  await window.api.put('/v1/location', location);
}

window.deleteLocationById = async function(id) {
  await window.api.delete(`/v1/location/id/${id}`);
}

window.deleteLocationByPosition = async function(position) {
  await window.api.delete(`/v1/location/position/${position}`);
}
