import { FlatList } from "react-native";
import { router } from "expo-router";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ArtworkRow } from "@/features/artworks/components/ArtworkRow";
import { formatByLine } from "@/features/artworks/utils/format";
import { useSearchArtworks } from "../hooks/useSearchArtworks";
import { useRecentSearches } from "../store/recentSearches";

type SearchResultsProps = { query: string };

export function SearchResults({ query }: SearchResultsProps) {
    const { data, isError, refetch } = useSearchArtworks(query);
    const addArtwork = useRecentSearches((state) => state.addArtwork);

    if (isError) return <ErrorState onRetry={refetch} />;
    if (!data) return <LoadingState />;
    if (data.length === 0) {
        return <EmptyState message={`No results for "${query.trim()}"`} />;
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 8, paddingBottom: 120 }}
            renderItem={({ item }) => (
                <ArtworkRow
                    title={item.title}
                    subtitle={formatByLine(item.artist, item.medium)}
                    imageUrl={item.imageUrl}
                    onPress={() => {
                        addArtwork(item);
                        router.push({
                            pathname: "/artwork/[id]",
                            params: { id: String(item.id) },
                        });
                    }}
                />
            )}
        />
    );
}