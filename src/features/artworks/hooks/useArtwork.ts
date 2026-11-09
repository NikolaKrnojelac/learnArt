import {QueryClient, useQuery} from "@tanstack/react-query";
import {getArtworkById} from "@/features/artworks/api/artworks.api";
import {Artwork} from "@/features/artworks/types";

export function useArtwork(id: number) {
    return useQuery({
        queryKey: ["artwork", id],
        queryFn: () => getArtworkById(id)
    })
}