import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Headerr = ({navigation}) => {



    return (
        <View style={styles.container}>
            <View style={styles.mainC}>
                <Feather onPress={()=>navigation.navigate('Information')} name="align-justify" size={24} color="red"  />
                <View style={styles.middle}>
                    <Text style={styles.text}>MUNA Tikka</Text>
                    <MaterialIcons name="fastfood" size={24} color="red" />
                    </View>

                <Feather name="user" size={24} color="red" onPress={()=> navigation.navigate('UserProfile')} />

            </View>

        </View>
    )
}

export default Headerr

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        backgroundColor: "white",
        // justifyContent:'space-between',
        // flexDirection:'row'
        borderBottomWidth: 3,
        borderBottomColor: 'white',
        elevation: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    mainC: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10


    },
    middle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1.7,
        borderColor: 'red',
        margin: 2,

    },
    text: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'red',
        paddingRight: 2,
    }
})