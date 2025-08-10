import api from "../utils/api";

// Get a single comment by ID
export async function getCommentById(id) {
  const { data } = await api.get(`/v1/comment/${id}`);
  return data;
}

// Get comments by author and event
export async function getCommentsByAuthorAndEvent(author_id, event_id) {
  const { data } = await api.get(`/v1/comments?author_id=${author_id}&event_id=${event_id}`);
  return data;
}

// Add a new comment
export async function addComment({ content, author_id, event_id }) {
  const { data } = await api.post('/v1/comment', { content, author_id, event_id });
  return data;
}

// Delete a comment by ID
export async function deleteComment(id) {
  await api.delete(`/v1/comment/${id}`);
}
