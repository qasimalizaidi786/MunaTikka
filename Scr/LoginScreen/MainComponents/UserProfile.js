import { StyleSheet, Text, View,ActivityIndicator,ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from './../Firebase/FirebaseConfig'
import { Button, TextInput } from 'react-native-paper'


const UserProfile = ({navigation}) => {
  const [Loggeduid, setLoggeduid] = useState(null)
  const [UserData, setUserData] = useState(null)
  const [Visible, setVisible] = useState(false)
  const [FullName, setName] = useState('')
  const [Phone, setPhone] = useState('')
  const [Address, setAddress] = useState('')
  const [loading, setloading] = useState(false)


  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <ActivityIndicator size="large" color="#0b0f7d" />
    </View>
)
// console.log(firebase.auth().currentUser.uid)
  const UpdateProfile = async () => {
setloading(true)
    const User = firebase.firestore().collection('UserData').where('uid', '==', firebase.auth().currentUser)
    const docx = await User.get()
    if (!docx.empty) {
      if (FullName !== '') {
        docx.forEach((doc) => {
          doc.ref.update({
            FullName: FullName
          })
        })
      }
      if (Address !== '') {
        docx.forEach((doc) => {
          doc.ref.update({
            Address: Address
          })
        })
      }
      if (Phone !== '') {
        docx.forEach((doc) => {
          doc.ref.update({
            Phone: Phone
          })
        })
      }
      // alert('your user data is updated')
      setloading(false)
      GetData();
      setVisible(false);
      ToastAndroid.show('Data Updated',ToastAndroid.LONG)

    }

    else {
      console.log('No USer Data')
    }


  }
  const GetData = async () => {
    const foodRef = firebase.firestore().collection('UserData').where('uid', '==', firebase.auth().currentUser.uid)
    const doc = await foodRef.get()
    doc.forEach((doc) => {
      setUserData(doc.data())

    })
  }

  // useEffect(() => {
  //   const check = () => {
  //     firebase.auth().onAuthStateChanged(((user) => {
  //       if (user) {
  //         setLoggeduid(user.uid)
  //       }
  //       else {
  //         setLoggeduid(null)

  //       }
  //     }))
  //   }
  //   check()


  // }, [])

  useEffect(() => {


    GetData()
  }, [])

 
  const Logout=()=>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      // alert('you are logged out');
      // navigation.navigate('Home');

      // GetData()
      navigation.navigate('Login');
      
  }).catch((error) => {
      // An error happened.
      alert(error,'Server Issue');
  });

  }

  // console.log(UserData)
  return (
    <View style={styles.container}>
      <Text style={styles.maintext}> Your Profile</Text>
      {/* <View style={styles.line}/> */}

      {Visible == false ?
        <View style={styles.innercontainer}>
          <Text style={{justifyContent:'flex-start',marginLeft:14,color:'#8c0837',fontSize:20}}>Name:   {UserData ? <Text style={{marginLeft:4,fontSize:19,color:'#cc6a0e'}}>{UserData.FullName}</Text>
            : 'Loading'

          }</Text>
          <Text style={{justifyContent:'flex-start',marginLeft:14,color:'#8c0837',
          fontSize:20}}>Email:    {UserData ? <Text style={{marginLeft:4,fontSize:14,color:'#cc6a0e'}}>{UserData.Email}</Text>
            : 'Loading'

          }</Text>
          <Text style={{justifyContent:'flex-start',marginLeft:14,color:'#8c0837',fontSize:20}}>Phone:    {UserData ? <Text style={{marginLeft:4,fontSize:19,color:'#cc6a0e'}}>{UserData.Phone}</Text>
            : 'Loading'

          }</Text>
          <Text style={{justifyContent:'flex-start',marginLeft:10,color:'#8c0837',fontSize:20}}>Address:   {UserData ? <Text style={{fontSize:12,color:'#cc6a0e'}}>{UserData.Address}</Text>
            : 'Loading'

          }</Text>
            
        </View>
        
      
        : <View style={styles.container}>
          <View style={{ justifyContent: 'center', marginHorizontal: 10, marginVertical: 10 }}>
            <TextInput style={styles.textinput}
              defaultValue={UserData?UserData.Address:''}
              onChangeText={(e) => setAddress(e)}
              mode='outlined'
              label="Enter a Address"

            />
            <TextInput style={styles.textinput}
              defaultValue={UserData?UserData.Phone:''}
              onChangeText={(e) => setPhone(e)}
              mode='outlined'
              label="Enter a Phone-Number"
              keyboardType='number-pad'

            />
            <TextInput style={styles.textinput}
              // value={FullName}
              defaultValue={UserData?UserData.FullName:''}
              onChangeText={(e) => setName(e)}
              mode='outlined'
              label="Enter a Name"
            // editable={true}

            />
            <Button mode='contained' onPress={() => UpdateProfile()}>Submit</Button>

          </View>
        </View>
      }

      <View style={{ marginTop: 10, width: '60%', }}>
        <Button style={{ marginVertical: 10 }} color='grey' mode='contained' onPress={() => setVisible(!Visible)}>Edit Profile</Button>
        <Button style={{ marginVertical: 10 }} color='red' mode='contained' onPress={()=>Logout()}>LogOut</Button>
      </View>

    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // height:'100%'
  },
  maintext: {
    fontSize: 29,
    color: 'red',
    fontWeight: '900',
    marginTop: 22

  }
  ,
  innercontainer: {
    justifyContent: 'space-around',
    marginTop: 44,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'black',
    height: 200,
    width: '90%',
    // backgroundColor:'red'
  },
  inText: {
    // fontSize:22
    color: 'red',
    fontSize: 22



  },
  innerText: {
    fontSize: 21,
    // paddingHorizontal:22,
    textAlign: 'center',
    marginHorizontal: 32

  },
  line: {
    width: '80%',
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    marginVertical: 20,
    // left:'10%'
    top: 10
  },
  textinput: {
    width: 200,
    height: 40,
    borderRadius: 10,
    marginVertical: 10
  }
})