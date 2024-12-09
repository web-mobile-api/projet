//Comments and photos are loaded on demand (with the getComments(), getPhotos())
class Event {
    constructor(id, location, name, reccurence, author, controller) {
        this.id = id;
        this.location = location;
        this.name = name;
        this.reccurence = reccurence;
        this.author = author;
        this.controller = controller;
    }
    getComments() {
        if (this.comments) {
            return this.comments;
        } else {
            //faire le call à la db via l'api
        }
    }
    getPhotos() {
        if(this.photos) {
            return this.photos;
        } else {
            //faire le call à la db via l'api
        }
    }
}