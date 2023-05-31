import React, { useEffect, useState } from 'react'
import "./AdminCreate.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { registerMe } from '../../Services/apicalls';

export const AdminCreatr = () => {

    const navigate = useNavigate();
  const [registerAdmin, setRegisterAdmin] = useState({
    name:"",
    lastname:"",
    email: "",
    phone_number:"",
    password: "",
    role:""

  });

  
  const HandlerFunctionregisterbyAdmin = (e) => {
    setRegisterAdmin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

        useEffect(()=>{
      
    },[registerAdmin])


    const registerFunctionbyAdmin = () => {
      
      registerMe(registerAdmin)
        .then(

        navigate("/login")
        )
        .catch((error) => console.log(error));
    };
  return (
    <div className='adminCreate'>
        <Form>
      <Form.Group className="mb-3" >
        
        <Form.Control type="text" placeholder="name" name='name'onChange={HandlerFunctionregisterbyAdmin} />
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="Last name" name='lastname' onChange={HandlerFunctionregisterbyAdmin}/>
        <Form.Label></Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={HandlerFunctionregisterbyAdmin} />
        <Form.Label></Form.Label>
        <Form.Control type="number" placeholder="numero de telefono" name='phone_number' onChange={HandlerFunctionregisterbyAdmin}/>
        <Form.Label></Form.Label>
        <Form.Control type="text" placeholder="role" name='role' onChange={HandlerFunctionregisterbyAdmin}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label></Form.Label>
        <Form.Control type="password" placeholder="Password"  name='password' onChange={HandlerFunctionregisterbyAdmin}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={registerFunctionbyAdmin}>
        Submit
      </Button>
    </Form>

    </div>
  )
}
