import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { Context1 } from './../App.js';
import { addItem } from "./../store.js"
import { useDispatch } from "react-redux"

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
  
  let {id} = useParams();
  console.log(id);
  let 찾은상품 = props.shoes.find(x => x.id == id);  
  let {재고, shoes} = useContext(Context1)
  let [alert, setAlert] = useState(true)
  let dispatch = useDispatch()

  useEffect(()=>{
    let 꺼낸거 = localStorage.getItem('watched')
    꺼낸거 = JSON.parse(꺼낸거)
    꺼낸거.push(찾은상품.id)
    꺼낸거 = new Set(꺼낸거) // 중복제거
    꺼낸거 = Array.from(꺼낸거) // 다시 어레이로
    localStorage.setItem('watched', JSON.stringify(꺼낸거))
  }, [])
  
  // 컴포넌트에 갈고리 다는법
  useEffect(()=>{
    // 타이머 주는법
    let a = setTimeout(()=> {setAlert(false)}, 2000)
    // mount, update시 코드 실행
      console.log('안녕')

      // 서버로 데이터 요청하는 코드(2초 소요) : 2초 사이에 재렌더링 되면 계속 요청되어 버그 많아질듯
      // 기존 데이터 요청을 제거할 필요

      // useEffect 동작 전에 실행 return()=>{} : clean up function
      // 타이머 제거해주는 함수
      // mount시 실행안됨. unmount시 실행됨
      return ()=> {
        clearTimeout(a)
      }
    }, []) 

    /* 빡통식 정리법 */
    // 1. 재렌더링마다 코드 실행하고 싶으면
    useEffect(()=>{ })
    // 2. mount시 1회 코드실행하고 싶으면
    useEffect(()=>{ }, [])
    // 3. unmount시 1회 코드 실행하고 싶으면
    useEffect(()=>{ 
        return()=>{

        }
    }, [])
    // 4. useEffect 실행 전에 뭔가 실행하려면 언제나 return()=>{ } 
    // useEffect 내부에 clean up function을 써준다
    // 5. 특정 state 변경시에만 실행하려면 [state명] : dependency[]에 변수명 넣어서 
  
  // 컴포넌트 업데이트 = 재렌더링 
  let [count, setCount] = useState(0)

  let[tab, setTab] = useState(0)
  let[fade2, setFade2] = useState('')

  useEffect(()=>{
    let b = setTimeout(()=> { setFade2('end') }, 100)
    return ()=>{
      clearTimeout(b)
      setFade2('')
    }
  }, [])

  return(
    <div className={'container start' + fade2}>
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
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addItem({id: props.shoes[id].id, name: props.shoes[id].title, count : 1}))
          }}>주문하기</button> 
        </div>
      </div>
      <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{ setTab(0) }} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{ setTab(1) }} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{ setTab(2) }} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab}/>
    </div>   
  )
} 

function TabContent({tab}) {

  let[fade, setFade]  = useState('')

  useEffect(()=>{
    let a = setTimeout(()=> { setFade('end') }, 100)
    return ()=> {
      clearTimeout(a)
      setFade('')
    }
  }, [tab])

  return (<div className ={`start ${fade}`}>
    { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div> ][tab] }
</div>)
}

export default Detail;