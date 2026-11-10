export type Artwork = {
    id: number;
    title: string;
    artist: string | null;
    artistBio: string | null;
    dateDisplay: string | null;
    medium: string | null;
    artworkType: string | null;
    dimensions: string | null;
    culture: string | null;
    department: string | null;
    description: string | null;
    didYouKnow: string | null;
    creditLine: string | null;
    sourceUrl: string | null;
    imageUrl: string | null;
    aspectRatio: number;
    year: number | null;
};

export type Category = {
    id: string;
    label: string;
    artworkType: string | null;
};