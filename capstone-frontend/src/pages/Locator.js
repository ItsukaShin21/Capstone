import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Locator.css';

function Locator() {
  return (
    <Container fluid className="locator">
      <Row>
        <Col md={6} className="camera-feed-container">
          <div className="camera-feed-placeholder">
            {/* Placeholder for camera feed 1, replace with actual video stream */}
            <img src="https://via.placeholder.com/800x600" alt="Camera feed 1" className="camera-feed" />
            <div className="camera-feed-overlay">Camera 1</div>
          </div>
        </Col>
        <Col md={6} className="camera-feed-container">
          <div className="camera-feed-placeholder">
            {/* Placeholder for camera feed 2, replace with actual video stream */}
            <img src="https://via.placeholder.com/800x600" alt="Camera feed 2" className="camera-feed" />
            <div className="camera-feed-overlay">Camera 2</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Locator;
