import type { ReactNode } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeading } from "@/components/ui/ListHeading";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ArtworkFeed } from "@/features/artworks/components/ArtworkFeed";
import { formatWorkCount } from "@/features/artworks/utils/format";
import { useFavoriteArtworks } from "@/features/favorites/hooks/useFavoriteArtworks";

export default function ProfileScreen() {
    const { ids, data, isError, refetch } = useFavoriteArtworks();

    const heading = (
        <ListHeading
            title="Saved"
            subtitle={formatWorkCount(data?.length ?? ids.length)}
        />
    );

    let content: ReactNode;

    if (ids.length === 0) {
        content = (
            <View className="flex-1">
                <View className="px-2.5">{heading}</View>
                <EmptyState message="Tap the bookmark on any artwork to save it here." />
            </View>
        );
    } else if (isError) {
        content = <ErrorState onRetry={refetch} />;
    } else if (!data) {
        content = <LoadingState />;
    } else {
        content = (
            <ArtworkFeed
                artworks={data}
                header={heading}
                onArtworkPress={(artwork) =>
                    router.push({
                        pathname: "/artwork/[id]",
                        params: { id: String(artwork.id) },
                    })
                }
            />
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            {content}
        </SafeAreaView>
    );
}