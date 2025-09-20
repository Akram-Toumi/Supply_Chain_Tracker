import { Link } from 'react-router-dom';
import { ShieldCheckIcon, EyeIcon, ClockIcon } from '@heroicons/react/24/outline';
import Logo from '../components/Logo';

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-background-dark text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[url('/supply-chain-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-background-dark/90 bg-gradient-to-b from-background-dark via-background-dark/95 to-background-dark"></div>
      </div>

      {/* Header/Navigation */}
      <header className="absolute top-0 w-full bg-transparent z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Logo />
              <span className="text-xl font-bold">ChainTrack</span>
            </div>
            <nav className="flex items-center space-x-8">
              <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
              <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
              <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
              <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
              <Link to="/login" className="text-sm font-medium px-4 py-2 hover:text-primary transition-colors">Login</Link>
              <Link to="/signup" className="text-sm font-medium px-4 py-2 bg-primary hover:bg-primary-dark transition-colors rounded-md">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative min-h-screen flex items-center">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Track Your Supply Chain with Confidence
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Gain full visibility and control over your supply chain with our blockchain-based tracking system.
              Transparently build trust, and optimize your operations.
            </p>
            <div className="flex justify-center gap-6">
              <button className="px-8 py-3 bg-primary hover:bg-primary-dark transition-colors rounded-md font-medium text-white shadow-lg shadow-primary/20">
                Get Started
              </button>
              <button className="px-8 py-3 border border-gray-600 hover:border-primary hover:text-primary transition-all rounded-md font-medium">
                Learn More
              </button>
            </div>
          </div>

          {/* User Roles Section */}
          <div className="mb-32">
            <h2 className="text-4xl font-bold text-center mb-4">Choose Your Role</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Access your specialized dashboard based on your role in the supply chain.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/producer" className="group bg-background-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300">
                <span className="material-icons text-primary text-3xl mb-6 group-hover:scale-110 transition-transform">agriculture</span>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">Producer Dashboard</h3>
                <p className="text-gray-400 leading-relaxed">Register and manage product batches, track production, and maintain certifications.</p>
              </Link>
              
              <Link to="/distributor" className="group bg-background-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300">
                <span className="material-icons text-primary text-3xl mb-6 group-hover:scale-110 transition-transform">store</span>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">Distributor Dashboard</h3>
                <p className="text-gray-400 leading-relaxed">Manage retail operations, track inventory, and verify product authenticity.</p>
              </Link>

              <Link to="/warehouse" className="group bg-background-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300">
                <span className="material-icons text-primary text-3xl mb-6 group-hover:scale-110 transition-transform">warehouse</span>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">Warehouse Dashboard</h3>
                <p className="text-gray-400 leading-relaxed">Monitor storage conditions, manage inventory, and track product movements.</p>
              </Link>

              <Link to="/transporter" className="group bg-background-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300">
                <span className="material-icons text-primary text-3xl mb-6 group-hover:scale-110 transition-transform">local_shipping</span>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">Transporter Dashboard</h3>
                <p className="text-gray-400 leading-relaxed">Track shipments, update delivery status, and manage transportation routes.</p>
              </Link>

              <Link to="/consumer" className="group bg-background-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300">
                <span className="material-icons text-primary text-3xl mb-6 group-hover:scale-110 transition-transform">person</span>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">Consumer Dashboard</h3>
                <p className="text-gray-400 leading-relaxed">Verify product authenticity, view product history, and track product journey.</p>
              </Link>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-32">
            <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-background-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <span className="text-primary text-lg font-bold mr-3">1.</span>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">Product Registration</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">Register your products on the blockchain, creating a unique digital identity for each item.</p>
              </div>
              <div className="group bg-background-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <span className="text-primary text-lg font-bold mr-3">2.</span>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">Real-time Tracking</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">Track your products in real-time as they move through the supply chain, with updates at each stage.</p>
              </div>
              <div className="group bg-background-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <span className="text-primary text-lg font-bold mr-3">3.</span>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">Verification & Transparency</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">Verify product authenticity and history with immutable records, ensuring transparency and trust.</p>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="mb-32">
            <h2 className="text-4xl font-bold text-center mb-4">Our Application Offers</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">A range of features designed to enhance your supply chain management.</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-background-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300">
                <ShieldCheckIcon className="h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">Enhanced Security</h3>
                <p className="text-gray-400 leading-relaxed">Leverage blockchain technology to secure your supply chain data and prevent tampering.</p>
              </div>
              <div className="group bg-background-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300">
                <EyeIcon className="h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">Complete Transparency</h3>
                <p className="text-gray-400 leading-relaxed">Provide stakeholders with a clear view of product origin, movement, and handling.</p>
              </div>
              <div className="group bg-background-card p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300">
                <ClockIcon className="h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">Real-time Tracking</h3>
                <p className="text-gray-400 leading-relaxed">Monitor your products in real-time, from origin to delivery, with instant updates and alerts.</p>
              </div>
            </div>
          </div>

          {/* Blockchain Section */}
          <div className="relative mb-32">
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-50"></div>
            <div className="relative">
              <h2 className="text-4xl font-bold text-center mb-8">Powered by Blockchain</h2>
              <p className="text-center text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Our application utilizes blockchain technology to ensure the integrity and security of your supply chain data. Each
                transaction and product movement is recorded on a distributed ledger, making it virtually impossible to alter or tamper
                with the information. This provides a transparent and trustworthy record of your products' journey, enhancing
                accountability and building trust among stakeholders.
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="relative text-center text-gray-400 pt-16 border-t border-gray-800/50">
            <div className="flex justify-center space-x-8 mb-8">
              <Link to="#" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-sm hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="#" className="text-sm hover:text-primary transition-colors">Contact Us</Link>
            </div>
            <p className="text-sm text-gray-500">© 2024 ChainTrack. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Landing;
