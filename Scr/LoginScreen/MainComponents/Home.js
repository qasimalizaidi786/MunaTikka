import {
  StatusBar, StyleSheet, Text, View, Image, ScrollView, FlatList,
  TouchableOpacity, ActivityIndicator
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Swiperr from './Swiperr'
import { Searchbar,  } from 'react-native-paper';
import Catergory from './Catergory';
import Headerr from './Headerr';
import Test from './Test'
import { firebase } from './../Firebase/FirebaseConfig'
import { AntDesign } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [BBQ, setBBQ] = useState([])
  const [Karahi, setKarahi] = useState([])
  const [Chicken, setChicken] = useState([])
  const [Beef, setBeef] = useState([])
  const [FoodData, setFoodData] = useState([])
  const [loading, setloading] = useState(false)
  
  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <ActivityIndicator size="large" color="#0b0f7d" />
    </View>
  )
  const foodRef = firebase.firestore().collection('FoodData');


  useEffect(() => {
    setloading(true)
    foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()))
    })
    setloading(false)
  }, [])

  useEffect(() => {
    setloading(true)
    setBBQ(FoodData.filter((item) => item.foodCategory == 'BBQ'))
    setKarahi(FoodData.filter((item) => item.foodCategory == 'Karahi'))
    setChicken(FoodData.filter((item) => item.foodType == 'Chicken'))
    setBeef(FoodData.filter((item) => item.foodType == 'Beef'))
    setloading(false)
  }, [FoodData])


  const searchData = (item) => {
    navigation.navigate('Detail', item)
  }


  return (
    <View style={styles.container}>
      <StatusBar />
      <Headerr navigation={navigation} />
      <ScrollView>
        <View style={styles.search}>
          <Searchbar

            placeholder="Search"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
            iconColor='black'
            placeholderTextColor='black'


          />

        </View>
        {searchQuery != '' && <View style={styles.outerSearch}>
          <FlatList style={{ width: '100%' }}
            data={FoodData}
            renderItem={({ item }) => {
              if (item.Foodname.toLowerCase().includes(searchQuery.toLowerCase())) {
                return (
                  <View style={styles.innerSearch}>
                    <TouchableOpacity onPress={() => searchData(item)}>
                      <View style={styles.innerSearch1}>

                        <AntDesign name="arrowleft" size={24} color="white" />
                        <Text style={{ color: 'white', fontSize: 17, paddingHorizontal: 5 }}>{item.Foodname}</Text>
                        <Image source={{ uri: item.foodImageUrl }} style={styles.img} />

                      </View>
                    </TouchableOpacity>
                  </View>
                )
              }


            }}

          />

        </View>}

        <Catergory navigation={navigation} />

        <Test />
        <Swiperr Data={FoodData} title='Specail FooD' navigation={navigation} />
        <Swiperr Data={BBQ} title='BBQ' navigation={navigation} />
        <Swiperr Data={Karahi} title='Karahi' navigation={navigation} />
        <Swiperr Data={Chicken} title='Chicken' navigation={navigation} />
        <Swiperr Data={Beef} title='Beef' navigation={navigation} />


      </ScrollView>
    </View>


  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    // backgroundColor:'#fffaed'
  },
  search: {
    width: '90%',
    margin: 10,
    borderWidth: 1,
    borderRadius: 19,
    borderColor: 'white',

  },
  outerSearch: {
    width: '100%',
    flexDirection: 'row'


  },
  innerSearch1: {
    flexDirection: 'row',
    // color: '#752828',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 10,
    justifyContent: 'flex-start'
    // flexDirection:'row'

  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 15
  },
  innerSearch: {
    backgroundColor: '#706c6c',
    width: '96%',
    marginHorizontal: 5,
    borderRadius: 5,
    marginVertical: 2
  }

})