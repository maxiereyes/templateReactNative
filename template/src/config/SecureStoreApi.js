import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";


export const isExpired = token => {
  let expired = true;
  const decoded = jwt_decode(token);
  if(Date.now() <= decoded?.exp * 1000) expired = false;
  return expired;
}

// Access Token
export const setToken =  async (value) =>  {
  await  AsyncStorage.setItem('secure_token', value);
}

export const  getToken = async () =>  {
    return await AsyncStorage.getItem('secure_token');
}

export const  removeToken = async () =>  {
  return await AsyncStorage.removeItem('secure_token');
}

// Refresh Token
export const setRefreshToken =  async (value) =>  {
  await  AsyncStorage.setItem('refresh_token', value);
}

export const  getRefreshToken = async () =>  {
    return await AsyncStorage.getItem('refresh_token');
}

export const  removeRefreshToken = async () =>  {
  return await AsyncStorage.removeItem('refresh_token');
}