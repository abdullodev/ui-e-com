import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TLanguage = "uz" | "ru" | "en";

interface LanguageStore {
  language: TLanguage;
  setLanguage: (language: TLanguage) => void;
  setUzbek: () => void;
  setRussian: () => void;
  setEnglish: () => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "uz",
      setLanguage: (language: TLanguage) => set({ language }),
      setUzbek: () => set({ language: "uz" }),
      setRussian: () => set({ language: "ru" }),
      setEnglish: () => set({ language: "en" }),
    }),
    {
      name: "lang", // localStorage key
    }
  )
);
