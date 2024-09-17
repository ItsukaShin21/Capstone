import React, { useState } from 'react';
import './VehicleRegistration.css'; 

function VehicleRegistration() {
  const [plateNo, setPlateNo] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., sending data to backend)
    console.log('Vehicle Registered:', { plateNo, title });
  };

  // Dummy user data
  const dummyUser = {
    name: "John Doe",
    userType: "Admin", // Sample user type
    photo: "https://via.placeholder.com/40", 
  };

  return (
    <div className="container mt-5">
      <div className="profile-section d-flex justify-content-end align-items-center mb-4">
        <div className="text-end me-2">
          <span className="fw-bold">{dummyUser.name}</span> 
          <br />
          <span className="text-muted small">{dummyUser.userType}</span> 
        </div>
        <img
          src={dummyUser.photo}
          alt="User"
          className="rounded-circle"
          width="40"
          height="40"
        />
      </div>

      <h1 className="mb-4">Vehicle Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="plateNo" className="form-label">Plate No.</label>
          <input 
            type="text" 
            className="form-control" 
            id="plateNo" 
            placeholder="Enter Plate No." 
            value={plateNo}
            onChange={(e) => setPlateNo(e.target.value)}
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title (e.g., Faculty)</label>
          <select 
            className="form-select" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            required
          >
            <option value="" disabled>Select Title</option>
            <option value="Faculty">Faculty</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Register Vehicle</button>
      </form>
    </div>
  );
}

export default VehicleRegistration;
