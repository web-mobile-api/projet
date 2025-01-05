import { CommentController } from "../controller/commentController.js";
import { EventPhotoController } from "../controller/eventPhotoController.js";

export const RECCURENCE = {
    WEEKLY: "weekly",
    BI_WEEKLY: "bi-weekly",
    DAILY: "daily",
    MONTHLY: "monthly",
    BI_MONTHLY: "bi-monthly",
    YEARLY: "yearly"
}

export class Event {

    constructor(event_id, location_id, author_id, created_at, name, date, reccurence) {
        this.id = event_id;
        this.location_id = location_id;
        this.name = name;
        this.reccurence = reccurence;
        this.author_id = author_id;
        this.created_at = created_at;
        this.date = date;
    }
    set comments(comments) {
        this._comments = comments;
    }
    get comments() {
        //This won't refresh the comments if they are already loaded
        if (!this._comments) 
            this._comments = CommentController.getCommentsFromEvent(this);
        return this._comments;
    }
    set photos(photos) {
        this._photos = photos;
    }
    get photos() {
        //This won't refresh the photos if they are already loaded
        if (!this._photos) 
            this._photos = EventPhotoController.getPhotosFromEvent(this);
        return this._photos;
    }
}