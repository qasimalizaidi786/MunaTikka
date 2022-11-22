import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../Firebase/FirebaseConfig'
import { Button } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons';
const Profile = () => {
  const [Data, setData] = useState([])

  const DeleteOrder=(item)=>{
    const Del=firebase.firestore().collection('NewOrder').doc(item.OrderID)
    Del.update({
      OrderStatus:'Cancelled'
    })
    getorders()
    
  }

  const getorders = async () => {
    const ordersRef = firebase.firestore().collection('NewOrder').where('uid', '==', firebase.auth().currentUser.uid);
    ordersRef.onSnapshot(snapshot => {
      setData(snapshot.docs.map(doc => doc.data()))

      
    })
  }
  const convertDate = (date) => {
    // console.log(date.seconds)
    const newdate = new Date(date.seconds * 1000)
    // console.log(newdate)
    return newdate.toDateString()
  }
  useEffect(() => {
    getorders()
  }, [])
  // console.log(Data)
  return (
    <View style={{flex:1}} >
      <View style={styles.header} >
      <Text  style={styles.header1}>Track Order</Text>
      <FontAwesome  onPress={()=>getorders()} name="refresh" size={24} color="black"  style={styles.refersh}/>
      </View>
      <FlatList data={Data.reverse()
      // .sort(
      //                   (a, b) => b.orderdate.seconds - a.orderdate.seconds)
                      }
        renderItem={({ item, index }) => {
          return (
            <View  style={{ flexDirection: 'column', marginVertical: 10, backgroundColor: 'white', marginHorizontal: 10, borderRadius: 0.5, elevation: 30 }}>
              <View style={{ marginHorizontal: 150, backgroundColor: '#802949', borderRadius: 30, width: 20 }}>
                <Text style={{ textAlign: "left", textAlign: 'center', fontSize: 19, fontWeight: 'bold', color: 'white' }}>
                  {index + 1}
                </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{ fontSize: 15, color: '#17364a', fontWeight: 'bold',marginLeft:40,marginRight:60 }}>Order ID</Text>
                <Text style={{ color: '#8a0e03', fontSize: 15, fontWeight: 'bold',marginLeft:50 }} >{item.OrderID}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{ fontSize: 15, color: '#17364a', fontWeight: 'bold',marginLeft:40,marginRight:30 }}>Order Date</Text>
                <Text style={{ color: '#8a0e03', fontSize: 15, fontWeight: 'bold' ,marginLeft:60}}> { item.orderdate?new Date(item.orderdate.seconds * 1000).toDateString():''}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{ fontSize: 15, color: '#17364a', fontWeight: 'bold',marginLeft:40,marginRight:30 }}>Order Time</Text>
                <Text style={{ color: '#8a0e03', fontSize: 15, fontWeight: 'bold',marginLeft:60 }}> { item.orderdate?new Date(item.orderdate.seconds * 1000).toLocaleTimeString():''}</Text>
              </View>
              <View>
                {item.OrderStatus == 'Delivered' && <Text style={styles.orderText}>Your order is Delivered </Text>}
                {item.OrderStatus == 'Pending' && <Text style={styles.orderText1}>Your order is Preparing</Text>}
                {item.OrderStatus == 'On the Way' && <Text style={styles.orderText2}>Your order is on the way </Text>}
                {item.OrderStatus == 'Cancelled' && <Text style={styles.orderText3}>Soory for the Convenience Your Order is Cancelled </Text>}
              </View>

              <View style={{flexDirection:'row'}}>
                <Text style={{ fontSize: 15, color: '#17364a', fontWeight: 'bold',marginLeft:40 }}>Dilevery Boy Name </Text>
                {item.Boy == null ? <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#bf2802',marginLeft:40 }}>Not Assign</Text> :

                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#bf2802',marginLeft:50 }}>{item.Boy}</Text>
                }
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{ fontSize: 15, color: '#17364a', fontWeight: 'bold',marginLeft:40 }}>Dilevery Boy Contact </Text>
                {item.Phone == null ? <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#bf2802',marginLeft:40 }}>Not Assign</Text> :

                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#bf2802',maxWidth:120,marginLeft:40 }}>{item.Phone}</Text>
                }
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#1ebd98'}}>
                <Text style={{maxWidth:30,fontSize:15,fontWeight:'700',color:'#960670'}}>Qty</Text>
                <Text style={{maxWidth:73,fontSize:15,fontWeight:'700',color:'#960670'}}>FoodName</Text>
                <Text style={{maxWidth:45,fontSize:15,fontWeight:'700',color:'#960670'}}>Price</Text>
              </View>
              {/* <View style={{ 
        width: '100%',
        borderBottomColor: '#e094cc',
        borderBottomWidth: 0.3,
        // marginVertical: 10,
        // left: '10%'
        // top: 10,

    }}/> */}
              {item.FullOrder.map((order) => (
                <View key={index} style={{ backgroundColor: '#e6f7f4' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                    <Text style={styles.map}>{order.qty}</Text>
                    <Text style={styles.map1}>{order.Foodname}</Text>
                    <Text style={styles.map2}>{order.qty * order.Price}</Text>
                  </View>

                </View>

              ))}
              <View style={{ justifyContent: 'space-around', flexDirection: 'row', height: 30, alignItems: 'center', backgroundColor: '#323321' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Total Cost</Text>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#90f597' }}>Rs./{item.TotalOrderPrice}</Text>
              </View>
              {item.OrderStatus == 'Pending' ? <Button mode='contained' style={{ backgroundColor: 'red', color: 'white', marginVertical: 10 }} onPress={() => DeleteOrder(item)}>Cancel Order</Button> : null}

            </View>
          )
        }}

      />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    flexDirection:'row',
   justifyContent:'space-between',
    // marginVertical:10,
    backgroundColor: 'white',
    width: '100%',
    height: 60,
    alignItems: 'center',
    paddingTop: 12,
    
  },
  header1:{
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
    textAlign:'center',
    marginHorizontal:15
  },
  refersh:{
    marginHorizontal:15
  },
  innerFlat: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',


  },
  orderText: {
    backgroundColor: '#0b800f',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 10
  },
  orderText1: {
    backgroundColor: '#063a6b',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 10
  },
  orderText2: {
    backgroundColor: '#bab81e',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 10
  },
  orderText3: {
    backgroundColor: '#ba2d1e',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 10
  },
  map: {
    color: '#085c48',
    fontWeight: 'bold',
    fontSize: 18
  },
  map1: {
    color: '#085c48',
    fontWeight: 'bold',
    fontSize: 18,
    maxWidth:100
  },
  map2: {
    color: '#085c48',
    fontWeight: 'bold',
    fontSize: 18
  }
})