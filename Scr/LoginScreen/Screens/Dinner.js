import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DinnerSpecial from './SubScreen/DinnerSpecial'
import LateNight from './SubScreen/LateNight';
import Lucnch from './SubScreen/Lucnch'
const Dinner = () => {
  
const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
    initialRouteName="Feed"
    screenOptions={{
      tabBarActiveTintColor: '#e91e63',
      tabBarLabelStyle: { fontSize: 12,fontWeight:'bold',color:'white' },
      tabBarStyle: { backgroundColor: '#912121', },
    }}
  >
    <Tab.Screen
      name="Dinner"
      component={DinnerSpecial}
      options={{ tabBarLabel: 'Dinner' }}
    />
    <Tab.Screen
      name="LateNight"
      component={LateNight}
      options={{ tabBarLabel: 'LateNight Deals' }}
    />
    <Tab.Screen
      name="Special"
      component={Lucnch}
      options={{ tabBarLabel: 'Specail' }}
    />
  </Tab.Navigator>
  )
}

export default Dinner

const styles = StyleSheet.create({})