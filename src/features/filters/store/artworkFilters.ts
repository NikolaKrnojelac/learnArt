import { create } from "zustand";
import { ALL_CATEGORY_ID } from "@/features/artworks/constants/categories";
import type { ArtworkFilterValues } from "../types";

export const DEFAULT_FILTERS: ArtworkFilterValues = {
    categoryId: ALL_CATEGORY_ID,
    regions: [],
    yearRange: null,
};

type ArtworkFiltersState = ArtworkFilterValues & {
    setCategory: (categoryId: string) => void;
    apply: (values: ArtworkFilterValues) => void;
};

export const useArtworkFilters = create<ArtworkFiltersState>()((set) => ({
    ...DEFAULT_FILTERS,
    setCategory: (categoryId) => set({ categoryId }),
    apply: (values) => set(values),
}));