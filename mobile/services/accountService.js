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
import api from "../utils/api";

export async function login(email, password) {
    const {data} = await api.post('/v1/account/login', {email, password});
    return data;
}