import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View,ActivityIndicator} from 'react-native'
import React,{useState} from 'react'
import { TextInput,Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import {firebase} from '../LoginScreen/Firebase/FirebaseConfig'

const Login = ({navigation}) => {
  const [Password, setPassward] = useState('');
  const [Email, setEmail] = useState('');
  const [Square, setSquare] = useState(true);
  const [loading, setloading] = useState(false)
  

   const forgetPassward=()=>{
    firebase.auth().sendPasswordResetEmail(Email)
    .then(()=>{
      ToastAndroid.show('Passward is send your Email Address',ToastAndroid.LONG)

    }).catch((err)=>{
      
      // ToastAndroid.show('Error',err,ToastAndroid.SHORT)
      console.log(err)
      if(err.message=='Firebase: Error (auth/missing-email).'){
        ToastAndroid.show('Please Enter email adddress then forget passward request ',ToastAndroid.LONG)
        return
      }
if(err.message=='Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).')
{
  ToastAndroid.show('There is no user record corresponding to this identifier.The user may have been deleted.  ',ToastAndroid.LONG)
  return
}
    })

   }

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <ActivityIndicator size="large" color="#0b0f7d" />
    </View>
)
  const HandleSubmit=()=>{
    setloading(true)
    firebase.auth().signInWithEmailAndPassword(Email,Password)
    .then((userCredential)=>{
           var user=userCredential.user
           ToastAndroid.show('Sign In SuccessFully',ToastAndroid.SHORT)
           setloading(false)
          //  console.log(user)
          // navigation.navigate('Home')
           
    }).catch((error)=>{
      setloading(false)
      console.log('errr',error)
      if(error.message==' Firebase: The email address is badly formatted. (auth/invalid-email).'){
        ToastAndroid.show('Email Address is not valid',ToastAndroid.SHORT)
return
      }
      if(error.message=='Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).'){
        ToastAndroid.show('The password is invalid or the user does not have a password',ToastAndroid.SHORT)
return
      }
      if(Password==''){
        ToastAndroid.show('Password is Empty',ToastAndroid.SHORT)
return
      }
      if(Email==''){
        ToastAndroid.show('Email is Empty',ToastAndroid.SHORT)
return
      }
      setloading(false)

    })
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign in</Text>


      <View style={{justifyContent:'space-evenly',alignItems:'center'}}>

      <TextInput style={{width:'69%',marginBottom:23,}}
      value={Email}
      onChangeText ={(text) => {setEmail(text)}}

      label="Email"
      mode='outlined'
      activeOutlineColor='red' 
            left={<TextInput.Icon icon="email"  iconColor='red'  />}
 
    />
      <TextInput
       style={{width:'69%',}}
       value={Password}
       onChangeText ={(text) => {setPassward(text)}}

       mode='outlined'
      label="Password"
      activeOutlineColor='red'
      underlineColor='black'
      secureTextEntry={Square}
      left={<TextInput.Icon icon="lock" iconColor='red'/>}
              
      right={<TextInput.Icon   onPress={()=> setSquare(!Square)} iconColor='black' icon={Square==false?'eye':'eye-off'} />}  
    />
      </View>
      <View  style={{alignItems:"center",marginTop:'10%' , }}>
      <Button style={styles.btn}  mode="contained" onPress={() => HandleSubmit()}>
    Login
  </Button>
  <TouchableOpacity onPress={()=>forgetPassward()}>
  <Text style={styles.forget}> Forget Password ?</Text>
  </TouchableOpacity>
      </View>
      <Text style={styles.or}>Or</Text>
      <Text style={styles.ir}>Sign in With</Text>
      <View style={{flexDirection:'row',alignSelf:"center",marginTop:20,}}>
      <AntDesign style={styles.ficon} name="facebook-square" size={29} color="blue" />
      <AntDesign style={styles.gicon} name="google" size={29} color="red" />
      </View>
      <View style={{justifyContent:'center',alignItems:'center'}}><View style={styles.line}/>
</View>
<View style={{flexDirection:'row' ,justifyContent:"center"}}>

<Text >Don't have an account?</Text>
<TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
<Text style={{color:"red",fontWeight:"900",fontSize:15}}>SignUp</Text>
</TouchableOpacity>
</View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:'100%',
    width:'100%',
    justifyContent:'center',
    
    
  },
  text:{
    fontSize:33,
    fontWeight:'600',
    textAlign:"center",
    color:'red',
    marginBottom:'10%'
  },
  btn:{
    width:'69%',
    backgroundColor:'red',
    elevation:26
  },
  forget:{
    color:'#786c69',
    fontSize:11,
    textAlign:'center',
    marginTop:10
    
  },
  or:{
    fontSize:13,
    fontWeight:'400',
    color:'red',
    textAlign:'center',
    marginTop:3
  },
  ir:{
    fontSize:23,
    fontWeight:'900',
    color:'#786c69',
    textAlign:'center',
    marginTop:8
  },
  ficon:{
    marginRight:9,
    elevation:10,
    borderWidth:0.5,
    borderColor:'transparent'

  },
  gicon:{
    elevation:10,
    borderWidth:0.5,
    borderColor:'transparent'
  },
  line:{
    width:'80%',
    borderBottomColor:'black',
    borderBottomWidth:1,
    marginVertical:20,
    // left:'10%'
    top:10,
    
},

  
})