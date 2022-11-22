const { createSlice } = require('@reduxjs/toolkit')

// const initialState = {
//   cart: [],
// };

const cartSlice = createSlice({
  name: "cart",
  initialState:[],
  reducers: {
    add(state, action) {
      let myindex = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          myindex = index;

        }
      })
      if (myindex == -1) {
        state.push({
          Description: action.payload.Description, Foodname: action.payload.Foodname, Price: action.payload.Price, foodCategory: action.payload.foodCategory, foodImageUrl: action.payload.foodImageUrl,
          foodType: action.payload.foodType, id: action.payload.id, qty: action.payload.qty + 1
        })

      }
      else {
        state[myindex].qty = state[myindex].qty + 1
      }

    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload)
    },
    decrease(state, action) {
      let myindex = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          myindex = index;

        }
      })
      if (myindex == -1) {

      }
      else {
        state[myindex].qty = state[myindex].qty - 1
      }

    },
    clearCart(state){
       state.splice(0, state.length);
      // return  state=[]
      // console.warn('Hogya')
    
    }
  }
})
export const { add, remove, decrease,clearCart } = cartSlice.actions;
export default cartSlice.reducer;