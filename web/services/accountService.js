import {api, token} from "../utils/api.js"

// Get account by ID
export async function getAccountById(id) {
    const { data } = await api.get(`/v1/account/id/${id}`);
    return data;
}

// Get multiple accounts by IDs (comma-separated string)
export async function getAccountsByIds(accountIDs) {
    const { data } = await api.get(`/v1/account/ids?accountIDs=${accountIDs}`);
    return data;
}

// Update account
export async function updateAccount(account) {
    await api.patch('/v1/account', account);
}

// Delete account by ID
export async function deleteAccount(id) {
    await api.delete(`/v1/account/${id}`);
}

// Heartbeat (update online status)
export async function heartbeat() {
    await api.patch('/v1/account/heartbeat');
}
import api from "../utils/api";


// Register a new account with profile picture
export async function registerAccount({ firstName, lastName, email, phoneNumber, birthdate, password, profilePhoto }) {
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('phone_number', phoneNumber);
    formData.append('birthdate', birthdate);
    formData.append('password', password);
    if (profilePhoto) {
        formData.append('profile_picture', {
            uri: profilePhoto,
            name: 'profile.jpg',
            type: 'image/jpeg',
        });
    }
    const { data } = await api.post('/v1/account/withPFP', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
}

export async function login(email, password) {
    const {data} = await api.post('/v1/account/login', {email, password});
    token = data.token;
    return data;
}

export async function getFriendList(id) {
    const { data } = await api.get(`/v1/account/${id}/friends`);
    return data;
}

export async function deleteFriend(friendShipId) {
    const { data } = await api.delete(`/v1/account/friends/${friendShipId}`);
    return data;
}

export async function addFriend(id, friendId) {
    const { data } = await api.post(`/v1/account/friends`, { friend1_id: id, friend2_id: friendId });
    return data;
}