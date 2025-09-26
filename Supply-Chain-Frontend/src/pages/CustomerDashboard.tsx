import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import CustomerOverview from './customer/CustomerOverview';
import ProductAuthenticity from './customer/ProductAuthenticity';
import DashboardSidebar from '../components/DashboardSidebar';

const CustomerDashboard = () => {
  const sidebarItems = [
    {
      title: 'Store Products',
      path: '/customer',
      icon: 'store'
    },
    {
      title: 'Verify Authenticity',
      path: '/customer/verify',
      icon: 'verified_user'
    }
  ];

  return (
    <Layout sidebar={<DashboardSidebar items={sidebarItems} />}>
      <Routes>
        <Route path="/" element={<CustomerOverview />} />
        <Route path="/verify" element={<ProductAuthenticity />} />
      </Routes>
    </Layout>
  );
};

export default CustomerDashboard;
