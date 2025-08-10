  // Add a new invitation
window.addInvitation = async function(receiver_id) {
  const { data } = await window.api.post('/v1/invitation', { receiver_id });
  return data;
}

// Update an invitation
window.updateInvitation = async function(invitation_id, status) {
  await window.api.patch('/v1/invitation', { invitation_id, status });
}

// Delete an invitation by ID
window.deleteInvitation = async function(id) {
  await window.api.delete(`/v1/invitation/${id}`);
}

// Get invitations received by account
window.getReceivedInvitations = async function(id) {
  const { data } = await window.api.get(`/v1/invitations/receiver?id=${id}`);
  return data;
}

// Get invitations sent by account
window.getSentInvitations = async function(id) {
  const { data } = await window.api.get(`/v1/invitations/sender?id=${id}`);
  return data;
}
