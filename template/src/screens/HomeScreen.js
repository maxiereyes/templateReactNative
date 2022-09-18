import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import MapScreen from './MapScreen'

const HomeScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HomeScreen</Text>
      <Icon name='home-outline' />
      <MapScreen />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})