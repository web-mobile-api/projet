import api from "../utils/api";

export async function login(email, password) {
    const {data} = await api.post('/v1/account/login', {email, password});
    return data;
}