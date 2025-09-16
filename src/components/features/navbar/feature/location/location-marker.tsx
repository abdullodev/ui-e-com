import { useLocationStore } from "@/store/useLocationStore";
import L from "leaflet";
import { useCallback, useEffect, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

// Option 1: Custom SVG marker with user icon
const createSelectionMarkerIcon = () => {
  const svgIcon = `
    <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <!-- Marker body -->
      <path d="M16 2C9.4 2 4 7.4 4 14c0 7.5 12 24 12 24s12-16.5 12-24c0-6.6-5.4-12-12-12z" 
            fill="#EF4444" stroke="#DC2626" stroke-width="1" filter="url(#shadow)"/>
      <!-- Crosshair -->
      <line x1="12" y1="14" x2="20" y2="14" stroke="white" stroke-width="2"/>
      <line x1="16" y1="10" x2="16" y2="18" stroke="white" stroke-width="2"/>
      <circle cx="16" cy="14" r="1.5" fill="white"/>
    </svg>
  `;

  return new L.DivIcon({
    html: svgIcon,
    className: "custom-selection-marker",
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
  });
};

function LocationMarker() {
  const { currentLocation, setCurrentLocation } = useLocationStore();
  const [position, setPosition] = useState<[number, number]>([
    41.2995,
    69.2401, // fallback default
  ]);

  // Choose which marker style to use
  const markerIcon = createSelectionMarkerIcon(); // Change this to try different styles

  // 📌 Update marker position when store changes
  useEffect(() => {
    if (currentLocation?.lat && currentLocation?.lng) {
      setPosition([currentLocation.lat, currentLocation.lng]);
    }
  }, [currentLocation]);

  // 📌 Handle map click → move marker + update store
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setCurrentLocation({
        id: "current",
        address: "Selected Location",
        lat,
        lng,
        details: currentLocation?.details || {},
      });
    },
  });

  // 📌 Handle marker drag → update store
  const handleMarkerDrag = useCallback(
    (e: any) => {
      const marker = e.target;
      const { lat, lng } = marker.getLatLng();
      setPosition([lat, lng]);
      setCurrentLocation({
        id: "current",
        address: "Dragged Location",
        lat,
        lng,
        details: currentLocation?.details || {},
      });
    },
    [setCurrentLocation, currentLocation?.details]
  );

  return (
    <Marker
      position={position}
      icon={markerIcon}
      draggable
      eventHandlers={{
        dragend: handleMarkerDrag,
      }}
    />
  );
}

export default LocationMarker;
