import { Animated, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackButton } from "@/components/ui/BackButton";
import { FavoriteButton } from "@/features/favorites/components/FavoriteButton";
import { colors } from "@/theme/colors";

type ArtworkHeaderProps = {
    title: string;
    artworkId: number;
    scrollY: Animated.Value;
    collapseStart: number;
    collapseEnd: number;
};

export function ArtworkHeader({
                                  title,
                                  artworkId,
                                  scrollY,
                                  collapseStart,
                                  collapseEnd,
                              }: ArtworkHeaderProps) {
    const { top } = useSafeAreaInsets();

    const opacity = scrollY.interpolate({
        inputRange: [collapseStart, collapseEnd],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });

    return (
        <View
            pointerEvents="box-none"
            style={{ position: "absolute", top: 0, left: 0, right: 0 }}
        >
            <Animated.View
                pointerEvents="none"
                style={[
                    StyleSheet.absoluteFill,
                    {
                        opacity,
                        backgroundColor: colors.background,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderBottomColor: colors.border,
                    },
                ]}
            />
            <View
                pointerEvents="box-none"
                className="flex-row items-center gap-3 px-4 pb-2"
                style={{ paddingTop: top + 8 }}
            >
                <BackButton />
                <Animated.View pointerEvents="none" style={{ flex: 1, opacity }}>
                    <Text
                        numberOfLines={1}
                        className="text-center font-display text-lg text-primary"
                    >
                        {title}
                    </Text>
                </Animated.View>
                <FavoriteButton artworkId={artworkId} />
            </View>
        </View>
    );
}