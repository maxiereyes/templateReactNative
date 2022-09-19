import React, { useEffect, useState } from 'react';
import Auth0 from 'react-native-auth0';
import { StatusBar, AppState } from 'react-native';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } from '@env'
import { setToken, getToken, removeToken, setRefreshToken, removeRefreshToken, axiosConfig } from './src/config';
import { AuthProvider } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigation/MainNavigation';
import { getCurrentUser } from './src/services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENT_ID });

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState();

  const login = async (isSignUp) => {
    let usr;
    try {
      setLoading(true)
      let credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email offline_access',
        audience: AUTH0_AUDIENCE,
        screen_hint: isSignUp ? 'signup' : 'login'
      }, {
        ephemeralSession: true
      })

      await setRefreshToken(credentials.refreshToken)
      await setToken(credentials.accessToken);
      await axiosConfig();
      usr = await refreshUserData();


      setIsAuth(true);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('APP - LOGIN AUTH0 - ERROR', error)
    }
    return usr;
  };

  const logout = async () => {
    try {
      setLoading(true)
      setIsAuth(false);
      await auth0.webAuth.clearSession()
      await AsyncStorage.removeItem('user');
      await removeToken();
      await removeRefreshToken();
      setUser(null)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('APP - LOGOUT AUTH0 - ERROR', error)
    }
  };

  const refreshUserData = async () => {
    try {
      const resp = await getCurrentUser();
      const usr = resp?.data;

      if (usr)
        setUser(usr);

      return usr;
    } catch (e) {
      console.log('error getting user', e)
    }
  }

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const _handleAppStateChange = (nextAppState) => {
    console.log('app is ', nextAppState)
  };

  const checkAuthStatus = async () => {
    try {
      const hasToken = !!(await getToken())
      await axiosConfig();

      if (hasToken) {
        let usr = await AsyncStorage.getItem('user');
        setUser(JSON.parse(usr));
        await refreshUserData();
      }

      setIsAuth(hasToken);
      setLoading(false);
    } catch (error) {
      console.log('APP - CHECK STATUS - ERROR', error)
      logout();
    }
  }

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <StatusBar hidden={false} barStyle="dark-content" backgroundColor={'#F4F5F6'} />
      <NavigationContainer >
        <AuthProvider value={{ refreshUserData, user, isAuth, login, logout }}>
          <MainNavigation />
        </AuthProvider>
      </NavigationContainer>
    </>
  )
}

export default App