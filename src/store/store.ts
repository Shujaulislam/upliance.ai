import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserData {
  id: string
  name: string
  address: string
  email: string
  phone: string
}

interface StoreState {
  count: number
  userData: UserData | null
  increment: () => void
  decrement: () => void
  reset: () => void
  setUserData: (data: UserData) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      count: 0,
      userData: null,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
      setUserData: (data) => set({ userData: data }),
    }),
    {
      name: "app-storage",
    },
  ),
)

