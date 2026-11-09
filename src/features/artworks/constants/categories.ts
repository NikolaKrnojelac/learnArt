import type { Category } from "../types";

export const ALL_CATEGORY_ID = "all";

export const CATEGORIES: Category[] = [
    { id: ALL_CATEGORY_ID, label: "All", artworkType: null },
    { id: "painting", label: "Paintings", artworkType: "Painting" },
    { id: "drawing", label: "Drawings", artworkType: "Drawing" },
    { id: "print", label: "Prints", artworkType: "Print" },
    { id: "sculpture", label: "Sculptures", artworkType: "Sculpture" },
    { id: "photograph", label: "Photographs", artworkType: "Photograph" },
    { id: "textile", label: "Textiles", artworkType: "Textile" },
    { id: "ceramic", label: "Ceramics", artworkType: "Ceramic" },
];