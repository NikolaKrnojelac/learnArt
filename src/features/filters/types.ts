export type YearRange = [number, number];

export type ArtworkFilterValues = {
    categoryId: string;
    regions: string[];
    yearRange: YearRange | null;
};