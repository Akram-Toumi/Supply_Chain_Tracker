import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Supply Chain
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/producer" className="hover:text-gray-300">Producer</Link>
            <Link to="/transporter" className="hover:text-gray-300">Transporter</Link>
            <Link to="/warehouse" className="hover:text-gray-300">Warehouse</Link>
            <Link to="/distributor" className="hover:text-gray-300">Distributor</Link>
            <Link to="/consumer" className="hover:text-gray-300">Consumer</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
