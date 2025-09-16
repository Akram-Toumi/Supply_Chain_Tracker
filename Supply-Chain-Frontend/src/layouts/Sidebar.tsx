import { Link } from 'react-router-dom';
import { HomeIcon, TruckIcon, BuildingOfficeIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0 pt-16">
      <div className="p-4">
        <nav className="space-y-2">
          <Link to="/producer" className="flex items-center p-2 hover:bg-gray-800 rounded">
            <HomeIcon className="h-6 w-6 mr-2" />
            Producer Dashboard
          </Link>
          <Link to="/transporter" className="flex items-center p-2 hover:bg-gray-800 rounded">
            <TruckIcon className="h-6 w-6 mr-2" />
            Transporter Dashboard
          </Link>
          <Link to="/warehouse" className="flex items-center p-2 hover:bg-gray-800 rounded">
            <BuildingOfficeIcon className="h-6 w-6 mr-2" />
            Warehouse Dashboard
          </Link>
          <Link to="/distributor" className="flex items-center p-2 hover:bg-gray-800 rounded">
            <ShoppingBagIcon className="h-6 w-6 mr-2" />
            Distributor Dashboard
          </Link>
          <Link to="/consumer" className="flex items-center p-2 hover:bg-gray-800 rounded">
            <UserIcon className="h-6 w-6 mr-2" />
            Consumer Dashboard
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
