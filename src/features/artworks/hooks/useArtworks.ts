import { useInfiniteQuery } from "@tanstack/react-query";
import { getArtworks } from "../api/artworks.api";
import type { ArtworkQuery } from "../types";

const PAGE_SIZE = 20;

export function useArtworks(query: ArtworkQuery) {
    return useInfiniteQuery({
        queryKey: ["artworks", query],
        queryFn: ({ pageParam }) =>
            getArtworks({ page: pageParam, limit: PAGE_SIZE, ...query }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1,
        select: (data) => data.pages.flat(),
    });
}