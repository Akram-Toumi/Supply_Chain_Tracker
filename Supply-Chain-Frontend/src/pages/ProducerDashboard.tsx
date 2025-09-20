import Layout from '../layouts/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProducerOverview from './producer/ProducerOverview';
import ProductsList from './producer/ProductsList';
import BatchesList from './producer/BatchesList';
import CertificationsList from './producer/CertificationsList';
import Analytics from './producer/Analytics';
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
    },
    {
      title: 'Batches',
      path: '/producer/batches',
      icon: 'inventory'
    },
    {
      title: 'Certifications',
      path: '/producer/certifications',
      icon: 'verified'
    },
    {
      title: 'Analytics',
      path: '/producer/analytics',
      icon: 'analytics'
    }
  ];

  return (
    <Layout sidebar={<DashboardSidebar items={sidebarItems} />}>
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<ProducerOverview />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="batches" element={<BatchesList />} />
        <Route path="certifications" element={<CertificationsList />} />
        <Route path="analytics" element={<Analytics />} />
      </Routes>
    </Layout>
  );
};

export default ProducerDashboard;
