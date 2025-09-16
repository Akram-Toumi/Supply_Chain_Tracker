import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProducerDashboard from './pages/ProducerDashboard';
import TransporterDashboard from './pages/TransporterDashboard';
import WarehouseDashboard from './pages/WarehouseDashboard';
import DistributorDashboard from './pages/DistributorDashboard';
import ConsumerDashboard from './pages/ConsumerDashboard';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/producer/*" element={<ProducerDashboard />} />
      <Route path="/transporter/*" element={<TransporterDashboard />} />
      <Route path="/warehouse/*" element={<WarehouseDashboard />} />
      <Route path="/distributor/*" element={<DistributorDashboard />} />
      <Route path="/consumer/*" element={<ConsumerDashboard />} />
      {/* Add nested routes for each dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
