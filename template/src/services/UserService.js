import axios from "axios";
import jwt_decode from "jwt-decode";
import { getToken } from "../config/SecureStoreApi";
import { API_URL, AUTH0_NAMESPACE } from '@env'

export const postPhoneToken = async (token) => {
    let user_id = await getUserId();
    if (!user_id) throw new Error('not logged in');
    const url = `${API_URL}/user/${user_id}/token`;
    return await axios.post(url, token);
}

export const getUserId = async () => {
    let user_id;
    let token = await getToken();
    if (token) {
        var decoded = jwt_decode(token);
        user_id = decoded?.[`${AUTH0_NAMESPACE}user_id`];
    }
    if (!user_id) user_id = 0;
    return user_id;
}

export const getCurrentUser = async () => {
    let user_id = await getUserId();
    if (!user_id) throw new Error('not logged in');
    return await axios.get(`${API_URL}/user/${user_id}`);
}

export const getUserById = async (userId) => {
    return await axios.get(`${API_URL}/user/${userId}`);
}
