import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useTripStore = create()(
  devtools(
    persist(
      (set) => ({
        trips: [],
        setTrips: (trips) => set({ trips })
      }),
      {
        name: "bear-storage"
      }
    )
  )
);
