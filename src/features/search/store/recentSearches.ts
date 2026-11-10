import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Artwork } from "@/features/artworks/types";

export type RecentItem =
    | { id: string; kind: "query"; text: string }
    | {
    id: string;
    kind: "artwork";
    artworkId: number;
    title: string;
    artist: string | null;
    medium: string | null;
    imageUrl: string | null;
};

const MAX_ITEMS = 10;

type RecentSearchesState = {
    items: RecentItem[];
    addQuery: (text: string) => void;
    addArtwork: (artwork: Artwork) => void;
    remove: (id: string) => void;
    clear: () => void;
};

const withItem = (items: RecentItem[], item: RecentItem) =>
    [item, ...items.filter((existing) => existing.id !== item.id)].slice(0, MAX_ITEMS);

export const useRecentSearches = create<RecentSearchesState>()(
    persist(
        (set) => ({
            items: [],
            addQuery: (text) => {
                const clean = text.trim();
                if (clean.length < 2) return;
                set((state) => ({
                    items: withItem(state.items, {
                        id: `q:${clean.toLowerCase()}`,
                        kind: "query",
                        text: clean,
                    }),
                }));
            },
            addArtwork: (artwork) =>
                set((state) => ({
                    items: withItem(state.items, {
                        id: `a:${artwork.id}`,
                        kind: "artwork",
                        artworkId: artwork.id,
                        title: artwork.title,
                        artist: artwork.artist,
                        medium: artwork.medium,
                        imageUrl: artwork.imageUrl,
                    }),
                })),
            remove: (id) =>
                set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
            clear: () => set({ items: [] }),
        }),
        {
            name: "recent-searches",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);