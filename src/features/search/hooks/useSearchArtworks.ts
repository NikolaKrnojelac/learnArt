import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchArtworks } from "../api/search.api";

export function useSearchArtworks(query: string) {
    const trimmed = query.trim();

    return useQuery({
        queryKey: ["search", trimmed],
        queryFn: () => searchArtworks(trimmed),
        enabled: trimmed.length >= 2,
        placeholderData: keepPreviousData,
    });
}