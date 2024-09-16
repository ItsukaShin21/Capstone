import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { VEHICLE_MANAGER } from '../components/vehicle-manager';

function EditVehicleModal({ plate_number, onClose }) {
    const { VEHICLE_INFO_FETCH, VEHICLE_UPDATE } = VEHICLE_MANAGER();
    const [show, setShow] = useState(true);
    const [state, setState] = useState({
        plate_number: '',
        username: '',
        identity: '',
    });

    //Fetch the vehicle details
    useEffect(() => {
        VEHICLE_INFO_FETCH(plate_number).then(vehicleDetails => {
            setState(vehicleDetails);
        });
    }, [plate_number]);

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }));
    };

    const handleUpdate = async(event) => {
        event.preventDefault();

        await VEHICLE_UPDATE(state.plate_number, 
                             state.username, 
                             state.identity);
        onClose();
        setShow(false);
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header>
                <Modal.Title>Edit Vehicle</Modal.Title>
            </Modal.Header>

            <form onSubmit={ handleUpdate }>
            <Modal.Body>
                    <label>Plate Number</label>
                    <input type="text"
                           name="plate_number"
                           placeholder="Plate Number"
                           id="plate_number"
                           value={ state.plate_number }
                           onChange={ handleChange }
                           required/>            
                    <label>Name</label>
                    <input type="text"
                           name="username"
                           placeholder="Owner Name"
                           id="username"
                           value={ state.username }
                           onChange={ handleChange }
                           required/>
                    <label>Identity</label>
                    <input type="text"
                           name="identiyt"
                           placeholder="Identity"
                           id="identity"
                           value={ state.identity }
                           onChange={ handleChange }
                           required/>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
    )
}

export default EditVehicleModal;