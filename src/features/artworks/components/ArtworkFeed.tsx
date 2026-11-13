import type { ReactElement } from "react";
import { ActivityIndicator, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ArtworkCard } from "./ArtworkCard";
import type { Artwork } from "../types";

type ArtworkFeedProps = {
    artworks: Artwork[];
    onArtworkPress: (artwork: Artwork) => void;
    onEndReached?: () => void;
    isFetchingNextPage?: boolean;
    header?: ReactElement | null;
    bottomPadding?: number;
};

export function ArtworkFeed({
                                artworks,
                                onArtworkPress,
                                onEndReached,
                                isFetchingNextPage = false,
                                header = null,
                                bottomPadding = 120,
                            }: ArtworkFeedProps) {
    return (
        <FlashList
            data={artworks}
            masonry
            numColumns={2}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
                <View className="p-1.5">
                    <ArtworkCard artwork={item} onPress={() => onArtworkPress(item)} />
                </View>
            )}
            ListHeaderComponent={header}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: bottomPadding }}
            ListFooterComponent={
                isFetchingNextPage ? <ActivityIndicator className="py-6" /> : null
            }
        />
    );
}