import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocationStore } from "@/store/useLocationStore";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface Props {
  onOpenChange: (e: boolean) => void;
}
const LocationForm = ({ onOpenChange }: Props) => {
  const { address, setAddress, details, setDetails, lat, lng } =
    useLocationStore();

  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);

  const handleConfirmLocation = useCallback(() => {
    if (!address.trim()) {
      alert("Iltimos, manzilni kiriting");
      return;
    }
    onOpenChange(false);
  }, [address, onOpenChange]);

  // Debounced reverse geocoding
  useEffect(() => {
    if (lat !== 41.2995 || lng !== 69.2401) {
      setIsReverseGeocoding(true);

      const timeoutId = setTimeout(() => {
        // Reverse geocoding using Nominatim
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data && data.display_name) {
              setAddress(data.display_name);

              // Extract components from the address
              const addressDetails = data.address;
              if (addressDetails) {
                setDetails(
                  "sarlavha",
                  addressDetails.road || addressDetails.street || ""
                );
                setDetails("uy", addressDetails.house_number || "");
                setDetails("xonadon", addressDetails.apartment || "");
                setDetails("qavat", addressDetails.floor || "");
                setDetails("kirish", addressDetails.entrance || "");
              }
            }
            setIsReverseGeocoding(false);
          })
          .catch((error) => {
            console.error("Error in reverse geocoding:", error);
            setIsReverseGeocoding(false);
          });
      }, 500); // 500ms debounce

      return () => clearTimeout(timeoutId);
    }
  }, [lat, lng, setAddress, setDetails]);

  return (
    <motion.div
      className="w-full lg:w-2/5 space-y-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium">Manzil</label>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full"
          disabled={isReverseGeocoding}
        />
        {isReverseGeocoding && (
          <p className="text-xs text-blue-600">Manzil aniqlanmoqda...</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Sarlavha</label>
        <Input
          value={details.sarlavha || ""}
          onChange={(e) => setDetails("sarlavha", e.target.value)}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Uy raqami</label>
          <Input
            value={details.uy || ""}
            onChange={(e) => setDetails("uy", e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Xonadon</label>
          <Input
            value={details.xonadon || ""}
            onChange={(e) => setDetails("xonadon", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Qavat</label>
          <Input
            value={details.qavat || ""}
            onChange={(e) => setDetails("qavat", e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Kirish</label>
          <Input
            value={details.kirish || ""}
            onChange={(e) => setDetails("kirish", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Kuryerga izoh</label>
        <Input
          value={details.izoh || ""}
          onChange={(e) => setDetails("izoh", e.target.value)}
          className="w-full"
        />
      </div>

      <Button
        onClick={handleConfirmLocation}
        className="w-full mt-6"
        disabled={!address.trim() || isReverseGeocoding}
      >
        Manzilni tasdiqlash
      </Button>
    </motion.div>
  );
};

export default LocationForm;
