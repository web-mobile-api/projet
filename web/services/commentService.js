window.getCommentById = async function(id) {
  const { data } = await window.api.get(`/v1/comment/${id}`);
  return data;
}

window.getCommentsByAuthorAndEvent = async function(author_id, event_id) {
  const { data } = await window.api.get(`/v1/comments?author_id=${author_id}&event_id=${event_id}`);
  return data;
}

window.addComment = async function({ content, author_id, event_id }) {
  const { data } = await window.api.post('/v1/comment', { content, author_id, event_id });
  return data;
}

window.deleteComment = async function(id) {
  await window.api.delete(`/v1/comment/${id}`);
}
