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
  const { setCoords, lat, lng } = useLocationStore();
  const [position, setPosition] = useState<[number, number]>([
    41.2995, 69.2401,
  ]);

  useMapEvents({
    click(e: any) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      setCoords(e.latlng.lat, e.latlng.lng);
    },
  });

  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);

  // Handle marker drag
  const handleMarkerDrag = useCallback(
    (e: any) => {
      const marker = e.target;
      const newPosition = marker.getLatLng();
      setPosition([newPosition.lat, newPosition.lng]);
      setCoords(newPosition.lat, newPosition.lng);
    },
    [setCoords]
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
