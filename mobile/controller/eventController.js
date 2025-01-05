import { Connector } from "../data/connection";
import { Event } from "../model/event";

export class EventController {
    constructor(token) {
        this.config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    }

    getAllEvents() {
        Connector.axios.get('/events', this.config)
            .then((response) => {
                return response.data.map((event) => new Event(event.event_id, event.location_id, event.author_id, event.created_at, event.name, event.date, event.reccurence));
            })
            .catch((error) => {
                if (Connector.axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    console.log(error);
                }
            });
    }
}