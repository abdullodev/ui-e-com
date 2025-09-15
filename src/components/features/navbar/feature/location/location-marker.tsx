import { useLocationStore } from "@/store/useLocationStore";
import L from "leaflet";
import { useCallback, useEffect, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

const markerIcon: any = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker() {
  const { currentLocation, setCurrentLocation } = useLocationStore();
  const [position, setPosition] = useState<[number, number]>([
    41.2995,
    69.2401, // fallback default
  ]);

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
