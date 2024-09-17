import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

// Import the components for pages without sidebar
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import RegisterListPage from './pages/register-list-page';
import HomePage from './pages/home-page';
import RegistrationForm from './pages/RegistrationForm'; // Import RegistrationForm


// Import the components for pages with sidebar
import Sidebar from './components/Sidebar';
import EntranceDisplay from './pages/EntranceDisplay';
import Locator from './pages/Locator';
import SecurityGuardsList from './pages/SecurityGuardsList';
import CSOList from './pages/CSOList';
import VehicleRegistration from './pages/VehicleRegistration';
import RegisteredVehicles from './pages/RegisteredVehicles';
import DailyLogs from './pages/DailyLogs';
import LogRecords from './pages/LogRecords';


import './styles.css'; // Import your CSS file

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  
  // Paths where the sidebar should not be displayed
  const hideSidebarPaths = ["/login", "/register", "/register-list", "/home", "/registrationform"];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  return (
    <div className="app-container">
      {/* Conditionally render the sidebar */}
      {!shouldHideSidebar && <Sidebar />}

      <div className={`content ${shouldHideSidebar ? 'full-width' : ''}`}> {/* Use full-width when sidebar is hidden */}
        <Routes>
          {/* Routes without sidebar */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-list" element={<RegisterListPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/registrationform" element={<RegistrationForm />} /> {/* Updated this route */}

          
          {/* Routes with sidebar */}
          <Route path="/entrance-display" element={<EntranceDisplay />} />
          <Route path="/locator" element={<Locator />} />
          <Route path="/security-guards" element={<SecurityGuardsList />} />
          <Route path="/cso-list" element={<CSOList />} />
          <Route path="/vehicle-registration" element={<VehicleRegistration />} />
          <Route path="/registered-vehicles" element={<RegisteredVehicles />} />
          <Route path="/daily-logs" element={<DailyLogs />} />
          <Route path="/log-records" element={<LogRecords />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
