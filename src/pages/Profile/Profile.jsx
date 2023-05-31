import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { userData } from '../UserSlice'
import {  useSelector } from 'react-redux'
import { bringUserProfile } from '../../Services/apicalls'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap'




export const Profile = () => {

    const dataUSerRdx=useSelector(userData)

  

    const [dataProfile,setDataProfile]=useState({})



    useEffect(() => {
            bringUserProfile(dataUSerRdx.credentials)
           
            .then((resultado)=>{
              setDataProfile(resultado)
                
            })
            .catch((error)=>console.log(error))
        
    },[]);
    
 
    return (
      <div className='profileDesign'>
        <Card className="containerDesing">
          <Card.Header></Card.Header>
          <Card.Body>
            <Card.Text>Nombre</Card.Text>
            <Card.Title>{dataProfile.name}</Card.Title>
            <Card.Text></Card.Text>
            <Card.Text>Apellido</Card.Text>
            <Card.Title>{dataProfile.lastname} </Card.Title>
            <Card.Text>Email</Card.Text>
            <Card.Title>{dataProfile.email}</Card.Title>
            <Card.Text>Numero tlf</Card.Text> 
            <Card.Title>{dataProfile.phone_number}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
}


  // return (
    //     <div className="profileDesign">
    //       {dataProfile.name != 0 ? (
    //         <div className='containerProfile'>
    //         <div>{dataProfile.name}</div>
    //         <div>{dataProfile.lastname}</div>
    //         <div>{dataProfile.email}</div>
    //         <div>{dataProfile.phone_number}</div>
    //         </div>
    //       ) : (
    //         <div>CARGANDO</div>
    //       )}
    //     </div>
    //   );
    // };

