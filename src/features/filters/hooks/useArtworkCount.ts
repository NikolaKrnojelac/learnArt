import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { countArtworks } from "@/features/artworks/api/artworks.api";
import type { ArtworkQuery } from "@/features/artworks/types";

export function useArtworkCount(query: ArtworkQuery) {
    return useQuery({
        queryKey: ["artwork-count", query],
        queryFn: () => countArtworks(query),
        placeholderData: keepPreviousData,
        gcTime: 0,
    });
}