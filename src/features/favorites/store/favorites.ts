import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FavoritesState = {
    ids: number[];
    toggle: (id: number) => void;
};

export const useFavorites = create<FavoritesState>()(
    persist(
        (set) => ({
            ids: [],
            toggle: (id) =>
                set((state) => ({
                    ids: state.ids.includes(id)
                        ? state.ids.filter((existing) => existing !== id)
                        : [id, ...state.ids],
                })),
        }),
        {
            name: "favorites",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);