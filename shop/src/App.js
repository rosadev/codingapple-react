import './App.css';
import { useState } from 'react';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
// import 작명 from './data.js';
// import {a, b} from './data.js'; // 중괄호로 가져올땐 자유로운 작명 안됨
// import bg from './img/bg.png';
import data from './data.js';

function App() {
  let [shoes] = useState(data)

  return (
    <div className="App">
     <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
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

    </div>
  );
}
export default App;

function Card(props){
  return(
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}
