import { useQuery } from "@tanstack/react-query";
import { getCollection } from "../api/collections.api";
import type { CollectionKind } from "../types";

export function useCollection(
    kind: CollectionKind | undefined,
    value: string | undefined
) {
    return useQuery({
        queryKey: ["collection", kind, value],
        queryFn: () => getCollection(kind as CollectionKind, value as string),
        enabled: Boolean(kind && value),
        staleTime: Infinity,
    });
}