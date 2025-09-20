import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import WarehouseOverview from './warehouse/WarehouseOverview';
import WarehouseStorage from './warehouse/WarehouseStorage';
import WarehouseShipments from './warehouse/WarehouseShipments';
import DashboardSidebar from '../components/DashboardSidebar';

const WarehouseDashboard = () => {
  const sidebarItems = [
    {
      title: 'Overview',
      path: '/warehouse',
      icon: 'dashboard'
    },
    {
      title: 'Storage Management',
      path: '/warehouse/storage',
      icon: 'warehouse'
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
        <Route path="/storage" element={<WarehouseStorage />} />
        <Route path="/shipments" element={<WarehouseShipments />} />
      </Routes>
    </Layout>
  );
};

export default WarehouseDashboard;
