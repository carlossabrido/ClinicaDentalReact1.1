import React, { useEffect, useState } from "react";
import "./Login.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../UserSlice";
import { logMe } from "../../Services/apicalls";

export const Login = () => {
  const dispatch = useDispatch();
  const rdxData = useSelector(userData);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const HandlerFunction = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (rdxData.credentials.token) {
      navigate();
    }
  }, []);

    //     useEffect(()=>{
    //   console.log(credentials, 'oerrrrrrrrrr')
    // },[credentials])

  const logMeFunction = () => {
    logMe(credentials)
      .then((resultado) => {
        console.log(resultado);
        const decoded = jwt_decode(resultado.data.token);
        console.log(decoded);
        const datos = {
          token: decoded,
          bearer: resultado.data.token
   
        };

        dispatch(login({ credentials: datos }));

        setMessage(`Bienvenido de nuevo mr.${decoded.name}`);
        setTimeout(() => {
          navigate("/");
        }, 2750);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="loginDesign">
      {message != "" ? (
        <div>{message}</div>
      ) : (
        <div>
          {" "}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={HandlerFunction}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={HandlerFunction}
              />
            </Form.Group>
           
            <Button variant="primary" onClick={logMeFunction}>
              Submit
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};
