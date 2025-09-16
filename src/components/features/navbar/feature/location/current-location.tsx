import { Button } from "@/components/ui/button";
import { useLocationStore } from "@/store/useLocationStore";
import { useCallback, useState, type MouseEvent } from "react";
import { useMap } from "react-leaflet";
import { DEFAULT_ZOOM } from "../../common/constants";

function CurrentLocation() {
  const map = useMap();
  const { setCurrentLocation } = useLocationStore();
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      // Prevent event bubbling to map
      e.stopPropagation();
      e.preventDefault();

      if (navigator.geolocation) {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("position", position);
            const { latitude, longitude } = position.coords;

            map.setView([latitude, longitude], DEFAULT_ZOOM);

            setCurrentLocation({
              id: "current",
              address: "My Current Location", // will be updated later by reverse geocoding
              lat: latitude,
              lng: longitude,
              details: {},
            });

            setIsLoading(false);
          },
          (error) => {
            console.error("Error getting location:", error);
            setIsLoading(false);
            let errorMessage =
              "Unable to get current location. Please try again.";

            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage =
                  "Location access denied. Please enable location permissions.";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable.";
                break;
              case error.TIMEOUT:
                errorMessage = "Location request timed out.";
                break;
            }

            alert(errorMessage);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    [map, setCurrentLocation]
  );

  return (
    <div
      className="leaflet-top leaflet-right"
      style={{ pointerEvents: "auto" }} // Ensure button is clickable
    >
      <div className="leaflet-control leaflet-bar">
        <Button
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="bg-white text-black hover:bg-gray-100 disabled:opacity-50 m-1 text-xs px-2 py-1"
          size="sm"
          onMouseDown={(e) => e.stopPropagation()} // Prevent drag interference
        >
          {isLoading ? "Loading..." : "📍 Current Location"}
        </Button>
      </div>
    </div>
  );
}

export default CurrentLocation;
