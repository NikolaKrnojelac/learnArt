import { Text, View } from "react-native";

type ListHeadingProps = {
    title: string;
    subtitle?: string;
};

export function ListHeading({ title, subtitle }: ListHeadingProps) {
    return (
        <View className="px-1.5 pb-4 pt-2">
            <Text className="font-display text-4xl leading-tight tracking-wide text-primary">
                {title}
            </Text>
            {subtitle ? (
                <Text className="mt-1 text-base text-primary/60">{subtitle}</Text>
            ) : null}
        </View>
    );
}