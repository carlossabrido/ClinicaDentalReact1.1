import React, { useEffect, useState } from 'react';
import "./NewAppointment.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { bringDentist, bringTreatment, makeAppointment } from '../../Services/apicalls';
import { useSelector } from 'react-redux';
import { userData } from '../UserSlice';
import { useNavigate } from 'react-router-dom';


export const NewAppointment = () => {
  const navigate = useNavigate();
  const userRdxData = useSelector(userData);

  const [appointments, setAppointments] = useState({
    dentist: "",
    type: "",
    start_date: "",
    end_date: "",
  });

  const [datadentist, setDatadentist] = useState([]);
  const [treatment, setTreatment] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedDentist, setSelectedDentist] = useState("");

  useEffect(() => {
    bringDentist()
      .then((resultado) => {
        setDatadentist(resultado)
      })
      .catch((error) => console.log(error))
  }, []);

  useEffect(() => {
    bringTreatment()
      .then((resultado) => {
        setTreatment(resultado)
      })
      .catch((error) => console.log(error))
  }, []);

  const HandlerFunctionAppointment = (e, id, name) => {
    const { value } = e.target;
    setAppointments((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(()=> console.log(appointments))

  const handleDentistSelection = (e, dentistId, dentistName) => {
    e.preventDefault();
    setAppointments((prevState) => ({
      ...prevState,
      dentist: dentistId,
    }));
    setSelectedDentist(dentistName);
  };

  const handleTreatmentSelection = (e, treatmentId, treatmentName) => {
    e.preventDefault();
    setAppointments((prevState) => ({
      ...prevState,
      type: treatmentId,
    }));
    setSelectedTreatment(treatmentName);
  };

  const createAppointmentFunction = (e) => {
    e.preventDefault();
    makeAppointment(userRdxData.credentials, appointments)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='appointmentDesign'>
      <div className='Style'>
        <div className='appointment'>
          <DropdownButton id="dropdown-item-button" title={selectedDentist ? selectedDentist : "Seleccione su Dentista"} className='ancho'>
            {datadentist.map((dentist) => (
              <Dropdown.Item key={dentist.id} name='dentist' as="button" onClick={(e) => handleDentistSelection(e, dentist._id, dentist.name)}>
                {dentist.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <br />

          <DropdownButton id="dropdown-item-button" title={selectedTreatment ? selectedTreatment : "Seleccione tratamiento"}>
            {treatment.map((treatment) => (
              <Dropdown.Item
                key={treatment.id}
                name='type'
                as="button"
                onClick={(e) => handleTreatmentSelection(e, treatment._id, treatment.name)}
              >
                {treatment.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control type="datetime-local" placeholder="Fecha y hora de inicio" name='start_date' onChange={(e) => HandlerFunctionAppointment(e, '', 'start_date')} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control type="datetime-local" placeholder="Fecha y hora de fin" name='end_date' onChange={(e) => HandlerFunctionAppointment(e, '', 'end_date')} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => { createAppointmentFunction(e); navigate("/appointment") }}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
