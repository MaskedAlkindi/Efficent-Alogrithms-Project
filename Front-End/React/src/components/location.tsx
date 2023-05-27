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
{ id: 1, name: 'Sohar Hospital', type: 'Hospitals', position: [24.3643, 56.7430] },
{ id: 2, name: 'Salalah Public Hospital', type: 'Hospitals', position: [17.0151, 54.0924] },
{ id: 3, name: 'Nizwa Hospital', type: 'Hospitals', position: [22.9171, 57.5362] },
{ id: 4, name: 'Shell Oman - Al Maha Petroleum', type: 'Gas Stations', position: [23.5859, 58.4059] },
{ id: 5, name: 'Oman Oil Marketing Company', type: 'Gas Stations', position: [23.6105, 58.5876] },
{ id: 6, name: 'Bimmah Sinkhole Park', type: 'Tourist Spots', position: [23.0375, 59.0716] },
{ id: 7, name: 'Majlis Al Jinn Cave', type: 'Tourist Spots', position: [22.3760, 59.0946] },
{ id: 8, name: 'Nizwa Fort', type: 'Tourist Spots', position: [22.9336, 57.5330] },
{ id: 9, name: 'Al Baleed Archaeological Park', type: 'Tourist Spots', position: [17.0245, 54.1062] },
{ id: 10, name: 'Al Bustan Palace', type: 'Hotels', position: [23.5701, 58.6089] },
{ id: 11, name: 'Shangri-La Al Husn Resort & Spa', type: 'Hotels', position: [23.55147, 58.65987] },
{ id: 12, name: 'Grand Hyatt Muscat', type: 'Hotels', position: [23.6066, 58.5144] },
{ id: 13, name: 'Kargeen Caffe', type: 'Restaurants', position: [23.5877, 58.4143] },
{ id: 14, name: 'Bait Al Luban', type: 'Restaurants', position: [23.6008, 58.5879] },
{ id: 15, name: 'DArcys Kitchen', type: 'Restaurants', position: [23.6114, 58.4802] },
{ id: 16, name: 'Oman Avenues Mall', type: 'Shopping Malls', position: [23.5910, 58.4154] },
{ id: 17, name: 'Muscat Grand Mall', type: 'Shopping Malls', position: [23.5853, 58.4157] },
{ id: 18, name: 'City Centre Muscat', type: 'Shopping Malls', position: [23.600283, 58.24804] },
{ id: 19, name: 'Rustaq Fort', type: 'Historic Sites', position: [23.3905, 57.4240] },
{ id: 20, name: 'Jabrin Fort', type: 'Historic Sites', position: [22.9136, 57.2822] },
{ id: 21, name: 'Bahla Fort', type: 'Historic Sites', position: [22.9645, 57.2994] },
{ id: 22, name: 'Sultan Qaboos Grand Mosque', type: 'Religious Sites', position: [23.6052, 58.3710] },
{ id: 23, name: 'Royal Opera House Muscat', type: 'Cultural Sites', position: [23.5854, 58.5873] },
{ id: 24, name: 'Muscat National Park', type: 'Parks', position: [23.6039, 58.3967] },
{ id: 25, name: 'Wadi Bani Khalid', type: 'Nature Reserves', position: [22.6277, 58.7038] },
{ id: 26, name: 'Muscat Gate Museum', type: 'Museums', position: [23.6145, 58.5904] },
{ id: 27, name: 'National Museum Oman', type: 'Museums', position: [23.6067, 58.5868] },
{ id: 28, name: 'Oman Oil Marketing Company - Sohar', type: 'Gas Stations', position: [24.3467, 56.7089] },

];
const customIcon = new Icon({
  iconUrl: pinOutline,
  iconSize: [38, 95],
});

const startIcon = new Icon({
  iconUrl: pinSharp,
  iconSize: [38, 95],
  iconColor: 'green',
});

const endIcon = new Icon({
  iconUrl: pinSharp,
  iconSize: [38, 95],
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