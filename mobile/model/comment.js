/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: The content of the comment
 *         id:
 *           type: integer
 *           description: The unique ID of the comment
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date the comment was created
 *         event_id:
 *           type: integer
 *           description: The ID of the event the comment is associated with
 *       required:
 *         - content
 *         - id
 *         - date
 *         - event_id
 */
export class Comment {
    constructor(content, id, date, event_id) {
        this.content = content;
        this.id = id;
        this.data = date;
        this.event_id = event_id;
    }
}