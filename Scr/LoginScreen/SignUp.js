import {  ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity,ActivityIndicator, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import {firebase} from '../LoginScreen/Firebase/FirebaseConfig'


const SignUp = ({ navigation }) => {
  const [Password, setPassward] = useState('');
  const [Email, setEmail] = useState('');
  const [Square, setSquare] = useState(true);
  const [FullName, setFullName] = useState('');
  const [Address, setAddress] = useState('');
  const [Phone, setPhone] = useState('');
  const [ConfirmPassward, setConfirmPassward] = useState('')
  const [loading, setloading] = useState(false)


const HandleSubmit=()=>{
  if(Password !=ConfirmPassward ){
    ToastAndroid.show('Passward Doesnot match',ToastAndroid.SHORT)
    return
  }
  if(Phone.length!=11)
  {
    ToastAndroid.show('Phone Number should be 10-digits',ToastAndroid.SHORT)
    return

  }
   if (FullName==''){
    ToastAndroid.show('PLease Fill All feilds',ToastAndroid.SHORT)
    return
  }
   if(Email==''){
    ToastAndroid.show('Email are Empty',ToastAndroid.SHORT)
    return

  }
   if(Phone==''){
    ToastAndroid.show('Phone are Empty',ToastAndroid.SHORT)
    return

  }
   if(Address==''){
    ToastAndroid.show('Address are Empty',ToastAndroid.SHORT)
    return

  }
   if(Password==''|| ConfirmPassward==''){
    ToastAndroid.show('Passward are Empty',ToastAndroid.SHORT)
    return

  }
  // else{
  //   ToastAndroid.show('Plese fill all field',ToastAndroid.SHORT)
  //   return
  // }
 try {
  setloading(true)
  firebase.auth().createUserWithEmailAndPassword(Email,Password)
  .then((userCredential)=>{
    ToastAndroid.show('SignUp SuccesFully',ToastAndroid.SHORT)
          
if(userCredential?.user.uid){
  
  const UserDataRef = firebase.firestore().collection('UserData');
  UserDataRef.add({Email,
    FullName,
    Address,
    Phone,
    Password,
    uid:userCredential?.user.uid
  })

  // navigation.navigate('Login')
  setFullName('')
  setAddress('')
  setPhone('')
  setPassward('')
  setConfirmPassward('')
  setEmail('')
  .catch((error)=>{
console.log('Firestore error',error)
  })
  setloading(false)

}

  }).catch((error)=>{
    // ToastAndroid.show('Firebase Error ' ,  error ,ToastAndroid.SHORT)
    console.log( 'erroe',error)
    if(error.message =='Firebase: The email address is already in use by another account. (auth/email-already-in-use).'){
          ToastAndroid.show('Email already Exists '  ,ToastAndroid.SHORT)
          setloading(false)

      return
    }
     if(error.message ==' Firebase: Password should be at least 6 characters (auth/weak-password).'){
      setloading(false)

      ToastAndroid.show('Passward Should be alLeast 6 character'  ,ToastAndroid.SHORT)
      return
    }
    if(error.message =='Firebase: The email address is badly formatted. (auth/invalid-email).'){
      setloading(false)

      ToastAndroid.show('The email address is badly formatted'  ,ToastAndroid.SHORT)
      return
    }
    
  })

  
  
 } catch (error) {
  // ToastAndroid.show('System Error' ,  error ,ToastAndroid.SHORT)
  console.log('System err',error)
  setloading(false)


  
 }

}

if (loading) return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <ActivityIndicator size="large" color="#0b0f7d" />
  </View>
)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up</Text>
<ScrollView>

      <View style={{ justifyContent: 'space-evenly', alignItems: 'center', }}>

        <TextInput style={{ width: '69%', marginBottom: 6, }}
          value={FullName}
          onChangeText={(text) => { setFullName(text) }}

          label="Full Name"
          mode='outlined'
          activeOutlineColor='red'
          left={<TextInput.Icon icon="account" iconColor='red' />}

        />
        <TextInput style={{ width: '69%', marginBottom: 6, }}
          value={Phone}
          onChangeText={(text) => { setPhone(text) }}
  keyboardType='number-pad'
          label="Phone Number"
          mode='outlined'
          activeOutlineColor='red'
          left={<TextInput.Icon icon="phone" iconColor='red' />}

        />

        <TextInput style={{ width: '69%', marginBottom: 6, }}
          value={Email}
          onChangeText={(text) => { setEmail(text) }}
keyboardType='email-address'
          label="Email"
          mode='outlined'
          activeOutlineColor='red'
          left={<TextInput.Icon icon="email" iconColor='red' />}

        />
        <TextInput
          style={{ width: '69%', }}
          value={Password}
          onChangeText={(text) => { setPassward(text) }}

          mode='outlined'
          label="Password"
          activeOutlineColor='red'
          underlineColor='black'
          secureTextEntry={Square}
          left={<TextInput.Icon icon="lock" iconColor='red' />}

          right={<TextInput.Icon onPress={() => setSquare(!Square)} iconColor='black' icon={Square == false ? 'eye' : 'eye-off'} />}
        />
        <TextInput
          style={{ width: '69%', marginTop: 6 }}
          value={ConfirmPassward}
          onChangeText={(text) => { setConfirmPassward(text) }}

          mode='outlined'
          label=" Confirm Password"
          activeOutlineColor='red'
          underlineColor='black'
          secureTextEntry={Square}
          left={<TextInput.Icon icon="lock" iconColor='red' />}

          right={<TextInput.Icon onPress={() => setSquare(!Square)} iconColor='black' icon={Square == false ? 'eye' : 'eye-off'} />}
        />
        {/* <Text style={{ color: "#786c69", justifyContent: 'center', marginTop: 12 }}>Please Enter Your Address</Text> */}
        
        <TextInput style={{ width: '69%', }}
          value={Address}
          onChangeText={(text) => { setAddress(text) }}

          label="Enter Your Address"
          mode='outlined'
          activeOutlineColor='red'
          left={<TextInput.Icon icon="home" iconColor='red' />}

        />
        
      </View>
      <View style={{ alignItems: "center", marginTop: '10%', }}>
        <Button style={styles.btn} mode="contained" onPress={() => HandleSubmit()}>
          SignUp
        </Button>
        {/* <Text style={styles.forget}> Forget Password ?</Text> */}

      </View>
      <Text style={styles.or}>Or</Text>
      <Text style={styles.ir}>Sign Up With</Text>
      <View style={{ flexDirection: 'row', alignSelf: "center", marginTop: 20, }}>
        <AntDesign style={styles.ficon} name="facebook-square" size={29} color="blue" />
        <AntDesign style={styles.gicon} name="google" size={29} color="red" />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}><View style={styles.line} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: "center" }}>

        <Text >Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: "red", fontWeight: "900", fontSize: 15 }}>Login</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    // justifyContent:'center',


  },
  text: {
    fontSize: 29,
    fontWeight: '600',
    textAlign: "center",
    color: 'red',
    marginBottom: '5%',
    marginTop: '5%'
  },
  btn: {
    width: '69%',
    backgroundColor: 'red',
    elevation: 26
  },
  forget: {
    color: '#786c69',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 10

  },
  or: {
    fontSize: 13,
    fontWeight: '400',
    color: 'red',
    textAlign: 'center',
    marginTop: 3
  },
  ir: {
    fontSize: 23,
    fontWeight: '900',
    color: '#786c69',
    textAlign: 'center',
    marginTop: 8
  },
  ficon: {
    marginRight: 9,
    elevation: 10,
    borderWidth: 0.5,
    borderColor: 'transparent'

  },
  gicon: {
    elevation: 10,
    borderWidth: 0.5,
    borderColor: 'transparent'
  },
  line: {
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 20,
    // left:'10%'
    top: 10,

  },


})