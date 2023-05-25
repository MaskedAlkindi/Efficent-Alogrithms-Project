import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { pinOutline } from 'ionicons/icons';

type Position = [number, number]; // [lat, lon]

interface MapProps {
  position: Position;
}

const customIcon = new Icon({
  iconUrl: pinOutline,
  iconSize: [38, 95], // size of the icon
});

const MapComponent: React.FC<MapProps> = ({ position }) => {
  return (
    <MapContainer center={position} zoom={13} style={{ height: "50vh", width: "50%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
