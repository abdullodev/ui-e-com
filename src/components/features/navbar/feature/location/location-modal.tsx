import CustomModal from "@/components/custom-ui/custom-modal";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLocationStore } from "@/store/useLocationStore";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import CurrentLocation from "./current-location";
import LocationForm from "./location-form";
import LocationMarker from "./location-marker";

function LocationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { setCoords, lat, lng } = useLocationStore();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
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
  }, []);

  return (
    <CustomModal isOpen={open} onClose={() => onOpenChange(false)} width="85vw">
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Yetkazib berish manzilini tanlang
            </DialogTitle>
            <p className="text-sm text-gray-600 mt-1">
              Xaritada joylashuvni belgilang yoki joriy joylashuvingizni
              aniqlang
            </p>
          </DialogHeader>

          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Left Side: Form */}
            <LocationForm onOpenChange={onOpenChange} />

            {/* Right Side: Map */}
            <motion.div
              className="w-full lg:w-3/5 h-[300px] sm:h-[500px] rounded-lg overflow-hidden border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <MapContainer
                center={[lat, lng]}
                zoom={18}
                style={{ height: "100%", width: "100%" }}
                className="min-h-[300px]"
                scrollWheelZoom={true}
                doubleClickZoom={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
                <CurrentLocation />
              </MapContainer>
            </motion.div>
          </div>
        </motion.div>
      </>
    </CustomModal>
  );
}

export default LocationModal;
