  // Get a single comment by ID
window.getCommentById = async function(id) {
  //const { data } = await window.api.get(`/v1/comment/${id}`);
  return {
    content: "Hello",
    id: 1,
    author_id: 1,
    event_id: 1
  };
}

// Get comments by author and event
window.getCommentsByAuthorAndEvent = async function(author_id, event_id) {
  const { data } = await window.api.get(`/v1/comments?author_id=${author_id}&event_id=${event_id}`);
  return data;
}

// Add a new comment
window.addComment = async function({ content, author_id, event_id }) {
  const { data } = await window.api.post('/v1/comment', { content, author_id, event_id });
  return data;
}

// Delete a comment by ID
window.deleteComment = async function(id) {
  await window.api.delete(`/v1/comment/${id}`);
}
