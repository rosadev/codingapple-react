import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { increase } from "./../store/userSlice.js" 
import { addCount } from "./../store.js"
import { memo, useState } from "react" 

// function Child(){
//   console.log('재렌더링됨')
//   return <div>자식임</div>
// }

let Child = memo( function(){
  return <div>자식임</div>
})

function Cart() { 

  let state = useSelector((state)=> { return state })
  let dispatch = useDispatch() /* store.js로 요쳥을 보내주는 함수 */
  let [count, setCount] = useState(0)

  return (
    <div>
      <Child></Child>
      <button onClick={()=> { setCount(count+1) }}>+</button>
      <h6>{state.user.name} {state.user.age}의 장바구니</h6>
      <button onClick={()=>{
        dispatch(increase(100))
      }}>버튼</button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            state.cart.map((a, i)=>
              <tr key={i}>
                <td>{state.cart[i].id}</td>
                <td>{state.cart[i].name}</td>
                <td>{state.cart[i].count}</td>
                <td>
                  <button onClick={()=>{
                    dispatch(addCount(state.cart[i].id))
                  }}>+</button>
                </td>
            </tr>
            )
          }
        </tbody>
      </Table> 
    </div>
  )
}

export default Cart