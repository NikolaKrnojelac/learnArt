import { getAllArtworks } from "@/features/artworks/api/artworks.api";
import type { Artwork } from "@/features/artworks/types";

// "Dürer" -> "durer", "Paintings" -> "painting"
const normalize = (value: string) =>
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const toToken = (word: string) =>
    word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word;

export async function searchArtworks(query: string, limit = 50): Promise<Artwork[]> {
    const tokens = normalize(query).split(/\s+/).filter(Boolean).map(toToken);
    if (tokens.length === 0) return [];

    return getAllArtworks()
        .filter((artwork) => {
            const haystack = normalize(
                [
                    artwork.title,
                    artwork.artist,
                    artwork.medium,
                    artwork.artworkType,
                    artwork.culture,
                    artwork.dateDisplay,
                ]
                    .filter(Boolean)
                    .join(" ")
            );
            return tokens.every((token) => haystack.includes(token));
        })
        .slice(0, limit);
}