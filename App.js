import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import Login from './Scr/LoginScreen/Login';
import SignUp from './Scr/LoginScreen/SignUp';
import Welcome from './Scr/LoginScreen/Welcome';
import UserProfile from './Scr/LoginScreen/MainComponents/UserProfile';
import Detail from './Scr/LoginScreen/MainComponents/Detail';
import Tabi from './Scr/LoginScreen/Screens/Tabi';
import { useEffect, useState } from 'react';
import { firebase } from './Scr/LoginScreen/Firebase/FirebaseConfig'
import PlaceOrder from './Scr/LoginScreen/Screens/PlaceOrder';
import { Provider } from 'react-redux';
import store from './Scr/LoginScreen/Redux/Store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import Information from './Scr/LoginScreen/Screens/Information';
import Stackii from './Scr/LoginScreen/MainComponents/Stackii';



export default function App() {
  
  const [Indicader, setIndcater] = useState(true)
  // const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const Stack = createNativeStackNavigator()
  
   const  persistor=persistStore(store)

  
  useEffect(() => {
   
    firebase.auth().onAuthStateChanged(((user) => {
      if (user) {
        setIndcater(false)
        setUser(user)

      }
      else {
        setIndcater(false)
        setUser()
        console.log('no User')
      }
    }))

  }, [])
  console.log(user)
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }
  // useEffect(() => {
  //   const subscriber =firebase.auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

// // console.log(user)
  if (Indicader) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <ActivityIndicator size="large" color="red" />
    </View>
  )
//   <Stack.Group screenOptions={{ headerShown: false }}>
//   <Stack.Screen name="Tab" component={Tabi} options={{ headerShown: false }} />
// </Stack.Group>
  return (
    <Provider store={store}>
      {/* // <PersistGate persistor={persistor}> */}
      <NavigationContainer>
        <Stack.Navigator >
             {!user? 
           
            <Stack.Group screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Lognii' component={Stackii} options={{ headerShown: false }} />
                    </Stack.Group>
          :
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Tab" component={Tabi} options={{ headerShown: false }} />
             </Stack.Group>
          } 
          
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name='UserProfile' component={UserProfile} options={{ headerShown: true }} />

            <Stack.Screen name='Detail' component={Detail} options={{ headerShown: false }} />

            <Stack.Screen name='PlaceOrder' component={PlaceOrder} options={{ headerShown: true }} />
            <Stack.Screen name='Information' component={Information} options={{ headerShown: true }} />

            {/* <Stack.Screen name='LateNight' component={LateNight} options={{ headerShown: true }} /> */}
            {/* <Stack.Screen name='Specail' component={DinnerSpecial} options={{ headerShown: true }} /> */}

          </Stack.Group>


          {/* <Stack.Screen  name='Home' component={Home}  options={{headerShown:false}}  /> 
    <Stack.Screen  name='UserProfile' component={UserProfile}  options={{headerShown:true}}  /> 

    <Stack.Screen  name='Detail' component={Detail}  options={{headerShown:false}}  /> 
 */}


        </Stack.Navigator>
      </NavigationContainer>
      
     </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
