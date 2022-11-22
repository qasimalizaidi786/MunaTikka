import { FlatList, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { firebase } from '../../Firebase/FirebaseConfig'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button } from 'react-native-paper'

const LateNight = ({navigation}) => {
  const [FoodData, setFoodData] = useState([])
  const [BBQ, setBBQ] = useState([])

  const foodRef = firebase.firestore().collection('FoodData')
  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()))
    })
  }, [])
  useEffect(() => {
    setBBQ(FoodData.filter((item) => item.Dinner == 'Dinner'))

  }, [FoodData])
  // console.log(BBQ)
  return (
    <View style={{backgroundColor:'#dfeff5',flex:1}}>
      {/* <Text style={styles.top}>DinnerSpecial</Text> */}
      <FlatList data={BBQ}
        renderItem={({ item }) => {
          return (
            <View style={{backgroundColor:'#e7ebe1' ,borderColor:'#dfeff5',elevation:1,marginVertical:10,marginHorizontal:10 }}>
              <TouchableOpacity onPress={()=>{navigation.navigate('Detail',item)}}>
              {/* <Text style={styles.top}>Dinner</Text> */}
              <View style={styles.Container}>
                <Image source={{ uri: item.foodImageUrl }} style={styles.img} />
                <Text style={styles.foodname}>{item.Foodname}</Text>

                <View style={{flexDirection:'column',marginTop:40,alignItems:'center',justifyContent:'space-around'}}>
                <Text style={styles.Price}>Rs/.{item.Price}</Text>
                <Button color='#912121' mode='contained' style={styles.btn}>Buy Now</Button>
                </View>
              </View>
              </TouchableOpacity>
            </View>
          )
        }}

      />
    </View>
  )
}

export default LateNight

const styles = StyleSheet.create({
  Container:{
      flexDirection:'row',
      // justifyContent:'space-around'
      
  },
  top:{
    color:'#968989',
    justifyContent:'flex-start',
    fontSize:29,fontWeight:'700',
    marginBottom:10
  },
  img:{
    height:110,
    width:150,
    borderRadius:5,
    marginVertical:10,
    marginHorizontal:5,
    // position:'relative',
    
  },
  foodname:{
    fontSize:22,
    textAlign:'center',
    color:'#731005',
    fontWeight:'bold',
    // backgroundColor:'black',
    maxHeight:30,
    position:'absolute',
    marginLeft:160
    
  },
  Price:{
    fontSize:24,
    // backgroundColor:'red',
    zIndex:1,
    marginRight:40,
    color:'#1f6e28',
    fontWeight:'bold'
  },
  btn:{
    width:100,
    color:'red'
    
  }
})