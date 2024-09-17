import React, { useState, useEffect } from 'react';
import { Container, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EntranceDisplay.css';

function EntranceDisplay() {
  const [showAuthorizedModal, setShowAuthorizedModal] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
  const [showTypeSelectionModal, setShowTypeSelectionModal] = useState(false);

  const [detectedPlate, setDetectedPlate] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(true); // Simulate authorized/unauthorized status
  const [plateType, setPlateType] = useState(''); // For unauthorized plates

  // Simulate plate detection
  useEffect(() => {
    // Simulate detecting a plate number after a delay
    const timer = setTimeout(() => {
      setDetectedPlate('XYZ789'); // Dummy plate number
      setIsAuthorized(false); // Simulate unauthorized status
      setShowUnauthorizedModal(true);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleAuthorizedClose = () => setShowAuthorizedModal(false);
  const handleUnauthorizedClose = () => setShowUnauthorizedModal(false);
  const handleTypeSelectionClose = () => setShowTypeSelectionModal(false);

  const handleAllow = () => {
    setShowUnauthorizedModal(false);
    setShowTypeSelectionModal(true);
  };

  const handleDeny = () => {
    console.log(`Plate No ${detectedPlate} has been Denied`);
    handleUnauthorizedClose();
  };

  const handleTypeConfirm = () => {
    console.log(`Plate No ${detectedPlate} has been Allowed as ${plateType}`);
    handleTypeSelectionClose();
  };

  return (
    <Container fluid className="entrance-display">
      <div className="camera-feed-placeholder">
        {/* Placeholder for camera feed, replace with actual video stream */}
        <img src="https://via.placeholder.com/1920x1080" alt="Camera feed" className="camera-feed" />
      </div>

      {/* Authorized Notification Modal */}
      {!showUnauthorizedModal && !showTypeSelectionModal && (
        <Modal show={isAuthorized} onHide={handleAuthorizedClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Authorized</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label><strong>Plate No:</strong></Form.Label>
              <Form.Control
                type="text"
                value={detectedPlate || 'ABC123'} // Dummy plate number
                readOnly
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleAuthorizedClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Unauthorized Notification Modal */}
      <Modal show={showUnauthorizedModal} onHide={handleUnauthorizedClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Unauthorized</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label><strong>Plate No:</strong></Form.Label>
            <Form.Control
              type="text"
              value={detectedPlate}
              readOnly
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeny}>
            Deny
          </Button>
          <Button variant="success" onClick={handleAllow}>
            Allow
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Type Selection Modal */}
      <Modal show={showTypeSelectionModal} onHide={handleTypeSelectionClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label><strong>Plate No:</strong></Form.Label>
            <Form.Control
              type="text"
              value={detectedPlate}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label><strong>Type:</strong></Form.Label>
            <Form.Control
              as="select"
              value={plateType}
              onChange={(e) => setPlateType(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Drop-off">Drop-off</option>
              <option value="Visitor">Visitor</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleTypeSelectionClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleTypeConfirm} disabled={!plateType}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default EntranceDisplay;
