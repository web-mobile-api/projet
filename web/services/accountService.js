window.getAccountById = async function(id) {
    const { data } = await window.api.get(`/v1/account/id/${id}`);
    return data;
}

window.getAccountsByIds = async function(accountIDs) {
    const { data } = await window.api.get(`/v1/account/ids?accountIDs=${accountIDs}`);
    return data;
}

window.updateAccount = async function(account) {
    await window.api.patch('/v1/account', account);
}

window.deleteAccount = async function(id) {
    await window.api.delete(`/v1/account/${id}`);
}

window.heartbeat = async function() {
    await window.api.patch('/v1/account/heartbeat');
}

window.registerAccount = async function({ firstName, lastName, email, phoneNumber, birthdate, password, profilePhoto }) {
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
    const { data } = await window.api.post('/v1/account/withPFP', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
}

window.loginUser = async function(email, password) {
    const {data} = await window.api.post('/v1/account/login', {email, password});
    window.token = data.token;
    localStorage.setItem('token', data.token);
    return data;
}

window.getFriendList = async function(id) {
    const { data } = await window.api.get(`/v1/account/${id}/friends`);
    return data;
}

window.deleteFriend = async function(friendShipId) {
    const { data } = await window.api.delete(`/v1/account/friends/${friendShipId}`);
    return data;
}

window.addFriend = async function(id, friendId) {
    const { data } = await window.api.post(`/v1/account/friends`, { friend1_id: id, friend2_id: friendId });
    return data;
}