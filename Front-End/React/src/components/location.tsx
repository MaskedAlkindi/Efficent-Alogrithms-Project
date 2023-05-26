import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Icon } from 'leaflet';
import { pinOutline, pinSharp } from 'ionicons/icons';
import './location.css';

type Position = [number, number]; // [lat, lon]

interface Location {
  id: number;
  name: string;
  type: string;
  position: Position;
}

const locations: Location[] = [
  { id: 2, name: 'PowerZone', type: 'Electric Stations', position: [23.6105, 58.5408] },
  { id: 3, name: 'MediCare Hospital', type: 'Hospitals', position: [23.5880, 58.3830] },
  { id: 4, name: 'FuelStop', type: 'Gas Stations', position: [23.6101, 58.4336] },
  { id: 5, name: 'Tasty Bites', type: 'Food Places', position: [23.6176, 58.5922] },
  { id: 6, name: 'StarLux Inn', type: 'Hotels', position: [23.5820, 58.4259] },
  { id: 7, name: 'EcoCharge', type: 'Electric Stations', position: [23.5969, 58.4823] },
  { id: 8, name: 'QuickFuel', type: 'Gas Stations', position: [23.6139, 58.5576] },
  { id: 9, name: 'HealthFirst Medical Center', type: 'Hospitals', position: [23.6071, 58.3891] },
  { id: 10, name: 'Foodie Haven', type: 'Food Places', position: [23.5949, 58.4112] },
  { id: 11, name: 'Desert Oasis Resort', type: 'Hotels', position: [23.6096, 58.4490] },
  { id: 12, name: 'Sunshine Charging', type: 'Electric Stations', position: [23.6087, 58.4316] },
  { id: 13, name: 'Oceanview Hospital', type: 'Hospitals', position: [23.6119, 58.5732] },
  { id: 14, name: 'QuickGas', type: 'Gas Stations', position: [23.5934, 58.4378] },
  { id: 15, name: 'Flavor Junction', type: 'Food Places', position: [23.6174, 58.4125] },
  { id: 16, name: 'Harbor Inn', type: 'Hotels', position: [23.6003, 58.3879] },
  { id: 17, name: 'EcoPower', type: 'Electric Stations', position: [23.6052, 58.5327] },
  { id: 18, name: 'SpeedyFuel', type: 'Gas Stations', position: [23.6229, 58.4103] },
  { id: 19, name: 'Healing Haven', type: 'Hospitals', position: [23.5867, 58.4441] },
  { id: 20, name: 'Cuisine Delight', type: 'Food Places', position: [23.6039, 58.5521] },
  { id: 21, name: 'Seaside Resort', type: 'Hotels', position: [23.5808, 58.4036] },
  { id: 22, name: 'EnergyCharge', type: 'Electric Stations', position: [23.5958, 58.4097] },
  { id: 23, name: 'Royal Hospital', type: 'Hospitals', position: [23.6124, 58.4293] },
  { id: 24, name: 'PetrolZone', type: 'Gas Stations', position: [23.6013, 58.4548] },
  { id: 25, name: 'Gourmet Delight', type: 'Food Places', position: [23.6112, 58.5341] },
  { id: 26, name: 'Harmony Suites', type: 'Hotels', position: [23.5963, 58.4109] },
  { id: 27, name: 'EcoPower', type: 'Electric Stations', position: [23.5137, 58.3865] },
  { id: 28, name: 'FastFuel', type: 'Gas Stations', position: [23.5935, 58.4137] },
  { id: 29, name: 'LifeCare Medical Center', type: 'Hospitals', position: [23.6108, 58.4339] },
  { id: 30, name: 'Culinary Haven', type: 'Food Places', position: [23.6099, 58.4194] },
  { id: 31, name: 'Coastal Retreat', type: 'Hotels', position: [23.6019, 58.4282] },
];

const customIcon = new Icon({
  iconUrl: pinOutline,
  iconSize: [38, 95], // size of the icon
});

const startIcon = new Icon({
  iconUrl: pinSharp,
  iconSize: [38, 95], // size of the icon
  iconColor: 'green',
});

const endIcon = new Icon({
  iconUrl: pinSharp,
  iconSize: [38, 95], // size of the icon
  iconColor: 'red',
});

const MapComponent: React.FC = () => {
  const [startLocation, setStartLocation] = useState<number | null>(null);
  const [endLocation, setEndLocation] = useState<number | null>(null);
  const [path, setPath] = useState<Position[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleClick = async () => {
    if (startLocation !== null && endLocation !== null) {
      const response = await axios.post('http://localhost:8000/ShortestPath', {
        startnode: startLocation,
        endnode: endLocation
      });
      const pathIds: number[] = response.data.path;
      const pathLocations = pathIds.map(id => locations.find(loc => loc.id === id)!.position);
      setPath(pathLocations);
      setStartLocation(null);
      setEndLocation(null);

      // Compute and set the popup message
      const startName = locations.find(loc => loc.id === startLocation)!.name;
      const endName = locations.find(loc => loc.id === endLocation)!.name;
      const pathNames = pathIds.map(id => locations.find(loc => loc.id === id)!.name);
      setPopupMessage(`The shortest path from ${startName} to ${endName} goes through ${pathNames.join(', ')}.`);
    }
  }

  const selectLocation = (id: number) => {
    if (startLocation === null) {
      setStartLocation(id);
    } else if (endLocation === null && startLocation !== id) {
      setEndLocation(id);
    }
  }

  return (
    <div className="map-container">
      <MapContainer center={locations[0].position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map(location => (
          <Marker
            key={location.id}
            position={location.position}
            icon={location.id === startLocation ? startIcon : location.id === endLocation ? endIcon : customIcon}
            eventHandlers={{
              click: () => {
                selectLocation(location.id);
              }
            }}
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <h2>{location.name}</h2>
                <p>{location.type} {location.id}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {path.length > 0 && (
          <Polyline positions={path} />
        )}
      </MapContainer>
      <div className="map-message">
        {startLocation === null && 'Select a start location...'}
        {startLocation !== null && endLocation === null && 'Select an end location...'}
        {startLocation !== null && endLocation !== null && 'Click "Show Nearest Path" to view the path.'}
        {popupMessage && <div className="map-popup">{popupMessage}</div>}
      </div>
      <button onClick={handleClick} className="map-button">Show Nearest Path</button>
    </div>
  );
};

export default MapComponent;
