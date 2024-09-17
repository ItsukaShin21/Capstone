import { Link } from 'react-router-dom';
import './Sidebar.css'; 

function Sidebar() {
  return (
    <div className="sidebar bg-dark vh-100 p-3 d-flex flex-column justify-content-between">
      <div>
        <div className="logo-container mb-4">
          {/* Add logo image here */}
          <img src="path-to-logo.png" alt="Logo" className="img-fluid" /> 
        </div>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/entrance-display" className="nav-link text-light fs-6 py-2 px-3 active-link">
              Entrance Display
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/locator" className="nav-link text-light fs-6 py-2 px-3 active-link">
              Locator
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/security-guards" className="nav-link text-light fs-6 py-2 px-3">
              Security Guards
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/cso-list" className="nav-link text-light fs-6 py-2 px-3">
              CSO
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/vehicle-registration" className="nav-link text-light fs-6 py-2 px-3">
              Vehicle Registration
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/registered-vehicles" className="nav-link text-light fs-6 py-2 px-3">
              Registered Vehicles
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/daily-logs" className="nav-link text-light fs-6 py-2 px-3">
              Daily Logs
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/log-records" className="nav-link text-light fs-6 py-2 px-3">
              Log Records
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-auto">
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/login" className="nav-link text-light fs-6 py-2 px-3">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
