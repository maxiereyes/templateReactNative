import axios from 'axios';
import { getRefreshToken, getToken, isExpired, setToken } from "./SecureStoreApi";
import { API_URL } from '@env'
import { auth0 } from '../../App';

export function axiosConfig() {
    axios.interceptors.request.use(async function (config) {
        config.baseURL = `${API_URL}`;

        console.log(`REQUEST:  ${config.method} ${config.baseURL}${config.url} ${config.data ? JSON.stringify(config.data, null, 2) : ''}`)

        try {
            config.headers['Content-Type'] = 'application/json';
            config.cors = true;
            let token = await getToken();

            if (token) {
                if (isExpired(token)) {
                    await getNewToken();
                    token = await getToken();
                }
                console.log('acessToken: ', token);
                config.headers.Authorization = `Bearer ${token}`
            }
        } catch (error) {
            console.log(error);
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error?.response?.status === 401)
            setTimeout(() => RootNavigation.goToLogin(), 1000);
        return Promise.reject(error);
    });
}

const getNewToken = async () => {
    const refreshToken = await getRefreshToken();
    if (refreshToken) {
        let credentials = await auth0.auth.refreshToken({ refreshToken });
        if (credentials.accessToken)
            await setToken(credentials.accessToken);
        else
            throw Error('error geting new access-token with refresh-token');
    }
}