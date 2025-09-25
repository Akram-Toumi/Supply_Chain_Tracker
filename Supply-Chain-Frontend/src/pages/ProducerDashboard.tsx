import Layout from '../layouts/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProducerOverview from './producer/ProducerOverview';
import ProductsList from './producer/ProductsList';
import DashboardSidebar from '../components/DashboardSidebar';

const ProducerDashboard = () => {
  const sidebarItems = [
    {
      title: 'Overview',
      path: '/producer/overview',
      icon: 'dashboard'
    },
    {
      title: 'Products',
      path: '/producer/products',
      icon: 'inventory_2'
    }
  ];

  return (
    <Layout sidebar={<DashboardSidebar items={sidebarItems} />}>
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<ProducerOverview />} />
        <Route path="products" element={<ProductsList />} />
      </Routes>
    </Layout>
  );
};

export default ProducerDashboard;
