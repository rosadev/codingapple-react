import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { useState } from 'react';

// class Detail2 extends React.Component {
//   componentDidMount() {
//     // 컴포넌트 mount시 여기코드 실행됨
//   }
//   componentDidUpdate() {
//     // 컴포넌트 update시 여기코드 실행됨
//   }
//   componentWillUnmount() {
//     // 컴포넌트 unmount시 여기코드 실행됨
//   }
// };

let YellowBtn = styled.button`
  background : ${ props => props.bg };
  color :${ props => props.bg == 'blue'? 'white' : 'black' };
  padding : 10px;
`
// let NewBtn = styled.button(YellowBtn)`
//   // 기존 스타일 복사 가능
// `

let Box = styled.div`
  background : grey;
  padding : 20px;
`

function Detail(props) {
  let [alert, setAlert] = useState(true)
  
    // 컴포넌트에 갈고리 다는법
    useEffect(()=>{
      // 타이머 주는법
      setTimeout(()=> {setAlert(false)}, 2000)
      // mount, update시 코드 실행
      console.log('안녕')
    }, []) 

  
  // 컴포넌트 업데이트 = 재렌더링 
  let [count, setCount] = useState(0)

  let {id} = useParams();
  console.log(id);

  return(
    <div className="container">
      { 
        alert == true
      ? <div className="alert alert-warning">
        2초이내 구매시 할인
      </div>
      : null
      }
      {count}
      <button onClick={()=> { setCount(count+1) }}>버튼</button>
      <Box>
        <YellowBtn bg="blue">버튼</YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn>
      </Box>
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div>   
  )
} 

export default Detail;