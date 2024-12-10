export const RECCURENCE = {
    WEEKLY: "weekly",
    BI_WEEKLY: "bi-weekly",
    DAILY: "daily",
    MONTHLY: "monthly",
    BI_MONTHLY: "bi-monthly",
    YEARLY: "yearly"
}

//Comments and photos are loaded on demand (with the getComments(), getPhotos())
export class Event {
    constructor(id, location, name, reccurence, author, controller) {
        this.id = id;
        this.location = location;
        this.name = name;
        this.reccurence = reccurence;
        this.author = author;
        this.controller = controller;
    }
    get comments() {
        if (this.comments) {
            return this.comments;
        } else {
            //faire le call à la db via l'api
        }
    }
    get photos() {
        if(this.photos) {
            return this.photos;
        } else {
            //faire le call à la db via l'api
        }
    }
}