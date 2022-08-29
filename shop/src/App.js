import './App.css';
import { createContext, useEffect, useState, useTransition, useDeferredValue } from 'react';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
// import 작명 from './data.js';
// import {a, b} from './data.js'; // 중괄호로 가져올땐 자유로운 작명 안됨
// import bg from './img/bg.png';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './pages/Detail.js';
import axios from 'axios';
import Cart from './pages/Cart.js'
import { useQuery } from 'react-query';

export let Context1 = createContext()

let 만개어레이 = new Array(10000).fill(0)

function App() {

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  }, []) 

  let [name, setName] = useState('')
  let [isPending, startTransition] = useTransition() // 혁신적 성능향상
   
  let [shoes, setShoes] = useState(data)
  let [재고] = useState([10, 11, 12])
  let navigate = useNavigate();  // 페이지 이동

  let result = useQuery('작명', ()=>
  axios.get('https://codingapple1.github.io/userdata.json')
  .then((a)=>{
    console.log('요청됨') 
    return a.data 
  }), 
  { staleTime : 2000 } // refetch 간격 설정 가능
  )

  return (
    <div className="App">

      <input onChange={(e)=> { 
        startTransition(()=>{
          setName(e.target.value)
        }) 
      }}/>
      {
        isPending ? '로딩중' :
        만개어레이.map(()=>{
          return <div>{name}</div>
        })
      }

     <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to ="/">홈</Link>
            <Link to ="/detail/0">상세페이지</Link>
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/Cart') }}>Cart</Nav.Link>
            <Nav.Link onClick={()=>{ navigate(-1) }}>뒤로가기</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            { result.isLoading && '로딩중' }
            { result.error && '에러남' }
            { result.data && result.data.name }
          </Nav> 
        </Container>
      </Navbar>

      
      <Routes>
        <Route path="/" element={
        <>
            <div className="main-bg">
            {/* <img src={process.env.PUBLIC_URL + '/bg.png'} width="100%"/> */}
           </div>
           <div className="container">
              <div className="row">
                {/* <Card shoes={shoes[0]} i={1}></Card>
                <Card shoes={shoes[1]} i={2}></Card>
                <Card shoes={shoes[2]} i={3}></Card>    */}
                {
                  shoes.map((a, i)=> {
                    return(
                    <Card shoes={shoes[i]} i={i}></Card>
                    )
                  })
                }
              </div>
            </div>
            <button onClick={()=>{ 
               axios.get('https://codingapple1.github.io/shop/data2.json')
               .then((result)=>{ 
                  console.log(result.data)
                  let copy = [...shoes, ...result.data];
                  setShoes(copy);
               })
               .catch(()=> {
                  console.log('실패함ㅅㄱ')
               })
            }}>더보기</button>
        </>
      }/>
        
        {/* nested routes */}
        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>멤버임</div>}/> 
          <Route path='location' element={<div>위치정보임</div>}/> 
        </Route>
        <Route path='/event' element={<Event/>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}/> 
          <Route path='two' element={<div>생일기념 쿠폰받기</div>}/> 
        </Route>
        <Route path="/detail/:id" element={
          <Context1.Provider value={{ 재고, shoes }}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        }/> 
        <Route path='*' element={<div>없는 페이지에용</div>}/> 
        <Route path="/cart" element={<Cart/>} />
        </Routes>

 

    </div>
  );
}
export default App;

function About() {
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props){
  return(
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}
