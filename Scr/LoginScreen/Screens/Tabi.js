import { StyleSheet, Text, View, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../MainComponents/Home'
// import Search from './Search';
import Cart from './Cart';
import Profile from './Profile'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import { clearCart } from '../Redux/cartSlice';
import Dinner from './Dinner';

const Tabi = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart)
  const Tabi = createBottomTabNavigator();



  const showConfirmDialog = (item) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove all item from cart ?",
      [
        // The "Yes" button
        {

          text: "Yes",



          onPress: () => {

            dispatch(clearCart())

            ToastAndroid.show('Deleted successfully!', ToastAndroid.SHORT);

          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };
  return (
    <Tabi.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home-sharp'
              : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person';

          }
          else if (route.name === 'Cart') {
            iconName = focused ? 'cart-sharp' : 'cart-outline';
          }
          else if (route.name === 'Dinner') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';

          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabi.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tabi.Screen name="Dinner" component={Dinner} options={{ headerShown:false,headerTitleAlign:'center',headerTitleStyle:{color:'white',fontSize:22,fontWeight:'700'},
        headerStyle:{shadowColor:'#fff',elevation:0,backgroundColor: 'red'},
        headerTintColor: '#fff',
        }}/>
      <Tabi.Screen name="Cart" component={Cart} options={{
        headerShown: true, headerTitleAlign: 'left', headerRight: () => (
          <Button
            onPress={() => showConfirmDialog()}
            color="black"
            mode='text'
          >Remove  cart</Button>
        ),
        tabBarLabel: ` ${items.length == 0 ? '' : items.length} `, tabBarLabelStyle: {
          fontSize: 11,
          zIndex: 1,
          position: 'absolute',
          bottom: 29,
          // paddingLeft:13,
          fontWeight: 'bold',
          color: 'white',

          // marginTop:3,

          backgroundColor: `${items.length == 0 ? 'white' : 'red'}`,
          borderRadius: 50,
          width: 15,
          left: 54


        },
        headerStyle: { shadowColor: '#fff', elevation: 0, backgroundColor: 'white' },


      }}


      />
      <Tabi.Screen name="Profile" component={Profile} options={{ headerShown: false }} />



    </Tabi.Navigator>
  )
}

export default Tabi

const styles = StyleSheet.create({})