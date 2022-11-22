import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Information = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.headertext}>Muna Tikka</Text> */}
      <View style={{backgroundColor:'#dce6e1'}}>
      <Text style={{fontSize:39,fontWeight:'800',color:'#295e44',marginVertical:2,marginHorizontal:8}}>About:</Text>
      <Text  style={{fontSize:20,fontWeight:'500',color:'#5c45c4',paddingVertical:4,paddingHorizontal:8}}>Muna Tikka is BBQ restaurant in Rawalpindi.Muna Tikka offers menus for Lunch and Dinner. The restaurant has a Latin atmosphere 
        with Pakistan ornaments and music. Within a couple of years of its opening,
         Muna Tikka has been recognised for its quality of food and excellent service.It is located in RwP cannt .</Text>
      </View>
      <View style={{backgroundColor:'#dce6e1',flexDirection:'column'}}>
      <Text style={{fontSize:39,fontWeight:'800',color:'#295e44',marginVertical:2,marginHorizontal:8}}>Contact:</Text>
      <Text  style={{fontSize:25,fontWeight:'800',color:'#7a2237',paddingVertical:4,paddingHorizontal:8,letterSpacing:3}}>
        0320-9111535</Text>
        <Text  style={{fontSize:25,fontWeight:'800',color:'#7a2237',paddingVertical:4,paddingHorizontal:8,letterSpacing:3}}>
        0310-9411535</Text>
        <Text  style={{fontSize:25,fontWeight:'800',color:'#7a2237',paddingVertical:4,paddingHorizontal:8,letterSpacing:3}}>
        0300-9911595</Text>
      </View>
      <View style={{backgroundColor:'#dce6e1',flexDirection:'column'}}>
      <Text style={{fontSize:39,fontWeight:'800',color:'#295e44',marginVertical:2,marginHorizontal:8}}>Address:</Text>
      <Text  style={{fontSize:25,fontWeight:'800',color:'#7a2237',paddingVertical:4,paddingHorizontal:8,letterSpacing:3}}>
        Lalazar Tulsa Road Main Tulsa Chowk Opposite PSO Pump Rawalpindi Pakistan</Text>
        
       
      </View>
    </View>
  )
}

export default Information

const styles = StyleSheet.create({
container:{
    flex:1,
},
headertext:{
    fontSize:34,
    fontWeight:'bold',
    color:'#04517a',
}
})