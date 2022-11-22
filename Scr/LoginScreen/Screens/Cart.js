import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator, Alert, ToastAndroid, RefreshControl, refreshing, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { firebase } from '../Firebase/FirebaseConfig'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { remove ,add,decrease, clearCart} from '../Redux/cartSlice';

const Cart = ({ navigation }) => {
  const [loading, setLoading] = useState(false); // Set loading to true on component mount
  const [TotalPrice, setTotalPrice] = useState('0')

  const products = useSelector(state => state.cart)
  const dispatch = useDispatch()
 

  const handleAdd=(item)=>{
    dispatch(add( item))

        // ToastAndroid.show('Add to Cart update SucessFully'  ,ToastAndroid.SHORT)
    
    
    // console.log(Number)
    }

const deleteQuantity=(item)=>{
  if(item.qty==1){
    // dispatch(remove(item.id))

  }
  else{
  dispatch(decrease( item))
  // ToastAndroid.show('Add to Cart update SucessFully'  ,ToastAndroid.SHORT)
  }
}


  const SendData = () => {
    navigation.navigate('PlaceOrder')
   
  }
 
  useEffect(() => {
    if (products != null) {

      // console.log(Price    )
      let foodPrice = 0;
      products.map((item) => {
        foodPrice = item.Price * item.qty + foodPrice
      })
      setTotalPrice(foodPrice)
      // console.log(foodPrice)

    }

  }, [products])



  const showConfirmDialog = (item) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this item from cart ?",
      [
        // The "Yes" button
        {

          text: "Yes",



          onPress: () => {

            dispatch(remove(item.id))

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

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <ActivityIndicator size="large" color="#0b0f7d" />
    </View>
  )

  // console.log(CartData)


  return (
    <View style={{ flex: 1 }}>

      {/* <Text style={styles.Cart}>Your Cart</Text> */}
      {/* <TouchableOpacity onPress={()=>ClearData()}><Text>Clear Cart</Text></TouchableOpacity> */}

      {products == null || products.length == 0 ?
        <Text style={styles.innerNoData}>No Cart Item</Text>
        // <Button > Press To Button Check Your Cart</Button>
        
        :
      <FlatList data={products}
        renderItem={({ item }) => {
          return (

            <View style={styles.container}>

              <Image source={{ uri: item.foodImageUrl }} style={styles.img} />

              <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
                <View style={styles.innerContainers}>
                  <Text style={styles.Numbers}>QTy  </Text>
                  <Text style={styles.names}>Name  </Text>
                  <Text style={styles.Prices}> Price/Total Price  </Text>



                </View>
                <View style={styles.innerContainer}>
                  <Text style={styles.Number}>{item.qty}  </Text>
                  <Text style={styles.name}>{item.Foodname}  </Text>

                  <Text style={styles.Price}> Rs.{item.Price*item.qty}  </Text>



                </View>
                <View style={styles.add}>
                 
                   <View style={{flexDirection:'row', }}>
              <Button    mode="outlined"
          labelStyle={{fontSize: 15}} color='green' onPress={()=>handleAdd(item)} >+</Button>
              <Text style={{fontSize:24,fontWeight:'900',paddingHorizontal:10,color:'green'}}>{item.qty}</Text>
              <Button  mode="outlined"
          labelStyle={{fontSize: 15}} color='green'  onPress={()=>deleteQuantity(item)}>-</Button>
            </View>
            <View>
                <MaterialCommunityIcons
                  onPress={() => showConfirmDialog(item)} name="delete" size={32} color="red" style={styles.icon} />
                  </View>
                  </View>
              </View>

            </View>


          )
        }}

        onRefresh={() => {

          // GetData()

        }}
        refreshing={loading}

      />
      }


      <View style={styles.bottom}>
        <Text style={styles.innerbottomtext}>Total Rs. </Text>
        <Text style={styles.innerbottomtext1}>{TotalPrice}/-</Text>
        <Button disabled={TotalPrice == 0 ? true : false}
          color='red' mode='contained' onPress={() => { SendData() }


          }>Place Order</Button>
      </View>

    </View>




  )
}

export default Cart

const styles = StyleSheet.create({
  Cart: {
    textAlign: 'center',
    marginTop: 10,
    // marginBottom: 10,
    marginVertical: 10,
    color: 'red',
    fontSize: 32,
    fontWeight: 'bold',
  },
  container: {
    width: '96%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //  alignItems:'flex-start',
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 5,
    elevation: 20,



  },
  innerContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    // alignItems:'center',
    // marginBottom:20


  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 25
  },
  name: {
    color: 'red',
    fontSize: 17,
    fontWeight: '800',
    flexBasis: 100,
    marginLeft: 1
  },
  Price: {
    fontSize: 17,
    color: 'black',
    flexShrink: 3,
    fontWeight: '600'
  },
  Number: {
    fontSize: 22,
    fontWeight: '600',
    color: 'red',
    paddingLeft: 3

    //  right:60
  },
  innerContainers: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  names: {
    color: '#95997c',
    fontSize: 18
  },
  Prices: {
    color: '#95997c',
    fontSize: 12

  },
  Numbers: {
    color: '#95997c',
    fontSize: 18

  },
  // icon: {
  //   left: 150,
  //   zIndex: 1
  // },
  bottom: {
    marginHorizontal: 14,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 1,
    // backgroundColor: 'white',
    width: '100%',


  },
  innerbottomtext: {
    fontSize: 22,
    fontWeight: '700',
    color: 'red'
  },
  innerbottomtext1: {
    fontSize: 24,
    color: 'black',
    fontWeight: '900'
  },
  innerNoData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: '#6e8072'
  },
  add:{
         justifyContent:'space-between',
         flexDirection:'row',
  }

})