import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeHeader } from "@/components/layout/HomeHeader";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { CategoryPills } from "@/features/artworks/components/CategoryPill";
import { ArtworkFeed } from "@/features/artworks/components/ArtworkFeed";
import { useArtworks } from "@/features/artworks/hooks/useArtworks";
import {
    ALL_CATEGORY_ID,
    CATEGORIES,
} from "@/features/artworks/constants/categories";

export default function HomeScreen() {
    const [categoryId, setCategoryId] = useState(ALL_CATEGORY_ID);
    const selected = CATEGORIES.find((c) => c.id === categoryId);

    const {
        data,
        isLoading,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useArtworks(selected?.artworkType ?? null);

    const handleEndReached = () => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    };

    return (
        <SafeAreaView className="flex-1 bg-background pt-4" edges={["top"]}>
            <HomeHeader />
            <CategoryPills
                categories={CATEGORIES}
                selectedId={categoryId}
                onSelect={setCategoryId}
            />
            <View className="mt-3 flex-1">
                {isLoading ? (
                    <LoadingState />
                ) : isError || !data ? (
                    <ErrorState onRetry={refetch} />
                ) : (
                    <ArtworkFeed
                        key={categoryId}
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