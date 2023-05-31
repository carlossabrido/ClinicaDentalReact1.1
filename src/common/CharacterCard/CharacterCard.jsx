import React from 'react'
import "./CharacterCard.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export const CharacterCard = ({name,lastname}) => {

  return (
    <div className='cardDesign'> 
  <Card className=''>
    <Card.Header></Card.Header>
    <Card.Body>
      <Card.Title><div>{name}</div></Card.Title>
      <Card.Text>
      <div>{name}</div>
      <div>{lastname}</div>
      <div>{name}</div>
      <div>{name}</div>
        
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
  </div>
);
}



