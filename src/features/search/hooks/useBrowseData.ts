import { useQuery } from "@tanstack/react-query";
import { getBrowseData } from "../api/browse.api";

export function useBrowseData() {
    return useQuery({
        queryKey: ["browse"],
        queryFn: getBrowseData,
        staleTime: Infinity,
    });
}