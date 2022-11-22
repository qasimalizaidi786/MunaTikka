import {  Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import {firebase} from '../Firebase/FirebaseConfig'
import { addMyProduct } from '../Redux/ProductSlice';




const Data = () => {
    const [FoodData, setFoodData] = useState([])

    const dispatch=useDispatch()
 const foodRef = firebase.firestore().collection('FoodData');


 useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()))
    })
    FoodData.map(item=>dispatch(addMyProduct(item)))
  }, [])
//   console.log(FoodData)


}

export default Data

