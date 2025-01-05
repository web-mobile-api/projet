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
    constructor() {
        
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