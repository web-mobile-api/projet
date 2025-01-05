import axios from 'axios';

export class Connector {
    static axios = axios.create({baseURL: 'http://localhost:3000/v1/'});
    static get axios() {
        if (!this.axios)
            this.axios = axios.create({baseURL: 'http://localhost:3000/v1/'});
        
        return this.axios;
    }
}