import { Pressable, Text, View } from "react-native";

type HeaderSectionProps = {
    title: string;
    actionLabel?: string;
    onActionPress?: () => void;
}


export function HeaderSection({title, actionLabel, onActionPress}: HeaderSectionProps) {
    return (
        <View className="flex-row items-center justify-between px-4 pb-3 pt-3">
            <Text className="font-semibold text-xl tracking-wider text-primary">{title}</Text>
            {actionLabel ? (
                <Pressable onPress={onActionPress} hitSlop={8} accessibilityRole="button">
                    <Text className="text-base text-primary/60">{actionLabel}</Text>
                </Pressable>
            ): null}
        </View>
    )
}