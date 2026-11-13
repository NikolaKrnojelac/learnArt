import { FlatList, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { HeaderSection } from "@/components/ui/SectionHeader";
import { ImageTile } from "@/components/ui/ImageTile";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import type { CollectionKind } from "@/features/collections/types";
import { useBrowseData } from "../hooks/useBrowseData";
import { TileGrid } from "./TileGrid";

const openCollection = (kind: CollectionKind, value: string) =>
    router.push({ pathname: "/collection", params: { kind, value } });

export function SearchBrowse() {
    const { data, isLoading, isError, refetch } = useBrowseData();

    if (isLoading) return <LoadingState />;
    if (isError || !data) return <ErrorState onRetry={refetch} />;

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
        >
            <View className="px-4 pt-2">
                <TileGrid
                    tiles={data.periods}
                    onTilePress={(tile) => openCollection("period", tile.id)}
                />
            </View>

            {data.artists.length > 0 ? (
                <>
                    <HeaderSection title="Featured Artists" />
                    <FlatList
                        horizontal
                        data={data.artists}
                        keyExtractor={(artist) => artist.name}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexGrow: 0 }}
                        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
                        renderItem={({ item }) => (
                            <ImageTile
                                variant="tall"
                                label={item.name}
                                imageUrl={item.imageUrl}
                                onPress={() => openCollection("artist", item.name)}
                            />
                        )}
                    />
                </>
            ) : null}

            <HeaderSection title="Browse by Medium" />
            <View className="px-4">
                <TileGrid
                    tiles={data.mediums}
                    onTilePress={(tile) => openCollection("medium", tile.id)}
                />
            </View>
        </ScrollView>
    );
}