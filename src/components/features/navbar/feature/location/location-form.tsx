import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocationStore } from "@/store/useLocationStore";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface Props {
  onOpenChange: (e: boolean) => void;
}
const LocationForm = ({ onOpenChange }: Props) => {
  const { currentLocation, setCurrentLocation, addLocation } =
    useLocationStore();

  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);

  const handleConfirmLocation = useCallback(() => {
    if (!currentLocation?.address.trim()) {
      alert("Iltimos, manzilni kiriting");
      return;
    }

    addLocation({
      ...currentLocation,
      id: Date.now().toString(),
    });

    onOpenChange(false);
  }, [currentLocation, addLocation, onOpenChange]);

  useEffect(() => {
    if (!currentLocation?.lat || !currentLocation?.lng) return;

    setIsReverseGeocoding(true);
    const timeoutId = setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${currentLocation.lat}&lon=${currentLocation.lng}&zoom=18&addressdetails=1`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.display_name) {
            setCurrentLocation({
              ...currentLocation,
              address: data.display_name,
              details: {
                ...currentLocation.details,
                sarlavha:
                  data.address.road ||
                  data.address.street ||
                  currentLocation.details?.sarlavha ||
                  "",
                uy:
                  data.address.house_number ||
                  currentLocation.details?.uy ||
                  "",
                xonadon:
                  data.address.apartment ||
                  currentLocation.details?.xonadon ||
                  "",
                qavat:
                  data.address.floor || currentLocation.details?.qavat || "",
                kirish:
                  data.address.entrance ||
                  currentLocation.details?.kirish ||
                  "",
                izoh: currentLocation.details?.izoh || "",
              },
            });
          }
          setIsReverseGeocoding(false);
        })
        .catch((error) => {
          console.error("Error in reverse geocoding:", error);
          setIsReverseGeocoding(false);
        });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currentLocation?.lat, currentLocation?.lng]);

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium">Manzil</label>
        <Input
          value={currentLocation?.address || ""}
          onChange={(e) =>
            setCurrentLocation({
              ...currentLocation!,
              address: e.target.value,
            })
          }
          className="w-full"
          disabled
        />
        {isReverseGeocoding && (
          <p className="text-xs text-blue-600">Manzil aniqlanmoqda...</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Sarlavha</label>
        <Input
          value={currentLocation?.details?.sarlavha || ""}
          onChange={(e) =>
            setCurrentLocation({
              ...currentLocation!,
              details: {
                ...currentLocation?.details,
                sarlavha: e.target.value,
              },
            })
          }
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Uy raqami</label>
          <Input
            value={currentLocation?.details?.uy || ""}
            onChange={(e) =>
              setCurrentLocation({
                ...currentLocation!,
                details: { ...currentLocation?.details, uy: e.target.value },
              })
            }
            className="w-full"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Xonadon</label>
          <Input
            value={currentLocation?.details?.xonadon || ""}
            onChange={(e) =>
              setCurrentLocation({
                ...currentLocation!,
                details: {
                  ...currentLocation?.details,
                  xonadon: e.target.value,
                },
              })
            }
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Qavat</label>
          <Input
            value={currentLocation?.details?.qavat || ""}
            onChange={(e) =>
              setCurrentLocation({
                ...currentLocation!,
                details: { ...currentLocation?.details, qavat: e.target.value },
              })
            }
            className="w-full"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Kirish</label>
          <Input
            value={currentLocation?.details?.kirish || ""}
            onChange={(e) =>
              setCurrentLocation({
                ...currentLocation!,
                details: {
                  ...currentLocation?.details,
                  kirish: e.target.value,
                },
              })
            }
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Kuryerga izoh</label>
        <Input
          value={currentLocation?.details?.izoh || ""}
          onChange={(e) =>
            setCurrentLocation({
              ...currentLocation!,
              details: { ...currentLocation?.details, izoh: e.target.value },
            })
          }
          className="w-full"
        />
      </div>

      <Button
        onClick={handleConfirmLocation}
        className="w-full mt-6"
        disabled={!currentLocation?.address?.trim() || isReverseGeocoding}
      >
        Manzilni tasdiqlash
      </Button>
    </motion.div>
  );
};

export default LocationForm;
