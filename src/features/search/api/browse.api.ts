import { getAllArtworks } from "@/features/artworks/api/artworks.api";
import { CATEGORIES } from "@/features/artworks/constants/categories";
import { PERIODS } from "../constants/periods";
import type { BrowseData } from "../types";

const MIN_WORKS_FOR_FEATURED = 3;
const FEATURED_LIMIT = 8;

export async function getBrowseData(): Promise<BrowseData> {
    const artworks = getAllArtworks().filter((a) => a.imageUrl);

    const periods = PERIODS.map((period) => {
        const matches = artworks.filter(
            (a) => a.year !== null && a.year >= period.from && a.year < period.to
        );
        return {
            id: period.id,
            label: period.label,
            imageUrl: matches[0]?.imageUrl ?? null,
            count: matches.length,
        };
    });

    const mediums = CATEGORIES.filter((c) => c.artworkType).map((category) => {
        const matches = artworks.filter((a) => a.artworkType === category.artworkType);

        return {
            id: category.id,
            label: category.label,
            imageUrl: matches[0]?.imageUrl ?? null,
            count: matches.length,
        }
    })


    const byArtist = new Map<string, { imageUrl: string | null; count: number }>();
    for (const artwork of artworks) {
        if (!artwork.artist) continue;
        const entry = byArtist.get(artwork.artist);
        if (entry) entry.count += 1;
        else byArtist.set(artwork.artist, { imageUrl: artwork.imageUrl, count: 1 });
    }

    const artists = [...byArtist.entries()]
        .filter(([, value]) => value.count >= MIN_WORKS_FOR_FEATURED)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, FEATURED_LIMIT)
        .map(([name, value]) => ({ name, imageUrl: value.imageUrl, count: value.count }));

    return { periods, mediums, artists };
}