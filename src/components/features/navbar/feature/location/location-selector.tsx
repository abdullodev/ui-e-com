import CustomMenu, {
  type MenuSection,
} from "@/components/custom-ui/custom-menu";
import { useLocationStore, type LocationItem } from "@/store/useLocationStore";
import { motion } from "framer-motion";
import { Check, ChevronDown, MapPin, Plus } from "lucide-react";
import { useState } from "react";
import LocationModal from "./location-modal";

export function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { currentLocation, locations, setCurrentLocation } = useLocationStore();

  // Handle location select
  const handleLocationSelect = (location: LocationItem) => {
    setCurrentLocation(location);
    setIsOpen(false);
  };

  // Get title for trigger
  const getTitle = () => {
    if (currentLocation?.address) {
      const address = currentLocation.address;
      return address;
    }
    return "Manzilni tanlang";
  };

  const locationMenuSections: MenuSection[] = [
    {
      items: [
        ...locations.map((location) => ({
          key: location.id,
          icon: MapPin,
          label: (
            <div className="truncate max-w-[160px]">{location.address}</div>
          ),
          action: () => handleLocationSelect(location),
          rightElement:
            location?.id === currentLocation?.id ? (
              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : undefined,
        })),
        {
          key: "add-new",
          icon: Plus,
          label: "Yangi manzil qo'shish",
          description: "Qo‘lda yangi manzil kiriting",
          action: () => {
            setIsOpen(false);
            setOpenModal(true);
          },
        },
      ],
    },
  ];

  const trigger = (
    <motion.button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center gap-2 px-3 py-2 rounded-lg
                 text-gray-700 dark:text-gray-200
                 hover:text-blue-600 dark:hover:text-blue-400
                 hover:bg-gray-100 dark:hover:bg-gray-800
                 transition-colors duration-200 relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Joylashuvni tanlang"
    >
      <MapPin className="h-5 w-5" />
      <span className="truncate max-w-[160px]">{getTitle()}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </motion.button>
  );

  return (
    <>
      <CustomMenu
        trigger={trigger}
        sections={locationMenuSections}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        headerTitle="Manzilni tanlang"
        headerDescription={
          locations.length > 0
            ? `${locations.length} ta saqlangan manzil`
            : "Hech qanday manzil saqlanmagan"
        }
        headerIcon={MapPin}
      />

      {/* Manual location modal */}
      <LocationModal open={openModal} onOpenChange={setOpenModal} />
    </>
  );
}
