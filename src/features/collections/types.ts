import {Artwork} from "@/features/artworks/types";

export type CollectionKind = "period" | "medium" | "artist"

export type CollectionInfo = {
    title: string,
    artworks: Artwork[];
}

