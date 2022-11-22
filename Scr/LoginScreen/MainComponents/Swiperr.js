import { StyleSheet, Text, View,Image, FlatList, TouchableOpacity, } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import React from 'react'

const Swiperr = ({Data,title,navigation}) => {

const ProductDetail=(item)=>{
   navigation.navigate('Detail',item)
}
  const Component=({item})=>{
    return(
           
<View style={styles.container}>
<TouchableOpacity key={item.index} onPress={()=>ProductDetail(item)}>
<Card style={styles.card}>
    <Card.Cover source={{ uri: item.foodImageUrl }}   style={styles.img}/>
    <Card.Content style={{flexDirection:'row', justifyContent:'space-between'}}>

      <Title style={{color:'black',fontSize:19, flexShrink:3,}}>{item.Foodname}</Title>
      <Paragraph style={{color:'red' ,fontSize:18,paddingTop:10,fontWeight:'bold'}}>  Rs: {item.Price}</Paragraph>
    </Card.Content>
    <Card.Actions style={{alignItems:'flex-end',width:'100%', }}>
      <Button mode='contained' color='red'  style={{width:'100%'}}>Buy</Button>
    </Card.Actions>
  </Card> 
  </TouchableOpacity>
</View>
    )
  }

 
  return (
   <View styles={{backgroundColor:'black'}}>
<View><Text style={styles.cardouthead}>
                {title}
            </Text></View>


    
    <FlatList  styles={{width:'100%'}}  nestedScrollEnable={true}
    horizontal
    showsHorizontalScrollIndicator={false}
    data={Data}
    renderItem={Component}

    />


</View>

  )
}

export default Swiperr

const styles = StyleSheet.create({
  container:{
        // width:'50%',
      //  height:'70%',

        // marginTop:10,
        // backgroundColor:'black',
        marginHorizontal:11,
        marginBottom:40

  },
  img:{
    height:200,
    width:'100%'

  },
  card:{
    backgroundColor:'white',
    height:310,
    width:200,
    
  },
  cardouthead: {
    color: '#6f785',
    width: '80%',
    fontSize: 30,
    fontWeight: '600',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical:10,
    fontStyle:'italic',
    letterSpacing:4,
    textDecorationLine:'underline '    

},
 
})