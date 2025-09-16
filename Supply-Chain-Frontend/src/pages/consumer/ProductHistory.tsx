import { useState } from 'react';

interface JourneyStep {
  stage: string;
  location: string;
  timestamp: string;
  temperature?: string;
  humidity?: string;
  verifiedBy?: string;
  icon: string;
}

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  journeySteps: JourneyStep[];
}

const ProductHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const [products] = useState<Product[]>([
    {
      id: 'PRD001',
      name: 'Organic Coffee Beans',
      manufacturer: 'Green Bean Co.',
      journeySteps: [
        {
          stage: 'Harvested',
          location: 'Coffee Farm, Colombia',
          timestamp: '2025-08-01 08:00',
          verifiedBy: 'Farm Inspector',
          icon: 'agriculture'
        },
        {
          stage: 'Processing',
          location: 'Processing Facility, Colombia',
          timestamp: '2025-08-02 10:30',
          temperature: '24°C',
          humidity: '65%',
          verifiedBy: 'Quality Control',
          icon: 'precision_manufacturing'
        },
        {
          stage: 'Packaging',
          location: 'Packaging Center, Colombia',
          timestamp: '2025-08-03 14:15',
          temperature: '22°C',
          humidity: '60%',
          verifiedBy: 'Packaging Supervisor',
          icon: 'inventory_2'
        },
        {
          stage: 'Shipping',
          location: 'In Transit',
          timestamp: '2025-08-05 09:45',
          temperature: '20°C',
          humidity: '55%',
          verifiedBy: 'Logistics Manager',
          icon: 'local_shipping'
        },
        {
          stage: 'Warehouse',
          location: 'Distribution Center',
          timestamp: '2025-08-10 11:20',
          temperature: '21°C',
          humidity: '50%',
          verifiedBy: 'Warehouse Manager',
          icon: 'warehouse'
        },
        {
          stage: 'Retail',
          location: 'Local Store',
          timestamp: '2025-08-15 08:30',
          temperature: '22°C',
          humidity: '45%',
          verifiedBy: 'Store Manager',
          icon: 'store'
        }
      ]
    }
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedProductData = products.find(p => p.id === selectedProduct);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex items-center space-x-4 bg-[#1F2937] p-3 rounded-lg w-full md:w-96">
        <span className="material-icons text-gray-400">search</span>
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent text-white w-full focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className={`bg-[#1F2937] p-4 rounded-lg cursor-pointer transition-colors ${
              selectedProduct === product.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedProduct(product.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-medium">{product.name}</h3>
                <p className="text-gray-400 text-sm">ID: {product.id}</p>
              </div>
              <span className="material-icons text-primary">history</span>
            </div>
            <p className="text-gray-400 mt-2">{product.manufacturer}</p>
          </div>
        ))}
      </div>

      {/* Journey Timeline */}
      {selectedProductData && (
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-6">Product Journey</h2>
          <div className="space-y-6">
            {selectedProductData.journeySteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index !== selectedProductData.journeySteps.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-700"></div>
                )}
                
                <div className="flex space-x-4">
                  {/* Icon */}
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[#374151] rounded-full flex items-center justify-center">
                      <span className="material-icons text-primary">{step.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="bg-[#374151] p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-medium">{step.stage}</h3>
                          <p className="text-gray-400 text-sm">{step.location}</p>
                        </div>
                        <p className="text-gray-400 text-sm">{step.timestamp}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        {step.temperature && (
                          <div className="flex items-center space-x-2">
                            <span className="material-icons text-gray-400 text-sm">thermostat</span>
                            <span className="text-gray-300 text-sm">{step.temperature}</span>
                          </div>
                        )}
                        {step.humidity && (
                          <div className="flex items-center space-x-2">
                            <span className="material-icons text-gray-400 text-sm">water_drop</span>
                            <span className="text-gray-300 text-sm">{step.humidity}</span>
                          </div>
                        )}
                        {step.verifiedBy && (
                          <div className="flex items-center space-x-2">
                            <span className="material-icons text-gray-400 text-sm">verified</span>
                            <span className="text-gray-300 text-sm">{step.verifiedBy}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductHistory;
