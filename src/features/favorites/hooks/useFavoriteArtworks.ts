import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getArtworksByIds } from "@/features/artworks/api/artworks.api";
import { useFavorites } from "../store/favorites";

export function useFavoriteArtworks() {
    const ids = useFavorites((state) => state.ids);

    const query = useQuery({
        queryKey: ["favorite-artworks", ids],
        queryFn: () => getArtworksByIds(ids),
        enabled: ids.length > 0,
        placeholderData: keepPreviousData,
    });

    return { ids, ...query };
}