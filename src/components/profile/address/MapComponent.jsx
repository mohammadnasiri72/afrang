"use client";

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import dynamic from 'next/dynamic';

// Dynamic imports for map components
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Custom marker icon
const createCustomIcon = () => {
  return new L.Icon({
    iconUrl: '/images/marker-icon.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

// Location Marker Component
const LocationMarker = ({ position, onPositionChange }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [position]);

  return (
    <Marker
      ref={markerRef}
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
  );
};

const MapComponent = ({ position, onPositionChange }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    // Initialize map icons
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: '/images/marker-icon.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  }, []);

  // Handle map click
  useEffect(() => {
    if (!mapInstance) return;

    const handleClick = (e) => {
      const { lat, lng } = e.latlng;
      onPositionChange({ lat, lng });
    };

    mapInstance.on('click', handleClick);

    return () => {
      mapInstance.off('click', handleClick);
    };
  }, [mapInstance, onPositionChange]);

  return (
    <div className="map-container">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        zoomControl={true}
        attributionControl={true}
        doubleClickZoom={false}
        ref={mapRef}
        whenReady={(map) => {
          setMapInstance(map.target);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={18}
          minZoom={3}
        />
        <LocationMarker position={position} onPositionChange={onPositionChange} />
      </MapContainer>
    </div>
  );
};

export default MapComponent; 