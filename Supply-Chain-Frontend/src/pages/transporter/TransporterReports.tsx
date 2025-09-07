import { useState } from 'react';

interface Report {
  id: string;
  title: string;
  type: 'delivery' | 'incident' | 'maintenance' | 'temperature';
  status: 'completed' | 'pending' | 'draft';
  date: string;
  details: {
    routeId?: string;
    vehicleId?: string;
    description: string;
    attachments?: number;
  };
}

const TransporterReports = () => {
  const [reports] = useState<Report[]>([
    {
      id: 'REP001',
      title: 'Daily Delivery Report',
      type: 'delivery',
      status: 'completed',
      date: '2025-09-06',
      details: {
        routeId: 'RT001',
        vehicleId: 'TRK-001',
        description: 'All deliveries completed successfully. No delays reported.',
        attachments: 2
      }
    },
    {
      id: 'REP002',
      title: 'Temperature Monitoring Report',
      type: 'temperature',
      status: 'pending',
      date: '2025-09-06',
      details: {
        routeId: 'RT001',
        vehicleId: 'TRK-001',
        description: 'Temperature logs for refrigerated transport of fresh produce.',
        attachments: 1
      }
    },
    {
      id: 'REP003',
      title: 'Vehicle Maintenance Check',
      type: 'maintenance',
      status: 'draft',
      date: '2025-09-06',
      details: {
        vehicleId: 'TRK-002',
        description: 'Routine maintenance check and inspection report.',
        attachments: 0
      }
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Reports</h2>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <span className="material-icons">add</span>
          <span>New Report</span>
        </button>
      </div>

      {/* Report Filters */}
      <div className="bg-[#1F2937] p-4 rounded-lg flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Filter by:</span>
          <select className="bg-[#374151] text-white px-3 py-1 rounded border border-gray-600">
            <option value="all">All Types</option>
            <option value="delivery">Delivery</option>
            <option value="incident">Incident</option>
            <option value="maintenance">Maintenance</option>
            <option value="temperature">Temperature</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Status:</span>
          <select className="bg-[#374151] text-white px-3 py-1 rounded border border-gray-600">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Date:</span>
          <input
            type="date"
            className="bg-[#374151] text-white px-3 py-1 rounded border border-gray-600"
          />
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map(report => (
          <div key={report.id} className="bg-[#1F2937] rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-white text-lg font-medium">{report.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    report.status === 'completed' ? 'bg-green-900 text-green-300' :
                    report.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {report.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">Report ID: {report.id}</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${
                report.type === 'delivery' ? 'bg-blue-900 text-blue-300' :
                report.type === 'incident' ? 'bg-red-900 text-red-300' :
                report.type === 'maintenance' ? 'bg-yellow-900 text-yellow-300' :
                'bg-purple-900 text-purple-300'
              }`}>
                {report.type.toUpperCase()}
              </span>
            </div>

            <div className="bg-[#374151] p-4 rounded-lg mb-4">
              <p className="text-gray-300">{report.details.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Date</p>
                <p className="text-white">{report.date}</p>
              </div>
              {report.details.routeId && (
                <div>
                  <p className="text-gray-400">Route ID</p>
                  <p className="text-white">{report.details.routeId}</p>
                </div>
              )}
              {report.details.vehicleId && (
                <div>
                  <p className="text-gray-400">Vehicle ID</p>
                  <p className="text-white">{report.details.vehicleId}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400">Attachments</p>
                <p className="text-white">{report.details.attachments || 0}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700 flex justify-end space-x-4">
              <button className="text-white hover:text-primary flex items-center space-x-1">
                <span className="material-icons text-sm">edit</span>
                <span>Edit</span>
              </button>
              <button className="text-white hover:text-primary flex items-center space-x-1">
                <span className="material-icons text-sm">download</span>
                <span>Download</span>
              </button>
              <button className="text-white hover:text-primary flex items-center space-x-1">
                <span className="material-icons text-sm">share</span>
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransporterReports;
