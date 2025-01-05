import { Account } from '../model/account.js'
import { Connector } from '../data/connection.js';

export class AccountController {
    static async login(email, password)  {
        return Connector.axios.post("account/login", {
            email,
            password
        })
        .then((response) => {
            Connector.config = {
                headers: {
                    Authorization: `Bearer ${response.data.token}`
                }
            }
            let account = new Account(
                response.data.user.first_name,
                response.data.user.last_name,
                response.data.user.email,
                response.data.user.phone_number,
                response.data.user.profile_picture,
                response.data.user.birthdate,
                response.data.user.online,
                response.data.user.last_online,
                response.data.user.account_id
            );
            return account
        })
        .catch((error) => {
            throw error
        })
    }

    static async heartbeat() {
        return Connector.axios.get("account/heartbeat", Connector.config);
    }

    static async getAccountById(id) {
        return Connector.axios.get("/account/id/" + id, Connector.config)
        .then((response) => {
            return new Account(
                response.data.first_name,
                response.data.last_name,
                response.data.email,
                response.data.phone_number,
                response.data.profile_picture,
                response.data.birthdate,
                response.data.online,
                response.data.last_online,
                response.data.account_id
            );
        })
        .catch((error) => {
            throw error
        })
    }

    static async addAccount(account) {
        console.log(account)
        return Connector.axios.post("/account/", {
            first_name: account.first_name,
            last_name: account.last_name,
            password: account.password,
            email: account.email,
            phone_number: account.phone_number,
            birthdate: account.birthdate,
            profile_picture: account.profile_picture,
        })
        .then((response) => {
            account.id = response.data.id;
            return account;
        })
        .catch((error) => {
            throw error
        })
    }

    static async addAccountWithPFP(account) {
        let formData = new FormData();
        formData.append('first_name', account.first_name);
        formData.append('last_name', account.last_name);
        formData.append('password', account.password);
        formData.append('email', account.email);
        formData.append('phone_number', account.phone_number);
        formData.append('birthdate', account.birthdate);
        formData.append('photo', {
            uri: account.profile_picture,
            type: 'image/jpeg',
            name: 'profile_picture.jpg'
        });

        return Connector.axios.post("account/withPFP", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            account.id = response.data.account_id;
            return account;
        })
        .catch((error) => {
            throw error;
        });
    }

    static async getMultipleAccountsById(ids) {
        return Connector.axios.get("account/ids?accountIDs=" + ids.join(","), Connector.config)
        .then((response) => {
            return response.data.map(account => new Account(
                account.first_name,
                account.last_name,
                account.email,
                account.phone_number,
                account.profile_picture,
                account.birthdate,
                account.online,
                account.last_online,
                account.account_id
            ));
        })
        .catch((error) => {
            throw error
        })
    }

    static async deleteAccount(id) {
        return Connector.axios.delete("/account/" + id, Connector.config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error
        })
    }

    static async updateAccount(account) {
        return Connector.axios.patch("/account/", {
            first_name: account.first_name,
            last_name: account.last_name,
            password: account.password,
            email: account.email,
            phone_number: account.phone_number,
            birthdate: account.birthdate,
            profile_picture: account.profile_picture
        }, Connector.config)
        .then((response) => {
            return new Account(response.data.id, response.data.first_name, response.data.last_name, response.data.email, response.data.phone_number, response.data.birth_date)
        })
        .catch((error) => {
            throw error
        })
    }
}