import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap'; 
import "./AdminProfiles.css";
import { bringAllProfile} from '../../Services/apicalls';
import { useSelector } from 'react-redux';
import { userData } from '../UserSlice';

export const AdminProfiles = () => {
  const [profile, setDataProfile] = useState([]);
  const datosRdx = useSelector(userData); 
  const [seek, setSeek] = useState("");

  const inputHandler = (e) => {
    setSeek(e.target.value);
  };

  useEffect(() => {
    if (seek !== "") {
      const bring = setTimeout(() => {
        bringAllProfile(datosRdx.credentials, seek)
          .then((searchResults) => {
            
            setDataProfile(searchResults);
          })
          .catch((error) => console.log(error));
      }, 375);
  
      return () => clearTimeout(bring);
    } else {
      if (profile.length !== 0) {
        setDataProfile([]);
      } else {
        bringAllProfile(datosRdx.credentials)
          .then((searchResults) => {
           
            setDataProfile(searchResults);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [seek]);

  useEffect(() => {
    bringAllProfile(datosRdx.credentials)
      .then((resultado) => {
        
        if (resultado.length > 0) {
          setDataProfile(resultado);  
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='main'>
      <Container fluid="t" className="topCol justify-content-center">
        <Row>
          <Col >
            <input className='buttonDesign'
              type="text"
              name="seek"
              placeholder='search'
              onChange={(e) => inputHandler(e)}
            />
          </Col>
        </Row>
      </Container>
    <div className="adminDesing">
      <div className='center'>
        <div className="row">
          {profile.map((profiles) => (
            <div className="col-md-4 mt-3" key={profiles.id}>
              <Card className="cardDesign">
                <Card.Header></Card.Header>
                <Card.Body>
                  <Card.Title>{profiles.name}</Card.Title>
                  <Card.Text>{profiles.lastname}</Card.Text>
                  <Card.Text>{profiles.phone_number}</Card.Text>
                  <Card.Text>{profiles.email}</Card.Text>
                  <Card.Text>{profiles.role}</Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

