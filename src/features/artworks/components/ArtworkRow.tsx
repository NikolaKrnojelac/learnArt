import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { X } from "lucide-react-native";
import { IconButton } from "@/components/ui/IconButton";
import { colors } from "@/theme/colors";

type ArtworkRowProps = {
    title: string;
    subtitle: string;
    imageUrl: string | null;
    onPress: () => void;
    onRemove?: () => void;
};

export function ArtworkRow({ title, subtitle, imageUrl, onRemove, onPress }: ArtworkRowProps) {
    return (
        <Pressable onPress={onPress} accessibilityRole="button" className="flex-row items-center justify-center px-4 gap-4 py-2">
            <Image source={{uri: imageUrl ?? undefined}} style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: colors.surface }}
                   contentFit="cover"
            />
            <View className="flex-1">
                <Text className="text-primary font-semibold text-lg" numberOfLines={1}>{title}</Text>
                {subtitle ? (
                    <Text numberOfLines={1} className="mt-0.5 text-base text-primary/70">
                        {subtitle}
                    </Text>
                ): null}
            </View>
            {onRemove ? (
                <IconButton
                    icon={X}
                    label="Remove from recent searches"
                    size={20}
                    onPress={onRemove}
                />
            ) : null}
        </Pressable>
    )
}