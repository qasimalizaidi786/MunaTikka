import { StyleSheet, Text, View, Image, ScrollView, ToastAndroid } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper';
import { add } from '../Redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';



const Detail = ({ navigation, route }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const items = useSelector((state) => state.cart)

    const data = route.params
    const dispatch = useDispatch()

    const handleAdd = (data) => {
        dispatch(add(data))
        ToastAndroid.show('Add to Cart  SucessFully', ToastAndroid.SHORT)
        setIsDisabled(true);
    }



    return (
        <ScrollView style={styles.container} >


            <AntDesign name="back" size={26} color="white" style={styles.btn} onPress={() => navigation.navigate('Home')} />
            <Ionicons name="cart" size={32} color="red" style={styles.cart} onPress={() => navigation.navigate('Cart')} />
            <Text style={[styles.length, { backgroundColor: items.length == 0 ? '' : 'red' }]}>{items.length == 0 ? '' : items.length}</Text>
            <View style={styles.s1}>
                <Image style={styles.img} source={{ uri: data.foodImageUrl }} />
            </View>
            {/* <View style={{borderTopLeftRadius:50,borderTopRightRadius:50,}}> */}
            <View style={styles.s2}>
                <Text style={styles.fname}>{data.Foodname}</Text>
                <Text style={styles.pname}> ₨-{data.Price}/-</Text>

            </View>
            <View style={styles.s3}>
                <Text style={styles.heading}> About Food</Text>
                <Text style={styles.description}>{data.Description}</Text>
            </View>
            {/* <View style={styles.line1} />
            {/* {data.qty==0?null:( */}
            {/* <View style={styles.cart}>
                <Button mode='contained' color='#635757' onPress={() => {
                    dispatch(add(data))

                    dispatch(increaseQty(data.id))
                }}
                >+</Button>
                <Text style={styles.innercart}>{data.qty}</Text>
                <Button mode='contained' color='#635757' onPress={() => sub()}>-</Button>
            </View>  */}



            <View style={styles.line} />
            <View style={styles.TotalPrice}>
                <Text style={styles.TotalPriceInner}>Total Price</Text>
                <Text style={styles.TotalPriceInner1}>Rs- {((parseInt(data.Price))).toString()} </Text>
            </View>
            <View style={styles.line} />

            <View style={styles.s4}>
                <Button disabled={isDisabled} mode='contained' color='red' onPress={() => handleAdd(data)}>Add To Cart</Button>
                {/* <Button mode='contained' disabled={data.qty==0?false:true}
                 color='red' onPress={()=>navigation.navigate('PlaceOrder')}>Buy Now</Button> */}


            </View>
            {/* </View> */}
        </ScrollView>

    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // height:'100%',
        width: '100%',
        flex: 1,


    },
    btn: {
        backgroundColor: 'red',
        height: 32,
        width: 44,
        // paddingRight:12
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 5,
        position: 'absolute',
        zIndex: 1
    },
    s1: {
        height: 340,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // borderBottomRightRadius:50


    },
    img: {
        height: '100%',
        width: '100%'
    },
    s2: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 15,
        marginHorizontal: 3,


    },
    fname: {
        fontSize: 32,
        color: '#8f6701',
        fontWeight: '900',
        flexShrink: 3
    },
    pname: {
        color: '#73706e',
        fontSize: 32,
        fontWeight: '800'
    },
    s3: {
        // height:200,
        width: 300,
        backgroundColor: '#caedfc',
        borderRadius: 15,
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 30,
        border: 1,
        elevation: 1,



    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#07593d',
        paddingTop: 10,
        paddingBottom: 10
    },
    description: {
        fontSize: 18,
        fontWeight: '100',
        color: '#751734',
        marginHorizontal: 3,
        marginVertical: 3

    },
    s4: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 20
    },
    cart: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    innercart: {
        fontSize: 26,
        fontWeight: '500',
        color: '#291414'

    },
    TotalPrice: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row'
    },
    TotalPriceInner: {
        fontSize: 27,
        fontWeight: '400',
        color: 'red',

    },
    TotalPriceInner1: {
        fontSize: 27,
        fontWeight: '900',
        color: '#13ba42',
    },
    line: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        marginVertical: 10,
        left: '10%'
        // top: 10,

    },
    line1: {
        width: '80%',
        borderBottomColor: 'red',
        borderBottomWidth: 0.3,
        marginVertical: 10,
        left: '10%'
        // top: 10,

    },
    cart: {
        // backgroundColor: 'red',
        height: 32,
        width: 34,
        // paddingRight:12,
        borderRadius: 30,
        marginVertical: 18,
        marginHorizontal: 13,
        left: 300,
        position: 'absolute',
        zIndex: 1,

    },
    length: {
        position: 'absolute',
        zIndex: 1,
        left: 316,
        marginVertical: 2,
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        top: 1,
        // backgroundColor:` ${items.length  ==0}`?'white':'black',
        borderRadius: 30,
        // height: 32,
        width: 20,
        textAlign: 'center'
    },
    container1: {
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