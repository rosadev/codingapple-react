import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'


let stock = createSlice({
  name : 'stock',
  initialState : [10, 11, 12]
})

let cart = createSlice({
  name : 'cart',
  initialState :
  [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ] ,
  reducers : {
    addCount(state, action){
      let idNum = state.findIndex((a)=>{ return a.id == action.payload }) 
      state[idNum].count++
    }, 
    addItem(state, action){
      state.push(action.payload)
    }
  }
})

export let { addCount, addItem } = cart.actions

export default configureStore({
  reducer: {
    // 여기다 등록해줘야함
    user : user.reducer, 
    stock : stock.reducer, 
    cart : cart.reducer
   }
}) 