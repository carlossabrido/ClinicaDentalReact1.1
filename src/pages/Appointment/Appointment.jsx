import React, { useEffect, useState } from 'react';
import "./Appointment.css";
import { userData } from '../UserSlice';
import { useSelector } from 'react-redux';
import { bringAppointment, bringUserProfile } from '../../Services/apicalls';
import { Button, Card } from 'react-bootstrap';
import { ModalA } from '../../common/ModalA/ModalA';


export const Appointment = () => {
  const dataUSerRdx = useSelector(userData);
  const [dataAppointment, setDataAppointment] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    bringAppointment(dataUSerRdx.credentials)
      .then((resultado) => {
        setDataAppointment(resultado);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleModifyAppointment = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAppointmentId(null);
    setShowModal(false);
  };

  return (
    <div className="appointmentDesing">
      {(dataUSerRdx.credentials.token.role === 'client') ? (
        <div className="row justify-content-center align-items-center">
          {dataAppointment.map((appo) => (
            <div className="col-md-3 m-3" key={appo.id}>
              <Card className="centrar">
                <Card.Header></Card.Header>
                <Card.Body>
                  <Card.Title>Dentista</Card.Title>
                  <Card.Text>{`${appo.dentist.name} ${appo.dentist.lastname}`}</Card.Text>
                  <Card.Text></Card.Text>
                  <Card.Title> Tipo de consulta</Card.Title>
                  <Card.Title>{appo.type.name} </Card.Title>
                  <Card.Text>Horario</Card.Text>
                  <Card.Text>{appo.start_date}</Card.Text>
                  <Card.Text>{appo.end_date}</Card.Text> 
                </Card.Body>
                <Button variant="primary" onClick={() => handleModifyAppointment(appo._id)}>
                  Modificar cita
                </Button>
              </Card>
            </div>
          ))}
          {selectedAppointmentId && (
            <ModalA show={showModal} handleClose={handleCloseModal} appointmentId={selectedAppointmentId} /> 
          )}
        </div>
      ) : (
        (dataUSerRdx.credentials.token.role === 'dentist') && (
          <div className="row justify-content-center align-items-center ">
            {dataAppointment.map((appo) => (
              <div className="col-md-3 m-3" key={appo.id}>
                <Card className="centrar">
                  <Card.Header></Card.Header>
                  <Card.Body> 
                    <Card.Title>Paciente</Card.Title>
                    <Card.Text>{`${appo.client.name} ${appo.client.lastname}`}</Card.Text>
                    <Card.Title> Tipo de consulta</Card.Title>
                    <Card.Title>{appo.type.name} </Card.Title>
                    <Card.Text>Horario</Card.Text>
                    <Card.Text>{appo.start_date}</Card.Text>
                    <Card.Text>{appo.end_date}</Card.Text>
                  </Card.Body>
                  <Button variant="primary" onClick={() => handleModifyAppointment(appo._id)}>
                    Modificar cita
                  </Button>
                </Card>
              </div>
            ))}
            {selectedAppointmentId && (
              <ModalA show={showModal} handleClose={handleCloseModal} appointmentId={selectedAppointmentId} />
            )}
          </div>
        )
      )}
    </div>
  );
};
