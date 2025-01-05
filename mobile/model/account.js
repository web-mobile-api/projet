/** 
 * Account model
 * @class
 * @param {number} id - The unique ID of the account
 * @param {string} first_name - The first name of the account holder
 * @param {string} last_name - The last name of the account holder
 * @param {string} email - The email of the account holder
 * @param {string} phone_number - The phone number of the account holder
 * @param {string} birth_date - The birthdate of the account holder
 * @param {number} profile_picture - The ID of the profile picture
 * @param {boolean} online - The online status of the account holder
 * @param {string} last_online - The last online timestamp of the account holder
 * @returns {Account}
*/
export class Account {
    constructor(id, first_name, last_name, email, phone_number, birth_date, profile_picture, online, last_online) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone_number = phone_number;
        this.birth_date = birth_date;
        this.profile_picture = profile_picture;
        this.online = online;
        this.last_online = last_online;
    }

    constructor(first_name, last_name, email, phone_number, birth_date, profile_picture, online, last_online) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone_number = phone_number;
        this.birth_date = birth_date;
        this.profile_picture = profile_picture;
        this.online = online;
        this.last_online = last_online;
    }

    get fullName() {
        return this.first_name + " " + this.last_name;
    }
}