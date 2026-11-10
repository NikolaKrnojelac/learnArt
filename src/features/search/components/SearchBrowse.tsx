import { FlatList, ScrollView, View } from "react-native";
import { HeaderSection } from "@/components/ui/SectionHeader";
import { ImageTile } from "@/components/ui/ImageTile";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { useBrowseData } from "../hooks/useBrowseData";
import { TileGrid } from "./TileGrid";

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
                <TileGrid tiles={data.periods} />
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
                            <ImageTile variant="tall" label={item.name} imageUrl={item.imageUrl} />
                        )}
                    />
                </>
            ) : null}

            <HeaderSection title="Browse by Medium" />
            <View className="px-4">
                <TileGrid tiles={data.mediums} />
            </View>
        </ScrollView>
    );
}