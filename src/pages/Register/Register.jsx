import React, { useEffect, useState } from 'react'
import "./Register.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { registerMe } from '../../Services/apicalls';

export const Register = () => {
  const navigate = useNavigate();
  const [registration, setRegistration] = useState({
    name:"",
    lastname:"",
    email: "",
    phone_number:"",
    password: "",
    role:"client"

  });

  
  const HandlerFunctionregister = (e) => {
    setRegistration((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

        useEffect(()=>{},[registration])


    const registerMeFunction = () => {
      registerMe(registration)
        .then(navigate("/login"))
        .catch((error) => console.log(error));
    };
  

  return (
    <div className='registerDesign'>
      <Form>
      <Form.Group className="mb-3" >
        
        <Form.Control type="text" placeholder="name" name='name'onChange={HandlerFunctionregister} />
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="Last name" name='lastname' onChange={HandlerFunctionregister}/>
        <Form.Label></Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={HandlerFunctionregister} />
        <Form.Label></Form.Label>
        <Form.Control type="number" placeholder="numero de telefono" name='phone_number' onChange={HandlerFunctionregister}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label></Form.Label>
        <Form.Control type="password" placeholder="Password"  name='password' onChange={HandlerFunctionregister}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={registerMeFunction}>
        Submit
      </Button>
    </Form>
    </div>
  )
}

