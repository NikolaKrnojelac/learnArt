import type { Artwork } from "../types";
import rawArtworks from "../data/raw-artworks.json";
import { capitalizeFirst, formatDimensions } from "../utils/format";
import {parseYear} from "@/features/artworks/utils/year";


type ApiCreator = {
    description?: string | null;
    biography?: string | null;
};

type ApiImage = {
    url?: string | null;
    width?: string | number | null;
    height?: string | number | null;
};

type ApiArtwork = {
    id: number;
    title: string;
    creation_date?: string | null;
    technique?: string | null;
    type?: string | null;
    culture?: string[] | null;
    department?: string | null;
    measurements?: string | null;
    description?: string | null;
    did_you_know?: string | null;
    creditline?: string | null;
    url?: string | null;
    creators?: ApiCreator[] | null;
    images?: { web?: ApiImage | null } | null;
};

type GetArtworksParams = {
    page?: number;
    limit?: number;
    artworkType?: string | null;
};

const stripHtml = (value?: string | null) =>
    value ? value.replace(/<[^>]*>/g, "").trim() || null : null;

// "Thomas Cole (American, 1801-1848)" -> "Thomas Cole"
const personName = (value?: string | null) =>
    value ? value.replace(/\s*\(.*\)\s*$/, "").trim() || null : null;

const toPositiveNumber = (value?: string | number | null) => {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? n : null;
};

const toArtwork = (item: ApiArtwork): Artwork => {
    const creator = item.creators?.[0];
    const web = item.images?.web;
    const width = toPositiveNumber(web?.width);
    const height = toPositiveNumber(web?.height);


    return {
        id: item.id,
        title: item.title,
        artist: personName(creator?.description),
        artistBio: stripHtml(creator?.biography),
        dateDisplay: item.creation_date ?? null,
        medium: capitalizeFirst(item.technique),
        artworkType: item.type ?? null,
        dimensions: formatDimensions(item.measurements),
        culture: item.culture?.[0] ?? null,
        department: item.department ?? null,
        description: stripHtml(item.description),
        didYouKnow: stripHtml(item.did_you_know),
        creditLine: item.creditline ?? null,
        sourceUrl: item.url ?? null,
        imageUrl: web?.url ?? null,
        aspectRatio: width && height ? width / height : 1,
        year: parseYear(item.creation_date)
    };
};

export async function getArtworks({
                                      page = 1,
                                      limit = 20,
                                      artworkType = null,
                                  }: GetArtworksParams = {}): Promise<Artwork[]> {
    const items = (rawArtworks as ApiArtwork[]).filter(
        (item) => !artworkType || item.type === artworkType
    );
    const start = (page - 1) * limit;
    return items.slice(start, start + limit).map(toArtwork);
}

export async function getArtworkById(id: number): Promise<Artwork | null> {
    const item = (rawArtworks as ApiArtwork[]).find((i) => i.id === id);
    return item ? toArtwork(item) : null;
}

let allArtworksCache: Artwork[] | null = null;

export function getAllArtworks(): Artwork[] {
    allArtworksCache ??= (rawArtworks as unknown as ApiArtwork[]).map(toArtwork)
    return  allArtworksCache
}

export async function getArtworksByIds(ids: number[]): Promise<Artwork[]> {
    const byId = new Map(getAllArtworks().map((artwork) => [artwork.id, artwork]));
    return ids
        .map((id) => byId.get(id))
        .filter((artwork): artwork is Artwork => Boolean(artwork));
}