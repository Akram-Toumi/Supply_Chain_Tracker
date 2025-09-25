import Layout from '../layouts/Layout';
import { Routes, Route } from 'react-router-dom';
import TransporterOverview from './transporter/TransporterOverview';
import TransporterReceive from './transporter/TransporterReceive';
import DashboardSidebar from '../components/DashboardSidebar';

const TransporterDashboard = () => {
  const sidebarItems = [
    {
      title: 'Overview',
      path: '/transporter',
      icon: 'dashboard'
    },
    {
      title: 'Receive Products',
      path: '/transporter/receive',
      icon: 'inventory'
    }
  ];

  return (
    <Layout sidebar={<DashboardSidebar items={sidebarItems} />}>
      <Routes>
        <Route path="/" element={<TransporterOverview />} />
        <Route path="receive" element={<TransporterReceive />} />
      </Routes>
    </Layout>
  );
};

export default TransporterDashboard;
