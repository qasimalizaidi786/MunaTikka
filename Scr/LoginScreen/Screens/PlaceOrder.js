import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../Firebase/FirebaseConfig'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, decrease } from '../Redux/cartSlice';




const PlaceOrder = ({ navigation, route }) => {
    const [TotalPrice, setTotalPrice] = useState('0')
    const [UserData, setUserData] = useState(null)
    const dispatch = useDispatch()

    const FinalProduct = useSelector(state => state.cart)

    // const { CartData } = route.params

    // useEffect(() => {

    //     setOrderData(JSON.parse(CartData))

    // }, [])


    useEffect(() => {
        if (FinalProduct != null) {

            let foodPrice = 0;
            FinalProduct.map((item) => {
                foodPrice = parseInt(item.Price) * parseInt(item.qty) + foodPrice
            })
            setTotalPrice(JSON.stringify(foodPrice))

        }

    }, [FinalProduct])
    useEffect(() => {
        const GetData = async () => {


            const foodRef = firebase.firestore().collection('UserData').where('uid', '==', firebase.auth().currentUser.uid)
            const doc = await foodRef.get()
            doc.forEach((doc) => {
                setUserData(doc.data())

            })
        }

        GetData()
    }, [])
    const AddData = (item) => {

        const UserDataRef = firebase.firestore().collection('NewOrder').doc(new Date().getTime().toString());
        UserDataRef.set({
            OrderID: UserDataRef.id,
            OrderStatus: 'Pending',
            Boy: 'Not Assign',
            TotalOrderPrice: TotalPrice,
            orderdate: firebase.firestore.FieldValue.serverTimestamp(),
            orderaddress: UserData.Address,
            orderphone: UserData.Phone,
            ordername: UserData.FullName,
            FullOrder: FinalProduct,
            uid: firebase.auth().currentUser.uid,
            BoyPhone: 'Not Assign'

        })

        navigation.navigate("Home")
        Alert.alert('Thank You for Order')
        dispatch(clearCart())
    }



    // console.log(UserData)
    return (
        <ScrollView style={styles.container}>

            {/* <Text style={styles.HeaderText}>Your Order Summery</Text> */}
            <FlatList data={FinalProduct}
                // extraData={OrderData.Cart}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between', width: '98%', borderColor: 'black',
                                borderRadius: 15,
                                height: 50,
                                elevation: 20,
                                alignItems: 'center', backgroundColor: 'white', marginVertical: 10, marginHorizontal: 3
                            }}>
                                <View style={styles.card}>
                                    <Text style={styles.no}>{item.qty}</Text>
                                    <Text style={styles.name}>{item.Foodname}</Text>
                                    <Text style={styles.price}>{item.Price}</Text>
                                </View>

                                {/* <View >   */}
                                <Text style={styles.total}>Rs.{parseInt(item.qty) * parseInt(item.Price)}</Text>
                                {/* </View>    */}
                            </View>

                        </View>

                    )
                }}
            />
            <View style={styles.line} />
            <View style={styles.totalprice}>
                <Text style={styles.innertotal}>Order Total :</Text>
                <Text style={styles.innertotal1}>Rs.{TotalPrice}</Text>

            </View>
            <View style={styles.line} />
            <View style={styles.detail}>
                <Text style={styles.innerdetail}>Your Details</Text>
                <View style={styles.detailText}>
                    <Text style={styles.innerText}>Name:  {UserData ? <Text style={styles.inText}>{UserData.FullName}</Text>
                        : 'Loading'

                    }</Text>
                    <Text style={styles.innerText}>Email:  {UserData ? <Text style={styles.inText}>{UserData.Email}</Text>
                        : 'Loading'

                    }</Text>
                    <Text style={styles.innerText}>Phone:  {UserData ? <Text style={styles.inText}>{UserData.Phone}</Text>
                        : 'Loading'

                    }</Text>
                    <Text style={styles.innerText}>Address: {UserData ? <Text style={styles.inText}>{UserData.Address}</Text>
                        : 'Loading'

                    }</Text>

                </View>
            </View>
            <Button disabled={FinalProduct == null ? true : false}
                style={styles.btn} color='red' mode='contained' onPress={() => AddData()}>CheckOut</Button>

        </ScrollView>
    )
}

export default PlaceOrder

const styles = StyleSheet.create({
    HeaderText: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '400',
        color: 'red'
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        // width:'98%',
        // marginHorizontal:1,
        // marginVertical:10,
        color: 'white',
        // justifyContent:'space-around',
        // borderColor:'black',
        // borderRadius:15,
        // height:50,
        // elevation:20,
        // alignItems:'center',
        marginHorizontal: 10
    },
    no: {
        backgroundColor: 'red',
        fontSize: 22,
        width: 26,
        borderRadius: 10,
        textAlign: 'center',
        marginHorizontal: 6,
        color: 'white'
    },
    name: {
        fontSize: 18,
        color: 'black',
        fontWeight: '900',
        flexShrink: 3,
        marginHorizontal: 6

    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        color: 'red',
        marginHorizontal: 6

    },
    total: {
        fontSize: 22,
        fontWeight: '800',
        marginRight: 5
    },
    line: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        marginVertical: 10,
        left: '10%'
        // top: 10,

    },
    totalprice: {
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly'
    },
    innertotal: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'red'

    },
    innertotal1: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'

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
    detail: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    innerdetail: {
        fontSize: 27,
        marginVertical: 3


    },
    detailText: {
        alignItems: 'flex-start',
        marginVertical: 20,
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 5,
        elevation: 20,

    },
    btn: {
        width: '70%',
        marginLeft: 50,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 20
    }


})