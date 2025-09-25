import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import WarehouseOverview from './warehouse/WarehouseOverview';
import WarehouseShipments from './warehouse/WarehouseShipments';
import WarehouseReceive from './warehouse/WarehouseReceive';
import DashboardSidebar from '../components/DashboardSidebar';

const WarehouseDashboard = () => {
  const sidebarItems = [
    {
      title: 'Overview',
      path: '/warehouse',
      icon: 'dashboard'
    },
    {
      title: 'Receive Products',
      path: '/warehouse/receive',
      icon: 'inventory'
    },
    {
      title: 'Shipments',
      path: '/warehouse/shipments',
      icon: 'local_shipping'
    }
  ];

  return (
    <Layout sidebar={<DashboardSidebar items={sidebarItems} />}>
      <Routes>
        <Route path="/" element={<WarehouseOverview />} />
        <Route path="/receive" element={<WarehouseReceive />} />
        <Route path="/shipments" element={<WarehouseShipments />} />
      </Routes>
    </Layout>
  );
};

export default WarehouseDashboard;
