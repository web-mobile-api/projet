import { Connector } from "../data/connection.js";
import { Event } from "../model/event.js";

export class EventController {
    static async getAllEvents() {
        return Connector.axios.get('/event', Connector.config)
            .then((response) => {
                return response.data.map((event) => {
                    let date = new Date(event.date);
                    date = {
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear(),
                        hour: date.getHours(),
                        minute: date.getMinutes()
                    }
                    new Event(event.event_id, event.location_id, event.author_id, event.created_at, event.name, date, event.reccurence)
                });
            })
            .catch((error) => {
                if (Connector.axios.isCancel(error)) {
                    throw error;
                } else {
                    throw error;
                }
            });
    }
    static async getEventById(id) {
        return Connector.axios.get("/event/id/" + id, Connector.config)
            .then((response) => {
                console.log(response.data);
                return new Event(response.data.event_id, response.data.location_id, response.data.author_id, response.data.created_at, response.data.name, response.data.date, response.data.reccurence);
            })
            .catch((error) => {
                throw error;
            });
    }

    static async addEvent(event) {
        return Connector.axios.post("/event/", {
            location_id: event.location_id,
            author_id: event.author_id,
            name: event.name,
            date: event.date,
            reccurence: event.reccurence
        }, Connector.config)
            .then((response) => {
                event
            })
            .catch((error) => {
                throw error;
            });
    }
}