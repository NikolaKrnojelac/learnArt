import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { IconButton } from "@/components/ui/IconButton";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ArtworkFeed } from "@/features/artworks/components/ArtworkFeed";
import { CollectionHeader } from "@/features/collections/components/CollectionHeader";
import { useCollection } from "@/features/collections/hooks/useCollection";
import type { CollectionKind } from "@/features/collections/types";

export default function CollectionScreen() {
    const { kind, value } = useLocalSearchParams<{
        kind: CollectionKind;
        value: string;
    }>();
    const { data, isLoading, isError, refetch } = useCollection(kind, value);

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <View className="px-1 pt-1">
                <IconButton
                    icon={ArrowLeft}
                    label="Go back"
                    onPress={() => router.back()}
                />
            </View>
            <View className="flex-1">
                {isLoading ? (
                    <LoadingState />
                ) : isError ? (
                    <ErrorState onRetry={refetch} />
                ) : !data || data.artworks.length === 0 ? (
                    <EmptyState message="No works found in this collection." />
                ) : (
                    <ArtworkFeed
                        artworks={data.artworks}
                        bottomPadding={32}
                        header={
                            <CollectionHeader
                                title={data.title}
                                count={data.artworks.length}
                            />
                        }
                        onArtworkPress={(artwork) =>
                            router.push({
                                pathname: "/artwork/[id]",
                                params: { id: String(artwork.id) },
                            })
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}