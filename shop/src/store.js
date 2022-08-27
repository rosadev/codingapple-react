import { configureStore, createSlice } from '@reduxjs/toolkit'

//useState역할임
let user = createSlice({
  name : 'user',
  initialState : 'kim',
  // 수정해주는 함수 만들기
  reducers : {
    changeName(state){
      return 'john ' + state
    }
  }
})

export let { changeName } = user.actions

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
  ] 
})

export default configureStore({
  reducer: {
    // 여기다 등록해줘야함
    user : user.reducer, 
    stock : stock.reducer, 
    cart : cart.reducer
   }
}) 