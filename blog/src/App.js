/* eslint-disable */  // Lint 끄는 기능임
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';

function App() {

  let post = '강남 우동 맛집';
  let [글제목, 글제목변경] =  useState(['남자코트추천', '강남우동맛집', '파이썬독학']);
  // 자주변경될거 같은 것만 state로 만들자
  let [따봉, 따봉변경] = useState([0,0,0]);
  let [modal, setModal]  = useState(false); /* UI의 현재 상태를 state로 저장, 형식은 자유 */
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      <button onClick={()=> {
        let copy = [...글제목];
        copy[0] = '여자코트추천';
        글제목변경(copy);
        }}>글수정</button>

       <button onClick={()=> {
        let copy2 =[...글제목];
        copy2.sort();
        글제목변경(copy2);
       }}>가나다순 정렬</button>


      {/* <div className="list">
        <h4>{ 글제목[0] } <span onClick={ ()=> { 따봉변경(따봉 + 1)} }>👍</span> { 따봉 }</h4>
        <p>2월 17일 발행</p>
        </div>
        <div className="list">
        <h4 onClick={()=> { setModal(!modal)} }>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
        </div>
        <div className="list">
        <h4 onClick={()=>{ setModal(true) }}>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}

      
        {
          // for 반복문 대신 map() 함수를 쓰자
          글제목.map(function(a, i) {
            return (
              <div className="list" key={i}> 
              <h4 onClick={()=>{ setModal(!modal); setTitle(i) }}>{ 글제목[i] } 
              <span onClick={ (e)=> { e.stopPropagation(); 
                let copy =[...따봉];
                copy[i] = copy[i] + 1;
                따봉변경(copy)
              }}>👍</span> { 따봉[i]}</h4>
              <p>2월 17일 발행</p>
              <button onClick={()=>{
                let copy = [... 글제목];
                copy.splice(i, 1);
                글제목변경(copy)
              }}>삭제</button>
              </div>
            )
          })
        }
      <input onChange={(e)=> { 
        입력값변경(e.target.value); }} />
        <button onClick={()=> { 
          let copy = [...글제목];
          copy.unshift(입력값);
          글제목변경(copy)
        }}>글발행</button>

        <Profile/>  

       {
         // if 대용으로 삼항연산자 쓸 것 (ternary operator)
         modal == true ? <Modal title={title} 글제목={글제목} 글제목변경={글제목변경}/> : null     
        }
       
    </div>
  );
}

function Modal(props) {
  return(
    <div className="modal">
    <h4>{ props.글제목[props.title] }</h4>
    <p>날짜</p>
    <p>상세내용</p>
    <button onClick={()=> { props.글제목변경(['여자코트추천', '강남우동맛집', '파이썬독학']) }}>글수정</button>
   </div>
  )
};

//예전 리액트 문법
class Profile extends React.Component {
  constructor(){
    super();
    this.state = { name: 'Kim', age: 30}
  }
  render(){
    return (
      <div>
        <h3>프로필입니다</h3>
        <p>저는 {this.state.name} 입니다</p>
        <button>버튼</button>
      </div>
    )
  }
};

export default App;
