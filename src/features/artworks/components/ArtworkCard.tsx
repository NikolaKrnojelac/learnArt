import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import type { Artwork } from "../types";



type ArtworkCardProps = {
    artwork: Artwork;
    onPress?: () => void;
}

const MIN_RATIO = 0.65
const MAX_RATIO = 1.5

export function ArtworkCard({artwork, onPress}: ArtworkCardProps) {
    const ratio = Math.min(Math.max(artwork.aspectRatio, MIN_RATIO), MAX_RATIO);


    return(
        <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={artwork.title}
                   className="overflow-hidden rounded-3xl bg-surface" style={{aspectRatio: ratio}}>
            <Image source={{uri: artwork.imageUrl ?? undefined}}
                   style={StyleSheet.absoluteFill} contentFit="cover"
                   transition={200}
                   recyclingKey={String(artwork.id)}
            />
            <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.6)"]}
                style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "40%" }}
            />
            <View className="absolute right-1 bottom-0 p-4">
                <Text numberOfLines={1} className="text-right font-semibold text-sm text-white">{artwork.artist ?? "Unknown Artist"}</Text>
            </View>
        </Pressable>
    )
}