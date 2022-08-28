import { createSlice } from '@reduxjs/toolkit'

//useState역할임
let user = createSlice({
  name : 'user',
  initialState : {name: 'kim', age: 20},
  // 수정해주는 함수 만들기
  reducers : {
    changeName(state){
      state.name = 'park'
    },
    increase(state, action){
      state.age += action.payload  /* 메세지에 실어보내는 화물임 */
    }
  }
})
 
export let { changeName, increase} = user.actions
export default user