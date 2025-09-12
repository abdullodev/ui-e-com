import { useState } from "react";
import { Button } from "@/components/ui/button";
import LocationModal from "./location-modal";

export function LocationSelector() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        + Yangi manzil qo'shish
      </Button>
      <LocationModal open={open} onOpenChange={setOpen} />
    </>
  );
}
