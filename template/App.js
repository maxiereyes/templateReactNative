/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Auth0 from 'react-native-auth0';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '@env'
import MainNavigation from './src/navigation/MainNavigation'

const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENT_ID });

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>    
    </SafeAreaView>
  );
};

export default App;
