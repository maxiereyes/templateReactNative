import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import MapScreen from './MapScreen'
import { useTranslation } from "react-i18next";

const HomeScreen = () => {
  const {t} = useTranslation()
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{t('hello_world')}</Text>
      <Icon name='home-outline' />
      <MapScreen />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})