
import React, { Component } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
// const { width } = Dimensions.get('window')

const styles = {
container: {
height:250,
width:"99%",

// width:'100%',
// width:400,
// backgroundColor:'black',
borderRadius:20,
// margintop:10
    // justifyContent: 'center',


},

wrapper: { },

slide: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    paddingHorizontal:10,
    paddingVertical:10,
    

},




image: {
    height:'100%',
    width:'100%',
    borderRadius:20,
    
     

}
}

export default class extends Component {
render() {
return (
  <View style={styles.container}>
    

    <Swiper
      style={styles.wrapper}
      autoplay={true} autoplayTimeout={3} 
      // height={350}
    //   width={29}
    
     dotStyle={{top:30}}
activeDotStyle={{top:30}}
    
    >
      <View
        style={styles.slide}
       
      >
        <Image
        
          style={styles.image}
          source={require('../../../assets/swiper.jpg')}
        />
      </View>
      <View
        style={styles.slide}
       
      >
        <Image
        
          style={styles.image}
          source={require('../../../assets/2.jpg')}
        />
      </View>
      <View
        style={styles.slide}
      >
        <Image
        
          style={styles.image}
          source={require('../../../assets/3.jpg')}
        />
      </View>
      <View
        style={styles.slide}
       
      >
        <Image
        
          style={styles.image}
          source={require('../../../assets/4.jpg')}
        />
      </View>
    </Swiper>
  </View>
)
}
}

