"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import dynamic from 'next/dynamic';
import { TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";

// Only MapContainer needs to be dynamic
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[300px] rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d1182b]"></div>
      </div>
    )
  }
);

// Custom marker icon
const createCustomIcon = () => {
  return new L.Icon({
    iconUrl: '/images/marker-icon.png',
    iconRetinaUrl: '/images/marker-icon-2x.png',
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Map Controller Component
const MapController = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (map && position) {
      map.setView([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);

  return null;
};

const MapComponent = ({ position, onPositionChange, searchControl }) => {
  return (
    <>
      <MapController position={position} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={position}
        icon={createCustomIcon()}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const newPos = marker.getLatLng();
            onPositionChange(newPos);
          },
        }}
      >
        <Popup>
          <div className="text-center">
            <p>موقعیت انتخاب شده</p>
            <small className="text-gray-500 text-xs">
              {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
            </small>
          </div>
        </Popup>
      </Marker>
      {searchControl}
    </>
  );
};

const MapWrapper = ({ position, onPositionChange, searchControl }) => {
  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <MapComponent
        position={position}
        onPositionChange={onPositionChange}
        searchControl={searchControl}
      />
    </MapContainer>
  );
};

export default MapWrapper; 