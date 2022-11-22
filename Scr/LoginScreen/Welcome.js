import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import { firebase } from '../LoginScreen/Firebase/FirebaseConfig'


const Welcome = ({ navigation }) => {
    // const [UserLogged, setUserLogged] = useState(null)

    // useEffect(() => {
    //     const check = () => {
    //         firebase.auth().onAuthStateChanged(((user) => {
    //             if (user) {
    //                 setUserLogged(user)
    //             }
    //             else {
    //                 setUserLogged(null)
    //             }
    //         }))
    //     }
    //     check()


    // }, [])
    // const UserLogout = () => {
    //     firebase.auth().signOut()
    //         .then(() => {
    //             setUserLogged(null)
    //             // navigation.navigate('Welcome')
    //             console.log('signOut')
    //         })
    // }


    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text style={styles.text1}>
                    Welcome To
                </Text>
                <Text style={styles.text2}>
                    Muna Tikka
                </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image source={require("../../assets/d.png")} style={styles.image} />
                {/* <View style={{alignItems:'center',justifyContent:'center'}}> */}
                <View style={styles.line} />
                <Text style={styles.textSlogan}>
                    The best BBQ in town – hands down!
                </Text>
                <Text style={styles.textSlogan}>No need to wait – we serve food fast so you can get back to your day </Text>
                <View style={styles.line} />
                {/* // </View> */}
            </View>


            {/* {UserLogged == null ?  */}
            
            <View style={{ flexDirection: "row", justifyContent: 'space-evenly', }}>
                <TouchableOpacity style={styles.btnText} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.btn}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnText} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.btn}>SignUp</Text>
                </TouchableOpacity>
            </View>
             {/* : */}

                {/* <View style={styles.logout1}>
                    <Text style={styles.logtext}>{UserLogged.email}</Text>
                    <View style={styles.logout}>
                        <Button style={styles.lbtn} onPress={() => navigation.navigate('Home')} mode='contained' color='white'> Go To Home</Button>
                        <Button onPress={() => UserLogout()} mode='contained' color='white'> LogOut</Button>
                    </View>
                </View>
            } */}
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#e84e27',
        justifyContent: 'center',

    },
    text: {
        alignItems: 'center',
        top: 23,
    },
    image: {
        color: 'white',
        height: '50%',
        width: '70%',
        top: 20,

        // backgroundColor:'black'
        // left:30
    },
    text1: {
        fontSize: 53,
        fontWeight: '700',
        color: 'white',


    }
    , text2: {
        fontSize: 33,
        fontWeight: '700',
        color: 'white',
        top: 2

    },
    btn: {
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: 'white',
        height: 50,
        width: 167,
        textAlign: 'center',
        paddingTop: 10,
        color: '#e84e27',
        fontWeight: '600',
        fontSize: 22,

        elevation: 10,


    },
    btnText: {
        // alignItems:'center',
        // justifyContent:'center',
        // alignItems:'center',
        // elevation:10,
    },
    line: {
        width: '80%',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginVertical: 20,
        // left:'10%'
        top: 10
    },
    textSlogan: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textAlign: "center"
    },
    logout: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        color: 'white',
        // borderColor:'white',
        // borderWidth:2,
        elevation: 20
    },
    lbtn: {
        fontWeight: 'bold'
    },
    logtext: {
        textAlign: 'center',
        color: 'white',
        paddingBottom: 20,
        textDecorationStyle: 'underline',
        fontWeight: '700',
        fontSize: 19


    }

})