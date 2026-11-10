import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

type ImageTileProps = {
    label: string;
    imageUrl: string | null;
    onPress?: () => void;
    variant?: "wide" | "tall";
};

export function ImageTile({
                              label,
                              imageUrl,
                              onPress,
                              variant = "wide",
                          }: ImageTileProps) {
    const isTall = variant === "tall";

    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={label}
            className="overflow-hidden rounded-3xl border border-border bg-surface"
            style={isTall ? { width: 160, aspectRatio: 0.73 } : { aspectRatio: 1.8 }}
        >
            <Image
                source={{ uri: imageUrl ?? undefined }}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                transition={200}
            />
            <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.55)"]}
                style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "60%" }}
            />
            <View
                className={`absolute bottom-0 left-0 right-0 p-4 ${isTall ? "items-center" : ""}`}
            >
                <Text
                    numberOfLines={isTall ? 2 : 1}
                    className={
                        isTall
                            ? "text-center font-display text-base text-white"
                            : "text-lg font-semibold text-white"
                    }
                >
                    {label}
                </Text>
            </View>
        </Pressable>
    );
}