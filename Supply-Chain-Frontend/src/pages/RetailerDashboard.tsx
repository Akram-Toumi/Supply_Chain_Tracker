import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import RetailerOverview from './retailer/RetailerOverview';
import ProductScanner from './retailer/ProductScanner';
import DashboardSidebar from '../components/DashboardSidebar';

const RetailerDashboard = () => {
  const sidebarItems = [
    {
      title: 'Overview',
      path: '/retailer',
      icon: 'dashboard'
    },
    {
      title: 'Inventory Management',
      path: '/retailer/inventory',
      icon: 'inventory'
    }
  ];

  return (
    <Layout sidebar={<DashboardSidebar items={sidebarItems} />}>
      <Routes>
        <Route path="/" element={<RetailerOverview />} />
        <Route path="/inventory" element={<ProductScanner />} />
      </Routes>
    </Layout>
  );

};

export default RetailerDashboard;
