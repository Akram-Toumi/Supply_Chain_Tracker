import Layout from '../layouts/Layout';
import { Routes, Route } from 'react-router-dom';
import DistributorOverview from './distributor/DistributorOverview';
import DistributorInventory from './distributor/DistributorInventory';
import DashboardSidebar from '../components/DashboardSidebar';

const DistributorDashboard = () => {
  const sidebarItems = [
    {
      title: 'Overview',
      path: '/distributor',
      icon: 'dashboard'
    },
    {
      title: 'Inventory',
      path: '/distributor/inventory',
      icon: 'inventory_2'
    }
  ];

  return (
    <Layout sidebar={<DashboardSidebar items={sidebarItems} />}>
      <Routes>
        <Route path="/" element={<DistributorOverview />} />
        <Route path="inventory" element={<DistributorInventory />} />
      </Routes>
    </Layout>
  );
};

export default DistributorDashboard;
