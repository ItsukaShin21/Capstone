import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { USER_AUTHENTICATE } from "../components/user-manager";

function EditUserModal({ id_number, onClose }) {
    const { USER_INFO_FETCH, USER_UPDATE } = USER_AUTHENTICATE();
    const [show, setShow] = useState(true);
    const [state, setState] = useState({
        id_number: '',
        username: '',
        email: '',
        password: '',
        user_type: '',
    });

    //Fetch the user details
    useEffect(() => {
        USER_INFO_FETCH(id_number).then(userDetails => {
            setState(userDetails);
        });
    }, [id_number]);

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

        await USER_UPDATE(state.id_number, state.username, state.email, state.password, state.user_type);
        onClose();
        setShow(false);
    }
    
    return (
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            
            <form onSubmit={ handleUpdate }>
            <Modal.Body>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={state.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <label>Password</label>
                    <input type="password"
                        name="password"
                        placeholder="Password"
                        id="password"
                        value={ state.password }
                        onChange={ handleChange }
                        required/>
                    <label>User Type</label>
                    <select
                        name="user_type"
                        value={state.user_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Type</option>
                        <option value="Admin">Admin</option>
                        <option value="Guard">Security Guard</option>
                    </select>
                
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

export default EditUserModal;