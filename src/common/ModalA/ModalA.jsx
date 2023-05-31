import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { bringAppointment, bringDentist, bringTreatment, modifyAppointment} from '../../Services/apicalls';
import { userData } from '../../pages/UserSlice';

export const ModalA = ({ show, handleClose,appointmentId }) => {

    const userRdxData = useSelector(userData);

  const[idAppointment, setAidappointment]=useState({
    appointment:appointmentId,
  })

  const [modifyAppointments, setModifyAppointments] = useState({
    
    dentist: "",
    type: "",
    start_date: "",
    end_date: "",
  });
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [dentist, setDentist] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState("");

  useEffect(() => {
    bringDentist()
      .then((resultado) => {
        
        setDentist(resultado)
      })
      .catch((error) => console.log(error))
  }, []);

  const[treatmentm,setTreatmentm]= useState([])

  useEffect(()=>{
    bringTreatment()
    .then((resultado) => {
      setTreatmentm(resultado)
    })
    .catch((error) => console.log(error))

  },[])

  const handleDentistSelection = (e, dentistId, dentistName) => {
    e.preventDefault();
    setModifyAppointments((prevState) => ({
      ...prevState,
      dentist: dentistId,
    }));
    setSelectedDentist(dentistName);
  };

  const handleTreatmentSelection = (e, treatmentId, treatmentName) => {
    e.preventDefault();
    setModifyAppointments((prevState) => ({
      ...prevState,
      type: treatmentId,
    }));
    setSelectedTreatment(treatmentName);
  };

 


  const HandlerModifyAppointment = (e,id) => {
    const { name, value } = e.target;
    // Verify event  onClick or onChange
    const newValue = e.type === 'click' ? id : value;
    setModifyAppointments((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };


  useEffect(() => {
  }, [modifyAppointments]);

  
  const modifyAppointmentFunction = async (e) => {
    e.preventDefault();
    console.log(modifyAppointments, 'que pasa qui');
    try {
      await modifyAppointment(
        userRdxData.credentials,
        idAppointment.appointment,
        modifyAppointments
      );
      
      bringAppointment(userRdxData.credentials)
      console.log('Cita modificada exitosamente');
      handleClose();
      window.location.reload()
      
      
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modifique su cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='appointment'>
          <DropdownButton id="dropdown-item-button" title={selectedDentist ? selectedDentist : "Seleccione su Dentista"} className='ancho'>
            {dentist.map((dentist) => (
              <Dropdown.Item key={dentist.id} name='dentist' as="button" onClick={(e) => handleDentistSelection(e, dentist._id, dentist.name)}>
                {dentist.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <br />
            <br />
            <DropdownButton id="dropdown-item-button" title={selectedTreatment ? selectedTreatment : "Seleccione tratamiento"}>
            {treatmentm.map((treatment) => (
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
                <Form.Control type="datetime-local" placeholder="Fecha y hora de inicio" name='start_date' onChange={HandlerModifyAppointment} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <Form.Control type="datetime-local" placeholder="Fecha y hora de fin" name='end_date'onChange={HandlerModifyAppointment} />
              </Form.Group>
              
              
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>modifyAppointmentFunction(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
