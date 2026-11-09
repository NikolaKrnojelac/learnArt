import { useInfiniteQuery } from "@tanstack/react-query";
import { getArtworks } from "../api/artworks.api";

const PAGE_SIZE = 20;

export function useArtworks(artworkType: string | null) {
    return useInfiniteQuery({
        queryKey: ["artworks", { artworkType }],
        queryFn: ({ pageParam }) =>
            getArtworks({ page: pageParam, limit: PAGE_SIZE, artworkType }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1,
        select: (data) => data.pages.flat(),
    });
}