import api from "../utils/api";

// Get friend list by account ID
export async function getFriendListByAccountId(id) {
  const { data } = await api.get(`/v1/friendList/${id}`);
  return data;
}

// Add a new friendship
export async function addFriendship(friend1_id, friend2_id) {
  const { data } = await api.post('/v1/friendList', { friend1_id, friend2_id });
  return data;
}

// Update a friendship
export async function updateFriendship(friend1_id, friend2_id) {
  await api.patch('/v1/friendList', { friend1_id, friend2_id });
}

// Delete a friendship by ID
export async function deleteFriendship(id) {
  await api.delete(`/v1/friendList/${id}`);
}
