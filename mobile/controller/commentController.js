import { Comment } from '../model/comment.js'
import { Connector } from '../data/connection.js';

export class CommentController {
    static async getCommentsFromEvent(event) {
        return Connector.axios.get("/event/id/" + event.id, Connector.config)
        .then((response) => {
            console.log(response.data);
            console.log(response.data.Comment);
            let comments = response.data.Comment.map((comment) => new Comment(comment.content, comment.comment_id, comment.date, comment.event_id, comment.author_id));
            event.comments = comments;
            return comments;
        })
        .catch((error) => {
            throw error;
        });
    }

    static async addComment(event_id, comment) {
        return Connector.axios.post("/comment/", {
            content: comment.content,
            event_id: event_id,
            author_id: comment.author_id
        }, Connector.config)
            .then((response) => {
                return new Comment(response.data.content, response.data.id, response.data.date, response.data.event_id, response.data.author_id)
            })
            .catch((error) => {
                throw error;
            });
    }

    static async getCommentFromEventAndAuthor(event_id, author_id) {
        return Connector.axios.get(`/comment/${event_id}/${author_id}`, Connector.config)
            .then((response) => {
                return new Comment(response.data.content, response.data.comment_id, response.data.date, response.data.event_id, response.data.author_id);
            })
            .catch((error) => {
                throw error;
            });
    }

    static async deleteComment(comment_id) {
        return Connector.axios.delete(`/comment/${comment_id}`, Connector.config)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    }

}