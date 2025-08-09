import api from "../utils/api";

// Add a new invitation
export async function addInvitation(receiver_id) {
  const { data } = await api.post('/v1/invitation', { receiver_id });
  return data;
}

// Update an invitation
export async function updateInvitation(invitation_id, status) {
  await api.patch('/v1/invitation', { invitation_id, status });
}

// Delete an invitation by ID
export async function deleteInvitation(id) {
  await api.delete(`/v1/invitation/${id}`);
}

// Get invitations received by account
export async function getReceivedInvitations(id) {
  const { data } = await api.get(`/v1/invitations/receiver?id=${id}`);
  return data;
}

// Get invitations sent by account
export async function getSentInvitations(id) {
  const { data } = await api.get(`/v1/invitations/sender?id=${id}`);
  return data;
}
