import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import RegisterListPage from './pages/register-list-page';
import HomePage from './pages/home-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" 
               element={<Navigate to ="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-list" element={<RegisterListPage />} />
        <Route path="/home" element={<HomePage />}/>
      </Routes>
    </Router>
  );
}

export default App;
