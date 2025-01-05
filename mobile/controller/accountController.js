import Account from '../model/account.js'
import { Connector } from '../data/connection.js';

export class AccountController {
    static config = undefined;
    /**
     * This is to be used if the token is saved in the local storage and you don't need it to login
     * @param {string} token
     */

    static login(email, password)  {
        Connector.axios.post("http://localhost:3000/v1/account/login", {
            email,
            password
        })
        .then((response) => {
            this.config = {
                headers: {
                    Authorization: `Bearer ${response.data.token}`
                }
            }
            return Account(response.data.user.id, response.data.user.first_name, response.data.user.last_name, response.data.user.email, response.data.user.phone_number, response.data.user.birth_date)
        })
        .catch((error) => {
            if (Connector.axios.isCancel(error)) {
                console.log('Request canceled', error.message);
                throw error
            } else {
                throw error
            }
        })
    }

    heartbeat() {
        Connector.axios.get("http://localhost:3000/v1/account/heartbeat", this.config);
    }

    getAccountById(id) {
        Connector.axios.get("http://localhost:3000/v1/account/" + id, this.config)
        .then((response) => {
            return new Account(response.data.id, response.data.first_name, response.data.last_name, response.data.email, response.data.phone_number, response.data.birth_date)
        })
        .catch((error) => {
            if (Connector.axios.isCancel(error)) {
                throw error
            } else {
                throw error
            }
        })
    }

    addAccount(account) {
        Connector.axios.post("http://localhost:3000/v1/account/", {
            first_name: account.first_name,
            last_name: account.last_name,
            password: account.password,
            email: account.email,
            phone_number: account.phone_number,
            birthdate: account.birthdate
        })
        .then((response) => {
            account.id = response.data.id;
            return account;
        })
        .catch((error) => {
            if (Connector.axios.isCancel(error)) {
                throw error
            } else {
                throw error
            }
        })
    }

    addAccountWithPFP(account, profile_picture) {
        //profile_picture is a File object
        let formData = new FormData();
        formData.append('first_name', account.first_name);
        formData.append('last_name', account.last_name);
        formData.append('password', account.password);
        formData.append('email', account.email);
        formData.append('phone_number', account.phone_number);
        formData.append('birthdate', account.birthdate);
        formData.append('profile_picture', profile_picture);
        Connector.axios.post("http://localhost:3000/v1/account/withPFP", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            account.id = response.data.id;
            return account;
        })
        .catch((error) => {
            if (Connector.axios.isCancel(error)) {
                throw error
            } else {
                throw error
            }
        })

    }

    getMultipleAccountsById(ids) {
        Connector.axios.get("http://localhost:3000/v1/account/ids?accountIDs=" + ids.join(","), this.config)
        .then((response) => {
            return response.data.map(account => new Account(account.id, account.first_name, account.last_name, account.email, account.phone_number, account.birth_date))
        })
        .catch((error) => {
            if (Connector.axios.isCancel(error)) {
                throw error
            } else {
                throw error
            }
        })
    }

    deleteAccount(id) {
        Connector.axios.delete("http://localhost:3000/v1/account/" + id, this.config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (Connector.axios.isCancel(error)) {
                throw error
            } else {
                throw error
            }
        })
    }

    updateAccount(account) {
        Connector.axios.patch("http://localhost:3000/v1/account/", {
            first_name: account.first_name,
            last_name: account.last_name,
            password: account.password,
            email: account.email,
            phone_number: account.phone_number,
            birthdate: account.birthdate,
            profile_picture: account.profile_picture
        }, this.config)
        .then((response) => {
            return new Account(response.data.id, response.data.first_name, response.data.last_name, response.data.email, response.data.phone_number, response.data.birth_date)
        })
        .catch((error) => {
            if (Connector.axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                console.log(error)
            }
        })
    }
}