import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap"; 
import "./AdminProfiles.css";
import { bringAllProfile } from "../../Services/apicalls";
import { useSelector } from "react-redux";
import { userData } from "../UserSlice";
export const ClientCard = () => {
    
  const [profile, setDataProfile] = useState([]);
  const datosRdx = useSelector(userData); 

  useEffect(() => {
    bringAllProfile(datosRdx.credentials)
      .then((resultado) => {
        ;
        if (resultado.length > 0) {
          setDataProfile(resultado);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="adminDesing">
      <div className="center">
        <div className="row">
          {profile.map((profiles) => (
            <div className="col-md-4 mt-3" key={profiles.id}>
              <Card className="cardDesign">
                <Card.Header></Card.Header>
                <Card.Body>
                  <Card.Title>{profiles.name}</Card.Title>
                  <Card.Text>{profiles.lastname} </Card.Text>
                  <Card.Text>{profiles.phone_number} </Card.Text>
                  <Card.Text>{profiles.email}</Card.Text>
                  <Card.Text>{profiles.role}</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
