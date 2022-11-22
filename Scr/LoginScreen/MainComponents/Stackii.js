import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../Welcome';
import Login from '../Login';
import SignUp from '../SignUp';


const Stackii = () => {

    const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator >
         <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>

  )
}

export default Stackii

const styles = StyleSheet.create({})