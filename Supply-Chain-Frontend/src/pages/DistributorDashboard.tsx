import Layout from '../layouts/Layout';
import { Routes, Route } from 'react-router-dom';
import DistributorOverview from './distributor/DistributorOverview';
import DistributorInventory from './distributor/DistributorInventory';
import DistributorOrders from './distributor/DistributorOrders';
import DistributorVerification from './distributor/DistributorVerification';
import DistributorAnalytics from './distributor/DistributorAnalytics';
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
    },
    {
      title: 'Orders',
      path: '/distributor/orders',
      icon: 'shopping_cart'
    },
    {
      title: 'Verification',
      path: '/distributor/verification',
      icon: 'verified'
    },
    {
      title: 'Analytics',
      path: '/distributor/analytics',
      icon: 'analytics'
    }
  ];

  return (
    <Layout sidebar={<DashboardSidebar items={sidebarItems} />}>
      <Routes>
        <Route path="/" element={<DistributorOverview />} />
        <Route path="inventory" element={<DistributorInventory />} />
        <Route path="orders" element={<DistributorOrders />} />
        <Route path="verification" element={<DistributorVerification />} />
        <Route path="analytics" element={<DistributorAnalytics />} />
      </Routes>
    </Layout>
  );
};

export default DistributorDashboard;
