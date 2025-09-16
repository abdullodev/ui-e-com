import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TUser = {
  isAuth: boolean;
  phone: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  avatar?: string;
};

export interface IAuthState {
  user: TUser | null;
  isOpenModal: boolean;

  setUser: (user: TUser | null) => void;
  removeUser: () => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useAuth = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      isOpenModal: false,

      setUser: (user) => set({ user }),
      removeUser: () => set({ user: null }),
      openModal: () => set({ isOpenModal: true }),
      closeModal: () => set({ isOpenModal: false }),
    }),
    {
      name: "auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
