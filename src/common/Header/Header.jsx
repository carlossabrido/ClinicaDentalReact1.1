import React, { useEffect } from "react";
import "./Header.css";
import img from "./img/foto.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData,logout } from "../../pages/UserSlice";

  




export const Header = () => {

  const dataUSerRdx=useSelector(userData)
 
  

  const dispatch=useDispatch()

  const navigate = useNavigate();

 

  const logMeOut = () => {
    dispatch(logout({ credentials: {}}));
    setTimeout(()=>{
      navigate("/");
    },500)
  }

  return (
    <div>
      {!dataUSerRdx?.credentials?.token ?
       (<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img className="pic" src={img} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
            <Nav.Link onClick={() => navigate("/register")}>Register</Nav.Link>
          </Nav>
          <Nav></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>):
    (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img className="pic" src={img} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {dataUSerRdx.credentials.token.role === "admin" ? (
              <>
                <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                <Nav.Link onClick={() => navigate("/adminProfile")}>profile</Nav.Link>
                <Nav.Link onClick={() => navigate("/adminCreate")}>users</Nav.Link>
                <Nav.Link onClick={() => logMeOut()}>logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="name" onClick={() => navigate("/profile")}>{dataUSerRdx.credentials.token.name}</Nav.Link> 
                <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                <Nav.Link onClick={() => navigate("/newAppointment")}>NewAppointment</Nav.Link>
                <Nav.Link onClick={() => navigate("/appointment")}>Appointment</Nav.Link>
                <Nav.Link onClick={() => logMeOut()}>logout</Nav.Link>
              </>
            )}

          </Nav>
          <Nav></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>)
    }
    
    
    </div>
  );
};





// <div className='headerDesing'>
//         <img className='pic' src={img} alt="" />
//         <div className='link' onClick={()=>navigate("/")}>Home</div>
//         <div className='link' onClick={()=>navigate("/login")}>Login</div>
//         <div className='link' onClick={()=>navigate("/register")}>Register</div>
//     </div>
