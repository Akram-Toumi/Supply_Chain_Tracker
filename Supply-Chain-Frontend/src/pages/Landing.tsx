import { Link } from 'react-router-dom';
import { ShieldCheckIcon, EyeIcon, ClockIcon, CubeIcon, ChartBarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Logo from '../components/Logo';

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-background-dark text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background-dark to-background-card"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary/15 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-primary/20 rounded-full blur-xl animate-pulse delay-3000"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(76,175,80,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(76,175,80,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Header/Navigation */}
      <header className="absolute top-0 w-full z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Logo />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">ChainTrack</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="#" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105">About</Link>
              <Link to="#" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105">Features</Link>
              <Link to="#" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105">Pricing</Link>
              <Link to="#" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative min-h-screen flex items-center">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          {/* Hero Section */}
          <div className="text-center mb-20">
            {/* Web3 Badge */}
            <div className="inline-flex items-center px-4 py-2 mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-full backdrop-blur-sm">
              <CubeIcon className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Powered by Blockchain Technology</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Track Your Supply Chain
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                with Confidence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Revolutionize your supply chain with our <span className="text-primary font-semibold">blockchain-powered</span> tracking system.
              Gain complete transparency, build unshakeable trust, and optimize operations with immutable records.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <button className="group px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 rounded-xl font-semibold text-white shadow-2xl shadow-primary/25 hover:shadow-primary/40 transform hover:scale-105 hover:-translate-y-1">
                <span className="flex items-center justify-center">
                  Get Started
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <button className="group px-8 py-4 border-2 border-gray-600 hover:border-primary hover:text-primary transition-all duration-300 rounded-xl font-semibold backdrop-blur-sm hover:bg-white/5 transform hover:scale-105">
                <span className="flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  View Demo
                </span>
              </button>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-gray-400">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-gray-400">Products Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-400">Real-time Monitoring</div>
              </div>
            </div>
          </div>

          {/* User Roles Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Choose Your Role
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Access your specialized <span className="text-primary font-semibold">blockchain-powered</span> dashboard based on your role in the supply chain ecosystem.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link to="/producer" className="group relative bg-gradient-to-br from-background-card to-background-card/50 p-8 rounded-2xl border border-gray-800/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons text-primary text-3xl">agriculture</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">Producer Dashboard</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Register and manage product batches, track production, and maintain certifications on the blockchain.</p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Access Dashboard
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              
              <Link to="/distributor" className="group relative bg-gradient-to-br from-background-card to-background-card/50 p-8 rounded-2xl border border-gray-800/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons text-primary text-3xl">store</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">Distributor Dashboard</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Manage retail operations, track inventory, and verify product authenticity with blockchain verification.</p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Access Dashboard
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              <Link to="/warehouse" className="group relative bg-gradient-to-br from-background-card to-background-card/50 p-8 rounded-2xl border border-gray-800/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons text-primary text-3xl">warehouse</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">Warehouse Dashboard</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Monitor storage conditions, manage inventory, and track product movements with real-time blockchain updates.</p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Access Dashboard
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              <Link to="/transporter" className="group relative bg-gradient-to-br from-background-card to-background-card/50 p-8 rounded-2xl border border-gray-800/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons text-primary text-3xl">local_shipping</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">Transporter Dashboard</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Track shipments, update delivery status, and manage transportation routes with immutable blockchain records.</p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Access Dashboard
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              <Link to="/retailer" className="group relative bg-gradient-to-br from-background-card to-background-card/50 p-8 rounded-2xl border border-gray-800/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons text-primary text-3xl">store</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">Retailer Dashboard</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Manage retail operations, verify product authenticity, and provide customer transparency through blockchain verification.</p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Access Dashboard
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              <Link to="/customer" className="group relative bg-gradient-to-br from-background-card to-background-card/50 p-8 rounded-2xl border border-gray-800/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons text-primary text-3xl">shopping_cart</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">Customer Dashboard</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Browse products, scan QR codes, and verify product authenticity and complete history on the blockchain.</p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Access Dashboard
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-32">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Our <span className="text-primary font-semibold">blockchain-powered</span> system ensures complete transparency and security throughout your supply chain journey.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection Lines */}
              <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 transform -translate-y-1/2"></div>
              
              <div className="group relative bg-gradient-to-br from-background-card to-background-card/50 p-8 rounded-2xl border border-gray-800/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl font-bold">1</span>
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">Product Registration</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Register your products on the <span className="text-primary font-semibold">blockchain</span>, creating a unique digital identity and immutable record for each item.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-gradient-to-br from-background-card to-background-card/50 p-8 rounded-2xl border border-gray-800/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl font-bold">2</span>
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">Real-time Tracking</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Track your products in <span className="text-primary font-semibold">real-time</span> as they move through the supply chain, with instant blockchain updates at each stage.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-gradient-to-br from-background-card to-background-card/50 p-8 rounded-2xl border border-gray-800/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl font-bold">3</span>
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">Verification & Transparency</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Verify product authenticity and complete history with <span className="text-primary font-semibold">immutable blockchain records</span>, ensuring transparency and trust.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="mb-32">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our Application Offers
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                A comprehensive suite of <span className="text-primary font-semibold">blockchain-powered</span> features designed to revolutionize your supply chain management.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group relative bg-gradient-to-br from-background-card to-background-card/50 p-8 rounded-2xl border border-gray-800/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheckIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">Enhanced Security</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Leverage <span className="text-primary font-semibold">blockchain technology</span> to secure your supply chain data with cryptographic protection and prevent tampering.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-gradient-to-br from-background-card to-background-card/50 p-8 rounded-2xl border border-gray-800/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <EyeIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">Complete Transparency</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Provide stakeholders with a <span className="text-primary font-semibold">crystal-clear view</span> of product origin, movement, and handling through immutable blockchain records.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-gradient-to-br from-background-card to-background-card/50 p-8 rounded-2xl border border-gray-800/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ClockIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">Real-time Tracking</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Monitor your products in <span className="text-primary font-semibold">real-time</span>, from origin to delivery, with instant blockchain updates and smart alerts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Section */}
          <div className="relative mb-32">
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-primary/5 to-transparent opacity-60"></div>
            <div className="relative bg-gradient-to-br from-background-card/30 to-background-card/10 rounded-3xl p-12 border border-gray-800/30 backdrop-blur-sm">
              <div className="text-center">
                <div className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full backdrop-blur-sm">
                  <CubeIcon className="w-6 h-6 text-primary mr-3" />
                  <span className="text-lg font-semibold text-primary">Blockchain Technology</span>
                </div>
                
                <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Powered by Blockchain
                </h2>
                
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                  Our application utilizes <span className="text-primary font-semibold">cutting-edge blockchain technology</span> to ensure the integrity and security of your supply chain data. Each transaction and product movement is recorded on a distributed ledger, making it virtually impossible to alter or tamper with the information.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <GlobeAltIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Decentralized</h3>
                    <p className="text-gray-400">No single point of failure</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <ShieldCheckIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Immutable</h3>
                    <p className="text-gray-400">Records cannot be altered</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <EyeIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Transparent</h3>
                    <p className="text-gray-400">Complete visibility for all</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="relative text-center text-gray-400 pt-16 border-t border-gray-800/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-8 mb-12">
                <div className="text-left">
                  <div className="flex items-center space-x-3 mb-4">
                    <Logo />
                    <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">ChainTrack</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Revolutionizing supply chain management with blockchain technology for complete transparency and security.
                  </p>
                </div>
                
                <div className="text-left">
                  <h4 className="text-white font-semibold mb-4">Product</h4>
                  <div className="space-y-2">
                    <Link to="#" className="block text-sm hover:text-primary transition-colors">Features</Link>
                    <Link to="#" className="block text-sm hover:text-primary transition-colors">Pricing</Link>
                    <Link to="#" className="block text-sm hover:text-primary transition-colors">Documentation</Link>
                    <Link to="#" className="block text-sm hover:text-primary transition-colors">API</Link>
                  </div>
                </div>
                
                <div className="text-left">
                  <h4 className="text-white font-semibold mb-4">Company</h4>
                  <div className="space-y-2">
                    <Link to="#" className="block text-sm hover:text-primary transition-colors">About Us</Link>
                    <Link to="#" className="block text-sm hover:text-primary transition-colors">Careers</Link>
                    <Link to="#" className="block text-sm hover:text-primary transition-colors">Contact</Link>
                    <Link to="#" className="block text-sm hover:text-primary transition-colors">Blog</Link>
                  </div>
                </div>
                
                <div className="text-left">
                  <h4 className="text-white font-semibold mb-4">Legal</h4>
                  <div className="space-y-2">
                    <Link to="#" className="block text-sm hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link to="#" className="block text-sm hover:text-primary transition-colors">Terms of Service</Link>
                    <Link to="#" className="block text-sm hover:text-primary transition-colors">Cookie Policy</Link>
                    <Link to="#" className="block text-sm hover:text-primary transition-colors">GDPR</Link>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-800/30 pt-8">
                <p className="text-sm text-gray-500">© 2024 ChainTrack. All rights reserved. Built with blockchain technology.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Landing;
