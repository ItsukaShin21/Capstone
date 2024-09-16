import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

function ConfirmationModal({ onDelete }) {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
    };

    return (
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure??</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={ handleClose }>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => { onDelete(); } }>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal;