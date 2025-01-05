import axios from 'axios';

export class Connector {
    static axios = axios.create({baseURL: 'http://192.168.1.34:3001/v1/'});
    static config = undefined;
    static get axios() {
        if (!this._axios)
            this._axios = axios.create({baseURL: 'http://192.168.1.34:3001/v1/'});
        return this._axios;
    }
    /**
     * @param {any} axios
     */
    static set axios(axios) {
        this._axios = axios;
    }
    /**
     * @param {any} config
     */
    static set config(config) {
        this._config = config;
    }
    static get config() {
        if (!this._config)
            throw new Error("No config set, please login first");
        this._config;
    }
}