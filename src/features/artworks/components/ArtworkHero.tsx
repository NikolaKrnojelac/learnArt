import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {FavoriteIcon} from "@/components/ui/FavoriteIcon";
import {Bookmark} from "lucide-react-native";

type ArtworkHeroProps = {
    imageUrl: string | null;
    title: string;
    artist: string | null;

};


export function ArtworkHero({ imageUrl, title, artist }: ArtworkHeroProps) {
    return (
        <View className="bg-surface" style={{ aspectRatio: 1.05 }}>
            <Image
                source={{ uri: imageUrl ?? undefined }}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                transition={200}
            />
            <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.75)"]}
                style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "65%" }}
            />
            <View className="absolute bottom-0 left-0 right-0 px-4 pb-5">
                    <Text
                        numberOfLines={3}
                        className="font-display text-4xl leading-tight tracking-wider text-white"
                    >
                        {title}
                    </Text>

                    {artist ? (

                            <Text className="mt-1 text-base text-white">{artist}</Text>


                    ) : null}


            </View>
        </View>
    );
}