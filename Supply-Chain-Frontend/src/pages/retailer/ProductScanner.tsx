import { useState } from 'react';

interface ProductDetails {
  name: string;
  id: string;
  manufacturer: string;
  certifications: string[];
  isAuthentic: boolean;
  productionDate: string;
  expiryDate: string;
  batchNumber: string;
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  sustainabilityScore: number;
  carbonFootprint: string;
}

const ProductScanner = () => {
  const [qrCode, setQrCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ProductDetails | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setScanResult({
        name: 'Organic Coffee Beans',
        id: '123456/890',
        manufacturer: 'Green Bean Co.',
        certifications: ['Certified Organic', 'Fair Trade Certified', 'Rainforest Alliance'],
        isAuthentic: true,
        productionDate: '2025-08-15',
        expiryDate: '2026-08-15',
        batchNumber: 'BATCH2025081501',
        nutritionalInfo: {
          calories: 2,
          protein: 0.1,
          carbs: 0,
          fats: 0.1
        },
        sustainabilityScore: 9.2,
        carbonFootprint: '0.8 kg CO2e'
      });
      setIsScanning(false);
    }, 1500);
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQrCode(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Retailer Product Scanner</h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4 bg-[#374151] p-3 rounded">
              <span className="material-icons text-gray-400">qr_code_scanner</span>
              <input
                type="text"
                placeholder="Scan or enter product code"
                className="bg-transparent text-white w-full focus:outline-none"
                value={qrCode}
                onChange={handleManualInput}
              />
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={handleScan}
                disabled={isScanning}
                className={`flex-1 px-4 py-2 rounded flex items-center justify-center space-x-2 ${
                  isScanning
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-dark'
                }`}
              >
                <span className="material-icons">qr_code_scanner</span>
                <span>{isScanning ? 'Scanning...' : 'Scan Product'}</span>
              </button>
              <button
                onClick={handleScan}
                disabled={!qrCode || isScanning}
                className={`flex-1 px-4 py-2 rounded flex items-center justify-center space-x-2 ${
                  !qrCode || isScanning
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-dark'
                }`}
              >
                <span className="material-icons">search</span>
                <span>Verify</span>
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Retailer Scanning Guide</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="material-icons text-primary">looks_one</span>
              <p className="text-gray-300">Scan product QR codes to verify inventory and track product authenticity</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="material-icons text-primary">looks_two</span>
              <p className="text-gray-300">Verify product authenticity and check supply chain history for customer confidence</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="material-icons text-primary">looks_3</span>
              <p className="text-gray-300">Access complete product details, certifications, and supply chain transparency for customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scan Result */}
      {scanResult && (
        <div className="bg-[#1F2937] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Scan Result</h3>
            <span className={`px-3 py-1 rounded-full flex items-center space-x-1 ${
              scanResult.isAuthentic ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
            }`}>
              <span className="material-icons text-sm">
                {scanResult.isAuthentic ? 'verified' : 'gpp_bad'}
              </span>
              <span>{scanResult.isAuthentic ? 'Authentic' : 'Suspicious'}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Product Name</p>
                <p className="text-white text-lg font-medium">{scanResult.name}</p>
              </div>
              <div>
                <p className="text-gray-400">Manufacturer</p>
                <p className="text-white">{scanResult.manufacturer}</p>
              </div>
              <div>
                <p className="text-gray-400">Product ID</p>
                <p className="text-white">{scanResult.id}</p>
              </div>
              <div>
                <p className="text-gray-400">Batch Number</p>
                <p className="text-white">{scanResult.batchNumber}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Production Date</p>
                <p className="text-white">{scanResult.productionDate}</p>
              </div>
              <div>
                <p className="text-gray-400">Expiry Date</p>
                <p className="text-white">{scanResult.expiryDate}</p>
              </div>
              <div>
                <p className="text-gray-400">Sustainability Score</p>
                <div className="flex items-center space-x-2">
                  <p className="text-white">{scanResult.sustainabilityScore}/10</p>
                  <div className="flex-1 h-2 bg-[#374151] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${(scanResult.sustainabilityScore / 10) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-gray-400">Carbon Footprint</p>
                <p className="text-white">{scanResult.carbonFootprint}</p>
              </div>
            </div>

            {scanResult.nutritionalInfo && (
              <div className="md:col-span-2">
                <h4 className="text-white font-medium mb-3">Nutritional Information</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#374151] p-3 rounded-lg text-center">
                    <p className="text-gray-400 text-sm">Calories</p>
                    <p className="text-white font-medium">{scanResult.nutritionalInfo.calories}kcal</p>
                  </div>
                  <div className="bg-[#374151] p-3 rounded-lg text-center">
                    <p className="text-gray-400 text-sm">Protein</p>
                    <p className="text-white font-medium">{scanResult.nutritionalInfo.protein}g</p>
                  </div>
                  <div className="bg-[#374151] p-3 rounded-lg text-center">
                    <p className="text-gray-400 text-sm">Carbs</p>
                    <p className="text-white font-medium">{scanResult.nutritionalInfo.carbs}g</p>
                  </div>
                  <div className="bg-[#374151] p-3 rounded-lg text-center">
                    <p className="text-gray-400 text-sm">Fats</p>
                    <p className="text-white font-medium">{scanResult.nutritionalInfo.fats}g</p>
                  </div>
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <h4 className="text-white font-medium mb-3">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {scanResult.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#374151] text-white rounded-full text-sm flex items-center space-x-1"
                  >
                    <span className="material-icons text-primary text-sm">verified</span>
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScanner;
