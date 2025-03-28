import { create } from 'zustand';

interface UserState {
    user: any; // Cambia `any` por el tipo adecuado
    setUser: (user: any) => void;
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export default useUserStore;