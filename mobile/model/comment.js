export class Comment {
    constructor(content, id, date, event_id, author_id) {
        this.content = content;
        this.id = id;
        this.data = date;
        this.event_id = event_id;
        this.author_id = author_id;
    }
}