import { View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeHeader } from "@/components/layout/HomeHeader";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { CategoryPills } from "@/features/artworks/components/CategoryPill";
import { ArtworkFeed } from "@/features/artworks/components/ArtworkFeed";
import { useArtworks } from "@/features/artworks/hooks/useArtworks";
import { CATEGORIES } from "@/features/artworks/constants/categories";
import { useArtworkFilters } from "@/features/filters/store/artworkFilters";

export default function HomeScreen() {
    const categoryId = useArtworkFilters((s) => s.categoryId);
    const regions = useArtworkFilters((s) => s.regions);
    const yearRange = useArtworkFilters((s) => s.yearRange);
    const setCategory = useArtworkFilters((s) => s.setCategory);

    const artworkType =
        CATEGORIES.find((c) => c.id === categoryId)?.artworkType ?? null;

    const {
        data,
        isLoading,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useArtworks({ artworkType, regions, yearRange });

    const handleEndReached = () => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    };

    const feedKey = `${categoryId}|${regions.join(",")}|${yearRange?.join("-") ?? ""}`;

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <HomeHeader onFilterPress={() => router.push("/filters")} />
            <CategoryPills
                categories={CATEGORIES}
                selectedId={categoryId}
                onSelect={setCategory}
            />
            <View className="mt-3 flex-1">
                {isLoading ? (
                    <LoadingState />
                ) : isError || !data ? (
                    <ErrorState onRetry={refetch} />
                ) : data.length === 0 ? (
                    <EmptyState message="No artworks match these filters." />
                ) : (
                    <ArtworkFeed
                        key={feedKey}
                        artworks={data}
                        onArtworkPress={(artwork) =>
                            router.push({
                                pathname: "/artwork/[id]",
                                params: { id: String(artwork.id) },
                            })
                        }
                        onEndReached={handleEndReached}
                        isFetchingNextPage={isFetchingNextPage}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}