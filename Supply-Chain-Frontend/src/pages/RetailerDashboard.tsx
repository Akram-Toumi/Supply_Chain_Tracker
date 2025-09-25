import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import RetailerOverview from './retailer/RetailerOverview';
import ProductScanner from './retailer/ProductScanner';
import ProductHistory from './retailer/ProductHistory';
import ProductAuthenticity from './retailer/ProductAuthenticity';
import DashboardSidebar from '../components/DashboardSidebar';

const RetailerDashboard = () => {
  const sidebarItems = [
    {
      title: 'Overview',
      path: '/retailer',
      icon: 'dashboard'
    },
    {
      title: 'Scan Product',
      path: '/retailer/scan',
      icon: 'qr_code_scanner'
    },
    {
      title: 'Product History',
      path: '/retailer/history',
      icon: 'history'
    },
    {
      title: 'Verify Authenticity',
      path: '/retailer/verify',
      icon: 'verified_user'
    }
  ];

  return (
    <Layout sidebar={<DashboardSidebar items={sidebarItems} />}>
      <Routes>
        <Route path="/" element={<RetailerOverview />} />
        <Route path="/scan" element={<ProductScanner />} />
        <Route path="/history" element={<ProductHistory />} />
        <Route path="/verify" element={<ProductAuthenticity />} />
      </Routes>
    </Layout>
  );

};

export default RetailerDashboard;
