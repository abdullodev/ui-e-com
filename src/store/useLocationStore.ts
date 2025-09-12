import { create } from "zustand";

interface LocationState {
  address: string;
  lat: number;
  lng: number;
  details: {
    sarlavha?: string;
    uy?: string;
    xonadon?: string;
    qavat?: string;
    kirish?: string;
    izoh?: string;
  };
  setAddress: (address: string) => void;
  setCoords: (lat: number, lng: number) => void;
  setDetails: (key: string, value: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  address: "",
  lat: 41.2995,
  lng: 69.2401,
  details: {},
  setAddress: (address) => set({ address }),
  setCoords: (lat, lng) => set({ lat, lng }),
  setDetails: (key, value) =>
    set((state) => ({
      details: { ...state.details, [key]: value },
    })),
}));
