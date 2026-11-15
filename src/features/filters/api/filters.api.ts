import { getAllArtworks } from "@/features/artworks/api/artworks.api";
import { getRegion } from "@/features/artworks/utils/region";
import type { YearRange } from "../types";

export type FilterOptions = {
    regions: { name: string; count: number }[];
    yearBounds: YearRange;
};

const MAX_REGIONS = 8;

export async function getFilterOptions(): Promise<FilterOptions> {
    const artworks = getAllArtworks();
    const counts = new Map<string, number>();
    let min = Infinity;
    let max = -Infinity;

    for (const artwork of artworks) {
        const region = getRegion(artwork.culture);
        if (region) counts.set(region, (counts.get(region) ?? 0) + 1);
        if (artwork.year !== null) {
            min = Math.min(min, artwork.year);
            max = Math.max(max, artwork.year);
        }
    }

    const regions = [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, MAX_REGIONS)
        .map(([name, count]) => ({ name, count }));

    const yearBounds: YearRange = Number.isFinite(min)
        ? [Math.floor(min / 10) * 10, Math.ceil(max / 10) * 10]
        : [0, 2000];

    return { regions, yearBounds };
}