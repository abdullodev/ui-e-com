import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationDetails {
  sarlavha?: string;
  uy?: string;
  xonadon?: string;
  qavat?: string;
  kirish?: string;
  izoh?: string;
}

export interface LocationItem {
  id: string;
  address: string;
  lat: number;
  lng: number;
  details: LocationDetails;
}

interface LocationState {
  currentLocation: LocationItem | null;
  locations: LocationItem[];

  setCurrentLocation: (location: LocationItem) => void;
  addLocation: (location: LocationItem) => void;
  removeLocation: (id: string) => void;
  updateLocation: (id: string, updated: Partial<LocationItem>) => void;
  clearLocations: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      currentLocation: null,
      locations: [],

      setCurrentLocation: (location) => set({ currentLocation: location }),

      addLocation: (location) =>
        set((state) => ({
          locations: [...state.locations, location],
        })),

      removeLocation: (id) =>
        set((state) => ({
          locations: state.locations.filter((loc) => loc.id !== id),
        })),

      updateLocation: (id, updated) =>
        set((state) => ({
          locations: state.locations.map((loc) =>
            loc.id === id ? { ...loc, ...updated } : loc
          ),
        })),

      clearLocations: () => set({ locations: [] }),
    }),
    {
      name: "location", // key in localStorage
    }
  )
);
