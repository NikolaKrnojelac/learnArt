import { getAllArtworks } from "@/features/artworks/api/artworks.api";
import { CATEGORIES } from "@/features/artworks/constants/categories";
import type { Artwork } from "@/features/artworks/types";
import { PERIODS } from "@/features/search/constants/periods";
import type { CollectionInfo, CollectionKind } from "../types";

const byYear = (a: Artwork, b: Artwork) =>
    (a.year ?? 9999) - (b.year ?? 9999);

export async function getCollection(
    kind: CollectionKind,
    value: string
): Promise<CollectionInfo | null> {
    const artworks = getAllArtworks().filter((a) => a.imageUrl);

    switch (kind) {
        case "period": {
            const period = PERIODS.find((p) => p.id === value);
            if (!period) return null;
            return {
                title: period.label,
                artworks: artworks
                    .filter((a) => a.year !== null && a.year >= period.from && a.year < period.to)
                    .sort(byYear),
            };
        }
        case "medium": {
            const category = CATEGORIES.find((c) => c.id === value && c.artworkType);
            if (!category) return null;
            return {
                title: category.label,
                artworks: artworks.filter((a) => a.artworkType === category.artworkType),
            };
        }
        case "artist":
            return {
                title: value,
                artworks: artworks.filter((a) => a.artist === value).sort(byYear),
            };
        default:
            return null;
    }
}