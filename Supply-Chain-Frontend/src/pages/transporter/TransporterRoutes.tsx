import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

interface Coordinates {
  lat: number;
  lng: number;
}

interface RouteInfo {
  id: string;
  name: string;
  type: 'regular' | 'express' | 'refrigerated';
  origin: string;
  destination: string;
  coordinates: Coordinates;
  distance: string;
  duration: string;
  stops: string[];
  status: 'active' | 'inactive';
  schedule: {
    departureTime: string;
    arrivalTime: string;
    frequency: string;
  };
}

// Fix for Leaflet default icon
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = defaultIcon;

const center: [number, number] = [40.7128, -74.0060];

const TransporterRoutes = () => {
  interface Coordinates {
    lat: number;
    lng: number;
  }

  const [routes] = useState<(RouteInfo & { coordinates: Coordinates })[]>([
    {
      id: 'RTE001',
      name: 'Farm to Warehouse Route',
      type: 'refrigerated',
      origin: 'Farm A',
      destination: 'Central Warehouse',
      coordinates: { lat: 40.7128, lng: -74.0060 }, // New York coordinates
      distance: '120km',
      duration: '2h 30m',
      stops: ['Collection Center B', 'Quality Check Point'],
      status: 'active',
      schedule: {
        departureTime: '08:00',
        arrivalTime: '10:30',
        frequency: 'Daily'
      }
    },
    {
      id: 'RTE002',
      name: 'Warehouse to Distribution',
      type: 'express',
      origin: 'Central Warehouse',
      destination: 'Distribution Center',
      coordinates: { lat: 40.7589, lng: -73.9850 }, // Manhattan coordinates
      distance: '75km',
      duration: '1h 15m',
      stops: ['Security Checkpoint'],
      status: 'active',
      schedule: {
        departureTime: '14:00',
        arrivalTime: '15:15',
        frequency: 'Mon, Wed, Fri'
      }
    }
  ]);

  return (
    <div className="space-y-6">
      {/* OpenStreetMap Container */}
      <div className="bg-gray-800 rounded-lg overflow-hidden" style={{ height: '400px' }}>
        <MapContainer 
          center={center} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {routes.map((route) => (
            <Marker
              key={route.id}
              position={[route.coordinates.lat, route.coordinates.lng]}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{route.name}</h3>
                  <p>Type: {route.type}</p>
                  <p>Status: {route.status}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Route Management</h2>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <span className="material-icons">add</span>
          <span>New Route</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {routes.map(route => (
          <div key={route.id} className="bg-[#1F2937] rounded-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-white text-lg font-medium">{route.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    route.status === 'active' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {route.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">Route ID: {route.id}</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${
                route.type === 'refrigerated' ? 'bg-blue-900 text-blue-300' :
                route.type === 'express' ? 'bg-yellow-900 text-yellow-300' :
                'bg-purple-900 text-purple-300'
              }`}>
                {route.type.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-gray-400 text-sm">Origin</p>
                <p className="text-white">{route.origin}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Destination</p>
                <p className="text-white">{route.destination}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Distance</p>
                <p className="text-white">{route.distance}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Duration</p>
                <p className="text-white">{route.duration}</p>
              </div>
            </div>

            <div className="bg-[#374151] p-4 rounded-lg mb-6">
              <h4 className="text-white font-medium mb-3">Schedule</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Departure</p>
                  <p className="text-white">{route.schedule.departureTime}</p>
                </div>
                <div>
                  <p className="text-gray-400">Arrival</p>
                  <p className="text-white">{route.schedule.arrivalTime}</p>
                </div>
                <div>
                  <p className="text-gray-400">Frequency</p>
                  <p className="text-white">{route.schedule.frequency}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Stops</h4>
              <div className="space-y-2">
                {route.stops.map((stop, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="material-icons text-primary text-sm">place</span>
                    <span className="text-gray-300">{stop}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700 flex justify-end space-x-4">
              <button className="text-white hover:text-primary flex items-center space-x-1">
                <span className="material-icons text-sm">edit</span>
                <span>Edit</span>
              </button>
              <button className="text-white hover:text-primary flex items-center space-x-1">
                <span className="material-icons text-sm">map</span>
                <span>View Map</span>
              </button>
              <button className="text-white hover:text-primary flex items-center space-x-1">
                <span className="material-icons text-sm">assignment</span>
                <span>Assign Vehicle</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransporterRoutes;
