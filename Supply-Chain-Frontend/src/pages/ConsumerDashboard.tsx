import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import ConsumerOverview from './consumer/ConsumerOverview';
import ProductScanner from './consumer/ProductScanner';
import ProductHistory from './consumer/ProductHistory';
import ProductAuthenticity from './consumer/ProductAuthenticity';
import DashboardSidebar from '../components/DashboardSidebar';

const ConsumerDashboard = () => {
  const sidebarItems = [
    {
      title: 'Overview',
      path: '/consumer',
      icon: 'dashboard'
    },
    {
      title: 'Scan Product',
      path: '/consumer/scan',
      icon: 'qr_code_scanner'
    },
    {
      title: 'Product History',
      path: '/consumer/history',
      icon: 'history'
    },
    {
      title: 'Verify Authenticity',
      path: '/consumer/verify',
      icon: 'verified_user'
    }
  ];

  return (
    <Layout sidebar={<DashboardSidebar items={sidebarItems} />}>
      <Routes>
        <Route path="/" element={<ConsumerOverview />} />
        <Route path="/scan" element={<ProductScanner />} />
        <Route path="/history" element={<ProductHistory />} />
        <Route path="/verify" element={<ProductAuthenticity />} />
      </Routes>
    </Layout>
  );

};export default ConsumerDashboard;
