/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Auth0 from 'react-native-auth0';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '@env'
import HomeScreen from './src/screens/HomeScreen';

const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENT_ID });

const App = () => {
  const Stack = createNativeStackNavigator()

  const login = async (isSignUp) => {
    try {
      const credentials = await auth0.webAuth.authorize({scope: 'openid profile email'})
      console.log(credentials);
    } catch (error) {
      console.log('AUTH0 LOGIN --->', error);
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>    
    </SafeAreaView>
  );
};

export default App;
