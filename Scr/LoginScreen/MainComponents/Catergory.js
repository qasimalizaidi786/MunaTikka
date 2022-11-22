import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Catergory = ({ navigation }) => {
   return (
      <View style={styles.container}>
         <Text style={styles.text}>Catergory</Text>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
            flexDirection: 'row', margin: 15, width: '90%', backgroundColor: "white"
            , borderRadius: 3, elevation: 22
         }}>
            <TouchableOpacity onPress={() => navigation.navigate('Dinner')}>
               <View style={styles.catoo}>
                  <Text style={styles.innertext}> Dinner</Text>
                  <MaterialCommunityIcons name="food-hot-dog" size={28} color="red" />
               </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Special')}>

               <View style={styles.catoo}>
                  <Text style={styles.innertext}> Special</Text>
                  <MaterialCommunityIcons name="food-drumstick-outline" size={24} color="red" />
               </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('LateNight')}>

            <View style={styles.catoo}>
               <Text style={styles.innertext}>Hot Deals</Text>
               <Ionicons name="pizza" size={28} color="red" />
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('LateNight')}>

            <View style={styles.catoo}>
               <Text style={styles.innertext}>LateNight</Text>
               <MaterialCommunityIcons name="food-drumstick" size={28} color="red" />
            </View>
            </TouchableOpacity>
            {/* <View style={styles.catoo}>
               <Text style={styles.innertext}> Beef Kabab</Text>
               <Ionicons name="pizza" size={28} color="red" />
            </View>
            <View style={styles.catoo}>
               <Text style={styles.innertext}> Chicken Karahi</Text>
               <MaterialCommunityIcons name="food-turkey" size={28} color="red" />
            </View> */}
            {/* <View style={styles.catoo}>
               <Text style={styles.innertext}> Malai Tikka</Text>
               <Ionicons name="pizza" size={28} color="red" />
            </View>
            <View style={styles.catoo}>
               <Text style={styles.innertext}> Green Tikka </Text>
               <Ionicons name="pizza" size={28} color="red" />
            </View> */}
         </ScrollView>
      </View>
   )
}

export default Catergory

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      //   marginBottom:10,




   },
   text: {
      fontSize: 27,
      fontWeight: 'bold',
      color: 'red',
      borderBottomColor: 'red',
      borderBottomWidth: 3,
   },
   catoo: {
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius: 10,
      border: 12,
      marginHorizontal: 5,
      borderColor: '#f7f6e6',
      borderWidth: 1,
      elevation: 20,
      alignItems: "center",
      justifyContent: "center"

   },
   innertext: {
      fontSize: 18,
      fontWeight: '700',
      color: '#5c5c5a'


   }

})