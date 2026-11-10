export type BrowseTile = {
    id: string;
    label: string;
    imageUrl: string | null;
    count: number;
}

export type FeaturedArtist = {
    name: string;
    imageUrl: string | null;
    count: number;
}

export type BrowseData = {
    periods: BrowseTile[];
    mediums: BrowseTile[];
    artists: FeaturedArtist[];
};