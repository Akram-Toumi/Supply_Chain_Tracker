import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';

import ProducerDashboard from './pages/ProducerDashboard';
import TransporterDashboard from './pages/TransporterDashboard';
import WarehouseDashboard from './pages/WarehouseDashboard';
import DistributorDashboard from './pages/DistributorDashboard';
import RetailerDashboard from './pages/RetailerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import { BlockchainProvider } from './contexts/BlockchainContext';
import './App.css';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/producer/*" element={<ProducerDashboard />} />
      <Route path="/transporter/*" element={<TransporterDashboard />} />
      <Route path="/warehouse/*" element={<WarehouseDashboard />} />
      <Route path="/distributor/*" element={<DistributorDashboard />} />
      <Route path="/retailer/*" element={<RetailerDashboard />} />
      <Route path="/customer/*" element={<CustomerDashboard />} />
      {/* Add nested routes for each dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
      <BlockchainProvider>
        <Router>
          <AppRoutes />
        </Router>
      </BlockchainProvider>
  );
}

export default App;
