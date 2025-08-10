window.getFriendListByAccountId = async function(id) {
  const { data } = await window.api.get(`/v1/friendList/${id}`);
  return data;
}

window.addFriendship = async function(friend1_id, friend2_id) {
  const { data } = await window.api.post('/v1/friendList', { friend1_id, friend2_id });
  return data;
}

window.updateFriendship = async function(friend1_id, friend2_id) {
  await window.api.patch('/v1/friendList', { friend1_id, friend2_id });
}

window.deleteFriendship = async function(id) {
  await window.api.delete(`/v1/friendList/${id}`);
}
