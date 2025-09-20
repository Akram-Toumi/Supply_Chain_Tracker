import Layout from '../layouts/Layout';
import { Routes, Route } from 'react-router-dom';
import TransporterOverview from './transporter/TransporterOverview';
import TransporterShipments from './transporter/TransporterShipments';
import TransporterRoutes from './transporter/TransporterRoutes';
import TransporterReports from './transporter/TransporterReports';
import TransporterTracking from './transporter/TransporterTracking';
import DashboardSidebar from '../components/DashboardSidebar';

const TransporterDashboard = () => {
  const sidebarItems = [
    {
      title: 'Overview',
      path: '/transporter',
      icon: 'dashboard'
    },
    {
      title: 'Shipments',
      path: '/transporter/shipments',
      icon: 'local_shipping'
    },
    {
      title: 'Routes',
      path: '/transporter/routes',
      icon: 'map'
    },
    {
      title: 'Tracking',
      path: '/transporter/tracking',
      icon: 'gps_fixed'
    },
    {
      title: 'Reports',
      path: '/transporter/reports',
      icon: 'assessment'
    }
  ];

  return (
    <Layout sidebar={<DashboardSidebar items={sidebarItems} />}>
      <Routes>
        <Route path="/" element={<TransporterOverview />} />
        <Route path="shipments" element={<TransporterShipments />} />
        <Route path="routes" element={<TransporterRoutes />} />
        <Route path="tracking" element={<TransporterTracking />} />
        <Route path="reports" element={<TransporterReports />} />
      </Routes>
    </Layout>
  );
};

export default TransporterDashboard;
